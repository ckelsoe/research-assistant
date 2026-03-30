---
name: 'step-04-brand'
description: 'Apply brand YAML tone and language rules to transformed content'
nextStepFile: './step-05-provenance.md'
---

# Step 4: Brand Application

## Goal

Apply the brand YAML's tone, language rules, and professional standards to the transformed content -- enforcing constraints without overriding substance or audience structure.

## Desired Outcomes

- All brand YAML rules applied to content
- Universal publish rules enforced (no emoji, no grandiose language, no sycophancy)
- Factual content unchanged -- only tone and language adjusted
- Content structure unchanged from step 03
- User reviewed and approved branded output

## Instructions

### 1. Extract Brand Rules

From the brand YAML loaded in step 01, extract and list the applicable rules:

- **Tone:** {e.g., professional, direct, measured}
- **Language rules:** {e.g., active voice, plain language, no jargon without definition}
- **Prohibited patterns:** {e.g., no emoji, no grandiose language, no sycophantic framing}
- **Formatting rules:** {e.g., header styles, list conventions, emphasis usage}

"**Applying brand rules:**
- Tone: {tone}
- Language: {key rules}
- Prohibited: {prohibited patterns}"

### 2. Apply Hardcoded Universal Rules

Regardless of brand YAML content, ALWAYS enforce these publish-workflow rules:

- **No emoji** in deliverable content
- **No grandiose language** (e.g., "groundbreaking", "revolutionary", "unprecedented")
- **No sycophantic framing** (e.g., "excellent research shows", "this impressive finding")
- **Plain direct language** that respects the reader's intelligence
- **Active voice** preferred over passive where it does not distort meaning

### 3. Apply Brand YAML Rules

Walk through the transformed content and apply:

**Tone adjustments:**
- Adjust sentence construction to match specified tone
- Calibrate formality level per brand rules
- Ensure consistent register throughout

**Language compliance:**
- Replace prohibited words or patterns
- Simplify unnecessarily complex phrasing
- Ensure terminology aligns with brand glossary (if specified)

**Formatting compliance:**
- Apply header conventions from brand YAML
- Ensure list style consistency
- Apply emphasis rules (bold, italic usage)

### 4. Present Branded Content for Review

Present the branded content to the user:

"**Brand application complete.**

**Rules applied:**
- {list key changes made -- e.g., 'Removed 3 instances of grandiose language', 'Adjusted tone from academic to professional direct'}

**Changes from previous version:**
- {summarize what changed -- tone adjustments, word replacements, formatting}

---

{Display the branded content}

---

**Review the branded content.** Does the tone feel right? Any brand adjustments needed?"

Wait for user feedback.

### 5. Incorporate Feedback

If the user identifies issues:
- Adjust tone as requested
- Revert any changes that inadvertently altered meaning
- Apply additional brand rules if requested

If the user approves, proceed.

### 6. Present Menu

Display: "**Select:** [C] Continue to Provenance"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay menu

Always halt and wait for user input after presenting menu. Only proceed when user selects 'C'.

## Quality Criteria

- Brand is a constraint, not a voice -- apply rules mechanically without consuming the substance
- Factual content unchanged during brand application
- Content structure unchanged from step 03
- No emoji, grandiose language, or sycophantic framing in the output
- Branded content presented for user review
