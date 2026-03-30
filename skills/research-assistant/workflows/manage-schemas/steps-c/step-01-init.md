---
name: 'step-01-init'
description: 'Initialize schema management -- scan schemas, report count'
nextStepFile: './step-02-hub.md'
---

# Step 1: Initialization

## Goal

Scan the schemas directory and report available schema count before proceeding to the management hub. This is an automatic step with no user interaction.

## Desired Outcomes

- Schemas directory scanned
- Schema count and deprecation status reported
- Auto-proceeded to hub

## Instructions

### 1. Scan Schemas Directory

Scan `{data-root}/schemas/` for all `.schema.yaml` files.

- Count total schemas found
- Note any deprecated schemas (where `deprecated: true`)
- Store as `{schemas_count}` and `{deprecated_count}`

### 2. Report and Proceed

"**Schema Management initialized.**

**Schemas found:** {schemas_count} ({deprecated_count} deprecated)

**Entering management hub...**"

Auto-proceed: load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Schemas directory scanned completely
- Schema count reported including deprecated count
- No user questions asked during init
- Auto-proceeded to hub without delay
