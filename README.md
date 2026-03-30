# Research Assistant

Autonomous, verified research operations with source-anchored, confidence-scored output.

## Quick Start

```bash
npx @ckelsoe/research-assistant
```

The interactive installer detects your AI agents and lets you choose where to install.

> Requires `.npmrc` with `@ckelsoe:registry=https://npm.pkg.github.com` and a GitHub token with `read:packages` scope.

## What It Does

Research Assistant is a multi-agent research pipeline that structures, executes, verifies, and publishes research. Every claim is source-anchored, every confidence score is justified, and every deliverable passes adversarial verification.

### Four-Concept Architecture

| Concept | Defines | Example |
|---------|---------|---------|
| **Schema** | WHAT to research — categories, data points, output format, scoring | vendor-evaluation |
| **Domain** | Specialized KNOWLEDGE — industry-specific depth, sources, analysis lenses | healthcare, fintech |
| **Brand** | HOW to present — tone, language rules, audience register | professional-analyst |
| **QI Rules** | Learned improvements — loaded at runtime if available | Optional |

### Capabilities (18 Operations)

**Core:** New Research (NR), Refresh Research (RF)
**Create:** Create Schema (CS), Create Domain (CD), Import Assets (IM)
**Analyze:** Challenge Research (CR), Compare Research (CM), Synthesize Research (SY), Whitepaper (WP)
**Publish:** Publish (PB)
**Manage:** Manage Schemas (MS), Manage Domains (MD), List Research (LR), Quick Capture (QC)
**Pipeline:** Resume (RS), Delete/Archive (DL), Status (ST)
**Config:** Tool Detect (TD), QI Rule (QR)

## Installation

### Via npm (recommended)

```bash
npx @ckelsoe/research-assistant
```

### Manual

Copy the `skills/research-assistant/` directory to your AI agent's skill location:

| Agent | Location |
|-------|----------|
| Claude Code | `~/.claude/skills/research-assistant/` |
| Gemini CLI | `~/.gemini/skills/research-assistant/` |
| Codex, Cursor, Copilot, etc. | `~/.agents/skills/research-assistant/` |

## Dual-Mode: Standalone + BMad

Research Assistant works in two modes:

- **Standalone**: No BMad required. Config stored at `{project-root}/.research-assistant/config.yaml`
- **BMad integrated**: Auto-registers with BMad when `_bmad/` is detected. Config merges into shared BMad config. Party mode sees all agents, bmad-help routes all commands.

The skill auto-detects which mode to use on first activation.

## Requirements

- File system access (read/write for research artifacts)
- **Enhanced (optional):** Playwright CLI or Firecrawl MCP for better source fetching
- **Baseline:** WebFetch (always available)

## License

MIT
