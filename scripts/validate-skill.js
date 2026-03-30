#!/usr/bin/env node

/**
 * Research Assistant — Pre-publish Validation
 *
 * Checks structural integrity before publishing:
 * - SKILL.md exists with valid frontmatter
 * - All agent reference files exist
 * - All workflow and step files exist
 * - Data and spec files exist
 * - BMad assets exist
 * - Version consistency across files
 */

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '..', 'skills', 'research-assistant');
let errors = 0;
let warnings = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`  \x1b[31m✗\x1b[0m ${message}`);
    errors++;
  } else {
    console.log(`  \x1b[32m✓\x1b[0m ${message}`);
  }
}

function warn(condition, message) {
  if (!condition) {
    console.warn(`  \x1b[33m⚠\x1b[0m ${message}`);
    warnings++;
  }
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(SKILL_DIR, relativePath));
}

// ─── SKILL.md ────────────────────────────────────────────────────

console.log('\n  Validating SKILL.md...\n');

const skillPath = path.join(SKILL_DIR, 'SKILL.md');
check(fs.existsSync(skillPath), 'SKILL.md exists');

if (fs.existsSync(skillPath)) {
  const content = fs.readFileSync(skillPath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  check(frontmatterMatch, 'SKILL.md has YAML frontmatter');

  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    check(fm.includes('name:'), 'Frontmatter has name field');
    check(fm.includes('description:'), 'Frontmatter has description field');
    check(fm.includes('version:'), 'Frontmatter has version field');
  }
}

// ─── Agent References ────────────────────────────────────────────

console.log('\n  Validating agent references...\n');

const agents = [
  'research-analyst',
  'research-auditor',
  'research-sentinel',
  'research-publisher',
  'research-challenger',
  'research-schema-architect',
  'research-domain-architect',
  'research-synthesizer',
];

for (const agent of agents) {
  check(fileExists(`references/agents/${agent}.md`), `references/agents/${agent}.md exists`);
}

// ─── Workflows ───────────────────────────────────────────────────

console.log('\n  Validating workflows...\n');

const workflows = {
  'research-pipeline': ['step-01-init', 'step-02-intake', 'step-03-research', 'step-04-verify', 'step-04b-challenge', 'step-05-publish', 'step-05a-review', 'step-05b-whitepaper', 'step-05c-targets', 'step-06-complete'],
  'refresh-pipeline': ['step-01-select', 'step-02-scan', 'step-03-triage', 'step-04-reverify', 'step-05-republish', 'step-06-complete'],
  'publish': ['step-01-load', 'step-02-audience', 'step-03-transform', 'step-04-brand', 'step-05-provenance', 'step-06-write'],
  'create-schema': ['step-01-init', 'step-02-categories', 'step-03-data-points', 'step-04-scoring', 'step-05-output', 'step-06-review', 'step-07-generate'],
  'create-domain': ['step-01-identity', 'step-02-terminology', 'step-03-sources', 'step-04-lenses', 'step-05-relationships', 'step-06-review', 'step-07-generate'],
  'challenge-research': ['step-01-select', 'step-02-reasoning', 'step-03-gaps', 'step-04-bias', 'step-05-report'],
  'whitepaper': ['step-01-analyze', 'step-02-select', 'step-03-expand', 'step-04-write', 'step-05-review'],
  'compare-research': ['step-01-select', 'step-02-configure', 'step-03-compare', 'step-04-report'],
  'synthesize-research': ['step-01-select', 'step-02-configure', 'step-03-synthesize', 'step-04-report'],
  'manage-schemas': ['step-01-init', 'step-02-hub'],
  'manage-domains': ['step-01-init', 'step-02-hub'],
  'import-assets': ['step-01-init', 'step-02-select-source', 'step-03-import'],
  'list-research': ['step-01-execute'],
  'quick-capture': ['step-01-capture', 'step-02-stub', 'step-03-confirm'],
};

for (const [workflow, steps] of Object.entries(workflows)) {
  check(fileExists(`workflows/${workflow}/workflow.md`), `workflows/${workflow}/workflow.md exists`);
  for (const step of steps) {
    check(fileExists(`workflows/${workflow}/steps-c/${step}.md`), `workflows/${workflow}/steps-c/${step}.md`);
  }
}

// ─── Data References ─────────────────────────────────────────────

console.log('\n  Validating data references...\n');

check(fileExists('references/data/qi-rules.yaml'), 'references/data/qi-rules.yaml exists');
check(fileExists('references/data/tool-routing.yaml'), 'references/data/tool-routing.yaml exists');
check(fileExists('references/data/tools-cache.yaml'), 'references/data/tools-cache.yaml exists');
check(fileExists('references/data/research-patterns.md'), 'references/data/research-patterns.md exists');

// ─── Spec Files ──────────────────────────────────────────────────

console.log('\n  Validating spec files...\n');

check(fileExists('references/specs/schema-spec.md'), 'references/specs/schema-spec.md exists');
check(fileExists('references/specs/domain-spec.yaml'), 'references/specs/domain-spec.yaml exists');

// ─── BMad Assets ─────────────────────────────────────────────────

console.log('\n  Validating BMad assets...\n');

check(fileExists('assets/module.yaml'), 'assets/module.yaml exists');
check(fileExists('assets/module-help.csv'), 'assets/module-help.csv exists');
check(fileExists('assets/module-setup.md'), 'assets/module-setup.md exists');
check(fileExists('scripts/merge-config.py'), 'scripts/merge-config.py exists');
check(fileExists('scripts/merge-help-csv.py'), 'scripts/merge-help-csv.py exists');

// ─── Version Consistency ─────────────────────────────────────────

console.log('\n  Validating version consistency...\n');

try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const pkgVersion = pkg.version;

  if (fs.existsSync(skillPath)) {
    const content = fs.readFileSync(skillPath, 'utf8');
    const versionMatch = content.match(/version:\s*"?(\d+\.\d+\.\d+)"?/);
    if (versionMatch) {
      check(versionMatch[1] === pkgVersion, `SKILL.md version (${versionMatch[1]}) matches package.json (${pkgVersion})`);
    }
  }

  if (pkg.claudeCode && pkg.claudeCode.version) {
    check(pkg.claudeCode.version === pkgVersion, `claudeCode.version (${pkg.claudeCode.version}) matches package.json (${pkgVersion})`);
  }
} catch (err) {
  check(false, `Version consistency check: ${err.message}`);
}

// ─── Summary ─────────────────────────────────────────────────────

console.log('\n  ─────────────────────────────────────');
if (errors === 0) {
  console.log(`  \x1b[32m✓ Validation passed\x1b[0m (${warnings} warning${warnings !== 1 ? 's' : ''})\n`);
} else {
  console.log(`  \x1b[31m✗ Validation failed: ${errors} error${errors !== 1 ? 's' : ''}\x1b[0m (${warnings} warning${warnings !== 1 ? 's' : ''})\n`);
  process.exit(1);
}
