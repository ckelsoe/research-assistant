---
name: 'step-05-publish'
description: 'Spawn Research Publisher via Task tool to produce polished deliverable from verified dossier'
reviewStepFile: './step-05a-review.md'
---

# Step 5: Publish

## Goal

Spawn the Research Publisher agent via Task tool to transform the verified dossier into a polished, audience-appropriate deliverable with provenance — stripping validation machinery while preserving substance.

## Desired Outcomes

- Dossier existence verified; unverified status detected and flagged if verification was skipped
- Research Publisher spawned with complete context (dossier, brand, verification status, inter-agent context)
- Polished deliverable produced at `{topic_folder}/{deliverable_filename}` with provenance note
- Dossier's `derived_artifacts` frontmatter updated with deliverable link
- Pipeline log updated with publish stage results
- Routes to comment review step after publish (always, regardless of autonomy level)

## Instructions

### 1. Pre-Flight Check

Verify the dossier exists at `{dossier_path}`.

**If dossier does not exist:**
"**No dossier found.** Cannot publish without research output.

**[X] Abort** — end pipeline"

Wait for user selection. Update pipeline log and HALT.

Check if verification report exists at `{verification_report_path}`.

**If verification report does not exist:**
Note `{unverified}` = true. The Publisher will include a warning in the deliverable.
"**Note:** Dossier has not been verified. Deliverable will include an unverified warning."

### 2. Announce Publish Stage

Compute publish stage number: 3 + (1 if {chain_challenge}).

**If autopilot:**
"**Stage {publish_stage_num}/{total_stages}: Publish** — Dispatching Research Publisher..."

**If stage-gated:**
"**Stage {publish_stage_num}/{total_stages}: Publish** — Dispatching Research Publisher. Will present results for your review when complete."

### 3. Determine Deliverable Filename

Generate a deliverable filename from the schema and subject:
- Pattern: `{schema_name}-{subject_slug}.md` (e.g., `vendor-evaluation-acme-corp.md`)
- Store as `{deliverable_filename}`
- Full path: `{research-root}/{schema_parent_folder}/{topic_folder}/{deliverable_filename}`

### 4. User Communication (Required)

Before spawning the agent, inform the user:

"**Dispatching Research Publisher.** It will transform the verified dossier into a polished, audience-appropriate deliverable. This typically takes 5-10 minutes. I'll report results when it completes."

### 5. Spawn Research Publisher

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Publisher (Briefer) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-publisher.md

PUBLISH PARAMETERS:
- Dossier source: {dossier_path}
- Verification report: {verification_report_path} (or "NOT AVAILABLE — dossier is unverified" if unverified)
- Deliverable output: {research-root}/{schema_parent_folder}/{topic_folder}/{deliverable_filename}
- Subject: {research_subject}

BRAND (output tone and style rules):
{brand YAML content, or "Use default professional-analyst tone: polished and direct, no filler, no grandstanding."}

CHALLENGE VALIDATION (if available):
{If {challenge_report_path} exists: "Adversarial challenge validation was performed. Assessment: {assessment}. See challenge report for details." | else: "No challenge validation performed."}

QI RULES (if loaded):
{qi_rules content, or "No QI rules loaded."}

INTER-AGENT CONTEXT:
- Context file: {pipeline_context_path}
- Read ALL messages from prior agents (Analyst, Auditor, Challenger) before starting
- Apply relevant observations:
  - quality_flag messages should inform emphasis or caveats in the deliverable
  - recommendation messages should be considered during editorial decisions
  - pattern_alert messages about source quality should inform how findings are presented

INSTRUCTIONS:
1. Load the verified dossier completely
2. PROGRESS REPORTING: Output status updates as you work:
   "Transforming dossier into {format} deliverable..."
   "Applying brand tone: {brand_name}..."
   "Writing deliverable..."
3. Transform into audience-appropriate deliverable:
   - Strip validation machinery (confidence scores, source tier labels, appendix detail)
   - Preserve all substance and key findings
   - Apply brand tone rules
   - Structure for readability
3. Include one-line provenance note at the end: verification timestamp and confidence summary
4. If dossier is unverified, include a prominent warning at the top
5. Initialize `derived_artifacts: []` in deliverable frontmatter — this list will be populated as
   derivative documents (vendor catalogs, research targets) are created from this deliverable
6. Include `related: '[[dossier]]'` in deliverable frontmatter to link back to the source dossier
7. Write the deliverable to the output path
8. Return a summary: section count, word count, provenance line
```

### 6. Handle Publisher Response

**On success:**
- Read the deliverable to verify it was written
- Extract summary: section count, word count
- Store deliverable path as `{deliverable_path}`
- Update dossier's `derived_artifacts` frontmatter: append `"[[{deliverable_filename}]]"` to the list in `{dossier_path}`

**On failure or error:**
- Update pipeline log: `stages.publish: FAILED`
- Log the error details in pipeline log
- Present to user:
  "**Publish stage failed.** {error details}

  **Options:**
  **[R] Retry** — Spawn Publisher again
  **[S] Skip** — Proceed to completion without deliverable (dossier is still available)
  **[X] Abort** — End pipeline, preserve pipeline log for resume"
- Wait for user selection and handle accordingly
- If retry: loop back to section 4
- If skip: proceed to section 6 with warning
- If abort: update pipeline log status to ABORTED, then HALT

### 7. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.publish: complete`
- `files.deliverable: '{deliverable_path}'`
- If stage-gated: `gates.publish: '{gate_path}'`

Append to the log body:

```markdown
## Publish Stage

- **Status:** Complete
- **Deliverable:** {deliverable_path}
- **Sections:** {count}
- **Word count:** {approximate}
- **Unverified warning:** {yes/no}
- **Completed:** {current_timestamp}
```

### 8. Route to Comment Review

After publish completes, ALWAYS route to the comment review step before proceeding to whitepaper or completion.

**If autopilot:**

"**Publish complete.** Deliverable written. Proceeding to comment review..."

Immediately load, read entire file, then execute {reviewStepFile}.

**If stage-gated:**

Write gate artifact to `{topic_folder}/gates/gate-{N}-publish-complete.md` where N = 3 + (1 if chain_challenge):

```
---
gate: publish-complete
gate_number: {dynamic: 3 + (1 if chain_challenge)}
pipeline_id: {pipeline_id}
subject: {subject}
status: awaiting_approval
created: {timestamp}
stage: publish
next_stage: comment-review
artifact: {deliverable_path}
---

## Publish Complete — Gate Review

### Summary
{1-2 sentence summary: deliverable format, audience, scope}

### Deliverable Overview
| Metric | Value |
|--------|-------|
| Sections | {count} |
| Word count | ~{approximate} |
| Format | {deliverable type} |

### Artifacts
- **Deliverable:** `{deliverable_path}`
- **Dossier:** `{dossier_path}`
- **Verification Report:** `{verification_report_path}`
{If challenge: "- **Challenge Report:** `{challenge_report_path}`"}

### Recommendation
{Brief note: ready for distribution / review suggested}

---
*Gate artifact generated by research-assistant pipeline. Review offline and resume with [RS].*
```

Present publish results summary:

"Gate artifact written to `{topic_folder}/gates/gate-{N}-publish-complete.md`. You can review offline and resume later with [RS].

**Publish complete. Stage results:**

**Deliverable:** `{deliverable_path}`
**Sections:** {count}
**Word count:** ~{approximate}

Review the deliverable, then select an option.

**[C] Continue** to comment review
**[X] Abort** pipeline"

Wait for user selection.

#### Menu Handling Logic:

- IF C: Confirm pipeline log is updated, then load, read entire file, then execute {reviewStepFile}
- IF X: Update pipeline log status to ABORTED_BY_USER, then HALT
- IF Any other: help user, then redisplay menu

**If partial (and this was a selected stage):**

Present results, then load, read entire file, then execute {reviewStepFile}.

#### Execution Rules:

- ALWAYS halt and wait for user input if stage-gated
- For autopilot: auto-proceed after reporting summary
- NEVER skip pipeline log update regardless of autonomy level

## Quality Criteria

- Dossier existence confirmed; unverified status detected and flagged
- Publisher spawned with complete context including brand, verification status, and inter-agent messages
- Deliverable produced with provenance note and correct frontmatter links
- Dossier's derived_artifacts updated with deliverable reference
- Pipeline log updated with publish metrics
- Always routes to comment review after publish (not directly to completion or whitepaper)
- Error handling presented with retry/skip/abort options if Publisher fails
