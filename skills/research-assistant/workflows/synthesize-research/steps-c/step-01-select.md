---
name: 'step-01-select'
description: 'Select 2+ research dossiers to synthesize'
nextStepFile: './step-02-configure.md'
---

# Step 1: Select Dossiers for Synthesis

## Goal

Scan existing research dossiers and let the user select two or more to synthesize. Any combination of schemas is valid -- synthesis works across different research types.

## Desired Outcomes

- All dossiers under `{research-root}` discovered and presented with metadata
- User selects at least 2 dossiers
- Schema overview communicated
- All selection data stored for subsequent steps

## Instructions

### 1. Discover Existing Dossiers

Scan `{research-root}` recursively for `dossier.md` files.

For each dossier found:

- Read frontmatter or pipeline log to extract: subject, schema, date created, verification status, confidence summary
- Note whether it has been verified (verification-report.md exists alongside)

**If fewer than 2 dossiers found:**
Display: "**Need at least 2 dossiers to synthesize.** Found {count}. Run [NR] New Research to create more."
Then HALT.

### 2. Present Dossier List

"**Available dossiers for synthesis:**

| # | Subject | Schema | Created | Verified | Confidence |
|---|---------|--------|---------|----------|------------|
| 1 | {subject} | {schema} | {date} | {yes/no} | {High/Med/Low} |
|..."

### 3. User Selection

"**Select dossiers to synthesize** (enter numbers separated by commas, e.g., `1, 3, 4`).
Minimum 2 required. Any combination of schemas is valid."

Wait for user input. Parse selected numbers.

**If fewer than 2 selected:**
"Please select at least 2 dossiers." Re-display selection prompt.

Store:

- `{synthesis_dossiers}` -- list of {path, subject, schema} for each selected dossier
- `{synthesis_subjects}` -- list of subject names
- `{synthesis_count}` -- number of dossiers selected
- `{synthesis_schemas}` -- list of unique schemas across selected dossiers

### 4. Schema Overview

Present schema context for synthesis:

**If same schema:**
"**All {synthesis_count} dossiers use `{schema_name}`.** Synthesis can leverage shared structure for precise cross-referencing."

**If mixed schemas:**
"**Schemas:** {list schemas}. Cross-schema synthesis will identify themes and patterns that transcend individual research structures."

### 5. Proceed

Display: "**Selected {synthesis_count} dossiers for synthesis.** Proceeding to configuration..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Dossiers discovered and presented with schema info
- User selected 2+ dossiers
- Schema overview communicated appropriately
- Mixed schemas accepted (synthesis supports all combinations)
- All selection data stored
- No synthesis analysis begun at this stage
