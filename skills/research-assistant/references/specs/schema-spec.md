# Research Schema YAML Specification

**Purpose:** Defines the structure and validation rules for research schema YAML files used by the research-assistant module.

**File location:** `{data-root}/schemas/{schema-name}.schema.yaml`

---

## Complete Schema Structure

```yaml
# Required top-level fields
name: "vendor-evaluation"                    # kebab-case identifier
display_name: "Vendor Evaluation"            # Human-readable name
description: >                               # What this schema is for
  Comprehensive vendor evaluation covering company background,
  product capabilities, market position, and risk factors.
version: "1.0.0"                             # Semver

# Categories — the sections of the research dossier
categories:
  - name: "company-overview"                 # kebab-case identifier
    display_name: "Company Overview"         # Human-readable
    description: >                           # What this category covers
      Background information on the company including history,
      leadership, size, and financial health.
    data_points:
      - name: "founding-date"
        display_name: "Founding Date"
        description: "When the company was founded"
        required: true                       # Must be researched
        source_guidance: >                   # Hints for the Research Analyst
          Check company website About page, LinkedIn, Crunchbase

      - name: "employee-count"
        display_name: "Employee Count"
        description: "Approximate number of employees"
        required: true
        source_guidance: "LinkedIn, company website, recent press releases"

      - name: "funding-history"
        display_name: "Funding History"
        description: "Investment rounds, amounts, investors"
        required: false                      # Optional data point
        source_guidance: "Crunchbase, PitchBook, press releases"

  - name: "product-capabilities"
    display_name: "Product Capabilities"
    description: "Core product features, integrations, and technical architecture"
    data_points:
      - name: "core-features"
        display_name: "Core Features"
        description: "Primary product capabilities and differentiators"
        required: true
        source_guidance: "Product documentation, feature pages, demo videos"
      # ... more data points

# Scoring — confidence scoring criteria
scoring:
  confidence_levels:
    high:
      threshold: 3                           # Minimum independent sources
      description: "3+ independent sources confirm the claim"
    medium:
      threshold: 1                           # Minimum independent sources
      description: "Single source confirms the claim"
    low:
      threshold: 0
      description: "Inference only — no direct source confirmation"

  source_tiers:
    primary:
      description: "Official company sources — website, press releases, SEC filings"
    secondary:
      description: "Independent analysis — analyst reports, trade publications, reviews"
    tertiary:
      description: "Community sources — forums, social media, user discussions"

# Output — dossier structure and settings
output:
  parent_folder: "vendor-evaluations"        # Subfolder within research-root
  format: "dossier"                          # Output format type
  staleness:
    threshold_days: 90                       # Days before research is considered stale
    refresh_policy: "flag"                   # flag | auto-refresh | ignore

# Optional — v1.5 feature
comparison_mode: false                       # Enable cross-dossier comparison output
```

---

## Field Reference

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Kebab-case identifier, unique across schemas |
| `display_name` | string | Yes | Human-readable name |
| `description` | string | Yes | What kind of research this schema is for |
| `version` | string | Yes | Semver version |
| `categories` | array | Yes | At least 1 category required |
| `scoring` | object | Yes | Confidence scoring configuration |
| `output` | object | Yes | Output and staleness configuration |
| `comparison_mode` | boolean | No | Default: false. V1.5 feature for cross-dossier comparison |
| `changelog` | array | No | Version history — each entry has `version`, `date`, `summary` |
| `deprecated` | boolean | No | Default: false. Mark schema as deprecated |
| `replaced_by` | string | No | Name of replacement schema (when deprecated) |

### Category Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Kebab-case identifier, unique within schema |
| `display_name` | string | Yes | Human-readable name |
| `description` | string | Yes | What this category covers |
| `data_points` | array | Yes | At least 1 data point required |

### Data Point Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Kebab-case identifier, unique within category |
| `display_name` | string | Yes | Human-readable name |
| `description` | string | Yes | What to research for this data point |
| `required` | boolean | Yes | Whether this data point must be researched |
| `source_guidance` | string | No | Hints for Research Analyst on where to find this |

### Scoring Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scoring.confidence_levels` | object | Yes | Must define `high`, `medium`, `low` |
| `scoring.confidence_levels.*.threshold` | integer | Yes | Minimum source count |
| `scoring.confidence_levels.*.description` | string | Yes | Human-readable threshold description |
| `scoring.source_tiers` | object | Yes | Must define `primary`, `secondary`, `tertiary` |
| `scoring.source_tiers.*.description` | string | Yes | What sources qualify for this tier |

### Output Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `output.parent_folder` | string | Yes | Subfolder name within `{research-root}` |
| `output.format` | string | Yes | Output format — currently only `"dossier"` supported |
| `output.staleness.threshold_days` | integer | Yes | Days before research is flagged as stale |
| `output.staleness.refresh_policy` | string | Yes | One of: `flag`, `auto-refresh`, `ignore` |

---

## Validation Rules

1. **name** must be kebab-case and not match any existing schema file name
2. **categories** must have at least 1 entry
3. Each **category** must have at least 1 data point
4. All **name** fields must be kebab-case
5. **scoring.confidence_levels** must define exactly `high`, `medium`, `low`
6. **scoring.source_tiers** must define exactly `primary`, `secondary`, `tertiary`
7. **output.staleness.refresh_policy** must be one of: `flag`, `auto-refresh`, `ignore`
8. **version** must be valid semver (e.g., `1.0.0`)
9. All **required** fields in data points must be boolean `true` or `false`
10. **comparison_mode** if present must be boolean
11. **changelog** entries must each have `version` (valid semver), `date` (ISO YYYY-MM-DD), and `summary` (non-empty string)
12. **deprecated** if present must be boolean
13. **replaced_by** if present must be a valid kebab-case schema name
