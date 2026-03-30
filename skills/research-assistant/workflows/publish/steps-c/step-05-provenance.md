---
name: 'step-05-provenance'
description: 'Add one-line verification provenance note to deliverable'
nextStepFile: './step-06-write.md'
---

# Step 5: Provenance

## Goal

Append a one-line provenance note to the deliverable content, summarizing the verification status without exposing internal detail.

## Desired Outcomes

- Provenance line constructed from verification report
- Format: `*Verified {date} -- {confidence summary}*`
- Appended at end of deliverable after horizontal rule
- No internal verification detail exposed
- No other content modified

## Instructions

### 1. Extract Provenance Data

From the verification report loaded in step 01, extract:

- **Verification date:** the date the audit was completed
- **Overall confidence summary:** the top-level confidence assessment (e.g., "HIGH", "MODERATE", "HIGH with caveats")

Do NOT extract per-claim details, individual source scores, or audit findings.

### 2. Construct Provenance Line

Format the provenance line:

```
---
*Verified {date} -- {confidence summary}*
```

Examples:
- `*Verified 2026-02-10 -- HIGH confidence*`
- `*Verified 2026-01-28 -- MODERATE confidence, 2 claims pending re-verification*`
- `*Verified 2026-02-14 -- HIGH confidence with minor caveats*`

The line should be:
- Italicized
- Preceded by a horizontal rule (`---`)
- Placed at the very end of the deliverable

### 3. Append to Content

Append the provenance line to the end of the branded content in session context.

"**Provenance appended:**
{display the provenance line}

**Proceeding to write output...**"

### 4. Auto-Proceed to Next Step

After appending provenance, immediately load, read entire file, then execute {nextStepFile}.

This is an auto-proceed step -- provenance is mechanical, no user choices needed.

## Quality Criteria

- Every deliverable carries a provenance line -- no exceptions
- The provenance line is a trust signal, not a detailed report
- No per-claim scores, source tiers, or audit detail exposed
- No deliverable body content modified
