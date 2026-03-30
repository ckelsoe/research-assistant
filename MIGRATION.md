# Migration Guide: BMad Module → Agent Skills Package

This guide is for users upgrading from the old BMad module format (`bmad install research-assistant`) to the new Agent Skills package (`npx @ckelsoe/research-assistant`).

## What Changed

| Aspect | Old (v0.x) | New (v2.0) |
|--------|-----------|-----------|
| Format | agent.yaml + module.yaml | SKILL.md + references/ |
| Install | `bmad install research-assistant` | `npx @ckelsoe/research-assistant` |
| Requires BMad | Yes | No (optional) |
| Config location | `_bmad/research-assistant/config.yaml` | `.research-assistant/config.yaml` (standalone) or `_bmad/config.yaml` (BMad mode) |
| Agent discovery | agent-manifest.csv | Claude Code system-reminder / `.agents/` directory |
| Platforms | Claude Code only (via BMad) | Claude Code, Gemini CLI, Codex, Cursor, Copilot, 30+ others |

## Migration Steps

### 1. Install the new package

```bash
npx @ckelsoe/research-assistant
```

### 2. Existing research data

Your existing research artifacts (dossiers, verification reports, deliverables) in `{research-root}/` are **untouched**. The new skill reads the same output format.

### 3. Schemas and domains

If you had schemas and domains at `_bmad/research-assistant/data/schemas/` and `_bmad/research-assistant/data/domains/`, copy them to:

- **Standalone mode:** `.research-assistant/data/schemas/` and `.research-assistant/data/domains/`
- **BMad mode:** They stay where they are (the skill detects BMad and uses the existing paths)

### 4. QI rules

Same as schemas — copy from `_bmad/research-assistant/data/qi-rules.yaml` to `.research-assistant/data/qi-rules.yaml` if using standalone mode.

### 5. Remove old module (optional)

Once confirmed working, you can remove the old BMad module installation:
- Delete `_bmad/research-assistant/` (if not using BMad mode)
- Remove research-assistant entries from `_bmad/_config/agent-manifest.csv` and `_bmad/module-help.csv`

## Breaking Changes

- **Config format**: Standalone mode uses a flat YAML file instead of a section in the shared BMad config
- **Step file format**: All step files rewritten to outcome-driven style (no behavioral change, just cleaner instructions)
- **Pipeline cleanup**: Intermediary files (gates, checkpoints, context files) are now auto-cleaned on pipeline completion
