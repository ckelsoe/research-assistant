---
name: 'step-05-relationships'
description: 'Collect key entities, ecosystem dynamics, and competitive patterns'
nextStepFile: './step-06-review.md'
---

# Step 5: Relationships

## Goal

Capture the domain's key entities, ecosystem dynamics, and competitive patterns -- the players, their roles, and how they relate to each other.

## Desired Outcomes

- Key entities collected (if applicable to domain)
- Ecosystem dynamics captured (if applicable)
- Competitive patterns noted (if applicable)
- User confirmed the relationships section
- Domains with minimal relationship dynamics handled gracefully

## Instructions

### 1. Set the Context

"**Last piece of the map -- the players and how they relate to each other.**

This section gives research agents the ecosystem context to frame their findings. We're not building an exhaustive directory -- we're capturing the structural landscape: who matters, what role they play, and how the dynamics work.

Some domains have rich relationship networks (like healthcare with providers, payers, regulators, and patients). Others are simpler. We'll capture whatever fits."

### 2. Collect Key Entities

"**Who are the key players in {display_name}?**

Think about:
- Major organizations, companies, or institutions
- Standards bodies or regulatory authorities
- Industry groups or consortiums
- Technology platforms or vendors that define the space

For each, tell me:
- Who they are
- What role they play in the domain
- Why they matter (why would a researcher need to know about them?)"

Wait for user response. For each entity, capture:
- Name
- Role in the domain
- Relevance (why they matter)

If the user indicates there aren't significant key entities, that's fine -- acknowledge and move on.

### 3. Describe Ecosystem Dynamics

"**How do these players relate to each other?**

In a sentence or two, describe the ecosystem -- the relationships, dependencies, and power dynamics. For example:
- 'Providers deliver care, payers reimburse, EHR vendors connect them, regulators set compliance standards'
- 'Open-source projects drive innovation, cloud vendors commercialize, enterprises adopt with caution'

**How would you describe the ecosystem of {display_name}?**"

Wait for response. Capture as `ecosystem.description`. If the user doesn't have a clear ecosystem dynamic, skip gracefully.

### 4. Identify Competitive Patterns

"**Are there common competitive dynamics in {display_name}?**

Not specific rivalries, but recurring patterns:
- Do incumbents compete differently than newcomers?
- Is there consolidation happening (acquisitions, mergers)?
- Are there platform vs. point-solution dynamics?
- Is regulation creating competitive barriers or advantages?

**Any patterns worth noting?** This is optional -- skip if the domain doesn't have notable competitive dynamics."

Wait for response. Capture as `competitive_patterns` if provided.

### 5. Review and Refine

Present the collected relationships:

"**Here's the relationship landscape for {display_name}:**

**Key Entities ({count}):**
{For each: **name** -- role (relevance)}

**Ecosystem:**
{ecosystem description or 'No specific ecosystem dynamics noted'}

**Competitive Patterns:**
{patterns as bullet list or 'No specific patterns noted'}

**Anything to add or adjust?** This is the last discovery step -- after this we'll review everything together."

Wait for confirmation or adjustments. Loop on adjustments until confirmed.

### 6. Present Menu

Display: "**Select:** [C] Continue to Review"

- IF C: Store confirmed relationships in session context, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Relationships are about the landscape, not an exhaustive directory -- capture structural patterns, not every player
- Not every domain has rich relationship dynamics -- capture what's meaningful, don't pad what isn't
- Never show or mention YAML to the user
- Do not revisit terminology, sources, or lenses in this step
- Do not invent entities or relationships the user didn't mention
