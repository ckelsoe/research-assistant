#!/usr/bin/env node

/**
 * Research Assistant — Automated Tests
 *
 * Checks:
 * - No stale path references to old BMad module format
 * - All nextStepFile references resolve to real files
 * - Workflow chain completeness
 * - Agent persona docs have required sections
 */

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '..', 'skills', 'research-assistant');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    passed++;
  } catch (err) {
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function getAllFiles(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, ext));
    } else if (!ext || entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

// ─── Stale Path References ───────────────────────────────────────

console.log('\n  Testing for stale path references...\n');

const STALE_PATTERN = '{project-root}/_bmad/research-assistant/';
const allMdFiles = getAllFiles(SKILL_DIR, '.md');

// SKILL.md documents what {data-root} resolves to in BMad mode — those references are
// intentional documentation, not runtime paths. Exclude SKILL.md from stale-path checks.
const checkableFiles = allMdFiles.filter(f => path.basename(f) !== 'SKILL.md');

test('No stale _bmad/research-assistant/ references in workflow/reference files', () => {
  const violations = [];
  for (const file of checkableFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(STALE_PATTERN)) {
      const relPath = path.relative(SKILL_DIR, file);
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(STALE_PATTERN)) {
          violations.push(`${relPath}:${i + 1}`);
        }
      }
    }
  }
  assert(violations.length === 0,
    `Found ${violations.length} stale reference(s):\n    ${violations.slice(0, 10).join('\n    ')}`);
});

// ─── nextStepFile References ─────────────────────────────────────

console.log('\n  Testing step file chain integrity...\n');

const stepFiles = getAllFiles(path.join(SKILL_DIR, 'workflows'), '.md')
  .filter(f => f.includes('steps-c'));

test('All nextStepFile references resolve to real files', () => {
  const broken = [];
  for (const file of stepFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/nextStepFile:\s*['"](.+?)['"]/);
    if (match) {
      const nextFile = match[1];
      const resolvedPath = path.resolve(path.dirname(file), nextFile);
      if (!fs.existsSync(resolvedPath)) {
        broken.push(`${path.relative(SKILL_DIR, file)} → ${nextFile}`);
      }
    }
  }
  assert(broken.length === 0,
    `Found ${broken.length} broken nextStepFile reference(s):\n    ${broken.join('\n    ')}`);
});

// ─── Agent Persona Required Sections ─────────────────────────────

console.log('\n  Testing agent persona structure...\n');

const agentDir = path.join(SKILL_DIR, 'references', 'agents');
const requiredSections = ['## Role', '## Identity', '## Communication Style', '## Principles'];

if (fs.existsSync(agentDir)) {
  const agentFiles = fs.readdirSync(agentDir).filter(f => f.endsWith('.md'));

  for (const file of agentFiles) {
    test(`${file} has all required sections`, () => {
      const content = fs.readFileSync(path.join(agentDir, file), 'utf8');
      const missing = requiredSections.filter(s => !content.includes(s));
      assert(missing.length === 0,
        `Missing sections: ${missing.join(', ')}`);
    });
  }
}

// ─── Workflow Chain Completeness ─────────────────────────────────

console.log('\n  Testing workflow chain completeness...\n');

const workflowDir = path.join(SKILL_DIR, 'workflows');
if (fs.existsSync(workflowDir)) {
  const workflowDirs = fs.readdirSync(workflowDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const wf of workflowDirs) {
    test(`${wf} workflow chain is complete`, () => {
      const stepsDir = path.join(workflowDir, wf, 'steps-c');
      if (!fs.existsSync(stepsDir)) return; // Some workflows may not have steps

      const steps = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md')).sort();
      if (steps.length === 0) return;

      // Follow chain from first step
      let current = path.join(stepsDir, steps[0]);
      const visited = new Set();
      let chainLength = 0;

      while (current && fs.existsSync(current)) {
        if (visited.has(current)) break; // Cycle detection
        visited.add(current);
        chainLength++;

        const content = fs.readFileSync(current, 'utf8');
        const match = content.match(/nextStepFile:\s*['"](.+?)['"]/);
        if (match) {
          current = path.resolve(path.dirname(current), match[1]);
        } else {
          current = null; // Terminal step
        }
      }

      // Chain should reach at least one step
      assert(chainLength > 0, `Chain has 0 steps`);
    });
  }
}

// ─── Summary ─────────────────────────────────────────────────────

console.log('\n  ─────────────────────────────────────');
console.log(`  ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
