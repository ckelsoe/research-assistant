---
name: 'step-05-republish'
description: 'Spawn Research Publisher to re-publish the refreshed and re-verified dossier'
nextStepFile: './step-06-complete.md'
---

# Step 5: Re-publish

## Goal

Spawn the Research Publisher agent via Task tool to re-generate the deliverable from the refreshed and re-verified dossier — applying the same brand and audience settings as the original publication.

## Desired Outcomes

- Original publication settings determined from existing deliverable or pipeline log
- Research Publisher spawned with complete refreshed dossier context
- Deliverable produced with provenance marking as refreshed version
- Materially updated sections noted in deliverable
- Pipeline log updated with re-publication metrics
- Proceeded to completion step

## Instructions

### 1. Determine Publication Settings

Check the existing deliverable in `{refresh_target}` to determine:

- Original audience/format (from pipeline log or deliverable header)
- Brand used (from pipeline log)
- Deliverable filename

If no existing deliverable is found, ask the user for audience and format preferences.

Store as `{publish_settings}`.

### 2. Spawn Research Publisher

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Publisher (Briefer) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-publisher.md

PUBLICATION PARAMETERS:
- Dossier path: {refresh_dossier_path}
- Deliverable output: {refresh_target}/{deliverable_filename}
- Context: This is a RE-PUBLICATION after a refresh pipeline updated the dossier

DOSSIER CONTENT:
{full refreshed and verified dossier content}

VERIFICATION REPORT:
{verification report summary — pass rate, key findings}

BRAND/AUDIENCE SETTINGS:
{publish_settings — audience, format, brand rules}

INSTRUCTIONS:
1. Read the refreshed dossier completely
2. Report progress: "Transforming dossier into {format}..."
3. Apply brand tone and formatting rules
4. Strip validation machinery, preserve substance
5. Include provenance note indicating this is a refreshed version with date
6. Note any sections that were materially updated during refresh
7. Write the deliverable to the specified output path
```

### 3. Handle Publication Results

**If publication succeeds:**

- Confirm the deliverable file was written
- Store deliverable path as `{deliverable_path}`

**If publication fails:**

Display: "**Publisher failed.** Error: {error_details}\nOptions:\n- **R** — Retry publication\n- **S** — Skip publication (dossier is still updated)\n- **X** — Abort"

Wait for user input.

### 4. Report Publication Results

Display:

"**Re-publication complete for: {refresh_subject}**

**Deliverable:** `{deliverable_path}`
**Format:** {format}
**Note:** Includes provenance marking as refreshed version.

**Proceeding to finalize...**"

### 5. Update Pipeline Log

Update pipeline log with:

- republish_date: current date
- republish_status: complete
- deliverable_path: {path}

### 6. Proceed to Finalize

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Original publication settings recovered from existing deliverable or pipeline log
- Publisher spawned with complete refreshed dossier content and verification summary
- Deliverable produced with provenance note indicating refreshed version and date
- Materially updated sections noted within the deliverable
- Pipeline log updated with re-publication metrics
- Error handling presented with retry/skip/abort options if Publisher fails
