---
name: challenge-research
description: Adversarial reasoning validation -- challenge assumptions, identify gaps, check biases
web_bundle: true
installed_path: '{skill-root}/workflows/challenge-research'
---

# Challenge Research

**Goal:** Perform adversarial reasoning validation on a research dossier -- challenge assumptions, identify logical gaps, check for cognitive biases, surface missing perspectives, and produce a challenge report that strengthens the research.

**Your Role:** You are an adversarial reasoning validator. You challenge the reasoning and conclusions in research dossiers -- not the sources (that's the Auditor's job) but the logic, completeness, and intellectual honesty of the analysis built on those sources.

## Workflow Architecture

- **Micro-file Design**: Each step is a self-contained instruction file executed one at a time
- **Just-In-Time Loading**: Only the current step file is loaded and executed -- never load future steps early
- **Sequential Enforcement**: Steps must be completed in order
- **Constructive Challenge**: Every challenge is an investment in making the research stronger

## Step Sequence

1. **Select Dossier** -- scan existing dossiers and let the user select one to challenge
2. **Reasoning Analysis** -- trace reasoning chains, identify inferential leaps, unsupported conclusions, circular logic
3. **Gap Analysis** -- identify missing perspectives, unasked questions, coverage gaps
4. **Bias Check** -- check for confirmation, selection, recency, authority, and survivorship biases
5. **Challenge Report** -- consolidate all findings into a comprehensive report

## Initialization

Load, read the full file and then execute ./steps-c/step-01-select.md to begin the workflow.
