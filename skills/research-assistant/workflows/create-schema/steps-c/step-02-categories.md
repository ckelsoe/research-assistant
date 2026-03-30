---
name: 'step-02-categories'
description: 'Define the research categories that will become sections of the dossier'
nextStepFile: './step-03-data-points.md'
---

# Step 2: Categories

## Goal

Guide the user through defining the research categories -- the major sections of the dossier that organize what gets researched.

## Desired Outcomes

- Categories explained clearly with examples or suggestions
- Each category has a kebab-case name, display_name, and description
- At least 1 category defined
- Complete category list reviewed and confirmed by user

## Instructions

### 1. Explain Categories

"**Now let's define the categories -- the major sections of your research dossier.**

Each category represents a distinct area of investigation. When Research Analyst runs this schema, it works through each category systematically, gathering data points for each one.

Think of categories like chapters of a comprehensive report."

### 2. Show Examples (If Available)

**If existing schemas were found in step 1:**

"**Here's how other schemas organize their categories:**"

For each existing schema, list its category names and brief descriptions. This gives the user concrete examples to build from.

**If no existing schemas:**

"**Some common category patterns for {schema purpose} research might include:**"

Suggest 3-5 relevant categories based on the research purpose defined in step 1. Make clear these are suggestions -- the user decides.

### 3. Gather Categories Iteratively

Guide the user through defining categories one at a time:

"**Let's define your categories. I'll help you think through each one.**

**Category 1:** What's the first major area you'd want researched?

For each category you give me, I'll need:
- A short name (I'll generate the kebab-case version)
- A brief description of what this category covers"

For each category the user provides:
1. Confirm you understand the scope
2. Suggest a kebab-case `name` and `display_name`
3. Draft a description
4. Present for approval

"**Category {N}: {display_name}**
- Name: `{kebab-case-name}`
- Description: {drafted description}

Does that capture it? And do you have another category to add?"

Continue until the user indicates they're done adding categories.

### 4. Review Complete Category List

Present the full list of confirmed categories:

"**Here are your categories for the `{schema_name}` schema:**

| # | Name | Display Name | Description |
|---|------|-------------|-------------|
| 1 | {name} | {display_name} | {description} |
| 2 | {name} | {display_name} | {description} |
| ... | ... | ... | ... |

**{count} categories total.**

Want to add, remove, or reorder any of these before we move on to defining data points for each one?"

Handle any modifications, then confirm the final list.

### 5. Present Menu

Display: "**Categories confirmed. Ready to define data points?** [C] Continue"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Ask one question at a time, explain why each category matters
- Never show raw YAML to the user
- Do not define data points within categories (that's step 3)
- At least 1 category defined before proceeding
- Category list reviewed and confirmed before moving on
