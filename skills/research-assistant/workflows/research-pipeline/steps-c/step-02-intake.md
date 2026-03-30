---
name: 'step-02-intake'
description: 'Conversational intake — analyze research need, smart-suggest configuration, confirm parameters'
nextStepFile: './step-03-research.md'
---

# Step 2: Research Intake

## Goal

Understand the user's research need through natural conversation, intelligently infer the best configuration (schema, domains, brand, autonomy), confirm with the user, and initialize the pipeline.

## Desired Outcomes

- User's natural language prompt analyzed for configuration signals
- Smart suggestions presented with explanations for each choice
- Minimal follow-up questions (only for what couldn't be inferred)
- All required parameters confirmed (subject, schema, domains, brand, autonomy)
- Pipeline extensions offered and stored (chain_challenge, chain_whitepaper, total_stages)
- Scope estimate computed and advisory presented for broad topics
- Topic folder and gates subdirectory created
- Inter-agent context file initialized
- Pipeline log initialized with all intake parameters
- Correct routing to next step based on autonomy level

## Instructions

### 1. Open Research Prompt

"**What do you need to research?**

Describe your research need — the more context you provide, the better I can configure the pipeline. For example:
- *'Evaluate Acme Corp as a vendor for our healthcare platform'*
- *'Compare workflow engine options for our team'*
- *'Research the competitive landscape in the FinTech space'*"

Wait for user input. Store as `{user_research_prompt}`.

### 2. Analyze Research Prompt

Parse the user's description to extract signals:

**Subject signals:**
- Entity names (companies, products, technologies)
- Topic categories (vendor evaluation, technology assessment, competitive landscape)

**Schema signals:**
- Action verbs: "evaluate" -> vendor-evaluation, "compare" -> competitive-landscape, "assess" -> technology-assessment
- Nouns: "vendor", "competitor", "technology", "product"
- Match against available schemas in `{schemas_list}` by name, description, and purpose

**Domain signals:**
- Industry terms: "healthcare", "fintech", "logistics" -> match against `{domains_list}`
- Technology terms: "workflow engines", "APIs", "databases" -> match against `{domains_list}`
- Multiple domain hints can be extracted from a single prompt

**Depth/audience signals:**
- Urgency words: "quick overview" -> suggest autopilot, "thorough" -> suggest stage-gated
- Audience hints: "VP presentation", "technical team", "board" -> infer brand
- Scope hints: "deep dive" -> full pipeline, "just verify" -> partial mode

Store analysis as `{prompt_analysis}`.

### 3. Smart Suggest Configuration

Present the inferred configuration with brief explanations for each choice:

"**Here's what I recommend based on your request:**

**Subject:** {inferred_subject}
**Schema:** {inferred_schema} — *{why this schema fits}*
**Domains:** {inferred_domains} — *{why these domains apply}*
**Brand:** {inferred_brand} — *{why this tone}*
**Autonomy:** {inferred_autonomy} — *{why this level}*

{If anything couldn't be inferred, note it clearly:}
**Needs your input:**
- {what couldn't be determined and why}

Does this look right? You can confirm, adjust specific items, or describe what you'd change."

Wait for user response.

### 4. Clarify and Refine

**If user confirms:** Proceed to section 5.

**If user wants adjustments:** Apply their changes. For any remaining ambiguity, ask ONE focused follow-up question at a time — never a list of questions.

**If critical information is missing** (no matching schema, no subject identified):
Present available options for the missing parameter:
- For schema: show `{schemas_list}` with descriptions
- For domains: show `{domains_list}` with descriptions

Loop back to confirmation once all parameters are resolved.

### 5. Autonomy Level Confirmation

**If autonomy was inferred from the prompt:** Confirm it in the summary.

**If autonomy was not clearly indicated:**

"**How should the pipeline run?**

**[F] Full autopilot** (recommended) — Run all stages automatically. Notify when done.
**[S] Stage-gated** — Checkpoint between each stage for your review.
**[P] Partial** — Select which stage(s) to run individually."

Wait for selection. Store as `{autonomy_level}`.

### 6. Partial Mode: Stage Selection

**ONLY if `{autonomy_level}` is "partial":**

"**Which stage(s) would you like to run?**

**[R] Research** — Deep research to produce dossier
**[V] Verify** — Adversarial verification of existing dossier
**[CH] Challenge** — Adversarial reasoning validation (requires dossier)
**[P] Publish** — Transform verified dossier into deliverable
**[WP] Whitepaper** — Deep-dive whitepaper from subtopic (requires dossier)

Select one or more (e.g., R, V, CH, P):"

Wait for user selection. Store as `{partial_stages}`.

If CH selected: set `{chain_challenge}` = true.
If WP selected: set `{chain_whitepaper}` = true.
Compute `{total_stages}` from selected stages count (only R, V, CH, P count as numbered stages; WP also counts if selected).

**If not partial mode:** Skip this section, proceed to section 7.

### 7. Optional Pipeline Extensions

**ONLY if `{autonomy_level}` is NOT "partial"** (partial mode handles this in section 6):

"**Optional pipeline extensions:**

These add extra stages to the pipeline. They run in sequence with the core stages.

**[CH] Challenge** — Adversarial reasoning validation between verify and publish
**[WP] Whitepaper** — Deep-dive whitepaper on a subtopic after publish
**[B] Both** — Challenge then Whitepaper
**[N] Neither** (default) — Standard pipeline only

Select: [CH] / [WP] / [B] / [N]"

Wait for user selection. Store:
- `{chain_challenge}` — true if CH or B selected, false otherwise
- `{chain_whitepaper}` — true if WP or B selected, false otherwise
- `{total_stages}` — 3 + (1 if chain_challenge) + (1 if chain_whitepaper)

**If N or Enter (default):** Set both to false, `{total_stages}` = 3.

### 8. Scope Estimation

Estimate the research scope based on the configured parameters. This is advisory — the user decides whether to adjust session planning.

**Assess topic breadth:**

- **Narrow** — single product, feature, or vendor (e.g., "Evaluate Acme Corp's API"). Expected: standard pipeline, single session.
- **Medium** — product category, workflow phase, or multi-vendor comparison (e.g., "Compare workflow engines"). Expected: full pipeline, may generate post-pipeline vendor catalog work.
- **Broad** — full workflow, industry analysis, or multi-category landscape (e.g., "Research the commercial lines renewal workflow"). Expected: full pipeline + multiple vendor catalogs + likely multi-session.

**Assess extension impact:**

- Whitepaper extension adds ~30% to context consumption (expansion research + writing)
- Challenge extension adds ~20% to context consumption (adversarial analysis + report)
- Both together significantly increase session length

**Assess post-pipeline likelihood:**

- Count product category signals in `{user_research_prompt}` — each is a potential vendor catalog
- Topics referencing multiple product categories will likely generate vendor catalog requests after publish
- Broad topics with vendor-specific references will likely need generalization passes during comment review

**Compute scope estimate:**

Store `{scope_estimate}` as one of: `narrow`, `medium`, `broad`.

- `narrow`: single-entity subject, no extensions, 0-1 product category signals
- `medium`: category-level subject OR 1+ extensions OR 2-3 product category signals
- `broad`: multi-category subject AND (extensions OR 4+ product category signals)

**If scope is broad:**

"**Scope advisory:** This topic is broad enough that the full pipeline plus post-pipeline work (vendor catalogs, comment resolution, refinement) may exceed a single session. Options:
- **Session 1:** Pipeline (Research, Verify, Publish{if extensions: ', extensions'})
- **Session 2:** Vendor catalogs, comment resolution, and refinement

Or proceed in a single session — if context fills, we can continue via session resume.

This is just a heads-up. How would you like to proceed?"

Wait for user acknowledgment. Do not change any pipeline configuration based on this — it is purely informational.

**If scope is narrow or medium:** No advisory needed. Proceed silently.

### 9. Topic Folder Name

Generate a folder name from the research subject (lowercase, kebab-case, max 50 chars).

"**Topic folder:** `{generated_folder_name}`

This will be created at: `{research-root}/{schema_parent_folder}/{generated_folder_name}/`

Accept this name or type a different one:"

Wait for user input or confirmation. Store as `{topic_folder}`.

### 10. Confirm Final Summary

Present complete intake summary:

"**Ready to launch:**

**Subject:** {research_subject}
**Schema:** {selected_schema}
**Domains:** {selected_domains — list names, or 'none'}
**Brand:** {selected_brand}
**Autonomy:** {autonomy_level}
{If partial: **Stages:** {partial_stages}}
{If chain_challenge or chain_whitepaper: **Extensions:** {list enabled — e.g., 'Challenge + Whitepaper' or 'Challenge' or 'Whitepaper'}}
**Pipeline stages:** {total_stages}
**Scope estimate:** {scope_estimate}
**Output folder:** `{research-root}/{schema_parent_folder}/{topic_folder}/`
**Tools:** {detected_tools}

Everything correct?"

Wait for user confirmation. If user wants changes, loop back to the relevant section.

### 11. Create Topic Folder

Create the folder at `{research-root}/{schema_parent_folder}/{topic_folder}/`.

If folder already exists, warn user and ask whether to overwrite or choose a different name.

Also create the gates subdirectory: `{research-root}/{schema_parent_folder}/{topic_folder}/gates/`

Initialize the inter-agent context file at `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-context.yaml`:

```yaml
# Inter-agent context for cross-stage communication
# Agents read messages from prior stages and write observations for downstream agents
pipeline_id: '{pipeline_id}'
subject: '{research_subject}'
messages: []
```

Store the path as `{pipeline_context_path}`.

### 12. Initialize Pipeline Log

Create `{research-root}/{schema_parent_folder}/{topic_folder}/pipeline-log.md` with:

```markdown
---
pipeline: research-pipeline
status: IN_PROGRESS
subject: '{research_subject}'
schema: '{selected_schema}'
domains: [{selected_domains}]
brand: '{selected_brand}'
autonomy: '{autonomy_level}'
tools: '{detected_tools}'
chain_challenge: {true/false}
chain_whitepaper: {true/false}
total_stages: {total_stages}
scope_estimate: '{scope_estimate}'
created: '{current_date}'
stages:
  research: pending
  verify: pending
  {If chain_challenge: "challenge: pending"}
  publish: pending
  {If chain_whitepaper: "whitepaper: pending"}
files:
  dossier: null
  verification_report: null
  {If chain_challenge: "challenge_report: null"}
  deliverable: null
  {If chain_whitepaper: "whitepaper: null"}
gates:
  research: null
  verify: null
  {If chain_challenge: "challenge: null"}
  publish: null
  {If chain_whitepaper: "whitepaper: null"}
---

# Pipeline Log: {research_subject}

## Intake

- **Subject:** {research_subject}
- **Schema:** {selected_schema}
- **Domains:** {selected_domains}
- **Brand:** {selected_brand}
- **Autonomy:** {autonomy_level}
- **Extensions:** {list enabled, or 'none'}
- **Total stages:** {total_stages}
- **Scope estimate:** {scope_estimate}
- **Tools:** {detected_tools}
- **Created:** {current_date}
```

### 13. Present MENU OPTIONS

Display: "**Intake complete. Ready to begin pipeline execution.** [C] Continue"

#### Menu Handling Logic:

- IF C: Confirm pipeline log is saved, then load, read entire file, then execute {nextStepFile}
- IF partial mode and stages don't include research: Confirm pipeline log is saved, then skip to the first selected stage's step file:
  - verify selected: step-04-verify.md
  - challenge selected (without verify): step-04b-challenge.md
  - publish selected (without verify/challenge): step-05-publish.md
  - whitepaper selected (without earlier stages): step-05b-whitepaper.md
- IF Any other: help user, then redisplay menu

## Quality Criteria

- User's prompt analyzed for configuration signals rather than asking sequential questions
- Smart suggestions presented with explanations (not raw lists)
- Each configuration choice explained with rationale
- All required parameters confirmed before proceeding
- Pipeline extensions offered and stored correctly
- Scope estimate computed with advisory for broad topics
- Topic folder and pipeline log created with correct structure
- Correct routing based on autonomy level (autopilot/stage-gated/partial)
