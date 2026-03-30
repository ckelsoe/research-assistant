---
name: 'step-03-research'
description: 'Spawn Research Analyst via Task tool to produce structured dossier'
nextStepFile: './step-04-verify.md'
completeStepFile: './step-06-complete.md'
---

# Step 3: Deep Research

## Goal

Spawn the Research Analyst agent via Task tool with all required context — schema, domains, brand, subject, file paths, and tool directive — and produce a structured, source-anchored dossier. Then route based on autonomy level.

## Desired Outcomes

- Research Analyst spawned with complete context (schema, domains, brand, subject, paths, tool directive)
- Structured dossier produced at `{topic_folder}/dossier.md` with source-anchored claims and confidence scoring
- Inter-agent context file updated with observations for downstream agents
- Pipeline log updated with research stage results (categories, sources, confidence distribution)
- Correct routing based on autonomy level (autopilot auto-proceeds, stage-gated presents gate)
- Error handling followed if Analyst fails (retry/skip/abort options)

## Instructions

### 1. Announce Research Stage

**If autopilot:**
"**Stage 1/{total_stages}: Deep Research** — Dispatching Research Analyst..."

**If stage-gated:**
"**Stage 1/{total_stages}: Deep Research** — Dispatching Research Analyst. Will present results for your review when complete."

### 2. Load Schema and Domain Content

Read the full content of the selected schema YAML file at `{selected_schema.file_path}`.

For each domain in `{selected_domains}`, read the full content of its YAML file.

If `{selected_brand}` has a file path, read the brand YAML file.

These contents will be passed to the Analyst agent in its prompt.

### 3. User Communication (Required)

Before spawning the agent, inform the user:

"**Dispatching Research Analyst.** It will research {research_subject} across {category_count} schema categories using {detected_tools}. This typically takes 10-25 minutes depending on category count and source availability. I'll report results when it completes."

### 4. Spawn Research Analyst

Use the Task tool to spawn a subagent with subagent_type "general-purpose".

**Construct the prompt with ALL required context:**

```
You are the Research Analyst (Fieldwork) from the research-assistant module.

Read your agent definition at:
{skill-root}/references/agents/research-analyst.md

RESEARCH PARAMETERS:
- Subject: {research_subject}
- Output dossier path: {research-root}/{schema_parent_folder}/{topic_folder}/dossier.md
- Primary research tool: {detected_tools}

SCHEMA (research template — follow this structure exactly):
{full schema YAML content}

DOMAINS (specialized knowledge to apply):
{full domain YAML content for each selected domain}

BRAND (output tone rules):
{brand YAML content, or "Use default professional-analyst tone: terse factual prose, source citations inline, confidence markers on every claim."}

QI RULES (if loaded):
{qi_rules content, or "No QI rules loaded."}

INTER-AGENT CONTEXT:
- Context file: {pipeline_context_path}
- Read any existing messages before starting work
- During research, write observations relevant to downstream agents (Auditor, Publisher):
  - Sources that required multiple retries or returned inconsistent data (type: heads_up)
  - Categories where source quality was notably weak (type: quality_flag)
  - Patterns that the Auditor should scrutinize (type: pattern_alert)
  - Recommendations for the Publisher on emphasis or caveats (type: recommendation)
- Message format: append to the messages list in the YAML file:
  from: research-analyst, to: {target_agent}, timestamp: {ISO}, type: {type}, message: {text}

INSTRUCTIONS:
1. Research the subject category by category per the schema
2. PROGRESS REPORTING: Before starting each category, output a status line:
   "Researching category N of M: {category_name}..."
   After completing each category, output:
   "Category N complete — {source_count} sources, {claim_count} claims"
3. Every factual claim must have a working URL source
4. Apply confidence scoring: High (3+ independent sources), Medium (single source), Low (inference)
5. Apply domain knowledge to guide source selection and analysis depth
6. Track product categories: maintain a `product_categories` section in dossier frontmatter
   listing every product category, tool type, or vendor ecosystem referenced. For each:
   - name: generic category name (e.g., "Digital Application & Intake Platforms")
   - vendors_named: [specific products/vendors mentioned]
   - status: mentioned | explored | gap-identified
7. Initialize `derived_artifacts: []` in dossier frontmatter — this list will be populated by
   downstream pipeline steps as they create derivative documents (deliverable, whitepaper, etc.)
8. Write the completed dossier to the output path
9. Return a summary of what was produced: category count, source count, confidence distribution, product categories tracked

CHECKPOINT PROTOCOL:
1. Before starting, check if dossier.md already exists at the output path
2. If it exists and has a research_checkpoint in frontmatter with categories_remaining,
   resume from the first remaining category — do NOT re-research completed categories
3. After completing each category, write it to the dossier immediately and update
   the research_checkpoint frontmatter:
   - categories_completed: [list]
   - categories_remaining: [list]
   - last_checkpoint: {timestamp}
   - sources_fetched: {running_count}
4. On final category completion, remove research_checkpoint from frontmatter
```

### 5. Handle Analyst Response

**On success:**
- Read the produced dossier to verify it was written
- Extract summary metrics: category count, source count, confidence distribution
- Store dossier path as `{dossier_path}`

**On failure or error:**
- Update pipeline log: `stages.research: FAILED`
- Log the error details in pipeline log
- Present to user:
  "**Research stage failed.** {error details}

  **Options:**
  **[R] Retry** — Spawn Analyst again
  **[S] Skip** — Proceed to next stage (verification will have no dossier)
  **[X] Abort** — End pipeline, preserve pipeline log for resume"
- Wait for user selection and handle accordingly
- If retry: loop back to section 3
- If skip: proceed to section 5 with warning
- If abort: update pipeline log status to ABORTED, then HALT

### 6. Update Pipeline Log

Read the pipeline log at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md`.

Update frontmatter:
- `stages.research.status: complete`
- `stages.research.categories_done: {count}`
- `stages.research.categories_total: {count}`
- `stages.research.last_checkpoint: {current_timestamp}`
- `files.dossier: '{dossier_path}'`
- If stage-gated: `gates.research: '{gate_path}'`

Append to the log body:

```markdown
## Research Stage

- **Status:** Complete
- **Dossier:** {dossier_path}
- **Categories researched:** {count}
- **Sources cited:** {count}
- **Confidence distribution:** {High: N, Medium: N, Low: N}
- **Completed:** {current_timestamp}
```

### 7. Route Based on Autonomy Level

**If autopilot:**

"**Research complete.** {source_count} sources across {category_count} categories. Proceeding to verification..."

Immediately load, read entire file, then execute {nextStepFile}.

**If stage-gated:**

Write gate artifact to `{topic_folder}/gates/gate-01-research-complete.md` with:

```
---
gate: research-complete
gate_number: 1
pipeline_id: {pipeline_id}
subject: {subject}
status: awaiting_approval
created: {timestamp}
stage: research
next_stage: {verification | challenge}
artifact: {dossier_path}
---

## Research Complete — Gate Review

### Summary
{1-2 sentence summary of what was researched — topic, schema used, scope}

### Confidence Overview
| Category | Confidence | Sources |
|----------|-----------|---------|
| {for each category: name, confidence level, source count} |

### Key Findings
{Top 3-5 findings from the dossier — one bullet each}

### Flagged Items
{Any low-confidence categories or data points with no sources}
{If none: "No items flagged."}

### Artifacts
- **Dossier:** `{dossier_path}`

### Recommendation
{Brief recommendation: proceed to verification, or flag concerns}

---
*Gate artifact generated by research-assistant pipeline. Review offline and resume with [RS].*
```

Present research results summary:

"Gate artifact written to `{topic_folder}/gates/gate-01-research-complete.md`. You can review offline and resume later with [RS].

**Research complete. Stage results:**

**Dossier:** `{dossier_path}`
**Categories:** {count}
**Sources:** {count}
**Confidence:** High: {n}, Medium: {n}, Low: {n}

Review the dossier, then select an option.

**[C] Continue** to verification
**[X] Abort** pipeline"

Wait for user selection.

#### Menu Handling Logic:

- IF C: Confirm pipeline log is updated, then load, read entire file, then execute {nextStepFile}
- IF X: Update pipeline log status to ABORTED_BY_USER, then HALT
- IF Any other: help user, then redisplay menu

**If partial (and this was a selected stage):**

Present results, then check if more partial stages remain:
- If verify or publish also selected: confirm pipeline log is updated, then load the next selected stage's step file
- If this was the only selected stage: confirm pipeline log is updated, then load, read entire file, then execute {completeStepFile}

#### Execution Rules:

- ALWAYS halt and wait for user input if stage-gated or partial
- For autopilot: auto-proceed after reporting summary
- NEVER skip pipeline log update regardless of autonomy level

## Quality Criteria

- Analyst spawned with complete context — schema, domains, brand, subject, paths, tool directive all included
- Dossier produced and verified to exist at expected path
- Pipeline log updated with research stage metrics
- Correct routing: autopilot auto-proceeds, stage-gated presents gate and waits, partial checks remaining stages
- Error handling presented with retry/skip/abort options if Analyst fails
- User informed before spawning and after completion
