---
name: 'step-01-identity'
description: 'Initialize workflow and collect domain identity -- name, scope, boundaries, depth'
nextStepFile: './step-02-terminology.md'
domainSpecFile: '{skill-root}/references/specs/domain-spec.yaml'
---

# Step 1: Domain Identity

## Goal

Establish the domain's identity -- its name, scope, boundaries, and depth level -- which anchors everything that follows.

## Desired Outcomes

- Domain name collected and confirmed unique
- Scope description captured (1-3 sentences)
- Boundaries defined (what's excluded)
- Depth level selected
- Composability notes captured (if applicable)
- Identity summary confirmed by user

## Instructions

### 1. Welcome and Orient

Greet the user and set expectations for the session:

"**Let's chart a new knowledge domain.**

I'll walk you through defining what you know -- the territory, the language, the trusted sources, the angles you instinctively apply. By the end, you'll have a composable knowledge asset that research agents can use to work with real domain expertise instead of surface-level generalities.

We'll cover:
1. **Identity** -- what this domain covers (that's this step)
2. **Terminology** -- the language of the domain
3. **Sources** -- where experts look
4. **Lenses** -- how experts analyze
5. **Relationships** -- the players and dynamics

Let's start by defining the territory."

### 2. Collect Domain Name

"**What domain are we mapping?**

Think of it as a label for a body of specialized knowledge. Examples: *healthcare*, *renewable-energy*, *supply-chain-logistics*, *kubernetes-infrastructure*.

A good domain name is:
- Specific enough to be useful (not just 'technology')
- Broad enough to be reusable across different research requests
- Something you'd naturally say: 'I know *X*'

**What's your domain?**"

Wait for user response. Derive a kebab-case `name` and a `display_name` from their answer.

### 3. Check Uniqueness

Scan `{data-root}/domains/` for existing `*.domain.yaml` files.

**If a domain with the same name exists:**
"**That domain name already exists.** Would you like to:
- Choose a different name
- Use the existing domain's [VD] View or [DC] Domain Clone commands instead

**Suggestion:** Try a more specific variant -- e.g., *pediatric-healthcare* instead of *healthcare*."

Wait for resolution before proceeding.

**If no conflict or directory doesn't exist yet:**
Proceed to scope.

### 4. Collect Scope

"**Now let's draw the borders of this territory.**

**What does this domain cover?** Describe it in 1-3 sentences -- what would you tell a smart colleague who's never worked in this space?

Then tell me: **What does this domain NOT cover?** The boundaries are as important as the territory itself."

Wait for user response. Capture:
- `scope.description` -- their scope statement
- `scope.boundaries` -- what's explicitly excluded

### 5. Determine Depth

"**How deep does this domain go?**

- **Shallow** -- general awareness. Enough to ask good questions and recognize key players. Useful for broad surveys.
- **Moderate** -- working knowledge. Understands the terminology, knows the major sources, can identify industry patterns. Good for most research.
- **Deep** -- specialist-level. Insider terminology, niche sources, subtle analysis angles that only practitioners would know. For targeted domain expertise.

**Which level describes what you want to capture?**"

Wait for user response. Store as `scope.depth`.

### 6. Composability Check

"**One more thing about scope -- will this domain typically be combined with others?**

For example, a *healthcare* domain might pair with *epic-systems* (a specific vendor in that space) or *workflow-engines* (a technology category). If so, any notes on how this domain should play with others?

If not sure, that's fine -- we can skip this."

Wait for response. Store as `scope.composability_notes` if provided.

### 7. Confirm Identity

Present a clean summary:

"**Domain identity confirmed:**

**Name:** {display_name} (`{name}`)
**Scope:** {scope.description}
**Boundaries:** {boundaries as bullet list}
**Depth:** {depth}
**Composability:** {notes or 'No specific notes'}

Does this look right? We can adjust anything before moving on to terminology."

Wait for confirmation or adjustments. Loop on adjustments until confirmed.

### 8. Present Menu

Display: "**Select:** [C] Continue to Terminology"

- IF C: Store confirmed identity in session context, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- The user is the domain expert -- their knowledge is the source material
- Use cartographic metaphors naturally: charting territory, drawing borders, marking the landscape
- Never show or mention YAML to the user
- Do not ask about terminology, sources, lenses, or relationships in this step
- Domain name uniqueness verified before proceeding
- A vague scope produces a vague domain -- get the identity right
