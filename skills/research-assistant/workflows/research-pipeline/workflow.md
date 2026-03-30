---
name: research-pipeline
description: Full end-to-end research pipeline from intake to published deliverable
web_bundle: true
installed_path: '{skill-root}/workflows/research-pipeline'
---

# Research Pipeline

**Goal:** Execute full end-to-end research from intake to polished deliverable — orchestrating Research Analyst, Research Auditor, and Research Publisher agents through a configurable pipeline with three autonomy levels.

**Your Role:** In addition to your name, communication_style, and persona, you are also a research operations orchestrator managing an autonomous pipeline. You handle intake, configuration, worker agent coordination, and quality-assured delivery. The user describes what they need researched; you handle how it gets done.

---

## WORKFLOW ARCHITECTURE

### Core Principles

- **Micro-file Design**: Each step is a self-contained instruction file
- **Just-In-Time Loading**: Only the current step file is in memory — never load future step files until directed
- **Sequential Enforcement**: Steps must be completed in order
- **State Tracking**: Document progress in pipeline log frontmatter
- **Sub-Step Checkpointing**: Worker agents write incremental progress to their output files. If interrupted, the next spawn detects partial output and resumes from the last checkpoint rather than restarting. Each agent owns its checkpoint state in its own artifact (dossier for Analyst, verification report for Auditor).
- **Pipeline Orchestration**: Worker agents are spawned via Task tool into isolated contexts — Director never does fieldwork directly
- **Post-Pipeline Logging**: After the pipeline completes, any modifications to research artifacts or creation of derivative documents MUST be logged in the pipeline log's Post-Pipeline Amendments table and derivative_artifacts frontmatter list
- **Inter-Agent Context**: A shared `pipeline-context.yaml` file in the topic folder enables cross-stage communication between agents. Each agent reads context messages left by prior stages before starting work, and writes relevant observations for downstream agents. Message types: `heads_up` (informational), `pattern_alert` (potential issue), `quality_flag` (quality concern for downstream attention), `recommendation` (suggested action). The Director includes the context file path in every agent spawn prompt
- **Progress Reporting**: When spawning a long-running agent, the orchestrator MUST: (1) Tell the user what agent is being spawned and what it will do, (2) Provide an estimated duration range based on task scope, (3) Summarize results when the agent completes before proceeding

### Pipeline Flow Variants

The pipeline supports optional extension stages selected during intake:

- **Standard (3 stages):** Init → Intake → Research → Verify → Publish → **Comment Review** → **Target ID** → Complete
- **With Challenge (4 stages):** Init → Intake → Research → Verify → **Challenge** → Publish → **Comment Review** → **Target ID** → Complete
- **With Whitepaper (4 stages):** Init → Intake → Research → Verify → Publish → **Comment Review** → **Target ID** → **Whitepaper** → Complete
- **Full (5 stages):** Init → Intake → Research → Verify → **Challenge** → Publish → **Comment Review** → **Target ID** → **Whitepaper** → Complete

Challenge inserts between Verify and Publish — it validates reasoning quality before the dossier is published. Critical findings can trigger a dossier patch via targeted Analyst re-spawn. Comment Review runs after Publish — it scans the deliverable for unresolved `%%Comment%%`, `[!comment]`, and `%%TODO%%` markers, presents each to the user for resolution, and ensures no open questions ship in the final output. Target ID runs after Comment Review — it scans the deliverable for product categories, vendor references, tool types, and market gaps, producing a prioritized `research-targets.md` backlog of follow-up research opportunities. Whitepaper appends after Target ID — it generates a focused deep-dive document on a user-selected subtopic from the research. Extension stages follow the same autonomy routing pattern as core stages. Default is "Neither" — standard pipeline unchanged if not selected.

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: If the step has a menu with Continue as an option, only proceed to next step when user selects 'C' (Continue)
5. **SAVE STATE**: Update pipeline log before loading next step
6. **LOAD NEXT**: When directed, load, read entire file, then execute the next step file

---

## INITIALIZATION SEQUENCE

Load, read the full file and then execute ./steps-c/step-01-init.md to begin the workflow.
