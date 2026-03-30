---
name: 'step-02-reasoning'
description: 'Analyze reasoning chains -- identify inferential leaps, unsupported conclusions, circular logic'
nextStepFile: './step-03-gaps.md'
---

# Step 2: Reasoning Analysis

## Goal

Systematically analyze every reasoning chain in the dossier -- tracing how evidence leads to claims, claims build to conclusions, and conclusions support recommendations. Identify inferential leaps, unsupported conclusions, and circular reasoning.

## Desired Outcomes

- Every major conclusion traced back to its evidence chain
- Inferential leaps identified with severity and explanation
- Challenges are constructive with actionable suggestions
- Findings stored for the challenge report

## Instructions

### 1. Map Reasoning Chains

For each major conclusion or finding in the dossier:

- Trace the chain: source evidence -> intermediate claims -> conclusion
- Identify the logical connectors (because, therefore, suggests, indicates)
- Note the confidence level assigned

### 2. Challenge Each Chain

For each reasoning chain, evaluate:

**Inferential leaps:**
- Does the evidence actually support the claim, or is there an unstated assumption?
- Would the same evidence support a different conclusion?
- Is the leap proportional? (Small evidence -> big conclusion = red flag)

**Circular reasoning:**
- Does any claim cite itself or a derivative as evidence?
- Are any conclusions used to justify the premises that support them?

**Correlation vs causation:**
- Are correlations presented as causal relationships?
- Are there confounding factors not considered?

**Generalization:**
- Are conclusions from specific cases applied too broadly?
- Is anecdotal evidence treated as systematic?

### 3. Report Reasoning Findings

For each issue found, present:

"**Reasoning Challenge #{n}:**

**Claim:** {the specific claim being challenged}
**Evidence cited:** {what supports it}
**Issue:** {what's wrong with the reasoning}
**Severity:** {Critical / Significant / Minor}
**Why it matters:** {what could go wrong if this reasoning is accepted unchallenged}
**Suggestion:** {how to strengthen this reasoning}"

### 4. Summarize and Proceed

"**Reasoning analysis complete.**
- Chains analyzed: {count}
- Challenges raised: {count} ({critical}/{significant}/{minor})

**Proceeding to gap analysis...**"

Store findings as `{reasoning_challenges}`.

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Challenge reasoning, not the researcher -- this is constructive
- Every challenge must explain WHY it matters and what could go wrong
- Focus on reasoning, not sources (source verification is the Auditor's job)
- Do not accept conclusions at face value without tracing the reasoning chain
