---
name: 'step-03-sources'
description: 'Collect trusted sources organized by tier -- primary, secondary, reference, and anti-sources'
nextStepFile: './step-04-lenses.md'
---

# Step 3: Sources

## Goal

Capture the domain's trusted sources -- the publications, authorities, databases, and organizations that practitioners rely on -- organized by trust tier, plus sources to actively avoid.

## Desired Outcomes

- At least 1 primary source captured with type and notes
- Sources organized by trust tier
- Anti-sources collected (if any)
- Source types classified correctly
- Summary presented and confirmed by user

## Instructions

### 1. Set the Context

"**Now let's map where experts in {display_name} look for information.**

Not all sources are equal. We'll organize them by how much you'd trust them:
- **Primary** -- your first-choice, most trusted sources
- **Secondary** -- good sources but not definitive
- **Reference** -- background and context sources
- **Anti-sources** -- places to avoid or treat with skepticism

This helps research agents know where to look first and what to trust most."

### 2. Collect Primary Sources

"**What are your go-to, most trusted sources for {display_name}?**

These are the sources you'd check first -- the ones where if they say something, you believe it. Think about:
- Trade publications specific to this domain
- Regulatory bodies or standards organizations
- Industry associations
- Authoritative databases
- Academic journals (if relevant)

For each source, tell me:
- What it is
- Why it's authoritative in this domain"

Wait for user response. For each source, capture:
- Name
- Type (trade-publication, regulatory-body, industry-org, database, academic, news)
- URL if known
- Notes on why it matters

### 3. Collect Secondary Sources

"**What about sources that are good but not your first choice?**

These might be:
- General industry news that covers {display_name}
- Analyst firms that publish relevant reports
- Well-known blogs or thought leaders
- News outlets with strong domain coverage

These are solid sources -- just not the definitive authorities."

Wait for response. Capture same fields as primary.

### 4. Collect Reference Sources

"**Any background or reference sources worth noting?**

These are sources for general context -- not where you'd go for breaking domain news, but useful for understanding the landscape:
- Wikipedia pages worth bookmarking
- Government data portals
- Educational resources
- Historical archives

This tier is optional -- skip if nothing comes to mind."

Wait for response. Capture if provided.

### 5. Collect Anti-Sources

"**Now the flip side -- are there sources that research agents should avoid or treat with skepticism for {display_name}?**

Every domain has:
- Sources that look authoritative but aren't (outdated, biased, vendor-captured)
- Generic sources that get domain details wrong
- Sources with known reliability issues in this space

**Any sources to flag?** This prevents research agents from citing unreliable material."

Wait for response. For each anti-source, capture:
- Name
- Reason to avoid

### 6. Review and Refine

Present the collected sources:

"**Here's the source map for {display_name}:**

**Primary ({count}):**
{For each: **name** (type) -- notes}

**Secondary ({count}):**
{For each: **name** (type) -- notes}

**Reference ({count}):**
{For each: **name** (type) -- notes}

**Anti-Sources ({count}):**
{For each: **name** -- reason to avoid}

**Anything to add, move between tiers, or remove?**"

Wait for confirmation or adjustments. Loop on adjustments until confirmed.

### 7. Present Menu

Display: "**Select:** [C] Continue to Analysis Lenses"

- IF C: Store confirmed sources in session context, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Source trust is domain-specific -- what's authoritative in one domain may be irrelevant in another
- Anti-sources are as valuable as trusted sources -- knowing where NOT to look prevents bad research
- Never show or mention YAML to the user
- Do not ask about lenses or relationships in this step
- Do not invent sources the user didn't mention
- At least 1 primary source required before proceeding
