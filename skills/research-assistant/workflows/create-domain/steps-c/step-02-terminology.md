---
name: 'step-02-terminology'
description: 'Collect domain-specific terms, jargon, and acronyms with definitions'
nextStepFile: './step-03-sources.md'
---

# Step 2: Terminology

## Goal

Capture the domain's specialized vocabulary -- the terms, jargon, and acronyms that insiders use without thinking and outsiders misunderstand or miss entirely.

## Desired Outcomes

- At least 1 domain-specific term captured with definition
- Implicit terms surfaced through probing questions
- Acronyms collected (if any exist in the domain)
- Context captured for terms (when/where used)
- Summary presented and confirmed by user

## Instructions

### 1. Set the Context

"**Now let's map the language of {display_name}.**

Every domain has words that mean something specific to insiders -- terms that outsiders would either miss, misuse, or confuse with something else. These are the landmarks on our map.

I'll ask about terms in a few different ways, because the ones that come to mind first are usually the obvious ones. The real value is in the terms you use without thinking about it."

### 2. Collect Key Terms

"**What are the essential terms someone needs to know to work in this domain?**

Think about:
- Words that have a specific meaning in {display_name} (even if they're common words elsewhere)
- Jargon that insiders use daily
- Concepts that require explanation for newcomers

For each term, give me what it means in this domain -- not the dictionary definition, but how practitioners actually use it."

Wait for user response. For each term provided, capture:
- The term itself
- Its domain-specific definition
- Context for when/where it applies (ask if not volunteered)

### 3. Surface Implicit Terms

After the initial list, probe for terms the expert may have overlooked:

"**Good. Now let me push a bit deeper.**

Think about a conversation you'd have with a colleague in this space. What words would you use that a smart generalist wouldn't follow? For example:
- Are there terms that mean one thing generally but something specific in {display_name}?
- Are there informal shorthand terms that everyone in the space uses?
- Are there terms that distinguish levels of expertise -- things a beginner wouldn't know to say?"

Wait for response. Add any new terms to the collection.

### 4. Collect Acronyms

"**What about acronyms and abbreviations?**

Every domain has alphabet soup. What are the acronyms someone would encounter working in {display_name}? For each one, what does it stand for and when would you encounter it?"

Wait for user response. For each acronym, capture:
- The acronym
- What it expands to
- Context for when/where it's used

### 5. Review and Refine

Present the collected terminology as a clean summary:

"**Here's the terminology map so far:**

**Terms ({count}):**
{For each term: **term** -- definition (context)}

**Acronyms ({count}):**
{For each acronym: **ACRONYM** -- expansion (context)}

**Anything to add, change, or remove?** We can always come back and refine, but this gives us a solid vocabulary foundation."

Wait for confirmation or adjustments. Loop on adjustments until confirmed.

### 6. Present Menu

Display: "**Select:** [C] Continue to Sources"

- IF C: Store confirmed terminology in session context, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- The hardest terms to capture are the ones the expert uses without realizing they're specialized -- surface those through probing
- Never show or mention YAML to the user
- Do not ask about sources, lenses, or relationships in this step
- Do not invent terms the user didn't provide
- At least 1 term captured before proceeding
