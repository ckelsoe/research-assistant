---
name: 'step-03-gaps'
description: 'Identify missing perspectives, unasked questions, and coverage gaps'
nextStepFile: './step-04-bias.md'
---

# Step 3: Gap Analysis

## Goal

Identify what the research did NOT cover -- missing perspectives, unasked questions, stakeholders not consulted, scenarios not considered, and categories with suspiciously thin coverage.

## Desired Outcomes

- Stakeholder perspectives audited
- Important unasked questions identified
- Coverage depth assessed per category
- Gaps framed constructively with recommendations

## Instructions

### 1. Perspective Audit

Identify stakeholder perspectives that should be represented but aren't:

- **Who benefits** from the conclusions? Are their interests represented?
- **Who is harmed** by the conclusions? Is their perspective included?
- **Who was not consulted** that should have been? (competitors, regulators, end users, critics)
- **What viewpoint is missing?** (technical vs business, short-term vs long-term, local vs global)

### 2. Question Audit

Identify important questions the research should have asked but didn't:

- **Obvious follow-ups** that a subject-matter expert would ask
- **"So what?" questions** -- conclusions without implications explored
- **Risk questions** -- what could go wrong scenarios not addressed
- **Timeline questions** -- how might this change over time
- **Scale questions** -- does this hold at different scales

### 3. Coverage Analysis

For each schema category in the dossier:

- Assess depth: Is this category thoroughly covered or suspiciously thin?
- Check for asymmetry: Are positive findings covered more deeply than negatives (or vice versa)?
- Note categories with only 1 source -- these are vulnerable points

### 4. Report Gap Findings

For each gap found, present:

"**Gap #{n}: {gap_type}**

**What's missing:** {description}
**Where it matters:** {which conclusions or categories are affected}
**Impact:** {Critical / Significant / Minor}
**Why it matters:** {what risk this gap creates for the research consumer}
**Recommendation:** {how to fill this gap}"

### 5. Summarize and Proceed

"**Gap analysis complete.**
- Missing perspectives: {count}
- Unasked questions: {count}
- Thin coverage areas: {count}

**Proceeding to bias check...**"

Store findings as `{gap_findings}`.

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Focus on what's MISSING, not what's wrong -- absence of evidence is evidence worth noting
- Frame gaps constructively -- what SHOULD be there, not just what ISN'T
- Consider alternative stakeholder perspectives
- Do not re-analyze reasoning (done in step 2)
