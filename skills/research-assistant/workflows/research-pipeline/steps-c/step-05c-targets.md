---
name: 'step-05c-targets'
description: 'Scan deliverable for spin-off research targets and generate research-targets.md backlog'
nextStepFile: './step-06-complete.md'
whitepaperStepFile: './step-05b-whitepaper.md'
---

# Step 5c: Research Target Identification

## Goal

Scan the published deliverable for product categories, tool types, vendor references, and market gaps that were mentioned but not fully explored, and produce a prioritized `research-targets.md` backlog of follow-up research opportunities.

## Desired Outcomes

- Deliverable scanned for all target types (product categories, vendor products, tool types, market gaps)
- Dossier frontmatter `product_categories` used as primary input when available
- Existing research-targets.md checked and merged if present (from comment resolution deferrals)
- Each target classified with type, priority, known references, scope, and source section
- research-targets.md written with frontmatter and prioritized sections (High/Medium/Low)
- Deliverable and dossier `derived_artifacts` frontmatter updated with research targets link
- Pipeline log updated with target identification metrics
- Correct routing to whitepaper or completion based on chain_whitepaper flag

## Instructions

### 1. Scan Deliverable for Research Targets

Read the deliverable at `{deliverable_path}`. Also read the dossier at `{dossier_path}` for additional context.

**Check dossier frontmatter first:** If the dossier contains a `product_categories` section in its frontmatter (populated by the Research Analyst), use it as the primary input — it already lists categories with named vendors and status (mentioned/explored/gap-identified). Cross-reference against the deliverable text to catch any categories the frontmatter may have missed.

Scan for ALL of the following:

**Product categories** — generic category names referenced in the text:
- e.g., "project management system", "e-signature platform", "document management system"
- Look for patterns like "[type] platform", "[type] tool", "[type] system", "[type] solution"

**Named vendor products representing categories** — single vendor names used where a category exists:
- e.g., "Slack" standing in for team communication platforms

**Tool types referenced but not fully explored:**
- e.g., "AI document extraction tools" mentioned in passing without cataloging the space

**Market gaps identified:**
- e.g., "no dominant vendor product exists for [category]"
- Any statement about unmet needs or emerging categories

**Vendor names mentioned without full context:**
- Products or companies named but not cataloged or fully described

### 2. Check for Existing Research Targets

Check if `{research-root}/{schema_parent_folder}/{topic_folder}/research-targets.md` already exists (may have been created by the comment resolution step for deferred comments).

- If it exists: read it and merge new targets with existing entries (avoid duplicates)
- If it does not exist: create a new file

### 3. Classify and Prioritize Targets

For each identified target, determine:

- **Category/topic name** — clear, descriptive name for the research target
- **Type** — one of: `vendor-catalog`, `deep-dive`, `market-analysis`, `tool-evaluation`
- **Priority:**
  - **High** — directly referenced in research conclusions or recommendations; central to the subject
  - **Medium** — mentioned multiple times or in key sections; relevant but not central
  - **Low** — mentioned in passing or in peripheral sections; tangential interest
- **Known references** — vendors or products already mentioned in the deliverable
- **Scope** — 1-sentence description of what the follow-up research would cover
- **Source** — which section of the deliverable referenced this target

### 4. Write Research Targets File

Write (or merge into) `{research-root}/{schema_parent_folder}/{topic_folder}/research-targets.md`:

```markdown
---
source_deliverable: '{deliverable_filename}'
source_subject: '{research_subject}'
generated: '{current_timestamp}'
target_count: {count}
priority_distribution:
  high: {count}
  medium: {count}
  low: {count}
---

# Research Targets

Spin-off research opportunities identified from: **{research_subject}**

## High Priority

- [ ] **{target_name}** ({type})
  Known references: {vendors/products already mentioned}
  Scope: {what follow-up research would cover}
  Source: {deliverable section where this was referenced}

## Medium Priority

{same format}

## Low Priority

{same format}
```

Store the file path as `{research_targets_path}`.

Update deliverable's `derived_artifacts` frontmatter: append `"[[{research_targets_filename}]]"` to the list in `{deliverable_path}`.

Also update dossier's `derived_artifacts` frontmatter: append `"[[{research_targets_filename}]]"` to the list in `{dossier_path}`.

**If no targets found:**

"**Research target scan complete.** No additional research opportunities identified in the deliverable."

Skip to section 5 (Update Pipeline Log) with `{target_count}` = 0.

### 5. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.target_identification.status: complete`
- `stages.target_identification.targets_found: {target_count}`
- `stages.target_identification.high_priority: {count}`
- `stages.target_identification.medium_priority: {count}`
- `stages.target_identification.low_priority: {count}`
- `files.research_targets: '{research_targets_path}'` (if targets found)

Append to the log body:

```markdown
## Research Targets Identified

- **Status:** Complete
- **Targets found:** {target_count}
- **High priority:** {high_count}
- **Medium priority:** {medium_count}
- **Low priority:** {low_count}
- **File:** {research_targets_path}
- **Completed:** {current_timestamp}
```

### 6. Route Based on Autonomy Level

**Determine effective next step:**
- If `{chain_whitepaper}` is true: set `{effective_next_step}` to `{whitepaperStepFile}` (step-05b-whitepaper.md)
- Otherwise: set `{effective_next_step}` to `{nextStepFile}` (step-06-complete.md)

**If autopilot:**

"**Research target identification complete.** {target_count} follow-up targets identified ({high_count} high, {medium_count} medium, {low_count} low). See `research-targets.md` for details. {If chain_whitepaper: 'Proceeding to whitepaper...' | else: 'Proceeding to completion...'}"

Immediately load, read entire file, then execute {effective_next_step}.

**If stage-gated:**

"**Research target identification complete.** {target_count} follow-up targets identified:

| Priority | Count |
|----------|-------|
| High | {high_count} |
| Medium | {medium_count} |
| Low | {low_count} |

**File:** `{research_targets_path}`

Review the targets file, then select an option.

**[C] Continue** to {If chain_whitepaper: 'whitepaper' | else: 'completion'}
**[X] Abort** pipeline"

Wait for user selection.

#### Menu Handling Logic:

- IF C: Confirm pipeline log is updated, then load, read entire file, then execute {effective_next_step}
- IF X: Update pipeline log status to ABORTED_BY_USER, then HALT
- IF Any other: help user, then redisplay menu

**If partial (and this was a selected stage):**

Present results, then check if more partial stages remain:
- If whitepaper is in {partial_stages}: load {whitepaperStepFile}
- Otherwise: load {nextStepFile} (completion).

#### Execution Rules:

- ALWAYS halt and wait for user input if stage-gated or partial
- For autopilot: auto-proceed after reporting summary
- NEVER skip pipeline log update regardless of autonomy level

## Quality Criteria

- All target types scanned: product categories, vendor products, tool types, market gaps, vendor names
- Dossier frontmatter product_categories used as primary input when available
- Existing research-targets.md checked and merged (no duplicates)
- Each target has type, priority, known references, scope, and source
- Priorities distributed meaningfully (not all High or all Low)
- Derived_artifacts updated in both deliverable and dossier frontmatter
- Pipeline log updated with target counts by priority
- chain_whitepaper flag correctly determines next step routing
