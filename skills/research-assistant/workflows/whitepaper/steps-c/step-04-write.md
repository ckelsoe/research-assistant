---
name: 'step-04-write'
description: 'Spawn Research Publisher to generate the whitepaper from combined research'
nextStepFile: './step-05-review.md'
---

# Step 4: Write Whitepaper

## Goal

Spawn the Research Publisher agent to generate the whitepaper -- combining the original dossier content with the expansion research, applying the configured audience, length, and brand settings.

## Desired Outcomes

- Publisher spawned with combined content and configuration
- Whitepaper structured as a professional document (not a reformatted dossier)
- Length matches target
- Audience-appropriate depth and terminology
- Source citations preserved

## Instructions

### 1. Prepare Combined Content

Assemble all input material:
- Original dossier content related to the subtopic
- Expansion research from step 3 (if available)
- Configuration: audience, length, brand, scope

Generate whitepaper filename:
- Pattern: `whitepaper-{topic_slug}.md`
- Full path: `{source_folder}/whitepaper-{topic_slug}.md`

### 2. Spawn Research Publisher

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

```
You are the Research Publisher (Briefer) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-publisher.md

PUBLICATION PARAMETERS:
- Output type: WHITEPAPER (not a standard deliverable)
- Output path: {source_folder}/whitepaper-{topic_slug}.md
- Topic: {whitepaper_topic}
- Source subject: {source_subject}

AUDIENCE: {wp_audience}
LENGTH TARGET: {wp_length}
SCOPE: {wp_scope}

BRAND/TONE:
{brand YAML content or "Use default professional-analyst tone"}

SOURCE CONTENT (combine these into a cohesive whitepaper):

--- ORIGINAL DOSSIER CONTENT ---
{relevant sections from source dossier}

--- EXPANSION RESEARCH ---
{expansion research content, or "No expansion research -- use dossier content only"}

INSTRUCTIONS:
1. Report progress: "Structuring whitepaper outline..." then "Writing section N of M: {section_name}..."
2. Structure as a professional whitepaper:
   - Title page with topic, date, and provenance
   - Executive summary (1 paragraph for brief, 1 page for deep)
   - Introduction establishing context and why this topic matters
   - Body sections organized by logical flow (not schema categories)
   - Key findings and implications
   - Conclusion with actionable takeaways
   - References section with all cited sources
3. Match length to target: {wp_length}
4. Tailor depth and terminology to audience: {wp_audience}
5. Apply brand tone rules
6. Include provenance note: "This whitepaper was generated from research on {source_subject}"
7. Ensure all factual claims retain their source citations
8. Write the whitepaper to the output path
```

### 3. Handle Publisher Response

**On success:**
- Confirm whitepaper file was written
- Store path as `{whitepaper_path}`
- Report: "**Whitepaper generated.** Written to `{whitepaper_path}`"

**On failure:**
Display: "**Publisher failed.** Error: {error}\nOptions:\n- **R** -- Retry\n- **X** -- Abort"

Wait for user input.

### 4. Proceed to Review

Display: "**Whitepaper draft ready.** Proceeding to review..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- The output is a cohesive whitepaper, not a reformatted dossier
- Length matches the configured target
- Audience-appropriate depth and terminology
- Source citations preserved from original research
- If the Task tool is unavailable, achieve the writing outcome in the main context thread
