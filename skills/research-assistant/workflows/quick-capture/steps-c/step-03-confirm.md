---
name: 'step-03-confirm'
description: 'Report stub creation results and complete the workflow'
---

# Step 3: Confirm

## Goal

Report what was created, display a summary of the stub, and end the workflow.

## Desired Outcomes

- Clear confirmation displayed with all captured fields
- File path shown so user knows where to find it
- Next steps mentioned
- Workflow ended cleanly

## Instructions

### 1. Display Confirmation

"**Research idea captured.**

| Field | Value |
|-------|-------|
| **Subject** | {subject} |
| **Schema** | {suggested_schema or '--'} |
| **Domains** | {suggested_domains or '--'} |
| **Priority** | {priority or '--'} |
| **Location** | `{resolved_output_path}` |
| **Status** | stub |

**Next steps:**
- Run **research-pipeline** to execute this research
- Run **list-research** to see all stubs and active research"

### 2. End Workflow

Workflow complete. No further action needed.

## Quality Criteria

- Confirmation summary displayed with all captured fields
- File path shown for user reference
- Next steps mentioned (pipeline, list-research)
- No files modified in this step
- Workflow ended cleanly without unsolicited suggestions
