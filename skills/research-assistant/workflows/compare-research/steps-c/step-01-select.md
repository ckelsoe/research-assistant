---
name: 'step-01-select'
description: 'Select 2+ research dossiers to compare'
nextStepFile: './step-02-configure.md'
---

# Step 1: Select Dossiers for Comparison

## Goal

Scan existing research dossiers and let the user select two or more to compare. Warn if selected dossiers use different schemas.

## Desired Outcomes

- All dossiers under `{research-root}` discovered and presented with metadata
- User selects at least 2 dossiers
- Schema compatibility assessed and reported
- All selection data stored for subsequent steps

## Instructions

### 1. Discover Existing Dossiers

Scan `{research-root}` recursively for `dossier.md` files.

For each dossier found:

- Read frontmatter or pipeline log to extract: subject, schema, date created, verification status, confidence summary
- Note whether it has been verified (verification-report.md exists alongside)

**If fewer than 2 dossiers found:**
Display: "**Need at least 2 dossiers to compare.** Found {count}. Run [NR] New Research to create more."
Then HALT.

### 2. Present Dossier List

"**Available dossiers for comparison:**

| # | Subject | Schema | Created | Verified | Confidence |
|---|---------|--------|---------|----------|------------|
| 1 | {subject} | {schema} | {date} | {yes/no} | {High/Med/Low} |
|..."

### 3. User Selection

"**Select dossiers to compare** (enter numbers separated by commas, e.g., `1, 3, 4`).
Minimum 2 required."

Wait for user input. Parse selected numbers.

**If fewer than 2 selected:**
"Please select at least 2 dossiers." Re-display selection prompt.

Store:

- `{compare_dossiers}` -- list of {path, subject, schema} for each selected dossier
- `{compare_subjects}` -- list of subject names
- `{compare_count}` -- number of dossiers selected

### 4. Schema Compatibility Check

Check if all selected dossiers use the same schema.

**If same schema:**
"**Schema match:** All {compare_count} dossiers use `{schema_name}`. Full category-by-category comparison available."
Store `{compare_schema}` = {schema_name}, `{schema_match}` = true.

**If mixed schemas:**
"**Mixed schemas detected:** {list schemas}. Comparison will focus on overlapping categories and data points. Some fields may not be directly comparable."
Store `{compare_schema}` = "mixed", `{schema_match}` = false.

### 5. Proceed

Display: "**Selected {compare_count} dossiers for comparison.** Proceeding to configuration..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Dossiers discovered and presented with schema info
- User selected 2+ dossiers
- Schema compatibility assessed and reported
- All selection data stored
- No comparison analysis begun at this stage
