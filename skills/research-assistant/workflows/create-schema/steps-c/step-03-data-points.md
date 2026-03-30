---
name: 'step-03-data-points'
description: 'Define the specific data points to collect for each research category'
nextStepFile: './step-04-scoring.md'
---

# Step 3: Data Points

## Goal

Define the specific data points within each category -- what the Research Analyst will actually look for when conducting research.

## Desired Outcomes

- Every category has at least 1 data point
- Each data point has name, display_name, description, and required flag
- Source guidance offered for each (user can skip)
- Category summaries shown and confirmed
- Complete data point map reviewed and approved

## Instructions

### 1. Explain Data Points

"**Now let's define what gets researched within each category.**

Data points are the specific pieces of information Research Analyst will look for. Each one has:
- A **name** and **description** -- what to find
- **Required or optional** -- must it be researched, or is it nice-to-have?
- **Source guidance** (optional) -- hints on where to look

Good data points are specific enough to be actionable. 'Company information' is too vague. 'Annual revenue' or 'founding date' -- those are data points."

### 2. Work Through Each Category

For each category defined in step 2, in order:

"**Category: {display_name}**

{category description}

What specific data points should be researched for this category? I'll help you refine each one."

For each data point the user provides:

1. Confirm the scope -- is it specific enough?
2. If too broad, coach toward splitting: "That's a broad area. Could we break it into more specific items? For example, '{suggestion1}' and '{suggestion2}'?"
3. Generate kebab-case `name` and `display_name`
4. Draft a description
5. Ask: "Should this be **required** (must be researched) or **optional** (nice-to-have)?"
6. Ask: "Any hints on where Research Analyst should look for this? (e.g., 'company website', 'LinkedIn', 'SEC filings') -- or skip if no preference."

"**Data point: {display_name}**
- Name: `{kebab-case-name}`
- Description: {description}
- Required: {yes/no}
- Source guidance: {guidance or 'none'}

Got it. Next data point for {category}, or ready to move to the next category?"

Continue until user indicates all data points for this category are defined.

### 3. Show Category Summary After Each

After completing all data points for a category, display a summary:

"**{category display_name} -- {count} data points:**

| # | Data Point | Required | Source Guidance |
|---|-----------|----------|----------------|
| 1 | {display_name} | {Yes/No} | {guidance} |
| 2 | {display_name} | {Yes/No} | {guidance} |
| ... | ... | ... | ... |

Anything to add, remove, or change before we move to the next category?"

Handle modifications, then proceed to next category.

### 4. Review Complete Data Point Map

After all categories have data points defined, present the complete map:

"**Complete data point map for `{schema_name}`:**"

For each category:
"**{category display_name}** ({count} data points)
- {data_point_1 display_name} -- {required/optional}
- {data_point_2 display_name} -- {required/optional}
- ..."

"**Totals:** {total_categories} categories, {total_data_points} data points ({required_count} required, {optional_count} optional)

Does this coverage look right? Any gaps or unnecessary items?"

Handle final modifications and confirm.

### 5. Present Menu

Display: "**Data points confirmed. Ready to define scoring criteria?** [C] Continue"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Coach toward specificity -- vague data points produce vague research
- Work through categories one at a time -- complete all data points for a category before moving to the next
- Never show raw YAML to the user
- Do not discuss scoring or output format in this step
- No category left with zero data points
