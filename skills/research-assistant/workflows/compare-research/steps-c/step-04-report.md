---
name: 'step-04-report'
description: 'Present comparison results and offer publish option'
---

# Step 4: Deliver Comparison Results

## Goal

Present the comparison results to the user, offer the option to publish a polished deliverable, and conclude the workflow.

## Desired Outcomes

- Results summary presented clearly with key findings
- User offered publish option
- Publish executed if selected
- Workflow concluded cleanly

## Instructions

### 1. Present Results Summary

Read the comparison report and extract key findings.

"**Comparison Complete**

**Report:** `{comparison_report_path}`
**Subjects compared:** {compare_count} ({list subjects})
**Categories analyzed:** {count}
**Overall ranking:** {ranking summary}

**Key differentiators:**
{top 3-5 differentiating findings}

The full comparison report is available at the path above."

### 2. Post-Comparison Options

"**What would you like to do?**

**[P] Publish** -- Transform comparison into an audience-appropriate deliverable
**[D] Done** -- Workflow complete

Select: [P] / [D]"

Wait for user selection.

### 3. Handle Selection

**If P (Publish):**

Ask for target audience:
"**Target audience?**
**[E] Executive** | **[T] Technical** | **[G] General**"

Wait for selection. Then spawn the Research Publisher via Task tool to transform the comparison report into a deliverable. Output to `{comparison_folder}/deliverable.md`.

After publish completes, present the deliverable path and end.

**If D (Done):**

"**Comparison workflow complete.**

**Output location:** `{comparison_folder}/`
**Files:**
- `comparison-report.md` -- Full comparison analysis
- `comparison-log.md` -- Comparison metadata

Return to Research Director for more operations."

HALT -- workflow complete.

## Quality Criteria

- Results summary presented before offering options
- Key differentiators highlighted from the report
- Publish option available with audience targeting
- Comparison report not modified at any point
- Workflow ends cleanly with output location communicated
