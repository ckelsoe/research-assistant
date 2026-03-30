---
name: 'step-05b-whitepaper'
description: 'Integrated whitepaper generation — subtopic selection, expansion research, and writing'
nextStepFile: './step-06-complete.md'
---

# Step 5b: Whitepaper

## Goal

Generate a focused whitepaper from a dossier subtopic within the pipeline — analyze the dossier for high-value subtopics, let the user select and configure, spawn the Research Analyst for expansion research and Research Publisher for whitepaper writing, then route to pipeline completion.

## Desired Outcomes

- Dossier analyzed for 3-5 high-value whitepaper subtopics
- User selected subtopic and configured audience/length/scope (or auto-selected in autopilot)
- Research Analyst spawned for focused expansion research on the subtopic
- Research Publisher spawned to synthesize dossier + expansion content into professional whitepaper
- Whitepaper produced as standalone professional document (not a reformatted dossier)
- Dossier and deliverable `derived_artifacts` frontmatter updated with whitepaper link
- Pipeline log updated with whitepaper stage results

## Instructions

### 1. Pre-Flight Check

Verify the dossier exists at `{dossier_path}`.

**If dossier does not exist:**
"**No dossier found.** Cannot generate whitepaper without research output.

**[X] Abort** — end pipeline"

Wait for user selection. Update pipeline log and HALT.

### 2. Announce Whitepaper Stage

Compute whitepaper stage number: 3 + (1 if {chain_challenge}) + 1 (publish).

**If autopilot:**
"**Stage {whitepaper_stage_num}/{total_stages}: Whitepaper** — Analyzing dossier for subtopics..."

**If stage-gated:**
"**Stage {whitepaper_stage_num}/{total_stages}: Whitepaper** — Analyzing dossier for high-value subtopics."

### 3. Analyze Dossier for Subtopics

Read the full dossier at `{dossier_path}`.

Identify 3-5 high-value subtopics worthy of whitepaper treatment. A good whitepaper subtopic is:

- A finding that surprised or challenged assumptions
- A trend or pattern with broader implications
- A technical area benefiting from deeper analysis
- A comparison or evaluation meriting standalone treatment
- An emerging topic mentioned but not fully explored

A subtopic that is merely a restatement of a dossier section, too narrow for meaningful depth, or too broad to cover in a whitepaper is NOT a good candidate.

**If autopilot:**

Auto-select the highest-value subtopic (first in the list). Present the selection:

"**Auto-selected subtopic:** {topic} — {rationale}"

Store `{whitepaper_topic}` and proceed to section 4.

**If stage-gated or partial:**

Present subtopic candidates:

"**Whitepaper subtopic candidates from: {research_subject}**

| # | Subtopic | Why It Merits a Whitepaper |
|---|----------|---------------------------|
| 1 | {title} | {rationale} |
| 2 | {title} | {rationale} |
| 3 | {title} | {rationale} |
|...

Select a number, or describe your own subtopic:"

Wait for user input. Store as `{whitepaper_topic}` and `{whitepaper_rationale}`.

### 4. Quick Configuration

**If autopilot:**

Use defaults: audience = General, length = Standard, scope = default.

"**Whitepaper config:** Topic: {whitepaper_topic} | Audience: General | Length: Standard"

**If stage-gated or partial:**

"**Configure whitepaper:**

**Audience:** **[E] Executive** | **[T] Technical** | **[G] General** (default)
**Length:** **[B] Brief** (3-5 pages) | **[S] Standard** (8-12 pages, default) | **[D] Deep** (15-20 pages)

**Specific angles?** (Enter to use default scope)"

Wait for responses. Store `{wp_audience}`, `{wp_length}`, `{wp_scope}`.

### 5. User Communication — Expansion Research (Required)

Before spawning the expansion research agent, inform the user:

"**Dispatching Research Analyst for expansion research** on '{whitepaper_topic}'. It will go deeper on this subtopic, finding new sources beyond the original dossier. This typically takes 5-15 minutes depending on topic depth. I'll report results when it completes."

### 6. Spawn Research Analyst for Expansion

Extract from the dossier all existing content related to `{whitepaper_topic}`, including sources already cited.

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

```
You are the Research Analyst (Fieldwork) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-analyst.md

RESEARCH PARAMETERS:
- Subject: {whitepaper_topic}
- Context: This is EXPANSION RESEARCH for a whitepaper subtopic, not a full dossier
- Depth: {wp_length} — adjust research depth accordingly
- Audience: {wp_audience} — tailor technical depth to audience
- Primary research tool: {detected_tools}
- Output: {research-root}/{schema_parent_folder}/{topic_folder}/whitepaper-research-{topic_slug}.md

EXISTING RESEARCH (from source dossier):
{extracted content related to the subtopic}

EXISTING SOURCES (already cited — build on these, don't just repeat):
{sources already cited for this subtopic}

SCOPE REFINEMENT:
{wp_scope — user's specific angles or "default"}

QI RULES (if loaded):
{qi_rules content, or "No QI rules loaded."}

INSTRUCTIONS:
1. Build on the existing research — go deeper, not wider
2. Report progress: "Researching aspect N of M: {aspect_name}..."
3. Focus on {whitepaper_topic} specifically — do not re-research the full dossier scope
4. Find new sources that the original research didn't cover
5. Every factual claim must have a working URL source
6. Apply confidence scoring: High (3+ sources), Medium (single source), Low (inference)
7. Write the expansion research to the output path
8. Return a summary: aspects covered, new sources found, confidence distribution
```

**On success:**
- Store path as `{expansion_research_path}`
- "**Expansion research complete.** Proceeding to whitepaper writing..."

**On failure:**
- Present: "**Expansion research failed.** {error}
  **[R] Retry** | **[S] Skip** (write from dossier content only) | **[X] Abort**"
- Handle accordingly

### 7. User Communication — Whitepaper Writing (Required)

Before spawning the publisher agent, inform the user:

"**Dispatching Research Publisher for whitepaper writing.** It will synthesize the dossier content and expansion research into a polished whitepaper for {wp_audience}. This typically takes 5-10 minutes. I'll report results when it completes."

### 8. Spawn Research Publisher for Whitepaper

Generate whitepaper filename: `whitepaper-{topic_slug}.md`
Full path: `{research-root}/{schema_parent_folder}/{topic_folder}/whitepaper-{topic_slug}.md`

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

```
You are the Research Publisher (Briefer) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-publisher.md

PUBLICATION PARAMETERS:
- Output type: WHITEPAPER (not a standard deliverable)
- Output path: {research-root}/{schema_parent_folder}/{topic_folder}/whitepaper-{topic_slug}.md
- Topic: {whitepaper_topic}
- Source subject: {research_subject}

AUDIENCE: {wp_audience}
LENGTH TARGET: {wp_length}
SCOPE: {wp_scope}

BRAND/TONE:
{brand YAML content or "Use default professional-analyst tone"}

SOURCE CONTENT (combine these into a cohesive whitepaper):

--- ORIGINAL DOSSIER CONTENT ---
{relevant sections from source dossier}

--- EXPANSION RESEARCH ---
{expansion research content, or "No expansion research — use dossier content only"}

QI RULES (if loaded):
{qi_rules content, or "No QI rules loaded."}

INSTRUCTIONS:
1. Report progress: "Structuring whitepaper outline..." then "Writing section N of M: {section_name}..."
2. Structure as a professional whitepaper:
   - Title page with topic, date, and provenance
   - Executive summary
   - Introduction establishing context
   - Body sections organized by logical flow (not schema categories)
   - Key findings and implications
   - Conclusion with actionable takeaways
   - References section with all cited sources
3. Match length to target: {wp_length}
4. Tailor depth and terminology to audience: {wp_audience}
5. Apply brand tone rules
6. Include provenance note: "This whitepaper was generated from research on {research_subject}"
7. Ensure all factual claims retain their source citations
8. Write the whitepaper to the output path
9. Return a summary: section count, word count, sources cited
```

**On success:**
- Confirm whitepaper file was written
- Store path as `{whitepaper_path}`
- Update dossier's `derived_artifacts` frontmatter: append `"[[{whitepaper_filename}]]"` to the list in `{dossier_path}`
- Update deliverable's `derived_artifacts` frontmatter: append `"[[{whitepaper_filename}]]"` to the list in `{deliverable_path}` (if deliverable exists)

**On failure:**
- Present: "**Whitepaper writing failed.** {error}
  **[R] Retry** | **[X] Abort**"
- Handle accordingly

### 9. Review (Stage-Gated Only)

**If autopilot:**

"**Whitepaper generated.** `{whitepaper_path}` — Proceeding to completion..."

Skip to section 10.

**If stage-gated or partial:**

Write gate artifact to `{topic_folder}/gates/gate-{N}-whitepaper-complete.md` where N = 3 + (1 if chain_challenge) + 1 (publish):

```
---
gate: whitepaper-complete
gate_number: {dynamic: 3 + (1 if chain_challenge) + 1}
pipeline_id: {pipeline_id}
subject: {subject}
status: awaiting_approval
created: {timestamp}
stage: whitepaper
next_stage: completion
artifact: {whitepaper_path}
---

## Whitepaper Complete — Gate Review

### Summary
{Subtopic, audience, length}

### Whitepaper Overview
| Metric | Value |
|--------|-------|
| Subtopic | {selected subtopic} |
| Audience | {executive/technical/general} |
| Length | {brief/standard/deep} |

### Artifacts
- **Whitepaper:** `{whitepaper_path}`
- **Dossier:** `{dossier_path}`

### Recommendation
{Ready for distribution}

---
*Gate artifact generated by research-assistant pipeline. Review offline and resume with [RS].*
```

"Gate artifact written to `{topic_folder}/gates/gate-{N}-whitepaper-complete.md`. You can review offline and resume later with [RS].

**Whitepaper generated:** `{whitepaper_path}`

**[A] Accept** — Finalize and continue
**[F] Feedback** — Provide revision feedback (1 round)
**[C] Continue** — Accept and continue to completion"

If Feedback selected:
- Gather user feedback
- Re-spawn Publisher with original content + current draft + revision instructions
- Present revised version
- Continue to section 10

### 10. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.whitepaper.status: complete`
- `stages.whitepaper.topic: '{whitepaper_topic}'`
- `files.whitepaper: '{whitepaper_path}'`
- If stage-gated: `gates.whitepaper: '{gate_path}'`

Append to the log body:

```markdown
## Whitepaper Stage

- **Status:** Complete
- **Topic:** {whitepaper_topic}
- **Whitepaper:** {whitepaper_path}
- **Audience:** {wp_audience}
- **Length target:** {wp_length}
- **Completed:** {current_timestamp}
```

### 11. Route to Completion

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Dossier analyzed for genuinely high-value subtopics (not just section headings)
- Subtopic selection offered interactively in stage-gated/partial (auto-selected in autopilot)
- Analyst spawned with focused subtopic context (not full dossier scope)
- Publisher spawned with combined dossier + expansion content
- Whitepaper produced as professional standalone document (not reformatted dossier)
- Derived_artifacts updated in both dossier and deliverable frontmatter
- Pipeline log updated with whitepaper metrics
- Error handling for both Analyst and Publisher spawn failures
