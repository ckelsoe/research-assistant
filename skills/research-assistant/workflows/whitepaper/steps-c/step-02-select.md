---
name: 'step-02-select'
description: 'Configure whitepaper parameters -- audience, length, tone, scope'
nextStepFile: './step-03-expand.md'
---

# Step 2: Configure Whitepaper

## Goal

Gather whitepaper configuration from the user -- target audience, desired length, tone, and scope -- so the expansion research and final writing are properly targeted.

## Desired Outcomes

- Audience, length, brand, and scope configured
- Configuration confirmed by user
- All parameters stored for subsequent steps

## Instructions

### 1. Audience Selection

"**Who is the target audience for this whitepaper?**

- **[E] Executive** -- C-suite, VP-level. Focus on strategic implications and business impact.
- **[T] Technical** -- Engineers, architects. Focus on implementation details and trade-offs.
- **[G] General** -- Mixed audience. Balance strategy and detail.
- **[C] Custom** -- Describe your audience.

Select: [E] / [T] / [G] / [C]"

Wait for selection. Store as `{wp_audience}`.

### 2. Length Selection

"**How in-depth should the whitepaper be?**

- **[B] Brief** (3-5 pages) -- Focused analysis, key findings only
- **[S] Standard** (8-12 pages) -- Thorough coverage with supporting detail
- **[D] Deep** (15-20 pages) -- Comprehensive treatment with extensive evidence

Select: [B] / [S] / [D] (default: S)"

Wait for selection. Store as `{wp_length}`.

### 3. Tone and Brand

Check if brand YAML files are available from module config.

**If brands available:**
"**Select a brand voice** (or press Enter for default):\n{list brands}\nDefault: professional-analyst"

**If no brands:**
"**Brand:** professional-analyst (default)"

Store as `{wp_brand}`.

### 4. Scope Refinement

"**Any specific angles or questions you want the whitepaper to address?**

Examples:
- *'Focus on the regulatory implications'*
- *'Compare the top 3 options with pros/cons'*
- *'Address the concerns raised by the engineering team'*

Or press Enter to use the default scope based on the subtopic."

Wait for input. Store as `{wp_scope}` (user input or "default").

### 5. Confirm Configuration

"**Whitepaper Configuration:**

**Topic:** {whitepaper_topic}
**Source:** {source_subject} dossier
**Audience:** {wp_audience}
**Length:** {wp_length}
**Brand:** {wp_brand}
**Scope:** {wp_scope}

Everything correct?"

Wait for confirmation. Loop back if changes needed.

### 6. Proceed

Display: "**Configuration confirmed.** Proceeding to expansion research..."

Load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- All configuration parameters gathered before proceeding
- Configuration confirmed by user
- Do not begin research or writing in this step
