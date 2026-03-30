---
name: 'step-04-verify'
description: 'Spawn Research Auditor via Task tool to adversarially verify dossier'
nextStepFile: './step-05-publish.md'
challengeStepFile: './step-04b-challenge.md'
completeStepFile: './step-06-complete.md'
---

# Step 4: Verification Audit

## Goal

Spawn the Research Auditor agent via Task tool to adversarially verify every cited URL and claim in the dossier, produce a verification report, and auto-fix the dossier where possible. Then route based on autonomy level.

## Desired Outcomes

- Dossier existence verified before spawning Auditor
- Research Auditor spawned with complete context (dossier path, tool directive, brand, inter-agent context)
- All cited URLs fetched and verified for liveness and content-claim alignment
- Ownership and relationship claims verified against authoritative sources
- Verification report produced at `{topic_folder}/verification-report.md`
- Dossier auto-fixed with corrected confidence scores, replaced URLs, and removed unsupported claims
- Pipeline log updated with verification stage results
- Correct routing based on autonomy level and chain_challenge flag

## Instructions

### 1. Pre-Flight Check

Verify the dossier exists at `{dossier_path}`.

**If dossier does not exist:**
"**No dossier found at expected path.** The research stage may have failed or been skipped.

**[R] Run research first** — go back to step 3
**[S] Skip verification** — proceed to publish (not recommended)
**[X] Abort** — end pipeline"

Wait for user selection and handle accordingly.

### 2. Announce Verification Stage

**If autopilot:**
"**Stage 2/{total_stages}: Verification Audit** — Dispatching Research Auditor..."

**If stage-gated:**
"**Stage 2/{total_stages}: Verification Audit** — Dispatching Research Auditor. Will present results for your review when complete."

### 3. User Communication (Required)

Before spawning the agent, inform the user:

"**Dispatching Research Auditor.** It will verify all cited URLs in the dossier, check content-claim alignment, verify ownership/relationship claims, and audit for vendor bias. URL verification of {url_count} sources typically takes 10-20 minutes. I'll report results when it completes."

### 4. Spawn Research Auditor

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Auditor (Overwatch) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-auditor.md

VERIFICATION PARAMETERS:
- Dossier to verify: {dossier_path}
- Verification report output: {research-root}/{schema_parent_folder}/{topic_folder}/verification-report.md
- Primary verification tool: {detected_tools}

BRAND (output tone rules):
{brand YAML content, or "Use default: dry, clipped, skeptical. States findings as verdicts."}

QI RULES (if loaded):
{qi_rules content, or "No QI rules loaded."}

INTER-AGENT CONTEXT:
- Context file: {pipeline_context_path}
- Read ALL messages from prior agents before starting — pay special attention to:
  - heads_up messages about unreliable sources (apply extra scrutiny)
  - quality_flag messages about weak source categories (prioritize verification)
  - pattern_alert messages about potential issues
- During verification, write observations for downstream agents (Challenger, Publisher):
  - Sources that failed verification in clusters (type: pattern_alert)
  - Categories with high confidence adjustment rates (type: quality_flag)
  - Recommendations for publisher emphasis or caveats (type: recommendation)

INSTRUCTIONS:
1. Load the dossier completely
2. Extract all cited URLs and count them
3. PROGRESS REPORTING: Before verifying each URL, output a status line:
   "Verifying URL N of M: {url_domain}..."
4. For EVERY cited URL: fetch it, verify the page is live (not soft 404), verify content matches the specific claim
5. Downgrade confidence scores where evidence doesn't support the assigned level
6. Replace dead references with working alternatives where possible, or mark for removal
7. Verify ALL ownership and relationship claims:
   - Corporate ownership ("X is owned by Y", "X is a subsidiary of Y")
   - Acquisitions ("X acquired Y in [year]")
   - Integrations ("X integrates with Y", "X is part of the Y platform")
   - Partnerships ("X partnered with Y")
   For each: search for press releases, SEC filings, or authoritative news sources.
   Report in a "Relationship Claims" section: claim as stated, result (CONFIRMED/UNCONFIRMED/INCORRECT), source.
   INCORRECT claims are factual errors — correct them in the dossier.
   UNCONFIRMED claims get downgraded to LOW confidence.
8. Produce two outputs:
   a. Verification report at the report output path — documenting every check, its result, and any fixes applied
   b. Auto-fixed dossier — overwrite the original dossier with corrected confidence scores, replaced URLs, and removed unsupported claims
9. Return a summary: URLs checked, pass/fail counts, confidence adjustments made, claims removed, relationship claims verified

CHECKPOINT PROTOCOL:
1. Before starting, check if verification-report.md already exists at the output path
2. If it exists and has a verification_checkpoint in frontmatter with urls_remaining,
   resume verification from the first remaining URL — do NOT re-verify completed URLs
3. After verifying each URL, append the result to the report immediately and update
   the verification_checkpoint frontmatter:
   - urls_verified: {count}
   - urls_remaining: {count}
   - last_checkpoint: {timestamp}
4. On final URL verification, remove verification_checkpoint from frontmatter
```

### 5. Handle Auditor Response

**On success:**
- Read the verification report to verify it was written
- Extract summary metrics: URLs checked, pass rate, confidence adjustments, claims removed
- Store verification report path as `{verification_report_path}`

**On failure or error:**
- Update pipeline log: `stages.verify: FAILED`
- Log the error details in pipeline log
- Present to user:
  "**Verification stage failed.** {error details}

  **Options:**
  **[R] Retry** — Spawn Auditor again
  **[S] Skip** — Proceed to publish with unverified dossier (adds warning to deliverable)
  **[X] Abort** — End pipeline, preserve pipeline log for resume"
- Wait for user selection and handle accordingly
- If retry: loop back to section 3
- If skip: proceed to section 5 with unverified flag
- If abort: update pipeline log status to ABORTED, then HALT

### 6. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.verify.status: complete`
- `stages.verify.urls_checked: {count}`
- `stages.verify.pass_rate: {percentage}`
- `stages.verify.last_checkpoint: {current_timestamp}`
- `files.verification_report: '{verification_report_path}'`
- If stage-gated: `gates.verify: '{gate_path}'`

Append to the log body:

```markdown
## Verification Stage

- **Status:** Complete
- **Report:** {verification_report_path}
- **URLs checked:** {count}
- **Pass rate:** {percentage}
- **Confidence adjustments:** {count}
- **Claims removed:** {count}
- **Completed:** {current_timestamp}
```

### 7. Route Based on Autonomy Level

**Determine effective next step:**
- If `{chain_challenge}` is true: set `{effective_next_step}` to `{challengeStepFile}` (step-04b-challenge.md)
- Otherwise: set `{effective_next_step}` to `{nextStepFile}` (step-05-publish.md)

**If autopilot:**

"**Verification complete.** {pass_rate}% pass rate, {adjustments} confidence adjustments. {If chain_challenge: 'Proceeding to challenge...' | else: 'Proceeding to publish...'}"

Immediately load, read entire file, then execute {effective_next_step}.

**If stage-gated:**

Write gate artifact to `{topic_folder}/gates/gate-02-verification-complete.md` with:

```
---
gate: verification-complete
gate_number: 2
pipeline_id: {pipeline_id}
subject: {subject}
status: awaiting_approval
created: {timestamp}
stage: verify
next_stage: {challenge | publish}
artifact: {verification_report_path}
---

## Verification Complete — Gate Review

### Summary
{1-2 sentence summary: what was verified, overall pass rate}

### Verification Results
| Metric | Value |
|--------|-------|
| URLs checked | {count} |
| Pass rate | {percentage}% |
| Confidence adjustments | {count} |
| Claims removed | {count} |

### Confidence Changes
{List any categories where confidence was downgraded, with reason}

### Flagged Items
{Sources that failed verification, dead links, claims that were removed}
{If none: "All claims verified successfully."}

### Artifacts
- **Verification Report:** `{verification_report_path}`
- **Dossier:** `{dossier_path}`

### Recommendation
{Brief recommendation based on pass rate and adjustment count}

---
*Gate artifact generated by research-assistant pipeline. Review offline and resume with [RS].*
```

Present verification results summary:

"Gate artifact written to `{topic_folder}/gates/gate-02-verification-complete.md`. You can review offline and resume later with [RS].

**Verification complete. Stage results:**

**Report:** `{verification_report_path}`
**URLs checked:** {count}
**Pass rate:** {percentage}
**Confidence adjustments:** {count}
**Claims removed:** {count}

Review the verification report, then select an option.

**[C] Continue** to {If chain_challenge: 'challenge' | else: 'publish'}
**[X] Abort** pipeline"

Wait for user selection.

#### Menu Handling Logic:

- IF C: Confirm pipeline log is updated, then load, read entire file, then execute {effective_next_step}
- IF X: Update pipeline log status to ABORTED_BY_USER, then HALT
- IF Any other: help user, then redisplay menu

**If partial (and this was a selected stage):**

Present results, then check if more partial stages remain:
- If challenge is in {partial_stages}: load step-04b-challenge.md
- Else if publish is in {partial_stages}: load {nextStepFile}
- Else if whitepaper is in {partial_stages}: load step-05b-whitepaper.md
- If this was the last selected stage: load, read entire file, then execute {completeStepFile}

#### Execution Rules:

- ALWAYS halt and wait for user input if stage-gated or partial
- For autopilot: auto-proceed after reporting summary
- NEVER skip pipeline log update regardless of autonomy level

## Quality Criteria

- Dossier existence confirmed before spawning Auditor
- Auditor spawned with complete context including inter-agent messages from prior stages
- Verification report produced with per-URL results and relationship claim verification
- Dossier auto-fixed with corrected confidence scores and replaced/removed references
- Pipeline log updated with verification metrics
- Correct routing: chain_challenge flag determines next step (challenge vs publish)
- Error handling presented with retry/skip/abort options if Auditor fails
