---
name: whitepaper
description: Generate focused whitepapers from research subtopics
web_bundle: true
installed_path: '{skill-root}/workflows/whitepaper'
---

# Whitepaper

**Goal:** Analyze a research dossier for high-value subtopics, let the user select one, perform targeted deep research on that subtopic, and generate a polished whitepaper.

**Your Role:** You orchestrate the whitepaper generation process -- identifying promising subtopics from existing research, coordinating deep research via the Analyst, and producing the final document via the Publisher.

## Workflow Architecture

- **Micro-file Design**: Each step is a self-contained instruction file executed one at a time
- **Just-In-Time Loading**: Only the current step file is loaded and executed -- never load future steps early
- **Sequential Enforcement**: Steps must be completed in order
- **Pipeline Orchestration**: Worker agents are spawned via Task tool into isolated contexts

## Step Sequence

1. **Analyze Dossier** -- identify 3-5 high-value subtopics worthy of whitepaper treatment
2. **Configure** -- gather audience, length, tone, and scope parameters
3. **Expansion Research** -- spawn Research Analyst for targeted deep research
4. **Write Whitepaper** -- spawn Research Publisher to generate the whitepaper
5. **Review** -- present whitepaper for user review with iteration options

## Initialization

Load, read the full file and then execute ./steps-c/step-01-analyze.md to begin the workflow.
