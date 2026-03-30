---
name: 'step-03-expand'
description: 'Spawn Research Analyst for targeted deep research on the whitepaper subtopic'
nextStepFile: './step-04-write.md'
---

# Step 3: Expansion Research

## Goal

Spawn the Research Analyst agent for targeted deep research on the selected whitepaper subtopic -- going deeper than the original dossier coverage to gather the evidence and detail needed for a standalone whitepaper.

## Desired Outcomes

- Analyst spawned with focused subtopic context (not full dossier scope)
- Expansion research goes deeper than original dossier coverage
- Progress reporting during research
- Results stored for whitepaper writing

## Instructions

### 1. Prepare Research Context

Extract from the source dossier:
- All existing content related to the whitepaper subtopic
- Sources already cited for this subtopic
- Domain knowledge that applies
- Gaps or areas flagged as needing deeper coverage

### 2. Detect Available Tools

Check for available research tools in priority order:
1. Playwright CLI
2. Firecrawl MCP
3. WebFetch (baseline)

Store as `{detected_tools}`.

### 3. Spawn Research Analyst

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

```
You are the Research Analyst (Fieldwork) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-analyst.md

RESEARCH PARAMETERS:
- Subject: {whitepaper_topic}
- Context: This is EXPANSION RESEARCH for a whitepaper subtopic, not a full dossier
- Depth: {wp_length} -- adjust research depth accordingly
- Audience: {wp_audience} -- tailor technical depth to audience
- Primary research tool: {detected_tools}
- Output: {source_folder}/whitepaper-research-{topic_slug}.md

EXISTING RESEARCH (from source dossier):
{extracted content related to the subtopic}

EXISTING SOURCES (already cited -- build on these, don't just repeat):
{sources already cited}

SCOPE REFINEMENT:
{wp_scope -- user's specific angles or "default"}

INSTRUCTIONS:
1. Build on the existing research -- go deeper, not wider
2. Report progress: "Researching aspect N of M: {aspect_name}..."
3. Focus on {whitepaper_topic} specifically -- do not re-research the full dossier scope
4. Find new sources that the original research didn't cover
5. Every factual claim must have a working URL source
6. Apply confidence scoring: High (3+ sources), Medium (single source), Low (inference)
7. Write the expansion research to the output path
8. Return a summary: aspects covered, new sources found, confidence distribution
```

### 4. Handle Analyst Response

**On success:**
- Read the expansion research file
- Store path as `{expansion_research_path}`
- Report: "**Expansion research complete.** {aspects} aspects covered, {new_sources} new sources found."

**On failure:**
Display: "**Analyst expansion research failed.** Error: {error}\nOptions:\n- **R** -- Retry\n- **S** -- Skip expansion, write whitepaper from existing dossier content only\n- **X** -- Abort"

Wait for user input.

### 5. Proceed to Writing

Display: "**Expansion research ready.** Proceeding to whitepaper writing..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- The Analyst is spawned with focused subtopic scope, not the full dossier scope
- Expansion research builds on existing findings -- goes deeper, not wider
- If the Task tool is unavailable, achieve the research outcome in the main context thread
- Failure handled gracefully with retry/skip/abort options
