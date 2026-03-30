---
name: 'step-07-generate'
description: 'Validate the schema definition against the spec and write the YAML file'
schemaSpecFile: '{skill-root}/references/specs/schema-spec.md'
---

# Step 7: Generate

## Goal

Assemble the complete schema YAML from the confirmed design, validate it against the schema specification, and write it to disk.

## Desired Outcomes

- Schema YAML assembled from all confirmed session data
- All 13 validation rules pass
- File conflict check performed
- Valid YAML written to correct location
- Confirmation displayed with file path and next steps

## Instructions

### 1. Load Schema Specification

Read `{schemaSpecFile}` to use as the validation reference.

### 2. Assemble Schema YAML

Generate the complete schema YAML from all confirmed session data:

- **Top-level:** name, display_name, description, version (1.0.0)
- **Categories:** Each with name, display_name, description, data_points array
- **Data points:** Each with name, display_name, description, required, source_guidance (if provided)
- **Scoring:** confidence_levels (high, medium, low) and source_tiers (primary, secondary, tertiary)
- **Output:** parent_folder, format, staleness (threshold_days, refresh_policy)
- **Comparison mode:** Include if set to true, omit if false
- **Lifecycle:** Initialize `changelog` with `[{version: "1.0.0", date: "{today YYYY-MM-DD}", summary: "Initial creation"}]`. Set `deprecated: false`. Omit `replaced_by`.

### 3. Validate Against Spec

Run all 13 validation rules from the schema spec:

1. `name` is kebab-case and unique
2. `categories` has at least 1 entry
3. Each category has at least 1 data point
4. All `name` fields are kebab-case
5. `scoring.confidence_levels` defines exactly high, medium, low
6. `scoring.source_tiers` defines exactly primary, secondary, tertiary
7. `output.staleness.refresh_policy` is one of: flag, auto-refresh, ignore
8. `version` is valid semver
9. All `required` fields are boolean
10. `comparison_mode` if present is boolean
11. `changelog` entries have `version` (semver), `date` (ISO), `summary` (string)
12. `deprecated` if present is boolean
13. `replaced_by` if present is kebab-case

**If validation passes:**
Proceed to step 4.

**If validation fails:**
- Display which rules failed and why
- Attempt to auto-fix if the issue is trivial (e.g., name not kebab-cased -- convert it)
- For non-trivial issues, explain the problem and ask the user how to resolve
- Re-validate after fixes
- Do not proceed until all rules pass

### 4. Check for File Conflicts

Check if `{data-root}/schemas/{schema_name}.schema.yaml` already exists.

**If file exists:**
"A schema file with this name already exists. Would you like to:
- **Overwrite** the existing file
- **Choose a different name**"

Wait for user response. If renaming, update the name in the schema and re-validate.

**If no conflict:**
Proceed to step 5.

### 5. Write Schema File

Write the validated YAML to:
`{data-root}/schemas/{schema_name}.schema.yaml`

### 6. Confirm Completion

"**Schema generated and saved.**

**File:** `{data-root}/schemas/{schema_name}.schema.yaml`

**Summary:**
- **{display_name}** -- {description}
- {category_count} categories, {data_point_count} data points
- Staleness: {threshold_days} days ({refresh_policy})
- Comparison mode: {comparison_mode}

**What's next:**
- This schema is immediately available for use with Research Director's `[NR]` New Research command
- To view it later: use Schema Architect's `[VS]` View Schema
- To create a variation: use Schema Architect's `[SC]` Schema Clone

**Schema creation complete.**"

## Quality Criteria

- Validate thoroughly -- a malformed schema will break the research pipeline
- Never write an invalid schema file
- Never skip validation
- File conflict check performed before writing
- Completion confirmed with file path and next steps
