---
name: 'step-01-analyze'
description: 'Analyze dossier for high-value subtopics worthy of whitepaper treatment'
nextStepFile: './step-02-select.md'
---

# Step 1: Analyze Dossier for Subtopics

## Goal

Analyze a research dossier and identify 3-5 high-value subtopics that merit deeper exploration as standalone whitepapers.

## Desired Outcomes

- Dossier fully analyzed for subtopics
- 3-5 genuinely insightful candidates presented
- Each candidate has a clear rationale
- User selected a topic

## Instructions

### 1. Select Source Dossier

Scan `{research-root}` recursively for `dossier.md` files.

Present available dossiers:

"**Select a dossier as the source for whitepaper generation:**

| # | Subject | Schema | Created |
|---|---------|--------|---------|
| 1 | {subject} | {schema} | {date} |
..."

Wait for user selection. Store:
- `{source_dossier_path}` -- path to dossier.md
- `{source_subject}` -- research subject
- `{source_folder}` -- folder containing the dossier

### 2. Analyze for Subtopics

Read the full dossier and identify subtopics worth deep exploration:

**What makes a good whitepaper subtopic:**
- A finding that surprised or challenged assumptions
- A trend or pattern that has broader implications
- A technical area that would benefit from deeper analysis
- A comparison or evaluation that merits standalone treatment
- An emerging topic mentioned but not fully explored in the dossier

**What does NOT make a good subtopic:**
- A simple restatement of a dossier section
- A topic too narrow for meaningful depth
- A topic too broad to cover in a whitepaper

### 3. Present Subtopic Candidates

"**Whitepaper subtopic candidates from: {source_subject}**

| # | Subtopic | Why It Merits a Whitepaper | Estimated Depth |
|---|----------|---------------------------|-----------------|
| 1 | {title} | {1-2 sentence rationale} | {brief/standard/deep} |
| 2 | {title} | {rationale} | {depth} |
| 3 | {title} | {rationale} | {depth} |
..."

Present 3-5 candidates.

Display: "Select a subtopic, or describe your own:"

Wait for user input. Store selected subtopic as `{whitepaper_topic}` and `{whitepaper_rationale}`.

### 4. Proceed

Display: "**Selected: {whitepaper_topic}**\nProceeding to configuration..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Subtopic suggestions are genuinely insightful, not just chapter headings
- Each candidate explains why it merits whitepaper treatment
- Do not begin writing the whitepaper in this step
- User must select a topic before proceeding
