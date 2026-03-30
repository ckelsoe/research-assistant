---
name: 'step-05-report'
description: 'Generate comprehensive challenge report consolidating all findings'
---

# Step 5: Challenge Report

## Goal

Consolidate all findings from reasoning analysis, gap identification, and bias checks into a comprehensive challenge report -- a document that strengthens the research by making its weaknesses visible and actionable.

## Desired Outcomes

- Comprehensive report written with all findings consolidated
- Overall assessment provided with clear severity breakdown
- Actionable recommendations organized by priority
- Report file written to dossier folder
- Summary presented to user with next steps

## Instructions

### 1. Generate Challenge Report

Write the challenge report to `{challenge_target}/challenge-report.md` with the following structure:

```markdown
---
type: challenge-report
subject: '{challenge_subject}'
dossier: '{challenge_dossier_path}'
date: '{current_date}'
reasoning_challenges: {count}
gaps_identified: {count}
biases_detected: {count}
overall_assessment: '{robust/adequate/needs-work/unreliable}'
---

# Challenge Report: {challenge_subject}

## Executive Summary

{2-3 sentence assessment: overall strength of the research,
most significant challenges found, recommended action}

## Overall Assessment: {ROBUST / ADEQUATE / NEEDS WORK / UNRELIABLE}

**Reasoning soundness:** {strong/moderate/weak}
**Coverage completeness:** {comprehensive/adequate/gaps present/significant gaps}
**Bias risk:** {low/moderate/high}

## Reasoning Challenges

{All findings from step 2, organized by severity}

### Critical

{critical reasoning issues}

### Significant

{significant reasoning issues}

### Minor

{minor reasoning issues}

## Coverage Gaps

{All findings from step 3, organized by type}

### Missing Perspectives

{perspective gaps}

### Unasked Questions

{question gaps}

### Thin Coverage Areas

{coverage depth issues}

## Bias Assessment

{All findings from step 4}

{For each detected bias: evidence, pattern, affected conclusions, mitigation}

## Recommendations

### Must Address (before relying on this research)

{Critical and significant issues that should be resolved}

### Should Address (to strengthen the research)

{Moderate issues worth fixing}

### Consider (for thoroughness)

{Minor improvements}

## Methodology Note

This challenge report was produced by adversarial reasoning validation.
It evaluates the logic, completeness, and intellectual honesty of the
analysis -- not the sources themselves (source verification is the
Auditor's responsibility). A clean challenge report means the reasoning
is sound; it does not guarantee the underlying facts are correct.
```

### 2. Present Summary to User

Display:

"**Challenge report complete: {challenge_subject}**

---

**Overall Assessment:** {ROBUST / ADEQUATE / NEEDS WORK / UNRELIABLE}

**Findings:**
- Reasoning challenges: {count} ({critical_count} critical, {significant_count} significant, {minor_count} minor)
- Coverage gaps: {count} ({perspectives} perspective, {questions} question, {coverage} coverage)
- Biases detected: {count} ({list types detected})

**Report:** `{challenge_target}/challenge-report.md`

**What's next:**
- Address critical findings before relying on this research
- Consider re-running the pipeline with additional domains to fill coverage gaps
- Use [RF] Refresh to update the dossier with gap-filling research"

### 3. Workflow Complete

This is the final step. No next step to load. The workflow is complete.

## Quality Criteria

- The report is constructive -- it strengthens research, not attacks it
- All findings from steps 2-4 consolidated into the report
- Overall assessment provided with clear severity breakdown
- Actionable recommendations organized by priority (must/should/consider)
- Report file written to disk in the dossier folder
