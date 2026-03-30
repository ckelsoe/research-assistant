---
name: 'step-02-audience'
description: 'Determine target audience and deliverable name'
nextStepFile: './step-03-transform.md'
---

# Step 2: Audience Selection

## Goal

Determine the target audience for the deliverable and derive the appropriate deliverable filename, so subsequent steps can restructure and tone-match the content accordingly.

## Desired Outcomes

- Audience determined (from invocation or user selection)
- Deliverable filename derived and confirmed
- Output path set (next to dossier)
- All decisions stored in session context

## Instructions

### 1. Check for Pre-Specified Audience

If the audience was provided as part of the workflow invocation or agent command, confirm it:

"**Audience: {provided audience}** -- I'll structure the deliverable for this reader. Proceeding."

Skip to section 3 (Derive Deliverable Name).

### 2. Ask for Audience Selection

If no audience was specified:

"**Who is the target reader for this deliverable?**

- **[E] Executive** -- VP/C-suite: high-level findings, decisions, strategic implications. No methodology detail.
- **[T] Technical** -- Engineering/research team: full detail, methodology notes, caveats preserved.
- **[S] Stakeholder** -- External partner or cross-functional team: balanced detail, context included, jargon minimized.
- **[C] Custom** -- Describe your audience and I'll calibrate accordingly.

Select: [E] / [T] / [S] / [C]"

Wait for user selection.

**If C (Custom):** Ask user to describe the audience in 1-2 sentences. Store description.

### 3. Derive Deliverable Name

Based on audience selection, propose a deliverable filename:

| Audience | Deliverable Name Pattern |
|----------|--------------------------|
| Executive | `executive-brief.md` |
| Technical | `technical-summary.md` |
| Stakeholder | `stakeholder-report.md` |
| Custom | `{audience-descriptor}-brief.md` |

"**Deliverable will be written as:** `{deliverable-name}`
**Location:** {dossier directory}/{deliverable-name}

This name can be changed. Accept or provide an alternative?"

Wait for user confirmation or alternative name.

### 4. Confirm and Store

Store in session context:
- Selected audience type and description
- Deliverable filename
- Output path (dossier directory + deliverable name)

"**Audience confirmed: {audience type}**
**Deliverable: {deliverable-name}**

Ready to proceed to content transformation."

### 5. Present Menu

Display: "**Select:** [C] Continue to Content Transform"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input after presenting menu. Only proceed when user selects 'C'.

## Quality Criteria

- Audience is confirmed before proceeding
- If audience was pre-specified, it is not re-asked
- Deliverable filename derived from audience type
- No content transformation begun in this step
