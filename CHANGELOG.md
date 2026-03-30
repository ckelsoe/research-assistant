# Changelog

## [2.0.0] — 2026-03-30

Major rewrite from BMad module format to Agent Skills package.

### Changed

- **Architecture**: Converted from agent.yaml + workflow step-files to SKILL.md-based Agent Skills format
- **All step files**: Rewritten to outcome-driven style (removed boilerplate, follows BMad builder best practices)
- **Config loading**: Centralized in SKILL.md activation sequence (no more redundant loading)
- **QI rules loading**: De-duplicated across agents (loaded once at activation)
- **Path references**: Tokenized (`{skill-root}`, `{config-path}`, `{data-root}`) for dual-mode support

### Added

- **Standalone mode**: Works without BMad installed — self-contained config at `.research-assistant/`
- **BMad auto-registration**: Self-registers with BMad ecosystem when `_bmad/` is detected
- **Multi-agent installer**: npm package with interactive agent selection (Claude Code, Gemini CLI, Agent Skills universal, Windsurf)
- **Auto-cleanup**: Pipeline completion step removes intermediary artifacts (gates, context files, checkpoints)
- **Cross-platform**: Deploys to `.claude/skills/` and `.agents/skills/` (covers 30+ AI coding tools)

### Removed

- agent.yaml format (replaced by SKILL.md + reference persona docs)
- module.yaml / module-help.csv at root level (moved to assets/ for BMad self-registration)
- Boilerplate in step files (MANDATORY EXECUTION RULES, SYSTEM FAILURE METRICS, etc.)
- Redundant config/QI loading in each workflow and agent
