---
name: 'step-03-synthesize'
description: 'Spawn Research Synthesizer to execute cross-dossier thematic synthesis'
nextStepFile: './step-04-report.md'
---

# Step 3: Execute Synthesis

## Goal

Spawn the Research Synthesizer agent with all selected dossiers and configuration, produce a structured synthesis report, and handle the response.

## Desired Outcomes

- Output folder created at `{research-root}/_syntheses/{synthesis_name}/`
- All dossier content loaded and passed to the Synthesizer
- Synthesizer spawned with complete context
- Synthesis report produced and verified
- Synthesis log written with metadata

## Instructions

### 1. Create Output Folder

Create a synthesis name from the subjects (e.g., "synthesis-acme-widget-gadget" or use timestamps for many subjects).

Create folder: `{research-root}/_syntheses/{synthesis_name}/`

Store as `{synthesis_folder}`.

### 2. Load All Dossier Content

For each dossier in `{synthesis_dossiers}`:
- Read the full dossier.md content
- If a verification-report.md exists alongside, note its summary

Store all dossier contents for passing to the Synthesizer.

### 3. Announce Synthesis Stage

"**Thematic Synthesis** -- Dispatching Research Synthesizer to analyze {synthesis_count} dossiers..."

### 4. Spawn Research Synthesizer

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Synthesizer (Nexus) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-synthesizer.md

SYNTHESIS PARAMETERS:
- Output report path: {synthesis_folder}/synthesis-report.md
- Focus areas: {focus_areas}
- Synthesis depth: {synthesis_depth}
- Sections to include: {synthesis_sections}

DOSSIERS TO SYNTHESIZE:
[For each dossier:]
--- DOSSIER {N}: {subject} (schema: {schema}) ---
{full dossier content}
--- END DOSSIER {N} ---

INSTRUCTIONS:
1. Read all dossiers completely before beginning analysis
2. PROGRESS REPORTING: Before analyzing each theme/section, output:
   "Synthesizing section N of M: {section_name} across {synthesis_count} dossiers..."
3. Identify cross-cutting themes -- patterns, topics, or dynamics that appear across 2+ dossiers
4. Map convergence points -- where separately-researched subjects agree or align
5. Map divergence points -- where subjects conflict, contradict, or take opposing positions
6. Perform gap analysis -- what no dossier investigated but the combined picture suggests matters
7. Build cross-reference map -- trace every finding back to specific dossier(s) and section(s)
8. If focus areas specified, ensure those are addressed prominently
9. If brief depth: limit to key themes and high-level patterns
10. If comprehensive depth: include detailed analysis, evidence chains, and nuanced relationships
11. Write synthesis-report.md at the specified output path
12. Return summary: themes identified, key insights, convergence/divergence highlights
```

### 5. Handle Synthesizer Response

**On success:**
- Read the synthesis report to verify it was written
- Extract summary metrics: themes found, key insights
- Store report path as `{synthesis_report_path}`

**On failure or error:**
- Log the error details
- Present to user:
  "**Synthesis failed.** {error details}

  **Options:**
  **[R] Retry** -- Spawn Synthesizer again
  **[X] Abort** -- End workflow"
- Wait for user selection and handle accordingly
- If retry: loop back to section 4
- If abort: HALT

### 6. Write Synthesis Log

Write a synthesis-log.md in `{synthesis_folder}` with frontmatter:

```yaml
---
type: synthesis
subjects: [{list of subjects}]
schemas: [{list of schemas}]
focus_areas: {focus_areas}
synthesis_depth: {depth}
sections_included: [{list}]
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
- Synthesis report produced and verified to exist
- Synthesis log written with accurate metadata
- Error handling followed if Synthesizer failed, with retry option
- Director orchestrates but does not perform synthesis analysis directly
