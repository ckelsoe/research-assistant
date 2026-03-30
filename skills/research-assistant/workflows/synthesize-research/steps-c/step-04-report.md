---
name: 'step-04-report'
description: 'Present synthesis results and offer publish option'
---

# Step 4: Deliver Synthesis Results

## Goal

Present the synthesis results to the user, offer the option to publish a polished deliverable, and conclude the workflow.

## Desired Outcomes

- Results summary presented clearly with key insights
- User offered publish option
- Publish executed if selected
- Workflow concluded cleanly

## Instructions

### 1. Present Results Summary

Read the synthesis report and extract key findings.

"**Synthesis Complete**

**Report:** `{synthesis_report_path}`
**Dossiers synthesized:** {synthesis_count} ({list subjects})
**Themes identified:** {count}

**Key insights:**
{top 3-5 cross-cutting findings}

The full synthesis report is available at the path above."

### 2. Post-Synthesis Options

"**What would you like to do?**

**[P] Publish** -- Transform synthesis into an audience-appropriate deliverable
**[D] Done** -- Workflow complete

Select: [P] / [D]"

Wait for user selection.

### 3. Handle Selection

**If P (Publish):**

Ask for target audience:
"**Target audience?**
**[E] Executive** | **[T] Technical** | **[G] General**"

Wait for selection. Then spawn the Research Publisher via Task tool to transform the synthesis report into a deliverable. Output to `{synthesis_folder}/deliverable.md`.

After publish completes, present the deliverable path and end.

**If D (Done):**

"**Synthesis workflow complete.**

**Output location:** `{synthesis_folder}/`
**Files:**
- `synthesis-report.md` -- Full thematic synthesis
- `synthesis-log.md` -- Synthesis metadata

Return to Research Director for more operations."

HALT -- workflow complete.

## Quality Criteria

- Results summary presented before offering options
- Key insights highlighted from the report
- Publish option available with audience targeting
- Synthesis report not modified at any point
- Workflow ends cleanly with output location communicated
