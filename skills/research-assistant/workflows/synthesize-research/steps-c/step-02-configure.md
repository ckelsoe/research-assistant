---
name: 'step-02-configure'
description: 'Configure synthesis parameters -- focus areas and depth'
nextStepFile: './step-03-synthesize.md'
---

# Step 2: Configure Synthesis

## Goal

Gather synthesis configuration from the user -- focus areas, synthesis depth, and any guiding questions -- so the Synthesizer produces a targeted thematic analysis.

## Desired Outcomes

- Focus areas gathered (or automatic mode accepted)
- Synthesis depth selected
- Output sections confirmed
- Configuration confirmed by user

## Instructions

### 1. Focus Areas

"**What should the synthesis focus on?**

You can provide specific themes, questions, or angles -- or let the Synthesizer discover themes automatically.

Examples:
- *'What common challenges do all subjects face?'*
- *'Focus on market positioning and competitive dynamics'*
- *'How do regulatory environments differ and overlap?'*
- *'Identify technology convergence patterns'*

Or press Enter to discover all cross-cutting themes automatically."

Wait for input. Store as `{focus_areas}` (user input or "automatic").

### 2. Synthesis Depth

"**How deep should the synthesis go?**

**[B] Brief** -- Key themes and high-level patterns only (faster, concise)
**[C] Comprehensive** -- Full thematic analysis with detailed cross-references and gap analysis (thorough)

Select: [B] / [C] (default: C)"

Wait for selection. Store as `{synthesis_depth}`.

### 3. Output Sections

"**Which sections should the synthesis report include?**

**[A] All sections** (default) -- themes, convergence, divergence, gaps, cross-references
**[S] Select sections** -- choose which to include"

If user selects S, present checklist:
- Cross-cutting themes
- Convergence points (where research agrees)
- Divergence points (where research conflicts)
- Gap analysis (what no dossier covered)
- Cross-reference map (source tracing)

Wait for selection. Store as `{synthesis_sections}` (all or selected list).

### 4. Confirm Configuration

"**Synthesis Configuration:**

**Dossiers:** {synthesis_count} ({list subjects})
**Schemas:** {list schemas}
**Focus:** {focus_areas}
**Depth:** {synthesis_depth}
**Sections:** {synthesis_sections}

Everything correct?"

Wait for confirmation. Loop back if changes needed.

### 5. Proceed

Display: "**Configuration confirmed.** Dispatching Research Synthesizer..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Focus areas gathered with clear examples provided
- Synthesis depth selected with default offered
- Output sections confirmed with granular selection available
- Full configuration confirmed by user before proceeding
