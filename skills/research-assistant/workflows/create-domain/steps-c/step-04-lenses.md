---
name: 'step-04-lenses'
description: 'Collect domain-specific analysis perspectives with key questions and indicators'
nextStepFile: './step-05-relationships.md'
---

# Step 4: Analysis Lenses

## Goal

Capture the domain-specific perspectives that experts instinctively apply when evaluating anything in their space -- the angles, frameworks, and questions that distinguish domain expertise from general knowledge.

## Desired Outcomes

- At least 1 analysis lens captured with description
- Key questions documented for each lens
- Indicators documented for each lens
- Probing questions used to surface implicit lenses
- Summary presented and confirmed by user

## Instructions

### 1. Set the Context

"**Now for the most valuable part -- how experts in {display_name} actually think.**

An analysis lens is a perspective you apply when evaluating something in your domain. It's the difference between 'I looked at Company X' and 'I looked at Company X through the lens of regulatory compliance and found three red flags.'

These lenses are what make domain expertise valuable. A generalist might look at the same data and miss what matters because they don't know which angles to apply.

This can be tricky to articulate because you probably apply these lenses automatically. I'll help draw them out."

### 2. Prompt Initial Lenses

"**When you evaluate something in {display_name}, what do you instinctively look for?**

Think about it this way: if you were reviewing a company, product, or situation in this domain, what perspectives would you apply? For example:
- Do you look at it through a regulatory/compliance angle?
- Do you analyze competitive positioning?
- Do you evaluate technology maturity?
- Do you assess financial health indicators specific to this domain?
- Do you examine relationships between key players?

**What are the 2-3 lenses you always apply?**"

Wait for user response. For each lens, capture:
- Name (a descriptive label)
- Description (what this lens focuses on)

### 3. Deepen Each Lens

For each lens the user identified, probe for key questions and indicators:

"**Let's sharpen the *{lens_name}* lens.**

When you apply this perspective:
1. **What questions do you ask?** -- The specific things you want to know when looking through this lens
2. **What signals do you look for?** -- The indicators, patterns, or data points that tell you something important

For example, a 'regulatory compliance' lens might ask 'What regulatory bodies oversee this entity?' and look for indicators like 'recent enforcement actions' or 'compliance certification status.'"

Wait for response. Capture:
- `key_questions` -- the questions this lens asks of any research subject
- `indicators` -- what to look for when applying this lens

Repeat for each lens.

### 4. Surface Hidden Lenses

After the initial lenses are detailed, probe for more:

"**Let me push a bit further. Think about these scenarios:**

- When you read a news article about something in {display_name}, what's the first thing you check or question?
- When a colleague presents you with data in this domain, what's the first thing you'd validate or challenge?
- What's a common mistake that non-experts make when analyzing something in {display_name}? What lens would have caught it?

**Any additional perspectives come to mind?**"

Wait for response. Add new lenses if provided, with the same key_questions and indicators structure.

### 5. Review and Refine

Present the collected lenses:

"**Here are the analysis lenses for {display_name}:**

{For each lens:}
**{lens_name}**
*{description}*
- Asks: {key_questions as bullet list}
- Looks for: {indicators as bullet list}

---

**{count} lenses captured.** These will guide research agents to analyze {display_name} the way a domain expert would.

**Anything to add, refine, or remove?**"

Wait for confirmation or adjustments. Loop on adjustments until confirmed.

### 6. Present Menu

Display: "**Select:** [C] Continue to Relationships"

- IF C: Store confirmed lenses in session context, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Lenses are the highest-value part of a domain -- they encode HOW experts think, not just what they know
- Use concrete examples from earlier steps (terminology, sources) to prompt lens discovery
- Lenses without key questions or indicators are incomplete -- probe until both are captured
- Never show or mention YAML to the user
- Do not ask about relationships in this step
- Do not invent lenses the user didn't describe
