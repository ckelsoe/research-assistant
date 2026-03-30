---
name: 'step-01-execute'
description: 'Scan research artifacts under research-root and display status table'
---

# Step 1: List Research Artifacts

## Goal

Scan all research topic folders under `{research-root}`, read pipeline log frontmatter from each, calculate staleness, and present a formatted status table.

## Desired Outcomes

- Research root validated
- All pipeline logs discovered via Glob
- Frontmatter parsed correctly from each pipeline log
- Staleness calculated accurately
- Filters applied when requested
- Status table displayed with all columns
- Summary counts accurate

## Instructions

### 1. Validate Research Root

Verify that `{research-root}` exists and is accessible.

**If `{research-root}` does not exist or is empty:**

"**No research root found at `{research-root}`.**

Either no research has been conducted yet, or the module config needs to be checked."

HALT -- workflow complete.

### 2. Optional Filters

"**Research Artifacts Status**

Would you like to apply any filters?

**[L] List all** -- Show all artifacts (default)
**[S] Stale only** -- Show only stale artifacts
**[F] Filter by schema** -- Show only a specific schema type

Select: [L] / [S] / [F] (default: L)"

Wait for user selection.

- **If L or Enter:** No filter applied. Proceed.
- **If S:** Set `{filter_stale_only}` = true. Proceed.
- **If F:** Ask "Which schema type?" -- wait for input, store as `{filter_schema}`. Proceed.

### 3. Scan for Pipeline Logs

Use Glob to find all pipeline log files under `{research-root}`:

- Pattern: `**/pipeline-log.md`
- Search root: `{research-root}`

Store the list of found paths as `{pipeline_log_paths}`.

**If no pipeline logs found:**

"**No research artifacts found under `{research-root}`.**

Run **[NR] New Research** from the Research Director to create your first research pipeline."

HALT -- workflow complete.

### 4. Parse Pipeline Logs

For each path in `{pipeline_log_paths}`:

1. Read the file
2. Extract frontmatter fields:
   - `subject` -- research subject name
   - `schema` -- schema used
   - `status` -- pipeline status (IN_PROGRESS, COMPLETE, ABORTED, etc.)
   - `created` -- pipeline creation date
   - `completed` -- completion date (if present)
   - `stages.research` -- research stage status
   - `stages.verify` -- verification stage status
   - `stages.publish` -- publish stage status
   - `files.dossier` -- dossier file path (if present)
   - `files.verification_report` -- verification report path (if present)
   - `files.deliverable` -- deliverable path (if present)
3. Calculate staleness:
   - Use `completed` date if available, otherwise `created` date
   - Compare against current date
   - **Stale thresholds:**
     - < 7 days: FRESH
     - 7-30 days: AGING
     - 30-90 days: STALE
     - > 90 days: VERY STALE
   - If no date available: UNKNOWN
4. Determine confidence indicator:
   - If `stages.verify` is "complete": VERIFIED
   - If `stages.verify` is "pending" and `stages.research` is "complete": UNVERIFIED
   - If `stages.research` is not "complete": INCOMPLETE
5. Store parsed data for display

**If a pipeline log has malformed frontmatter:**
- Log a warning: "Warning: Could not parse `{path}` -- skipping"
- Continue scanning remaining files

### 5. Apply Filters

**If `{filter_stale_only}` is true:**
- Remove all entries where staleness is FRESH or AGING

**If `{filter_schema}` is set:**
- Remove all entries where schema does not match `{filter_schema}` (case-insensitive)

**If filtered results are empty:**
"**No artifacts match your filter criteria.**"
HALT -- workflow complete.

### 6. Display Status Table

Sort results by staleness (most stale first), then by subject name.

Present the formatted table:

"**Research Artifacts -- {count} found{filter description if filtered}**

| Subject | Schema | Status | Last Updated | Staleness | Confidence |
|---------|--------|--------|--------------|-----------|------------|
| {subject} | {schema} | {status} | {date} | {staleness} | {confidence} |
| ... | ... | ... | ... | ... | ... |

**Legend:**
- **Staleness:** FRESH (<7d) . AGING (7-30d) . STALE (30-90d) . VERY STALE (>90d)
- **Confidence:** VERIFIED (audited) . UNVERIFIED (research only) . INCOMPLETE (pipeline not finished)

**Summary:** {fresh_count} fresh . {aging_count} aging . {stale_count} stale . {very_stale_count} very stale"

### 7. End

This is the final step. Workflow is complete.

## Quality Criteria

- Research root validated before scanning
- All pipeline logs under {research-root} discovered via Glob
- Frontmatter parsed correctly; malformed entries skipped with warning (not fatal)
- Staleness calculated accurately against current date
- Filters applied correctly when requested
- Table displayed with all columns sorted by staleness
- Empty state handled cleanly
- Summary counts accurate
- This is a read-only utility -- no files modified
