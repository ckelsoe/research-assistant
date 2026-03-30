---
name: 'step-06-complete'
description: 'Finalize refresh pipeline — update logs, report results, present summary'
---

# Step 6: Complete

## Goal

Finalize the refresh pipeline — update all logs with final status, present a comprehensive summary of what was refreshed, and report the outcome.

## Desired Outcomes

- Pipeline log finalized with complete status and all metrics
- Comprehensive summary displayed covering scan, triage, re-verification, and re-publication
- Next steps suggested (view deliverable, check staleness, etc.)
- Workflow ends cleanly

## Instructions

### 1. Read Pipeline Log

Read the pipeline log at `{refresh_target}/pipeline-log.md`.

### 2. Finalize Pipeline Log

Update the pipeline log with final status:

- refresh_status: complete
- refresh_completed: current date and time
- total_changes_found: {count}
- auto_patches_applied: {count}
- user_escalations: {count}
- reverification_pass_rate: {percentage}
- deliverable_updated: true/false

### 3. Present Refresh Summary

Display comprehensive summary:

"**Refresh pipeline complete: {refresh_subject}**

---

**Scan Results:**
- URLs scanned: {total_urls}
- Changes detected: {total_changes}

**Triage Actions:**
- Auto-patched (cosmetic): {count}
- Auto-patched (minor): {count}
- User decisions (material): {count}
- User decisions (entity events): {count}

**Re-verification:**
- URLs re-verified: {reverify_count}
- Pass rate: {pass_rate}%
- Confidence adjustments: {adjustment_count}

**Deliverable:**
- Updated: {yes/no}
- Path: `{deliverable_path}`

---

**Output folder:** `{refresh_target}/`

**What's next:**
- View the updated deliverable at the path above
- Run `[LR]` List Research to see updated staleness status
- The dossier's verification timestamp has been updated"

### 4. Workflow Complete

This is the final step. No next step to load. The workflow is complete.

## Quality Criteria

- Pipeline log finalized with complete status and all accumulated metrics
- Summary covers all pipeline phases: scan results, triage actions, re-verification, re-publication
- All counts accurate and consistent with pipeline log data
- Next steps presented clearly
- No further steps loaded after completion
