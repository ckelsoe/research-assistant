---
name: 'step-03-triage'
description: 'Classify scan findings by severity, auto-patch minor changes, escalate material changes to user'
nextStepFile: './step-04-reverify.md'
---

# Step 3: Triage

## Goal

Process scan findings by severity — auto-patching cosmetic and minor changes in the dossier, and escalating material changes and entity events to the user for decision.

## Desired Outcomes

- Clean scans detected and handled with timestamp update only
- All cosmetic changes auto-patched (URL redirects, minor text)
- All minor changes auto-patched with confidence adjustments as needed
- All material changes escalated to user with full context and options
- All entity events escalated with strong advisory and full-reresearch option
- User decisions applied to dossier (patch/re-research flag/ignore)
- Patched dossier written to disk
- Pipeline log updated with triage metrics
- Categories flagged for re-research tracked for next step

## Instructions

### 1. Check for Clean Scan

If the scan report shows zero changes detected:

Display: "**Clean scan — no changes detected.**\nAll sources are current. Updating verification timestamp."

Update the dossier's last_verified_date to today, update pipeline log, then skip to step 7 (proceed to re-verify for timestamp update).

### 2. Auto-Patch Cosmetic Changes

For each COSMETIC finding in the scan report:

- Update the cited URL in the dossier if it redirected
- No confidence score changes needed
- Log the patch

Display: "**Auto-patched {count} cosmetic change(s):** {brief list}"

### 3. Auto-Patch Minor Changes

For each MINOR finding in the scan report:

- Update the relevant data points in the dossier
- Adjust confidence scores if evidence changed (e.g., a source now says something slightly different)
- Log each patch with what changed and why

Display: "**Auto-patched {count} minor change(s):**\n- {finding}: {what was patched}"

### 4. Escalate Material Changes

For each MATERIAL finding:

Display with full context:
"**Material change detected — requires your decision:**

**Finding:** {description}
**Source:** {url}
**What changed:** {old_state} -> {new_state}
**Impact:** {which claims/categories are affected}
**Recommendation:** {Sentinel's recommendation}

**Options:**
- **P** — Patch with updated information (if the change is clear)
- **R** — Flag for full re-research of affected categories
- **I** — Ignore this change (keep current content)
"

Wait for user decision on each material finding. Store decisions.

### 5. Escalate Entity Events

For each ENTITY EVENT finding:

Display with strong advisory:
"**Entity event detected — significant impact:**

**Event:** {description} (e.g., company acquired, product discontinued)
**Source:** {url}
**Impact:** {scope of invalidation}

**Advisory:** This type of change may invalidate substantial portions of the research. Consider whether a partial refresh is sufficient or if full re-research is needed.

**Options:**
- **P** — Patch affected sections with event context
- **R** — Flag affected categories for full re-research
- **F** — Abort refresh and start a full new research pipeline instead
"

Wait for user decision. Store decisions.

### 6. Apply User Decisions

For each user decision:

- **Patch:** Apply the user-approved changes to the dossier. Adjust confidence scores as needed.
- **Re-research flag:** Mark affected categories for re-research. Store as `{reresearch_categories}`.
- **Ignore:** Leave content unchanged, add a note that the finding was reviewed and dismissed.
- **Full re-research:** Abort the refresh pipeline and suggest running [NR] New Research.

If any categories are flagged for re-research, note: "**{count} categories flagged for re-research.** These will be re-researched during the re-verification step."

### 7. Write Patched Dossier

Write the updated dossier to `{refresh_dossier_path}` (overwrite the original).

Display:
"**Triage complete.**
- Auto-patched: {cosmetic_count} cosmetic, {minor_count} minor
- User decisions: {material_count} material, {entity_count} entity events
- Categories flagged for re-research: {reresearch_count}

**Proceeding to re-verification...**"

### 8. Update Pipeline Log

Update pipeline log with:

- triage_date: current date
- auto_patches: {count}
- user_escalations: {count}
- reresearch_categories: {list or "none"}

### 9. Proceed to Re-verify

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Cosmetic and minor changes auto-patched without user involvement
- Material changes escalated with full context (finding, source, what changed, impact, recommendation)
- Entity events escalated with strong advisory about potential scope of invalidation
- User decisions applied accurately — patches correct, re-research flags stored, ignores annotated
- Patched dossier written to disk before proceeding
- Pipeline log updated with triage metrics (auto-patches, escalations, re-research flags)
- Never auto-patches material or entity-level changes
- Never escalates cosmetic changes to user
