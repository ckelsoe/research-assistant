---
name: 'step-02-configure'
description: 'Configure comparison parameters -- ranking criteria and output format'
nextStepFile: './step-03-compare.md'
---

# Step 2: Configure Comparison

## Goal

Gather comparison configuration from the user -- ranking criteria, output format, and any specific focus areas -- so the Synthesizer produces a targeted comparison.

## Desired Outcomes

- Ranking criteria gathered (or defaults accepted)
- Output format selected
- Optional focus areas captured
- Configuration confirmed by user

## Instructions

### 1. Ranking Criteria

**If same schema ({schema_match} = true):**

Read the schema YAML to list available categories.

"**Which aspects matter most for ranking?**

Schema categories available:
| # | Category | Data Points |
|---|----------|-------------|
| 1 | {category} | {count} |
|..."

**[A] All categories** (equal weight -- default)
**[S] Select priority categories** -- choose which categories matter most for overall ranking
**[C] Custom weights** -- assign importance weights to each category

Select: [A] / [S] / [C] (default: A)"

**If mixed schemas ({schema_match} = false):**

"**Mixed schemas -- ranking will focus on overlapping data points.**

Would you like to specify any priority areas for comparison?
Or press Enter to let the Synthesizer identify comparable fields automatically."

Wait for input. Store as `{ranking_criteria}`.

### 2. Output Format

"**How should the comparison be presented?**

**[M] Matrix** -- side-by-side comparison tables per category (default)
**[N] Narrative** -- written analysis with comparative prose
**[B] Both** -- matrix tables followed by narrative analysis

Select: [M] / [N] / [B] (default: M)"

Wait for selection. Store as `{output_format}`.

### 3. Focus Areas (Optional)

"**Any specific questions or angles for the comparison?**

Examples:
- *'Which vendor has the strongest security posture?'*
- *'Focus on cost and scalability differences'*
- *'Highlight regulatory compliance gaps'*

Or press Enter to compare all available data."

Wait for input. Store as `{focus_areas}` (user input or "all").

### 4. Confirm Configuration

"**Comparison Configuration:**

**Dossiers:** {compare_count} ({list subjects})
**Schema:** {compare_schema}
**Ranking:** {ranking_criteria}
**Format:** {output_format}
**Focus:** {focus_areas}

Everything correct?"

Wait for confirmation. Loop back if changes needed.

### 5. Proceed

Display: "**Configuration confirmed.** Dispatching Research Synthesizer..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Ranking criteria gathered with schema-appropriate options presented
- Output format selected from available choices
- Optional focus areas captured or defaulted
- Full configuration confirmed by user before proceeding
