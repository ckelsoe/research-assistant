---
name: 'step-01-select'
description: 'Select a research dossier to challenge'
nextStepFile: './step-02-reasoning.md'
---

# Step 1: Select Dossier

## Goal

Scan existing research dossiers and let the user select which one to challenge with adversarial reasoning validation.

## Desired Outcomes

- Dossiers discovered and presented to user
- User selected a valid dossier
- Dossier content loaded into session context

## Instructions

### 1. Discover Existing Dossiers

Scan `{research-root}` recursively for `dossier.md` files.

For each dossier found:
- Read frontmatter or pipeline log to extract: subject, schema, date created, verification status
- Note whether it has been verified (verification-report.md exists alongside)

**If no dossiers found:**
Display: "**No research dossiers found under `{research-root}`.**\nRun [NR] New Research first."
Then HALT.

### 2. Present Dossier List

"**Available dossiers to challenge:**

| # | Subject | Schema | Created | Verified |
|---|---------|--------|---------|----------|
| 1 | {subject} | {schema} | {date} | {yes/no} |
..."

### 3. User Selection

Ask user to select which dossier to challenge by number.

Wait for user input. Store:
- `{challenge_target}` -- path to the dossier folder
- `{challenge_subject}` -- research subject
- `{challenge_dossier_path}` -- full path to dossier.md

### 4. Load Dossier

Read the selected dossier completely. Store full content as `{dossier_content}`.

Display: "**Dossier loaded: {challenge_subject}**\nProceeding to reasoning analysis..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Focus only on discovering and presenting dossiers for selection
- Do not begin any analysis in this step
- Full dossier content loaded into session context
