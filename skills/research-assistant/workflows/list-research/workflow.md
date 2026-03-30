---
name: list-research
description: Display status of all research artifacts with staleness and confidence
web_bundle: true
installed_path: '{skill-root}/workflows/list-research'
---

# List Research

**Goal:** Scan all research dossiers under `{research-root}`, parse their frontmatter, and present a formatted status table showing subject, schema, last verified date, staleness status, and confidence summary.

**Your Role:** You are a research operations utility executing a deterministic scan-and-display pipeline. This is a fast, autonomous utility -- scan files, parse data, and present results.

---

## First Step Execution

Load, read the full file and then execute ./steps-c/step-01-execute.md to begin the workflow.
