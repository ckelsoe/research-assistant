# Research Assistant

Autonomous, verified research operations with source-anchored, confidence-scored output.

## Installation

### Claude Code

```
/install-skill https://github.com/ckelsoe/research-assistant/tree/main/skills/research-assistant
```

### Codex CLI

```
$skill-installer install https://github.com/ckelsoe/research-assistant/tree/main/skills/research-assistant
```

### Other Agents (Gemini, Cursor, Copilot, Cline, Roo Code, etc.)

Copy `skills/research-assistant/` from this repo to `~/.agents/skills/research-assistant/`

### npm (alternative)

```bash
npx @ckelsoe/research-assistant
```

Installs to both `.claude/skills/` and `.agents/skills/` in one step.

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

| Code | Name | Description |
|------|------|-------------|
| **NR** | New Research | Full pipeline from intake to published deliverable |
| **RF** | Refresh Research | Scan stale research for changes and refresh |
| **PB** | Publish | Transform validated dossier into audience-appropriate deliverable |
| **CS** | Create Schema | Design a new research schema via guided conversation |
| **CD** | Create Domain | Define a new research domain via guided conversation |
| **CR** | Challenge Research | Adversarial reasoning validation of a dossier |
| **WP** | Whitepaper | Generate focused whitepaper from research subtopic |
| **CM** | Compare Research | Side-by-side comparison of 2+ dossiers |
| **SY** | Synthesize Research | Cross-cutting themes across multiple dossiers |
| **MS** | Manage Schemas | Schema lifecycle: list, view, clone, validate, deprecate, export |
| **MD** | Manage Domains | Domain lifecycle: list, view, clone, validate, deprecate, export |
| **IM** | Import Assets | Import schemas/domains from external sources |
| **LR** | List Research | Show all research artifacts with status and confidence |
| **QC** | Quick Capture | Stub a research idea for later execution |
| **RS** | Resume | Continue an interrupted or stalled pipeline |
| **DL** | Delete/Archive | Remove or archive research artifacts |
| **ST** | Status | Check progress on a specific pipeline run |
| **TD** | Tool Detect | Force re-detection of available research tools |
| **QR** | QI Rule | Capture a quality improvement rule |

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
