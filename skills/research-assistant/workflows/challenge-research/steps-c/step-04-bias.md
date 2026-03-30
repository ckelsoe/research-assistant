---
name: 'step-04-bias'
description: 'Check for confirmation, selection, recency, authority, and survivorship biases'
nextStepFile: './step-05-report.md'
---

# Step 4: Bias Check

## Goal

Systematically check the dossier for cognitive biases that may have shaped the research -- confirmation bias, selection bias, recency bias, authority bias, and survivorship bias.

## Desired Outcomes

- All five bias categories systematically checked
- Biases identified with specific evidence from the dossier
- Affected conclusions clearly linked
- Constructive mitigations suggested

## Instructions

### 1. Confirmation Bias Check

Look for patterns where the research may have:
- Sought evidence that confirms a pre-existing hypothesis while ignoring contradictory evidence
- Weighted confirming sources more heavily than disconfirming ones
- Interpreted ambiguous evidence in favor of the conclusion
- Dismissed or downplayed contradictory findings

**Signal:** If every source agrees and no caveats are noted, confirmation bias is likely.

### 2. Selection Bias Check

Look for patterns where the research may have:
- Used a non-representative sample of sources (e.g., only vendor marketing materials)
- Systematically excluded certain types of evidence (user complaints, negative reviews, regulatory findings)
- Cherry-picked data points that support the conclusion
- Relied on sources from a single perspective (e.g., all pro-technology, all pro-vendor)

**Signal:** If source diversity is low or skewed, selection bias is likely.

### 3. Recency Bias Check

Look for patterns where the research may have:
- Over-weighted recent developments while ignoring historical context
- Treated current trends as permanent shifts without evidence
- Dismissed older but still relevant data
- Assumed recent growth rates will continue indefinitely

**Signal:** If most sources are from the last 6 months and no historical context is provided, recency bias may be present.

### 4. Authority Bias Check

Look for patterns where the research may have:
- Treated claims from authoritative sources as more reliable without verification
- Used brand name or institutional reputation as a proxy for accuracy
- Deferred to expert opinion without checking if the expert has relevant expertise
- Cited analyst reports as definitive without noting their potential conflicts of interest

**Signal:** If confidence scores correlate more with source prestige than evidence quality, authority bias may be present.

### 5. Survivorship Bias Check

Look for patterns where the research may have:
- Only studied successful examples while ignoring failures
- Drew conclusions from surviving companies/products without accounting for those that failed
- Used success stories as evidence for strategies without checking if failed attempts used the same strategies

**Signal:** If the research only discusses what worked and never what didn't, survivorship bias may be present.

### 6. Report Bias Findings

For each bias detected, present:

"**Bias #{n}: {bias_type}**

**Evidence of bias:** {specific examples from the dossier}
**Pattern:** {the systematic pattern, not just one instance}
**Affected conclusions:** {which findings are potentially compromised}
**Severity:** {Critical / Significant / Minor}
**Mitigation:** {what would reduce this bias -- additional sources, alternative framing, caveats to add}"

### 7. Summarize and Proceed

"**Bias check complete.**
- Confirmation bias: {detected/not detected} -- {severity if detected}
- Selection bias: {detected/not detected} -- {severity if detected}
- Recency bias: {detected/not detected} -- {severity if detected}
- Authority bias: {detected/not detected} -- {severity if detected}
- Survivorship bias: {detected/not detected} -- {severity if detected}

**Proceeding to generate challenge report...**"

Store findings as `{bias_findings}`.

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- All five bias categories checked -- do not skip any
- Bias detection is about patterns, not individual data points
- Name the bias explicitly -- don't just flag suspicious patterns
- Biases identified with specific evidence, not vague assertions
- Affected conclusions clearly linked to each detected bias
- Treat bias detection as a spectrum, not binary (all/nothing)
