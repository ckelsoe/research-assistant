#!/usr/bin/env node

/**
 * Research Assistant — .skill File Builder
 *
 * Builds a .skill ZIP archive for ChatGPT Skills upload.
 *
 * NOTE: Research Assistant's multi-agent orchestration, step-file workflows,
 * and subagent spawning make it poorly suited for ChatGPT's skills model.
 * This builder creates the archive for completeness, but a purpose-built
 * simplified version would be needed for effective ChatGPT use.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SKILL_NAME = 'research-assistant';
const SKILL_DIR = path.join(__dirname, '..', 'skills', SKILL_NAME);
const OUTPUT_FILE = path.join(__dirname, '..', `${SKILL_NAME}.skill`);

console.log(`\n  Building ${SKILL_NAME}.skill...\n`);

console.log('  \x1b[33m⚠\x1b[0m Research Assistant uses multi-agent orchestration and');
console.log('    step-file workflows that are not well-suited for ChatGPT Skills.');
console.log('    The .skill file is provided for completeness.\n');

// Remove existing
if (fs.existsSync(OUTPUT_FILE)) {
  fs.unlinkSync(OUTPUT_FILE);
}

// Build ZIP
try {
  if (process.platform === 'win32') {
    const zipFile = OUTPUT_FILE.replace('.skill', '.zip');
    execSync(
      `powershell -NoProfile -Command "Compress-Archive -Path '${SKILL_DIR}\\*' -DestinationPath '${zipFile}' -Force"`,
      { stdio: 'inherit' }
    );
    fs.renameSync(zipFile, OUTPUT_FILE);
  } else {
    execSync(`cd "${path.dirname(SKILL_DIR)}" && zip -r "${OUTPUT_FILE}" "${SKILL_NAME}"`, { stdio: 'inherit' });
  }

  const stats = fs.statSync(OUTPUT_FILE);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`\n  \x1b[32m✓\x1b[0m Built ${SKILL_NAME}.skill (${sizeKB} KB)\n`);
} catch (err) {
  console.error(`\n  \x1b[31m✗\x1b[0m Build failed: ${err.message}\n`);
  process.exit(1);
}
