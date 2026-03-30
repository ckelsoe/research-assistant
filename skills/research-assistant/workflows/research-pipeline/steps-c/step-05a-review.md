---
name: 'step-05a-review'
description: 'Scan published deliverable for unresolved comments and resolve each with user input'
targetsStepFile: './step-05c-targets.md'
---

# Step 5a: Comment Resolution

## Goal

Scan the published deliverable for all unresolved comment markers, present each to the user with context, resolve or defer them, remove all markers, and ensure no open questions ship in the final deliverable.

## Desired Outcomes

- Deliverable scanned for ALL marker types (`%%Comment%%`, `[!comment]`, `%%TODO%%`)
- Each comment presented to user with surrounding context for informed decision
- User decision recorded for each comment (resolve inline / defer / remove)
- All markers removed from deliverable after resolution
- Deferred comments written to research-targets.md
- Pipeline log updated with comment resolution metrics
- Routes to research target identification step

## Instructions

### 1. Scan Deliverable for Comment Markers

Read the deliverable at `{deliverable_path}`.

Scan for ALL instances of:
- `%%Comment%%` or `%%Comment:` ... `%%` patterns
- `[!comment]` callout markers
- `%%TODO%%` or `%%TODO:` ... `%%` patterns

Count total markers found. Store as `{comment_count}`.

**If no markers found:**

"**Comment scan complete.** No unresolved comments found in the deliverable. Proceeding."

Skip to section 4 (Update Pipeline Log) with `{comment_count}` = 0.

**If markers found:**

"**Comment scan complete.** Found **{comment_count}** unresolved comment(s) in the deliverable. Presenting each for resolution."

### 2. Present and Resolve Each Comment

For each comment marker found, present it to the user with:

```
**Comment {N} of {comment_count}:**

> {The comment text}

**Context (surrounding lines):**
{2-3 lines before the comment}
>>> {the line with the comment marker} <<<
{2-3 lines after the comment}

**Location:** Line ~{line_number} in `{deliverable_filename}`

**Proposed resolution:** {If the orchestrator can determine a reasonable resolution, suggest it. Otherwise: "No automatic resolution available."}

**Options:**
**[R] Resolve inline** — Edit the document to address this comment (describe the fix)
**[D] Defer** — Create a research target entry and remove the marker
**[X] Remove** — Remove the marker without action (comment is no longer relevant)
```

Wait for user selection for EACH comment.

#### Resolution Handling:

**If R (Resolve inline):**
- Ask the user what the resolution should be (or confirm the proposed resolution)
- Edit the deliverable to apply the resolution
- Remove the comment marker
- Track: `{resolved_inline_count}` += 1

**If D (Defer to research target):**
- Create or append an entry in `{research-root}/{schema_parent_folder}/{topic_folder}/research-targets.md`:
  ```
  - [ ] {Comment text} — deferred from deliverable comment resolution ({current_date})
  ```
- Remove the comment marker from the deliverable
- Track: `{deferred_count}` += 1

**If X (Remove without action):**
- Remove the comment marker from the deliverable
- Track: `{removed_count}` += 1

### 3. Verify All Markers Removed

After processing all comments, re-scan the deliverable for any remaining markers.

**If markers still found:**
- Report which markers remain
- Loop back to present and resolve them (this catches markers nested or generated during resolution)

**If clean:**
"**All {comment_count} comments resolved.** Deliverable is clean."

### 4. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.comment_review.status: complete`
- `stages.comment_review.comments_found: {comment_count}`
- `stages.comment_review.resolved_inline: {resolved_inline_count}`
- `stages.comment_review.deferred: {deferred_count}`
- `stages.comment_review.removed: {removed_count}`

Append to the log body:

```markdown
## Comment Resolution

- **Status:** Complete
- **Comments found:** {comment_count}
- **Resolved inline:** {resolved_inline_count}
- **Deferred to research targets:** {deferred_count}
- **Removed without action:** {removed_count}
- **Completed:** {current_timestamp}
```

### 5. Route to Research Target Identification

After comment resolution, ALWAYS route to the research target identification step.

**If autopilot:**

"**Comment review complete.** {comment_count} comments processed ({resolved_inline_count} resolved, {deferred_count} deferred, {removed_count} removed). Proceeding to research target identification..."

Immediately load, read entire file, then execute {targetsStepFile}.

**If stage-gated:**

"**Comment review complete.** {comment_count} comments processed.

| Resolution | Count |
|-----------|-------|
| Resolved inline | {resolved_inline_count} |
| Deferred to research targets | {deferred_count} |
| Removed without action | {removed_count} |

**[C] Continue** to research target identification
**[X] Abort** pipeline"

Wait for user selection.

#### Menu Handling Logic:

- IF C: Confirm pipeline log is updated, then load, read entire file, then execute {targetsStepFile}
- IF X: Update pipeline log status to ABORTED_BY_USER, then HALT
- IF Any other: help user, then redisplay menu

**If partial (and this was a selected stage):**

Present results, then load, read entire file, then execute {targetsStepFile}.

#### Execution Rules:

- ALWAYS halt and wait for user input if stage-gated or partial
- For autopilot: auto-proceed after reporting summary
- NEVER skip pipeline log update regardless of autonomy level

## Quality Criteria

- All three marker types scanned (`%%Comment%%`, `[!comment]`, `%%TODO%%`)
- Each comment presented with surrounding context — never auto-resolved without user input
- All markers removed from deliverable after processing (verified with re-scan)
- Deferred comments properly written to research-targets.md
- Pipeline log updated with resolution metrics (found/resolved/deferred/removed)
- No markers remain in deliverable when this step completes
