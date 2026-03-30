---
name: 'step-02-select-source'
description: 'Select import source -- file, directory, or URL -- and validate assets'
nextStepFile: './step-03-import.md'
---

# Step 2: Select Source

## Goal

Let the user choose an import source (file, directory, or URL), fetch the asset(s), detect their type (schema or domain), and validate each against the appropriate specification.

## Desired Outcomes

- Source menu displayed and user selection handled
- Assets fetched from correct source type
- Asset types detected correctly from filenames
- Each asset validated against appropriate spec
- Validation results reported clearly
- Only valid assets passed to step 3
- Failed assets rejected with explanation

## Instructions

### 1. Present Source Options

"**Import Source**

**[F] File path** -- import a single .schema.yaml or .domain.yaml file
**[D] Directory** -- scan a directory for all schema and domain files
**[U] URL** -- fetch a schema or domain YAML from a URL
**[Q] Quit** -- exit import

Select: [F] / [D] / [U] / [Q]"

Wait for user selection.

### 2. Fetch Assets

**If [F] File path:**
- Ask: "Provide the full path to the .schema.yaml or .domain.yaml file:"
- Wait for user input
- Read the file at the provided path
- If file not found: report error, return to Section 1
- Store file content and filename

**If [D] Directory:**
- Ask: "Provide the directory path to scan:"
- Wait for user input
- Scan the directory for all `.schema.yaml` and `.domain.yaml` files
- If no matching files found: report "No schema or domain files found in that directory.", return to Section 1
- Store all found file contents and filenames
- Report: "Found {count} asset(s): {list filenames}"

**If [U] URL:**
- Ask: "Provide the URL to the YAML file:"
- Wait for user input
- Fetch content using WebFetch
- If fetch fails: report error, return to Section 1
- Detect type from URL filename (`.schema.yaml` or `.domain.yaml`)
- If type cannot be detected from URL: ask user "Is this a [S] Schema or [D] Domain?"
- Store fetched content

**If [Q] Quit:**
- "**Exiting import.**"
- Workflow complete -- HALT.

### 3. Detect Asset Types

For each fetched asset:
- If filename ends in `.schema.yaml` -> type is `schema`
- If filename ends in `.domain.yaml` -> type is `domain`
- If type cannot be determined: ask user to specify

Store each asset with its detected type.

### 4. Validate Assets

For each asset:

**If type is `schema`:**
- Load schema spec from `{schema_spec}`
- Validate against all 13 rules
- Check: name (kebab-case), categories (min 1), data points (min 1 per category), scoring structure, output structure, version (semver), changelog format, deprecated type, replaced_by format

**If type is `domain`:**
- Load domain spec from `{domain_spec}`
- Validate required fields: name, display_name, version, created, author, scope.description, scope.depth, terms (min 1), primary sources (min 1), lenses (min 1)
- Validate formats: kebab-case name, valid depth, valid source types

**Report validation results:**

"**Validation Results:**

| Asset | Type | Status | Issues |
|-------|------|--------|--------|
| {filename} | {schema/domain} | {PASS/FAIL} | {issue count or 'None'} |

{For each FAIL: list specific issues}"

**If all assets fail validation:**
- "No valid assets to import. Fix the issues and try again."
- Return to Section 1.

**If some assets pass and some fail:**
- "**{pass_count}/{total} assets passed validation.** Only valid assets will proceed to import. Continue?"
- Wait for user confirmation.

**If all assets pass:**
- "**All {count} asset(s) passed validation.** Proceeding to import."

### 5. Proceed to Import

Store `{validated_assets}` -- the list of assets that passed validation (each with content, filename, type, name).

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Never pass invalid assets to the import step
- Validate against the correct spec for each asset type
- Report validation failures clearly with specific issues
- Error states handled gracefully (file not found, fetch failure, no matches)
- Always halt at menus and wait for user selection
