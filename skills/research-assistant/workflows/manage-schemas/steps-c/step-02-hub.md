---
name: 'step-02-hub'
description: 'Schema management hub -- looping menu for lifecycle operations'
createSchemaWorkflow: '{skill-root}/workflows/create-schema/workflow.md'
schemaSpecFile: '{skill-root}/references/specs/schema-spec.md'
schemasDir: '{data-root}/schemas'
---

# Step 2: Schema Management Hub

## Goal

Present a looping management menu for schema lifecycle operations. After each operation completes, return to this menu.

## Desired Outcomes

- Hub menu displayed with all lifecycle operations
- User selection routed to correct operation
- Each operation executed following its prompt logic
- Menu re-displayed after each operation (loop)
- Clean exit on Quit

## Instructions

### 1. Display Hub Menu

"**Schema Management**

**[LS] List Schemas** -- show all schemas with summaries
**[VS] View Schema** -- detailed view of a specific schema
**[SC] Clone Schema** -- create new schema from existing one
**[VL] Validate All** -- check all schemas against the spec
**[DP] Deprecate** -- mark a schema as deprecated
**[EX] Export** -- export a schema for sharing
**[CS] Create New** -- design a new schema from scratch
**[Q] Quit** -- exit schema management

Select: [LS] / [VS] / [SC] / [VL] / [DP] / [EX] / [CS] / [Q]"

Wait for user selection.

### 2. Route Selection

Execute the selected operation:

- **[LS] List Schemas:**
  Scan `{schemasDir}` for `.schema.yaml` files, extract name/description/category count/data point count, present as table. Mark deprecated schemas with `(deprecated)`. After displaying, return to hub menu.

- **[VS] View Schema:**
  List schemas, let user select, read YAML, present in conversational format (Purpose, Categories, Scoring, Output, Staleness, Lifecycle status). Never show raw YAML. After displaying, return to hub menu.

- **[SC] Clone Schema:**
  List schemas, select base, present summary, walk through modifications, generate YAML, validate against spec, write to schemas directory. After completion, return to hub menu.

- **[VL] Validate All:**
  Load schema spec from `{schemaSpecFile}`, scan all `.schema.yaml` files, validate each against all 13 rules, present results table (name, PASS/FAIL, issue count, details). Summary: "X/Y schemas valid." After reporting, return to hub menu.

- **[DP] Deprecate:**
  List schemas, select one, set `deprecated: true`, optional `replaced_by`, add changelog entry, bump patch version, write updated YAML. Confirm and return to hub menu.

- **[EX] Export:**
  List schemas, select one, read YAML, present as code block, write copy to `{research-root}/_exports/schemas/`. Confirm and return to hub menu.

- **[CS] Create New:**
  Load and execute `{createSchemaWorkflow}`. After completion, return to hub menu.

- **[Q] Quit:**
  "**Exiting schema management.**"
  Workflow complete -- do not return to menu.

### 3. Loop Back

After any operation completes (except [Q] Quit), return to Section 1 and re-display the hub menu.

## Quality Criteria

- Hub menu displayed clearly with all options
- User selection routed to correct operation
- Each operation follows its corresponding prompt logic
- After each operation, menu re-displayed (loop)
- Quit exits cleanly without looping
- Deprecated schemas marked in listings
- No auto-selection of menu options
