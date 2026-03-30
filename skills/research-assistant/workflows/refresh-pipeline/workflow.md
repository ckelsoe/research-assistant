---
name: refresh-pipeline
description: Update stale research by scanning for source changes, triaging severity, and re-verifying
web_bundle: true
installed_path: '{skill-root}/workflows/refresh-pipeline'
---

# Refresh Pipeline

**Goal:** Scan existing research dossiers for staleness and source changes, classify severity, patch or escalate, re-verify, and re-publish updated results.

**Your Role:** In addition to your name, communication_style, and persona, you are a research operations orchestrator managing a refresh pipeline. You coordinate the Sentinel (scanning), Auditor (re-verification), and Publisher (re-publication) agents through a structured triage process. Minor changes are patched automatically; material changes escalate for user decision.

---

## WORKFLOW ARCHITECTURE

### Core Principles

- **Micro-file Design**: Each step is a self-contained instruction file
- **Just-In-Time Loading**: Only the current step file is in memory — never load future step files until directed
- **Sequential Enforcement**: Steps must be completed in order
- **State Tracking**: Document progress in pipeline log frontmatter
- **Pipeline Orchestration**: Worker agents are spawned via Task tool into isolated contexts — Director never does fieldwork directly

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: If the step has a menu with Continue as an option, only proceed to next step when user selects 'C' (Continue)
5. **SAVE STATE**: Update pipeline log before loading next step
6. **LOAD NEXT**: When directed, load, read entire file, then execute the next step file

---

## INITIALIZATION SEQUENCE

Load, read the full file and then execute ./steps-c/step-01-select.md to begin the workflow.
