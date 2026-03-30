---
name: 'step-02-scan'
description: 'Spawn Research Sentinel to scan selected dossier sources for changes'
nextStepFile: './step-03-triage.md'
---

# Step 2: Staleness Scan

## Goal

Spawn the Research Sentinel agent via Task tool to scan the selected dossier's cited sources for changes, dead links, and drift — producing a structured change report.

## Desired Outcomes

- Dossier content extracted with all cited URLs and associated claims
- Research tools detected for scanning
- Research Sentinel spawned with complete dossier context
- All URLs scanned with progress reporting
- Changes classified by severity tier (COSMETIC/MINOR/MATERIAL/ENTITY EVENT)
- Scan report written to `{refresh_target}/scan-report.md`
- Pipeline log updated with scan results
- Summary displayed before proceeding to triage

## Instructions

### 1. Prepare Scan Context

Read the target dossier at `{refresh_dossier_path}` and extract:

- All cited URLs with their associated claims
- Current confidence scores per category
- Schema used and categories covered
- Last verification date from pipeline log

Store as `{scan_context}`.

### 2. Detect Available Tools

Check for available tools in priority order:

1. **Playwright CLI** — check availability
2. **Firecrawl MCP** — check availability
3. **WebFetch** — always available as baseline

Store as `{detected_tools}`.

### 3. Spawn Research Sentinel

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Sentinel from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-sentinel.md

SCAN PARAMETERS:
- Dossier to scan: {refresh_dossier_path}
- Primary scan tool: {detected_tools}

DOSSIER CONTENT:
{full dossier content with all URLs and claims}

INSTRUCTIONS:
1. Extract every cited URL from the dossier
2. Report progress: "Scanning URL N of M: {url}..."
3. For each URL: check liveness, detect soft 404s, compare content to original claims
4. Classify each change into severity tiers:
   - COSMETIC: URL redirects, minor text changes, no impact on claims
   - MINOR: Updated data points, new versions mentioned, claims still valid
   - MATERIAL: Significant content changes that affect claim validity
   - ENTITY EVENT: Acquisitions, shutdowns, pivots that invalidate conclusions
5. Produce a structured scan report in markdown with:
   - Total URLs scanned
   - Changes found per severity tier
   - Specific findings with URL, old state, new state, severity, recommendation
   - Overall assessment: clean/minor patches needed/material review required

Write the scan report to: {refresh_target}/scan-report.md
```

### 4. Handle Scan Results

**If scan succeeds:**

- Read the scan report from `{refresh_target}/scan-report.md`
- Store as `{scan_report}`
- Count findings by severity tier
- Store severity summary as `{severity_summary}`

**If scan fails:**

Display: "**Sentinel scan failed.** Error: {error_details}\nOptions:\n- **R** — Retry the scan\n- **S** — Skip scan and proceed to manual review\n- **X** — Abort refresh pipeline"

Wait for user input and handle accordingly.

### 5. Report Scan Results

Display scan summary:

"**Scan complete for: {refresh_subject}**

**URLs scanned:** {total_urls}
**Changes detected:** {total_changes}
- Cosmetic: {count}
- Minor: {count}
- Material: {count}
- Entity Events: {count}

**Assessment:** {overall_assessment}

**Proceeding to triage...**"

### 6. Update Pipeline Log

Update the pipeline log at `{refresh_target}/pipeline-log.md` with:

- scan_date: current date
- scan_status: complete
- total_urls_scanned: {count}
- changes_detected: {severity_summary}

### 7. Proceed to Triage

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Sentinel spawned with complete dossier context including all URLs and claims
- All URLs scanned with progress reporting to user
- Changes classified into correct severity tiers (COSMETIC/MINOR/MATERIAL/ENTITY EVENT)
- Scan report written with structured findings per URL
- Pipeline log updated with scan metrics before proceeding
- Error handling presented with retry/skip/abort options if Sentinel fails
