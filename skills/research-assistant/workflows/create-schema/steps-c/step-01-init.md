---
name: 'step-01-init'
description: 'Initialize schema creation -- discover existing schemas, define purpose and name'
nextStepFile: './step-02-categories.md'
schemaSpecFile: '{skill-root}/references/specs/schema-spec.md'
---

# Step 1: Purpose & Name

## Goal

Initialize the schema creation workflow by discovering existing schemas as examples, and guiding the user to define the research purpose and schema name.

## Desired Outcomes

- Schema spec loaded for later validation
- Existing schemas discovered (or gracefully handled if none)
- User's research purpose captured and confirmed
- Schema description drafted and approved
- Unique schema name confirmed

## Instructions

### 1. Load Schema Specification

Read `{schemaSpecFile}` and store the complete schema structure definition. This will be used for validation in the final generate step.

### 2. Discover Existing Schemas

Search for `.schema.yaml` files in `{data-root}/schemas/`.

**If schemas found:**
- Read each schema file
- Extract name and description
- Store as `{existing_schemas}` for reference in later steps
- Display: "I found {count} existing schema(s) I can reference as examples: {list names}"

**If no schemas found:**
- Display: "No existing schemas found -- we'll be building from scratch. I'll guide you through every decision."
- Set `{existing_schemas}` to empty

### 3. Welcome and Explain

"**Let's design a new research schema.**

A schema defines WHAT gets researched -- the categories, the specific data points within each category, how confidence is scored, and how the output is organized. Think of it as the blueprint that Research Analyst follows when conducting research.

**First question: What kind of research is this schema for?**

For example:
- Evaluating vendors or products
- Assessing a technology landscape
- Competitive analysis
- Due diligence on a company
- Industry or market research

What's the research goal?"

Wait for user response.

### 4. Define Purpose and Description

Based on the user's response:

1. Confirm you understand their research goal
2. Draft a concise description (1-2 sentences) of what the schema covers
3. Present it to the user for approval or refinement

"**Here's how I'd describe this schema's purpose:**

> {drafted description}

Does that capture it, or would you adjust the wording?"

Wait for user response. Refine until confirmed.

### 5. Name the Schema

Suggest a kebab-case name based on the purpose:

"**Now let's name it.** Schema names use kebab-case -- short, descriptive, searchable.

Based on your purpose, I'd suggest: `{suggested-name}`

Does that work, or do you prefer something different?"

**Check for conflicts:**
- If `{existing_schemas}` contains a schema with the same name, warn and suggest alternatives
- Loop until a unique name is confirmed

Store confirmed name as `{schema_name}`.

### 6. Present Menu

Display: "**Purpose and name confirmed. Ready to define categories?** [C] Continue"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Ask one question at a time, explain why each choice matters
- Never show raw YAML to the user
- Do not ask about categories, data points, or scoring in this step
- Schema name uniqueness verified against existing schemas
- User confirmed both purpose and name before proceeding
