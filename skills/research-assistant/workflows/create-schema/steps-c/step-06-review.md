---
name: 'step-06-review'
description: 'Present complete human-readable schema summary for final review before generation'
nextStepFile: './step-07-generate.md'
---

# Step 6: Review

## Goal

Present the complete schema definition in a human-readable summary, allowing the user to review everything before generating the YAML file. This is the final gate before generation.

## Desired Outcomes

- Complete schema presented in human-readable format
- All sections covered: purpose, categories, data points, scoring, output
- User invited to review and given opportunity to edit
- All requested edits applied and confirmed
- User explicitly approves by selecting C

## Instructions

### 1. Present Complete Schema Summary

"**Here's your complete schema. Let's review everything before I generate it.**

---

## Schema: {display_name}

**Name:** `{schema_name}`
**Description:** {description}
**Version:** 1.0.0

---

### Categories & Data Points

**{category_1 display_name}**
_{category_1 description}_

| # | Data Point | Required | Source Guidance |
|---|-----------|----------|----------------|
| 1 | {dp display_name}: {dp description} | {Yes/No} | {guidance} |
| 2 | ... | ... | ... |

**{category_2 display_name}**
_{category_2 description}_

| # | Data Point | Required | Source Guidance |
|---|-----------|----------|----------------|
| 1 | ... | ... | ... |

_(repeat for all categories)_

---

### Scoring Criteria

**Confidence Levels:**
- **High** ({threshold}+ sources): {description}
- **Medium** ({threshold} source): {description}
- **Low** ({threshold} sources): {description}

**Source Tiers:**
- **Primary:** {description}
- **Secondary:** {description}
- **Tertiary:** {description}

---

### Output Settings

| Setting | Value |
|---------|-------|
| Parent folder | `{parent_folder}/` |
| Output format | dossier |
| Staleness | {threshold_days} days |
| Refresh policy | {refresh_policy} |
| Comparison mode | {comparison_mode} |

---

**Totals:** {category_count} categories, {data_point_count} data points ({required_count} required, {optional_count} optional)"

### 2. Invite Feedback

"**Review checklist:**

1. Does the **purpose and description** accurately capture what this schema is for?
2. Are the **categories** comprehensive -- any major areas missing?
3. Are the **data points** specific enough -- will Research Analyst know what to look for?
4. Are the **scoring criteria** appropriate for this type of research?
5. Are the **output settings** (folder, staleness, refresh) configured correctly?

**What would you like to change?** Or if everything looks good, continue to generate."

### 3. Handle Edit Requests

If the user requests changes:

1. Identify which section(s) need modification
2. Walk through the changes conversationally
3. Confirm each modification
4. Re-present the affected section(s) with updates
5. Return to the menu

### 4. Present Menu

Display: "**[E] Edit** -- modify a section  |  **[C] Continue** -- generate the schema"

- IF E: Ask "Which section would you like to edit? (Purpose, Categories, Data Points, Scoring, Output)", then walk through changes and redisplay menu
- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user, then redisplay menu

Always halt and wait for user input. Only proceed to generation when user selects 'C'. Edit requests loop back to this menu after changes are applied.

## Quality Criteria

- Never show raw YAML during review
- All sections presented -- no section skipped
- Schema file not generated in this step (that's step 7)
- User explicitly approves before proceeding
- Edit option always available
