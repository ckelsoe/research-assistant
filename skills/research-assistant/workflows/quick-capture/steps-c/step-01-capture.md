---
name: 'step-01-capture'
description: 'Gather research subject and optional metadata, resolve output path'
nextStepFile: './step-02-stub.md'
---

# Step 1: Capture

## Goal

Gather the research subject description and optional metadata (schema, domains, priority) from the user, then resolve the output path for the stub file.

## Desired Outcomes

- Subject captured from user input
- Optional fields parsed correctly
- topic_folder derived as kebab-case
- Output path resolved correctly
- All values stored as session variables
- User confirmed before proceeding

## Instructions

### 1. Validate Configuration

Verify that `{research-root}` was resolved from config.

If not available:
"**Error:** `research-root` is not configured. This workflow requires the research-assistant module to be installed with `research-root` set in config.yaml."
Then HALT.

### 2. Capture Research Idea

"**Quick Capture -- what do you want to research?**

**Subject** (required): What's the research topic?
**Schema** (optional): Suggested schema name (e.g., `technology`, `science`, `business`)
**Domains** (optional): Suggested domains (e.g., `ai/llm`, `web/security`)
**Priority** (optional): `low` / `medium` / `high`

You can provide just the subject, or include any combination of the optional fields."

Wait for user input.

### 3. Parse and Resolve

From the user's response, extract:
- `subject` -- the research topic description (REQUIRED -- if missing, ask again)
- `suggested_schema` -- schema name if provided, otherwise empty
- `suggested_domains` -- domain path if provided, otherwise empty
- `priority` -- priority level if provided, otherwise empty

Derive:
- `topic_folder` -- kebab-case slug derived from subject (e.g., "Large Language Model Fine-Tuning" -> `large-language-model-fine-tuning`)

Resolve output paths:
- If schema provided:
  - `resolved_folder_path` = `{research-root}/{suggested_schema}/{topic_folder}/`
  - `resolved_output_path` = `{resolved_folder_path}stub.md`
- If no schema:
  - `resolved_folder_path` = `{research-root}/{topic_folder}/`
  - `resolved_output_path` = `{resolved_folder_path}stub.md`

### 4. Confirm

"**Captured:**

- **Subject:** {subject}
- **Schema:** {suggested_schema or 'none'}
- **Domains:** {suggested_domains or 'none'}
- **Priority:** {priority or 'none'}
- **Output:** `{resolved_output_path}`"

### 5. Present Menu Options

Display: "**Select:** [C] Continue to create stub"

- IF C: Store all captured values as session variables, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond then redisplay menu options

Always halt and wait for user input after presenting menu. Only proceed to next step when user selects 'C'.

## Quality Criteria

- Subject captured in one prompt (no multi-round questioning)
- Optional fields parsed correctly from natural language input
- topic_folder derived as proper kebab-case
- Output path resolved correctly based on schema presence
- All values stored as session variables
- User confirmed before proceeding
- No files created in this step
