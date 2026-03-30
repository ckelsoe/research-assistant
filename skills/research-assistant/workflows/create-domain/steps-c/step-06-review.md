---
name: 'step-06-review'
description: 'Present complete domain summary in readable prose for user confirmation before generation'
nextStepFile: './step-07-generate.md'
---

# Step 6: Review

## Goal

Present the complete domain -- identity, terminology, sources, lenses, and relationships -- as a readable summary for the user to confirm, revise, or approve before generating the final YAML file.

## Desired Outcomes

- Complete domain summary presented in readable prose
- All 5 sections included (identity, terminology, sources, lenses, relationships)
- User explicitly approved the summary
- Any requested revisions handled within this step
- Session context updated with all final values

## Instructions

### 1. Introduce the Review

"**Here's the complete domain map for {display_name}. Let's make sure everything is right before I generate the final file.**

Review each section below. You can:
- **Approve** everything as-is
- **Request changes** to any section -- I'll revise it here
- **Add** anything we missed

---"

### 2. Present Complete Domain Summary

Present all 5 sections in readable prose (never YAML):

"## {display_name}

**Name:** `{name}`
**Depth:** {depth}
**Scope:** {scope.description}
**Boundaries:** {boundaries as bullet list}
{**Composability:** composability_notes -- if provided}

---

### Terminology

**Terms ({count}):**
{For each term:}
- **{term}** -- {definition} {(context) if provided}

**Acronyms ({count}):**
{For each acronym:}
- **{acronym}** ({expansion}) {-- context if provided}

---

### Sources

**Primary ({count}):**
{For each: **{name}** ({type}) -- {notes}}

**Secondary ({count}):**
{For each: **{name}** ({type}) -- {notes}}

**Reference ({count}):**
{For each: **{name}** ({type}) -- {notes}}

**Anti-Sources ({count}):**
{For each: **{name}** -- {reason}}

---

### Analysis Lenses

{For each lens:}
**{lens_name}**
*{description}*
- Asks: {key_questions as bullet list}
- Looks for: {indicators as bullet list}

---

### Relationships

**Key Entities ({count}):**
{For each: **{name}** -- {role} ({relevance})}

**Ecosystem:** {ecosystem description}

**Competitive Patterns:**
{patterns as bullet list}

---"

### 3. Request Feedback

"**Does this domain map look complete and accurate?**

You can:
- **[A] Approve** -- everything looks good, proceed to generation
- **[R] Revise** -- tell me which section(s) need changes
- **[+] Add** -- add something we missed to any section

**What would you like to do?**"

Wait for user response.

### 4. Handle Revisions (If Requested)

**If user selects Revise or Add:**

Ask which section(s) need changes. For each revision:
1. Confirm what needs to change
2. Make the change in session context
3. Re-present the affected section for confirmation

After all revisions are complete, re-present the full summary and return to section 3 (Request Feedback).

**If user approves:**
Proceed to menu.

### 5. Present Menu

Display: "**Domain approved. Select:** [C] Continue to Generate"

- IF C: Confirm session context has the complete approved domain, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'. User MUST have explicitly approved the domain before 'C' is valid.

## Quality Criteria

- This is the quality gate -- the user must see and approve everything before generation
- Never show YAML to the user
- All 5 sections presented -- none skipped
- YAML not generated in this step (that's step 7)
- Revisions handled within this step -- do not reload earlier step files
- Revision and add options always available
