---
name: 'step-05-review'
description: 'Present whitepaper for user review with option to iterate'
---

# Step 5: Review

## Goal

Present the generated whitepaper to the user for review, offer options for iteration, and finalize the output.

## Desired Outcomes

- Whitepaper presented with clear summary
- Meaningful iteration options offered
- User feedback incorporated into revisions
- Final version accepted and path confirmed

## Instructions

### 1. Present Whitepaper Summary

Read the whitepaper at `{whitepaper_path}` and present a summary:

"**Whitepaper draft ready: {whitepaper_topic}**

**File:** `{whitepaper_path}`
**Length:** {actual_page_count} pages ({actual_word_count} words)
**Target:** {wp_length}
**Audience:** {wp_audience}
**Sections:** {list section headings}
**Sources cited:** {source_count}

---

**Review options:**

- **[A] Accept** -- Finalize as-is
- **[R] Read** -- Display the full whitepaper here for review
- **[F] Feedback** -- Provide specific feedback for revision
- **[T] Tone** -- Adjust the tone or audience
- **[L] Length** -- Adjust the length (shorter or longer)"

Wait for user selection.

### 2. Handle Review Options

**If [A] Accept:**
Proceed to section 4 (finalize).

**If [R] Read:**
Display the full whitepaper content. Then re-present the review options menu.

**If [F] Feedback:**
"**What feedback do you have?** Describe what you'd like changed:"

Wait for feedback. Store as `{revision_feedback}`.

Re-spawn the Publisher with the original content plus revision instructions:
- Include the current whitepaper as the draft
- Include the user's feedback as revision requirements
- Request the Publisher to revise accordingly

After revision, re-present the review options with the updated draft.

**If [T] Tone:**
"**What tone adjustment do you need?**
- **More formal** -- increase professional register
- **More casual** -- lighter, more accessible
- **More technical** -- deeper detail, more jargon
- **More executive** -- higher level, more strategic
- **Custom** -- describe the adjustment"

Wait for selection. Re-spawn Publisher with tone adjustment.

**If [L] Length:**
"**Length adjustment:**
- **Shorter** -- condense to key points
- **Longer** -- expand with more detail and evidence
- **Specific** -- target a specific page count"

Wait for selection. Re-spawn Publisher with length adjustment.

### 3. Iteration Loop

Allow up to 3 rounds of revision. After each revision:
- Present the updated summary
- Re-display the review options
- Track revision count

If 3 revisions completed:
"**3 revision rounds completed.** You can accept the current version or provide final feedback for one more pass."

### 4. Finalize

"**Whitepaper finalized: {whitepaper_topic}**

---

**Output:** `{whitepaper_path}`
**Source research:** {source_subject}
**Generated:** {current_date}

**What's next:**
- The whitepaper is ready for distribution
- Generate additional whitepapers from the same dossier with [WP]
- Challenge this whitepaper's reasoning with [CR]"

### 5. Workflow Complete

This is the final step. No next step to load. The workflow is complete.

## Quality Criteria

- Meaningful iteration options offered -- not just "accept or reject"
- User feedback incorporated into revisions through the Publisher agent
- Revisions use the Publisher agent, not direct editing
- Final version accepted with clear output path
