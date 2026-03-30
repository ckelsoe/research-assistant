---
name: 'step-01-init'
description: 'Initialize domain management -- scan domains, report count'
nextStepFile: './step-02-hub.md'
---

# Step 1: Initialization

## Goal

Scan the domains directory and report available domain count before proceeding to the management hub. This is an automatic step with no user interaction.

## Desired Outcomes

- Domains directory scanned
- Domain count and deprecation status reported
- Auto-proceeded to hub

## Instructions

### 1. Scan Domains Directory

Scan `{data-root}/domains/` for all `.domain.yaml` files.

- Count total domains found
- Note any deprecated domains (where `domain.deprecated: true`)
- Store as `{domains_count}` and `{deprecated_count}`

### 2. Report and Proceed

"**Domain Management initialized.**

**Domains found:** {domains_count} ({deprecated_count} deprecated)

**Entering management hub...**"

Auto-proceed: load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Domains directory scanned completely
- Domain count reported including deprecated count
- No user questions asked during init
- Auto-proceeded to hub without delay
