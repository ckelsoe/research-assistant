---
name: 'step-03-compare'
description: 'Spawn Research Synthesizer to execute cross-dossier comparison'
nextStepFile: './step-04-report.md'
---

# Step 3: Execute Comparison

## Goal

Spawn the Research Synthesizer agent with all selected dossiers and configuration, produce a structured comparison report, and handle the response.

## Desired Outcomes

- Output folder created at `{research-root}/_comparisons/{comparison_name}/`
- All dossier content loaded and passed to the Synthesizer
- Synthesizer spawned with complete context
- Comparison report produced and verified
- Comparison log written with metadata

## Instructions

### 1. Create Output Folder

Create a comparison name from the subjects (e.g., "acme-vs-widget-vs-gadget" or use timestamps for many subjects).

Create folder: `{research-root}/_comparisons/{comparison_name}/`

Store as `{comparison_folder}`.

### 2. Load All Dossier Content

For each dossier in `{compare_dossiers}`:
- Read the full dossier.md content
- If a verification-report.md exists alongside, note its summary

Store all dossier contents for passing to the Synthesizer.

### 3. Announce Comparison Stage

"**Comparison Analysis** -- Dispatching Research Synthesizer to compare {compare_count} dossiers..."

### 4. Spawn Research Synthesizer

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Synthesizer (Nexus) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-synthesizer.md

COMPARISON PARAMETERS:
- Output report path: {comparison_folder}/comparison-report.md
- Schema match: {schema_match} ({compare_schema})
- Ranking criteria: {ranking_criteria}
- Output format: {output_format}
- Focus areas: {focus_areas}

DOSSIERS TO COMPARE:
[For each dossier:]
--- DOSSIER {N}: {subject} (schema: {schema}) ---
{full dossier content}
--- END DOSSIER {N} ---

INSTRUCTIONS:
1. Map comparable data points across all dossiers using schema categories
2. PROGRESS REPORTING: Before analyzing each category, output:
   "Comparing category N of M: {category_name} across {compare_count} subjects..."
3. For each comparable category: extract findings per subject, compare side-by-side
4. Rank subjects on each category based on evidence strength and findings
5. Produce overall ranking with rationale
6. Identify per-subject strengths, weaknesses, and notable gaps
7. If focus areas specified, ensure those are addressed prominently
8. Write comparison-report.md in the specified format (matrix/narrative/both)
9. Return summary: categories compared, key differentiators, overall ranking
```

### 5. Handle Synthesizer Response

**On success:**
- Read the comparison report to verify it was written
- Extract summary metrics: categories compared, ranking result
- Store report path as `{comparison_report_path}`

**On failure or error:**
- Log the error details
- Present to user:
  "**Comparison failed.** {error details}

  **Options:**
  **[R] Retry** -- Spawn Synthesizer again
  **[X] Abort** -- End workflow"
- Wait for user selection and handle accordingly
- If retry: loop back to section 4
- If abort: HALT

### 6. Write Comparison Log

Write a comparison-log.md in `{comparison_folder}` with frontmatter:

```yaml
---
type: comparison
subjects: [{list of subjects}]
schemas: [{list of schemas}]
schema_match: {true/false}
ranking_criteria: {criteria}
output_format: {format}
created: {current_timestamp}
dossier_paths: [{list of source dossier paths}]
---
```

### 7. Proceed

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Output folder created before any analysis
- All dossiers loaded completely with verification status noted
- Synthesizer spawned with complete context including all dossier content
- Comparison report produced and verified to exist
- Comparison log written with accurate metadata
- Error handling followed if Synthesizer failed, with retry option
- Director orchestrates but does not perform comparison analysis directly
