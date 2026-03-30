---
name: 'step-01-load'
description: 'Load dossier, verification report, and brand YAML; gate on verification'
nextStepFile: './step-02-audience.md'
---

# Step 1: Load Inputs

## Goal

Load all required inputs for the publish pipeline -- the validated dossier, its verification report, and the brand YAML -- and halt if any required input is missing or the dossier has not been verified.

## Desired Outcomes

- Dossier loaded and stored in session context
- Verification report found, loaded, date and confidence extracted
- Brand YAML found, loaded, tone/language rules noted
- All inputs confirmed to user
- Auto-proceeds to step 02

## Instructions

### 1. Resolve Dossier Path

If a dossier path was provided as part of the workflow invocation, use it directly.

If no path was provided:

"**Which dossier would you like to publish?**

Please provide the path to the dossier file."

Wait for user to provide the path.

### 2. Load Dossier

Read the dossier file at the provided path.

**If dossier not found:**
"**HALT: Dossier not found at the specified path.**
Path: {provided path}
Please check the path and try again."
STOP -- do not proceed.

**If dossier found:**
Store the full dossier content in session context. Note the dossier's directory path for locating the verification report and writing the output.

### 3. Load Verification Report

Look for the verification report in the same directory as the dossier. The verification report filename follows the pattern `verification-report.md` or `*-verification-report.md` in the dossier's directory.

**If verification report not found:**
"**HALT: No verification report found for this dossier.**
Expected location: {dossier directory}/verification-report.md
This dossier has not been verified. Run the verification-audit workflow first before publishing."
STOP -- do not proceed.

**If verification report found:**
Store the verification report content in session context. Extract the verification date and overall confidence summary for use in the provenance step.

### 4. Load Brand YAML

Look for the brand configuration. Check these locations in order:
1. `{research-root}/brand.yaml`
2. `{research-root}/config/brand.yaml`
3. Brand YAML path from module config (if specified)

**If brand YAML not found:**
"**HALT: Brand YAML not found.**
Searched: {research-root}/brand.yaml, {research-root}/config/brand.yaml
The brand YAML defines tone and language rules for published deliverables. Please create one or provide the path."
STOP -- do not proceed.

**If brand YAML found:**
Store the brand configuration in session context. Briefly note the key tone/language rules that will govern the output.

### 5. Confirm Inputs Loaded

"**All inputs loaded successfully.**

- **Dossier:** {dossier filename} ({word/section count})
- **Verification Report:** {verification report filename} -- Verified {date}, overall confidence: {summary}
- **Brand YAML:** {brand filename} -- tone: {tone summary}

**Proceeding to audience selection...**"

### 6. Auto-Proceed to Next Step

After confirming all inputs are loaded, immediately load, read entire file, then execute {nextStepFile}.

This is an auto-proceed init step with no user menu choices. If any input is missing, HALT -- do not proceed.

## Quality Criteria

- All three inputs (dossier, verification report, brand YAML) successfully loaded
- Verification gate enforced -- never publish unverified research
- No content transformation begun in this step
- User informed of what was found and loaded
