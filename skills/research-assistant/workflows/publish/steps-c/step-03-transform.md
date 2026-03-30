---
name: 'step-03-transform'
description: 'Strip validation machinery from dossier and restructure content for target audience'
nextStepFile: './step-04-brand.md'
---

# Step 3: Content Transform

## Goal

Strip all validation machinery from the dossier (confidence scores, source tier classifications, appendix detail, verification annotations) and restructure the remaining substance for the target audience's register and information needs.

## Desired Outcomes

- All validation machinery stripped (confidence scores, source tiers, verification annotations)
- All substance preserved (findings, caveats, recommendations, key attributions)
- Content restructured appropriately for target audience
- User reviewed and approved the transform
- No invented or extrapolated content added

## Instructions

### 1. Identify Validation Machinery to Strip

Scan the dossier and identify all validation-specific elements that should NOT appear in the published deliverable:

**Strip these:**
- Confidence scores (e.g., "Confidence: HIGH", numerical scores)
- Source tier classifications (e.g., "Tier 1 source", "Primary/Secondary")
- Source appendix detail (full URL lists, access dates, retrieval metadata)
- Verification annotations (e.g., "Verified", "Unverified", audit markers)
- Internal cross-references to verification report
- Research methodology notes (unless audience is Technical)
- Raw data tables used for scoring (unless audience is Technical)

**Preserve these:**
- All findings and conclusions
- All caveats, limitations, and qualifications
- Key source attributions (simplified -- "according to [source]" not full citation blocks)
- Dates and timeframes
- Quantitative claims and their context
- Recommendations and implications

### 2. Restructure for Audience

Apply audience-specific restructuring:

**Executive:**
- Lead with conclusions and implications
- Key findings as concise bullet points
- Strategic context front and center
- Detail available but not leading -- push supporting evidence to later sections
- Remove methodology unless it affects confidence in conclusions

**Technical:**
- Preserve full analytical structure
- Keep methodology notes and caveats prominent
- Maintain detailed evidence chains
- Simplify only the validation scaffolding, not the substance
- Keep source attributions detailed

**Stakeholder:**
- Lead with context and relevance
- Balanced detail -- enough to understand, not enough to overwhelm
- Minimize jargon, explain domain-specific terms
- Clear section structure with progressive detail
- Recommendations clearly separated from findings

**Custom:**
- Apply the audience description from step 02 to calibrate structure and detail level

### 3. Produce Transformed Content

Generate the transformed deliverable content. This is the full body of the deliverable -- everything except the provenance line (step 05) and brand tone adjustments (step 04).

Structure the output with `##` Level 2 headers for main sections.

### 4. Present Transform for Review

Present the transformed content to the user:

"**Content transform complete.**

**Stripped:** {list what was removed -- e.g., confidence scores, source tier labels, verification annotations}
**Preserved:** {list key substance elements -- e.g., N findings, N caveats, N recommendations}
**Structure:** {describe the new structure -- e.g., 'Executive summary -> Key findings -> Implications -> Supporting detail'}

---

{Display the transformed content}

---

**Review the transform above.** Does the substance look complete? Anything important that was lost or anything that should still be stripped?"

Wait for user feedback.

### 5. Incorporate Feedback

If the user identifies issues:
- Restore any substance that was incorrectly stripped
- Remove any validation machinery that was incorrectly preserved
- Adjust structure as requested

If the user approves, proceed.

### 6. Present Menu

Display: "**Select:** [C] Continue to Brand Application"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input after presenting menu. Only proceed when user selects 'C'.

## Quality Criteria

- Accuracy is non-negotiable -- never lose substance during the transform
- Every fact, finding, and caveat from the dossier survives the transform
- No invented, extrapolated, or editorialized content added
- Brand tone not applied yet (that is step 04)
- Provenance not added yet (that is step 05)
- Transform presented for user review before proceeding
