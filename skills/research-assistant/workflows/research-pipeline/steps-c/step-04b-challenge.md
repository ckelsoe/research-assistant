---
name: 'step-04b-challenge'
description: 'Spawn Research Challenger via Task tool for adversarial reasoning validation of dossier'
nextStepFile: './step-05-publish.md'
completeStepFile: './step-06-complete.md'
---

# Step 4b: Challenge

## Goal

Spawn the Research Challenger agent via Task tool to perform adversarial reasoning validation on the dossier — challenging assumptions, identifying gaps, checking for biases — and handle the resulting challenge report. If critical findings emerge, offer the option to patch the dossier before publishing.

## Desired Outcomes

- Dossier existence verified before spawning Challenger
- Research Challenger spawned with complete context (dossier content, verification summary, inter-agent context)
- Challenge report produced with overall assessment (ROBUST/ADEQUATE/NEEDS WORK/UNRELIABLE)
- Findings classified by severity (Critical/Significant/Minor) across reasoning, gaps, and biases
- Patch option offered and executed if critical findings exist
- Pipeline log updated with challenge stage results
- Correct routing based on autonomy level

## Instructions

### 1. Pre-Flight Check

Verify the dossier exists at `{dossier_path}`.

**If dossier does not exist:**
"**No dossier found.** Cannot challenge without research output.

**[X] Abort** — end pipeline"

Wait for user selection. Update pipeline log and HALT.

### 2. Announce Challenge Stage

**If autopilot:**
"**Stage 3/{total_stages}: Challenge** — Dispatching Research Challenger..."

**If stage-gated:**
"**Stage 3/{total_stages}: Challenge** — Dispatching Research Challenger. Will present results for your review when complete."

### 3. User Communication (Required)

Before spawning the agent, inform the user:

"**Dispatching Research Challenger.** It will adversarially challenge the reasoning, assumptions, and conclusions in the verified dossier. This typically takes 5-15 minutes. I'll report results when it completes."

### 4. Spawn Research Challenger

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Challenger (Advocate) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-challenger.md

CHALLENGE PARAMETERS:
- Dossier to challenge: {dossier_path}
- Challenge report output: {research-root}/{schema_parent_folder}/{topic_folder}/challenge-report.md
- Subject: {research_subject}

DOSSIER CONTENT:
{Read and include the full dossier content here}

VERIFICATION REPORT SUMMARY (context on source reliability):
{Read and include a summary of the verification report, or "Not available — verification was skipped"}

QI RULES (if loaded):
{qi_rules content, or "No QI rules loaded."}

INTER-AGENT CONTEXT:
- Context file: {pipeline_context_path}
- Read ALL messages from prior agents (Analyst, Auditor) before starting — leverage:
  - pattern_alert messages about source clusters or verification patterns
  - quality_flag messages about weak categories to focus challenge effort
  - Any recommendations from prior agents
- During challenge, write observations for the Publisher:
  - Critical findings that should be reflected in the deliverable (type: quality_flag)
  - Recommendations on framing or caveats (type: recommendation)

INSTRUCTIONS:
1. Analyze every reasoning chain in the dossier — trace evidence to claims to conclusions
2. PROGRESS REPORTING: Output status as you work:
   "Analyzing reasoning chains..."
   "Checking for coverage gaps..."
   "Running bias detection..."
3. For reasoning analysis: identify inferential leaps, unsupported conclusions, circular reasoning, correlation-causation errors, overgeneralization
4. For gap analysis: identify missing perspectives, unasked questions, thin coverage areas, asymmetries in positive vs negative coverage
5. For bias check: systematically check for confirmation bias, selection bias, recency bias, authority bias, survivorship bias
6. Classify each finding by severity: Critical / Significant / Minor
7. Produce the challenge report at the output path with:
   - Frontmatter: type, subject, dossier path, date, counts, overall_assessment
   - Overall assessment: ROBUST / ADEQUATE / NEEDS WORK / UNRELIABLE
   - Reasoning challenges organized by severity
   - Coverage gaps organized by type
   - Bias findings with evidence and mitigation
   - Prioritized recommendations: Must Address / Should Address / Consider
   - Methodology note
8. Return a summary: overall assessment, reasoning challenge count by severity, gap count, bias count
```

### 5. Handle Challenger Response

**On success:**
- Read the challenge report to verify it was written
- Extract summary metrics: overall assessment, challenge counts (critical/significant/minor), gap count, bias count
- Store challenge report path as `{challenge_report_path}`

**On failure or error:**
- Update pipeline log: `stages.challenge: FAILED`
- Log the error details in pipeline log
- Present to user:
  "**Challenge stage failed.** {error details}

  **Options:**
  **[R] Retry** — Spawn Challenger again
  **[S] Skip** — Proceed to publish without challenge validation
  **[X] Abort** — End pipeline, preserve pipeline log for resume"
- Wait for user selection and handle accordingly
- If retry: loop back to section 3
- If skip: proceed to section 6 with note that challenge was skipped
- If abort: update pipeline log status to ABORTED, then HALT

### 6. Evaluate Findings Severity

**If overall assessment is NEEDS WORK or UNRELIABLE and critical findings > 0:**

"**Challenge found critical issues:**

**Overall Assessment:** {assessment}
**Critical findings:** {count}
**Key issues:**
{list top 2-3 critical findings}

The Challenger recommends addressing these before publishing.

**[C] Continue** — Proceed to publish as-is (challenge report available alongside deliverable)
**[P] Patch** — Spawn Research Analyst to address critical findings in the dossier, then publish
**[X] Abort** — End pipeline"

Wait for user selection.

**If Patch selected:**

Spawn Analyst via Task tool with targeted patch instructions:

```
You are the Research Analyst (Fieldwork) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-analyst.md

PATCH PARAMETERS:
- Dossier to patch: {dossier_path}
- Primary research tool: {detected_tools}
- Subject: {research_subject}

CRITICAL FINDINGS TO ADDRESS:
{List all critical findings from the challenge report}

INSTRUCTIONS:
1. Read the existing dossier completely
2. For each critical finding: research additional evidence, fill gaps, or strengthen reasoning
3. PROGRESS REPORTING: "Patching finding N of M: {finding_summary}..."
4. Update the dossier in place — do not create a new file
5. Add a "Patch Notes" section at the end documenting what was changed and why
6. Return a summary: findings addressed, new sources added, sections modified
```

After patch completes:
- Note dossier was patched in session context
- "**Dossier patched.** {findings_addressed} critical findings addressed. Continuing to publish..."

**If overall assessment is ROBUST or ADEQUATE (or no critical findings):**

Report findings summary and proceed directly to section 7.

### 7. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.challenge.status: complete`
- `stages.challenge.assessment: '{assessment}'`
- `stages.challenge.challenges: {count}`
- `stages.challenge.gaps: {count}`
- `stages.challenge.biases: {count}`
- `stages.challenge.patched: {true/false}`
- `files.challenge_report: '{challenge_report_path}'`
- If stage-gated: `gates.challenge: '{gate_path}'`

Append to the log body:

```markdown
## Challenge Stage

- **Status:** Complete
- **Report:** {challenge_report_path}
- **Overall Assessment:** {assessment}
- **Reasoning challenges:** {count} ({critical} critical, {significant} significant, {minor} minor)
- **Coverage gaps:** {count}
- **Biases detected:** {count}
- **Dossier patched:** {yes/no}
- **Completed:** {current_timestamp}
```

### 8. Route Based on Autonomy Level

**If autopilot:**

"**Challenge complete.** Assessment: {assessment}. Proceeding to publish..."

Immediately load, read entire file, then execute {nextStepFile}.

**If stage-gated:**

Write gate artifact to `{topic_folder}/gates/gate-03-challenge-complete.md` (gate_number is dynamic based on pipeline position) with:

```
---
gate: challenge-complete
gate_number: 3
pipeline_id: {pipeline_id}
subject: {subject}
status: awaiting_approval
created: {timestamp}
stage: challenge
next_stage: publish
artifact: {challenge_report_path}
---

## Challenge Complete — Gate Review

### Summary
{1-2 sentence summary: overall assessment, severity}

### Challenge Results
| Metric | Value |
|--------|-------|
| Overall assessment | {ROBUST/ADEQUATE/NEEDS WORK/UNRELIABLE} |
| Reasoning challenges | {count} |
| Gap findings | {count} |
| Bias findings | {count} |
| Dossier patched | {yes/no} |

### Critical Findings
{List critical findings that the Challenger flagged}
{If none: "No critical findings."}

### Artifacts
- **Challenge Report:** `{challenge_report_path}`
- **Dossier:** `{dossier_path}` {(patched) if applicable}

### Recommendation
{Based on assessment: safe to publish / review recommended / concerns noted}

---
*Gate artifact generated by research-assistant pipeline. Review offline and resume with [RS].*
```

Present challenge results summary:

"Gate artifact written to `{topic_folder}/gates/gate-03-challenge-complete.md`. You can review offline and resume later with [RS].

**Challenge complete. Stage results:**

**Report:** `{challenge_report_path}`
**Overall Assessment:** {assessment}
**Findings:** {challenges} reasoning, {gaps} gaps, {biases} biases
**Dossier patched:** {yes/no}

Review the challenge report, then select an option.

**[C] Continue** to publish
**[X] Abort** pipeline"

Wait for user selection.

#### Menu Handling Logic:

- IF C: Confirm pipeline log is updated, then load, read entire file, then execute {nextStepFile}
- IF X: Update pipeline log status to ABORTED_BY_USER, then HALT
- IF Any other: help user, then redisplay menu

**If partial (and this was a selected stage):**

Present results, then check if more partial stages remain:
- If publish also selected in {partial_stages}: load {nextStepFile}
- If whitepaper in {partial_stages} (but not publish): load ./step-05b-whitepaper.md
- If this was the last selected stage: load, read entire file, then execute {completeStepFile}

#### Execution Rules:

- ALWAYS halt and wait for user input if stage-gated or partial
- For autopilot: auto-proceed after reporting summary (skip severity evaluation menu if ROBUST/ADEQUATE)
- NEVER skip pipeline log update regardless of autonomy level

## Quality Criteria

- Dossier existence confirmed before spawning Challenger
- Challenger spawned with dossier content, verification summary, and inter-agent context
- Challenge report produced with overall assessment and findings classified by severity
- Patch option offered when critical findings exist in NEEDS WORK/UNRELIABLE assessments
- If patch selected, Analyst re-spawned with targeted instructions for critical findings only
- Pipeline log updated with challenge metrics including patch status
- Correct routing based on autonomy level
