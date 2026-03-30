---
name: 'step-02-hub'
description: 'Domain management hub -- looping menu for lifecycle operations'
createDomainWorkflow: '{skill-root}/workflows/create-domain/workflow.md'
domainSpecFile: '{skill-root}/references/specs/domain-spec.yaml'
domainsDir: '{data-root}/domains'
---

# Step 2: Domain Management Hub

## Goal

Present a looping management menu for domain lifecycle operations. After each operation completes, return to this menu.

## Desired Outcomes

- Hub menu displayed with all lifecycle operations
- User selection routed to correct operation
- Each operation executed following its prompt logic
- Menu re-displayed after each operation (loop)
- Clean exit on Quit

## Instructions

### 1. Display Hub Menu

"**Domain Management**

**[LD] List Domains** -- show all domains with summaries
**[VD] View Domain** -- detailed view of a specific domain
**[DC] Clone Domain** -- create new domain from existing one
**[VL] Validate All** -- check all domains against the spec
**[DP] Deprecate** -- mark a domain as deprecated
**[EX] Export** -- export a domain for sharing
**[CD] Create New** -- define a new domain from scratch
**[Q] Quit** -- exit domain management

Select: [LD] / [VD] / [DC] / [VL] / [DP] / [EX] / [CD] / [Q]"

Wait for user selection.

### 2. Route Selection

Execute the selected operation:

- **[LD] List Domains:**
  Scan `{domainsDir}` for `.domain.yaml` files, extract name/scope/source count/lens count, present as table. Mark deprecated domains with `(deprecated)`. After displaying, return to hub menu.

- **[VD] View Domain:**
  List domains, let user select, read YAML, present in conversational format (Scope, Terminology, Sources, Lenses, Relationships, Lifecycle status). Never show raw YAML. After displaying, return to hub menu.

- **[DC] Clone Domain:**
  List domains, select base, present summary, walk through modifications, generate YAML, validate against spec, write to domains directory. After completion, return to hub menu.

- **[VL] Validate All:**
  Load domain spec from `{domainSpecFile}`, scan all `.domain.yaml` files, validate each against required fields and format rules, present results table (name, PASS/FAIL, issue count, details). Summary: "X/Y domains valid." After reporting, return to hub menu.

- **[DP] Deprecate:**
  List domains, select one, set `domain.deprecated: true`, optional `replaced_by`, add changelog entry, bump patch version, update `domain.updated`, write updated YAML. Confirm and return to hub menu.

- **[EX] Export:**
  List domains, select one, read YAML, present as code block, write copy to `{research-root}/_exports/domains/`. Confirm and return to hub menu.

- **[CD] Create New:**
  Load and execute `{createDomainWorkflow}`. After completion, return to hub menu.

- **[Q] Quit:**
  "**Exiting domain management.**"
  Workflow complete -- do not return to menu.

### 3. Loop Back

After any operation completes (except [Q] Quit), return to Section 1 and re-display the hub menu.

## Quality Criteria

- Hub menu displayed clearly with all options
- User selection routed to correct operation
- Each operation follows its corresponding prompt logic
- After each operation, menu re-displayed (loop)
- Quit exits cleanly without looping
- Deprecated domains marked in listings
- No auto-selection of menu options
