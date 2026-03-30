---
name: 'step-01-init'
description: 'Initialize import -- load config, detect directories, report current asset counts'
nextStepFile: './step-02-select-source.md'
---

# Step 1: Initialization

## Goal

Verify schemas and domains directories exist and report current asset counts before proceeding to source selection.

## Desired Outcomes

- Spec files located
- Asset directories verified
- Current counts reported
- Auto-proceeded to source selection

## Instructions

### 1. Resolve Paths

Store spec file paths:
- `{schema_spec}` = `{skill-root}/references/specs/schema-spec.md`
- `{domain_spec}` = `{skill-root}/references/specs/domain-spec.yaml`
- `{schemas_dir}` = `{data-root}/schemas`
- `{domains_dir}` = `{data-root}/domains`

### 2. Count Existing Assets

Scan both directories:
- Count `.schema.yaml` files in `{schemas_dir}`
- Count `.domain.yaml` files in `{domains_dir}`

Store as `{existing_schemas}` and `{existing_domains}`.

### 3. Report and Proceed

"**Import Assets initialized.**

**Current inventory:** {existing_schemas} schemas, {existing_domains} domains
**Schema spec:** loaded
**Domain spec:** loaded

**Proceeding to source selection...**"

Auto-proceed: load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- This is an initialization step -- no user interaction needed
- Spec files located for validation in later steps
- Do not begin import operations in this step
- If spec files are missing, report error and halt
