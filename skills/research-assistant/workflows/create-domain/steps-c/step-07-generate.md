---
name: 'step-07-generate'
description: 'Assemble valid domain YAML from session context, validate against spec, and write file'
domainSpecFile: '{skill-root}/references/specs/domain-spec.yaml'
---

# Step 7: Generate

## Goal

Assemble a valid domain YAML file from all collected session context, validate it against the domain spec, and write it to the correct location.

## Desired Outcomes

- Domain YAML assembled from approved session context
- Validation passed against domain spec (all required fields present, formats correct)
- File written to correct location (`{data-root}/domains/{name}.domain.yaml`)
- Directory created if it didn't exist
- Completion confirmed to user with file location and next actions

## Instructions

### 1. Load Domain Spec

Load {domainSpecFile} to reference the required structure and validation rules.

### 2. Assemble Domain YAML

From session context, assemble the complete domain YAML with all sections:

**Structure:**
```
domain:
  name: {name from step 1}
  display_name: {display_name from step 1}
  version: "1.0.0"
  created: {current date in YYYY-MM-DD}
  updated: {current date in YYYY-MM-DD}
  author: {user_name from config}
  changelog:
    - version: "1.0.0"
      date: {current date in YYYY-MM-DD}
      summary: "Initial creation"
  deprecated: false

  scope:
    description: {from step 1}
    boundaries: {from step 1}
    depth: {from step 1}
    composability_notes: {from step 1, if provided}

  terminology:
    terms: {from step 2}
    acronyms: {from step 2}

  sources:
    primary: {from step 3}
    secondary: {from step 3}
    reference: {from step 3}
    anti_sources: {from step 3}

  lenses: {from step 4}

  relationships:
    key_entities: {from step 5}
    ecosystem:
      description: {from step 5}
    competitive_patterns: {from step 5}
```

Omit optional sections that have no content (e.g., if no acronyms, no secondary sources, no anti-sources, no relationships -- omit those keys entirely rather than including empty arrays).

### 3. Validate Against Spec

Check the assembled YAML against {domainSpecFile} validation rules:

**Required fields check:**
- domain.name -- present and kebab-case?
- domain.display_name -- present?
- domain.version -- present?
- domain.created -- present and valid date?
- domain.author -- present?
- domain.scope.description -- present?
- domain.scope.depth -- present and one of: shallow, moderate, deep?
- domain.terminology.terms -- at least 1 term?
- domain.sources.primary -- at least 1 primary source?
- domain.lenses -- at least 1 lens?

**Format checks:**
- domain.name follows kebab-case format
- Source types are valid values
- YAML is well-formed

**If validation passes:**
Proceed to write.

**If validation fails:**
Report what's missing or invalid:

"**Validation found {count} issue(s):**
{For each issue: description and how to fix}

Let me fix these before writing the file."

Fix the issues (if possible from session context) or ask the user for the missing information. Re-validate after fixes.

### 4. Determine Output Path

Resolve the output path:
- Base: `{data-root}/domains/`
- Filename: `{domain.name}.domain.yaml`
- Full path: `{data-root}/domains/{domain.name}.domain.yaml`

If the `{data-root}/domains/` directory doesn't exist, create it.

### 5. Write Domain File

Write the validated YAML to the resolved output path.

### 6. Confirm Completion

"**Domain created successfully.**

**File:** `{data-root}/domains/{domain.name}.domain.yaml`
**Version:** 1.0.0
**Sections:** identity, terminology ({term_count} terms), sources ({source_count} sources), lenses ({lens_count} lenses), relationships

**This domain is immediately available.** When you run a research request through the Research Director, you can select *{display_name}* as a domain to apply specialized knowledge to the research.

**To manage domains:**
- **[LD]** List all available domains
- **[VD]** View this domain's contents
- **[DC]** Domain Clone -- create new domain from existing one"

### 7. Workflow Complete

This is the final step. No next step to load. The workflow is complete.

## Quality Criteria

- The generated YAML must be valid, faithful to the user's approved content, and immediately usable by research agents
- Validate before writing -- never write invalid output
- Never show raw YAML to the user -- present only the confirmation summary
- Do not modify content the user approved -- assemble it faithfully
- Directory created if missing
