---
name: 'step-01-select'
description: 'Scan for existing research dossiers and let user select target for refresh'
nextStepFile: './step-02-scan.md'
---

# Step 1: Select Refresh Target

## Goal

Scan all existing research dossiers, display their staleness status, and let the user select which dossier to refresh.

## Desired Outcomes

- All dossiers under `{research-root}` discovered recursively
- Staleness calculated for each dossier (Current/Aging/Stale/Critical)
- Formatted table presented to user sorted by staleness (most stale first)
- User selected a valid target (single dossier or batch)
- Session variables stored for next step (`{refresh_target}`, `{refresh_subject}`, etc.)
- Auto-proceeded to scan step

## Instructions

### 1. Discover Existing Dossiers

Scan `{research-root}` recursively for `pipeline-log.md` files.

For each pipeline log found:

- Read frontmatter to extract: subject, schema, last_verified_date, status
- Calculate days since last verification
- Classify staleness:
  - **Current** (0-30 days) — green
  - **Aging** (31-60 days) — yellow
  - **Stale** (61-90 days) — orange
  - **Critical** (90+ days) — red

**If no dossiers found:**
Display: "**No research dossiers found under `{research-root}`.**\nRun [NR] New Research first to create research artifacts."
Then HALT.

### 2. Present Dossier List

Display all discovered dossiers in a formatted table:

"**Available Research Dossiers:**

| # | Subject | Schema | Last Verified | Staleness | Status |
|---|---------|--------|---------------|-----------|--------|
| 1 | {subject} | {schema} | {date} | {days}d ({classification}) | {status} |
..."

Sort by staleness (most stale first).

### 3. User Selection

Ask user to select which dossier to refresh by number, or offer:

- **A** — Refresh all stale dossiers (aging or worse) sequentially
- **Number** — Refresh a specific dossier

Wait for user input.

### 4. Store Selection

Store selected dossier(s) as session variables:

- `{refresh_target}` — path to the selected dossier folder
- `{refresh_subject}` — research subject name
- `{refresh_schema}` — schema used
- `{refresh_dossier_path}` — full path to dossier.md
- `{refresh_mode}` — "single" or "batch"

### 5. Proceed to Scan

Display: "**Target selected: {refresh_subject}**\nProceeding to staleness scan..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- All subdirectories under {research-root} scanned for pipeline logs
- Staleness calculated accurately from last_verified_date
- Table sorted by staleness with clear classification labels
- User selection validated before storing session variables
- Session variables fully populated before proceeding to next step
