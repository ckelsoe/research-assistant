---
name: 'step-03-import'
description: 'Import validated assets -- handle conflicts, copy files, report results'
selectSourceStepFile: './step-02-select-source.md'
---

# Step 3: Import

## Goal

Import validated assets into the appropriate directories, handling naming conflicts and adding import changelog entries.

## Desired Outcomes

- Each asset's target path determined correctly by type
- Conflicts detected and user prompted for resolution
- Overwrite only with explicit user confirmation
- Changelog entry added to each imported asset
- Files written to correct directories
- Results reported with accurate status

## Instructions

### 1. Process Each Asset

For each asset in `{validated_assets}`:

#### a. Determine Target Path

- If type is `schema`: target = `{schemas_dir}/{name}.schema.yaml`
- If type is `domain`: target = `{domains_dir}/{name}.domain.yaml`

#### b. Check for Naming Conflicts

Check if a file already exists at the target path.

**If conflict exists:**

"**Conflict:** `{name}` already exists as a {type}.

**[O] Overwrite** -- replace the existing file
**[R] Rename** -- choose a different name
**[S] Skip** -- do not import this asset

Select: [O] / [R] / [S]"

Wait for user selection.

- **[O] Overwrite:** Proceed with import, replacing existing file.
- **[R] Rename:** Ask for new name. Update the `name` field in the YAML content (and `domain.name` for domains). Recheck for conflicts with new name. Re-validate the name is kebab-case.
- **[S] Skip:** Mark asset as skipped, continue to next asset.

**If no conflict:** Proceed to import.

#### c. Add Import Changelog Entry

Before writing, add a changelog entry to the asset YAML:

**For schemas:**
- If `changelog` exists: append `{version: current, date: today, summary: "Imported from {source_description}"}`
- If `changelog` does not exist: add `changelog: [{version: current, date: today, summary: "Imported from {source_description}"}]`

**For domains:**
- If `domain.changelog` exists: append entry
- If `domain.changelog` does not exist: add it
- Update `domain.updated` to today's date

#### d. Write File

Write the asset YAML to the target path. Create the directory if it does not exist.

### 2. Report Results

"**Import complete.**

| Asset | Type | Status | Path |
|-------|------|--------|------|
| {name} | {type} | {Imported/Overwritten/Renamed/Skipped} | {path or '-'} |

**Summary:** {imported_count} imported, {skipped_count} skipped"

### 3. Continue or Exit

"**[I] Import more** -- select another source
**[Q] Quit** -- exit import workflow

Select: [I] / [Q]"

Wait for user selection.

- **[I] Import more:** Load, read entire file, then execute {selectSourceStepFile} to select another source.
- **[Q] Quit:** "**Import workflow complete.**" -- HALT.

## Quality Criteria

- Never overwrite existing assets without explicit user confirmation
- Only import assets that were validated in step 2
- Rename updates the name field inside the YAML content, not just the filename
- Changelog entry added to every imported asset
- Write to correct directory (schemas in schemas_dir, domains in domains_dir)
- Import results reported clearly with status per asset
