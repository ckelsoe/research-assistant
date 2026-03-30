---
name: 'step-04-scoring'
description: 'Define confidence scoring criteria and source tier classifications'
nextStepFile: './step-05-output.md'
---

# Step 4: Scoring Criteria

## Goal

Define how research confidence is scored -- what constitutes high, medium, and low confidence -- and how sources are classified into tiers.

## Desired Outcomes

- Exactly 3 confidence levels defined (high, medium, low) with thresholds and descriptions
- Exactly 3 source tiers defined (primary, secondary, tertiary) with descriptions
- Complete scoring configuration reviewed and confirmed
- Sensible defaults presented, user can accept or customize

## Instructions

### 1. Explain Scoring

"**Now let's define how confidence is scored.**

Every claim in a research dossier gets a confidence score based on how well it's supported by sources. This is what separates structured research from 'the AI said so.'

There are two parts:
1. **Confidence levels** -- how many sources confirm a claim (High, Medium, Low)
2. **Source tiers** -- what types of sources count (Primary, Secondary, Tertiary)"

### 2. Present Default Confidence Levels

"**Confidence Levels -- here are the standard defaults:**

| Level | Threshold | Meaning |
|-------|-----------|---------|
| **High** | 3+ independent sources | Multiple sources confirm the claim |
| **Medium** | 1 source | Single source confirms the claim |
| **Low** | 0 sources | Inference only -- no direct confirmation |

These work well for most research. Would you like to:
- **Accept these defaults** -- recommended for most schemas
- **Customize the thresholds** -- for example, requiring 5+ sources for High
- **Customize the descriptions** -- to use domain-specific language"

Wait for user response. If accepting defaults, store and move on. If customizing, walk through each level.

### 3. Present Default Source Tiers

"**Source Tiers -- how sources are classified:**

| Tier | Default Description |
|------|-------------------|
| **Primary** | Official sources -- company website, press releases, SEC filings, product documentation |
| **Secondary** | Independent analysis -- analyst reports, trade publications, professional reviews |
| **Tertiary** | Community sources -- forums, social media, user discussions, blog posts |

Would you like to:
- **Accept these defaults** -- good general-purpose tiers
- **Customize for your domain** -- for example, adding regulatory filings as Primary, or industry databases as Secondary"

Wait for user response. If customizing, update each tier's description based on the schema's research domain.

### 4. Review Scoring Configuration

Present the complete scoring configuration:

"**Scoring configuration for `{schema_name}`:**

**Confidence Levels:**
- **High** ({threshold}+ sources): {description}
- **Medium** ({threshold} source): {description}
- **Low** ({threshold} sources): {description}

**Source Tiers:**
- **Primary:** {description}
- **Secondary:** {description}
- **Tertiary:** {description}

Does this look right?"

Handle any final adjustments and confirm.

### 5. Present Menu

Display: "**Scoring criteria confirmed. Ready to define output settings?** [C] Continue"

- IF C: Load, read entire file, then execute {nextStepFile}
- IF Any other: help user, then redisplay menu

Always halt and wait for user input. Only proceed when user selects 'C'.

## Quality Criteria

- Present sensible defaults clearly -- most users can accept them
- Never show raw YAML to the user
- Do not discuss output format or staleness in this step
- Scoring configuration confirmed before proceeding
