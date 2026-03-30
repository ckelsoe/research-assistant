---
name: 'step-05-output'
description: 'Define output format, parent folder, staleness settings, and comparison mode'
nextStepFile: './step-06-review.md'
---

# Step 5: Output Settings

## Goal

Define how research output is organized -- the parent folder for results, staleness thresholds for freshness tracking, and the optional comparison mode flag.

## Desired Outcomes

- Parent folder defined and confirmed
- Staleness threshold set with appropriate guideline context
- Refresh policy selected (flag/auto-refresh/ignore)
- Comparison mode decision made (default: false)
- Complete output configuration reviewed and confirmed

## Instructions

### 1. Define Parent Folder

"**Let's configure how research output is organized.**

When Research Analyst runs this schema, results are stored in a subfolder within your research root (`{research-root}`). This keeps different types of research organized.

**What folder name should contain this schema's research output?**

For example, a 'vendor-evaluation' schema might use `vendor-evaluations/` as its parent folder. Each individual research run creates a subfolder within it."

Suggest a default based on the schema name (typically the pluralized schema name).

Wait for user response. Store as `{parent_folder}`.

### 2. Define Staleness Settings

"**How fresh should this research stay?**

Research Sentinel monitors dossiers for staleness. After a configurable number of days, it flags research as potentially outdated and can trigger a refresh.

**How many days before this type of research should be flagged as stale?**

Some guidelines:
- **30 days** -- fast-moving topics (startups, emerging tech)
- **90 days** -- standard business research (vendor evaluations, competitive landscape)
- **180 days** -- slower-moving topics (industry standards, regulatory landscape)
- **365 days** -- stable topics (historical analysis, foundational research)"

Wait for user response. Store as `{threshold_days}`.

"**When research is flagged as stale, what should happen?**

- **Flag** -- Just mark it as stale, user decides what to do (recommended)
- **Auto-refresh** -- Sentinel automatically triggers a refresh pipeline
- **Ignore** -- Don't track staleness at all"

Wait for user response. Store as `{refresh_policy}`.

### 3. Comparison Mode (Optional)

"**One more optional setting: comparison mode.**

This is a v1.5 feature that enables cross-dossier comparison output -- useful when you're researching multiple subjects with the same schema and want a side-by-side comparison.

**Would you like to enable comparison mode for this schema?**
- **No** (default) -- standard single-dossier output
- **Yes** -- enables comparative output when multiple subjects are researched"

Wait for user response. Store as `{comparison_mode}`.

### 4. Review Output Configuration

Present the complete output configuration:

"**Output configuration for `{schema_name}`:**

| Setting | Value |
|---------|-------|
| **Parent folder** | `{parent_folder}/` |
| **Output format** | dossier |
| **Staleness threshold** | {threshold_days} days |
| **Refresh policy** | {refresh_policy} |
| **Comparison mode** | {comparison_mode} |

**Result:** Research output for this schema will be stored at:
`{research-root}/{parent_folder}/{subject-name}/`

Does this look right?"

Handle any adjustments and confirm.

### 5. Present Menu

Display: "**Output settings confirmed. Ready to review the complete schema?** [C] Continue"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Present sensible defaults with clear explanations of practical impact
- Never show raw YAML to the user
- Do not revisit categories, data points, or scoring
- All output settings confirmed before proceeding
