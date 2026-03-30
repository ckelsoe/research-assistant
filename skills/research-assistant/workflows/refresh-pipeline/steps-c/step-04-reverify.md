---
name: 'step-04-reverify'
description: 'Spawn Research Auditor to re-verify the patched dossier'
nextStepFile: './step-05-republish.md'
---

# Step 4: Re-verify

## Goal

Spawn the Research Auditor agent via Task tool to re-verify the patched dossier — confirming that patches are accurate, replacement URLs are live, and confidence scores reflect the updated evidence.

## Desired Outcomes

- Patched dossier read with recently modified sections identified
- Research Auditor spawned with complete context and extra attention directed to patched sections
- All URLs re-verified with progress reporting
- Verification report produced at `{refresh_target}/verification-report.md`
- Corrected dossier written with updated confidence scores and replaced references
- Pipeline log updated with re-verification metrics
- Proceeded to re-publish step

## Instructions

### 1. Prepare Verification Context

Read the patched dossier at `{refresh_dossier_path}`.

Note which sections were modified during triage so the Auditor can focus extra attention there.

### 2. Spawn Research Auditor

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Auditor (Overwatch) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-auditor.md

VERIFICATION PARAMETERS:
- Dossier to verify: {refresh_dossier_path}
- Verification report output: {refresh_target}/verification-report.md
- Primary verification tool: {detected_tools}
- Context: This is a RE-VERIFICATION after a refresh pipeline patched the dossier

SECTIONS RECENTLY PATCHED (focus extra attention here):
{list of patched sections/categories}

DOSSIER CONTENT:
{full patched dossier content}

INSTRUCTIONS:
1. Load the dossier completely
2. Extract all cited URLs
3. Report progress: "Re-verifying URL N of M..."
4. For each URL: check liveness, detect soft 404s, verify content matches the specific claim
5. Pay EXTRA attention to recently patched sections — these are the most likely to have issues
6. Downgrade confidence scores where evidence is insufficient
7. Attempt to find replacement URLs for any dead references
8. Produce a verification report with:
   - Total URLs checked
   - Pass/fail per URL
   - Confidence adjustments made
   - Replaced references
   - Overall pass rate
9. Write the corrected dossier to the same path
10. Write the verification report to the specified output path
```

### 3. Handle Verification Results

**If verification succeeds:**

- Read the verification report from `{refresh_target}/verification-report.md`
- Store verification summary as `{verification_summary}`

**If verification fails:**

Display: "**Auditor verification failed.** Error: {error_details}\nOptions:\n- **R** — Retry verification\n- **S** — Skip verification and proceed with unverified dossier\n- **X** — Abort refresh pipeline"

Wait for user input.

### 4. Report Verification Results

Display:

"**Re-verification complete for: {refresh_subject}**

**URLs checked:** {total_urls}
**Pass rate:** {pass_rate}%
**Confidence adjustments:** {adjustment_count}
**References replaced:** {replacement_count}

**Verification report:** `{refresh_target}/verification-report.md`

**Proceeding to re-publish...**"

### 5. Update Pipeline Log

Update pipeline log with:

- reverification_date: current date
- reverification_status: pass/fail
- urls_checked: {count}
- pass_rate: {percentage}
- confidence_adjustments: {count}

### 6. Proceed to Re-publish

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Auditor spawned with complete patched dossier context
- Recently patched sections explicitly highlighted for extra scrutiny
- All URLs re-verified with progress reporting
- Verification report produced with per-URL pass/fail results
- Corrected dossier written with updated confidence scores
- Pipeline log updated with re-verification metrics before proceeding
- Error handling presented with retry/skip/abort options if Auditor fails
