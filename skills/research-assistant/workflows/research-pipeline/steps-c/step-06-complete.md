---
name: 'step-06-complete'
description: 'Finalize pipeline log and report results to user'
---

# Step 6: Pipeline Complete

## Goal

Update the pipeline log with final completion status, present the user with a clear summary of all produced artifacts and their locations, and clean up intermediary artifacts.

## Desired Outcomes

- Pipeline log updated with COMPLETE status, timestamp, and derivative_artifacts list
- Post-Pipeline Amendments table initialized in pipeline log
- All produced artifact paths reported clearly to user
- Skipped/failed stages noted
- Output folder path provided
- Post-pipeline work instructions presented
- Intermediary artifacts cleaned up
- Workflow ends cleanly (no further steps loaded)

## Instructions

### 1. Finalize Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `status: COMPLETE`
- `completed: '{current_date}'`

Update frontmatter — add derivative artifacts list:
- `derivative_artifacts: []` (empty list — will be populated by post-pipeline work)

Append to the log body:

```markdown
## Pipeline Complete

- **Status:** COMPLETE
- **Completed:** {current_timestamp}
- **Autonomy mode:** {autonomy_level}
- **Total stages run:** {count of completed stages}

## Post-Pipeline Amendments

| Date | File Modified | Change | Reason |
|------|--------------|--------|--------|
| *(none yet)* | | | |

*Any modifications to research artifacts after pipeline completion should be logged here. When creating derivative documents (vendor catalogs, additional whitepapers, research targets), add the filename to the `derivative_artifacts` list in frontmatter and log the creation below.*
```

### 2. Present Final Report

"**Pipeline complete.**

**Subject:** {research_subject}
**Schema:** {selected_schema}
**Domains:** {selected_domains}

---

**Artifacts produced:**"

For each completed stage, list the output file:

"- **Dossier:** `{dossier_path}`" (if research stage completed)
"- **Verification Report:** `{verification_report_path}`" (if verify stage completed)
"- **Challenge Report:** `{challenge_report_path}`" (if challenge stage completed)
"- **Deliverable:** `{deliverable_path}`" (if publish stage completed)
"- **Whitepaper:** `{whitepaper_path}`" (if whitepaper stage completed)
"- **Research Targets:** `{research_targets_path}`" (if targets were identified)
"- **Pipeline Log:** `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`"

If any stages were skipped or failed, note them:
"**Skipped/Failed:** {list stages with status}"

"---

**Output folder:** `{research-root}/{schema_parent_folder}/{topic_folder}/`

**Post-pipeline work:** When creating derivative documents (vendor catalogs, whitepapers, research targets) after pipeline completion:
1. Log the creation in the pipeline log's Post-Pipeline Amendments table
2. Add the filename to the pipeline log's `derivative_artifacts` frontmatter list
3. Update the parent document's `derived_artifacts` frontmatter — append `\"[[new-filename]]\"` to the dossier and/or deliverable that the new document derives from
4. Include `related: '[[parent-filename]]'` in the new document's frontmatter

This maintains bidirectional navigability: parent documents list children via `derived_artifacts`, children link back via `related`."

### 3. Post-Pipeline Cleanup

After pipeline completes successfully, remove intermediary artifacts:
1. Delete `{topic_folder}/pipeline-context.yaml`
2. Delete `{topic_folder}/gates/` directory
3. Remove checkpoint frontmatter keys from dossier (`research_checkpoint`) and verification report (`verification_checkpoint`)
4. Log in pipeline log: "Post-pipeline cleanup: removed intermediary artifacts"

Never delete: pipeline log, final dossier, verification report, deliverable, or derivative artifacts.

### 4. End Pipeline

This is the final step. No next step to load. The workflow is complete.

## Quality Criteria

- Pipeline log updated with COMPLETE status and completion timestamp
- All produced artifact paths reported clearly
- Skipped/failed stages explicitly noted
- Post-Pipeline Amendments table initialized for future use
- Intermediary artifacts cleaned up (pipeline-context.yaml, gates/, checkpoint frontmatter)
- Final artifacts preserved (pipeline log, dossier, verification report, deliverable, derivatives)
- Workflow ends cleanly without attempting to load another step
