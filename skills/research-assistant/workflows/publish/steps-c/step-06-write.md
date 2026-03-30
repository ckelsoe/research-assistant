---
name: 'step-06-write'
description: 'Write polished deliverable to output location and complete workflow'
---

# Step 6: Write Output

## Goal

Write the completed deliverable (transformed, branded, with provenance) to the output location next to the dossier and mark the workflow complete.

## Desired Outcomes

- Deliverable written to confirmed output path next to dossier
- Content exactly matches the output of steps 03-05 -- no modifications
- No frontmatter or workflow metadata in the deliverable
- User confirmed the output location
- Completion summary displayed

## Instructions

### 1. Confirm Output Location

"**Writing deliverable:**
- **File:** {deliverable-name}
- **Location:** {dossier directory}/{deliverable-name}

Confirm write? [Y] Yes / [N] Change location"

Wait for user confirmation.

**If N:** Ask for alternative path, confirm, then proceed.

### 2. Write Deliverable File

Write the complete deliverable content to the confirmed output path.

The file should contain:
- The transformed, branded content (from steps 03-04)
- The provenance line at the end (from step 05)
- No frontmatter -- this is a clean deliverable, not a workflow artifact

### 3. Confirm Completion

"**Publish complete.**

- **Deliverable:** {output path}/{deliverable-name}
- **Audience:** {audience type}
- **Provenance:** {provenance line}
- **Source dossier:** {dossier filename}

The deliverable has been written next to the source dossier."

### 4. Workflow Complete

This is the final step. The workflow is done. No next step to load.

## Quality Criteria

- The deliverable is final -- write it cleanly with no modifications during write
- Output path confirmed with user before writing
- No workflow frontmatter included in the deliverable
- Completion summary displayed with file location
