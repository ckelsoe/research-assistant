---
name: 'step-01-init'
description: 'Initialize research pipeline — detect tools, discover available schemas/domains/brands'
nextStepFile: './step-02-intake.md'
---

# Step 1: Pipeline Initialization

## Goal

Load module configuration, detect available research tools, and discover available schemas, domains, and brands — establishing the session context that all subsequent steps depend on.

## Desired Outcomes

- Module config loaded and `{research-root}` resolved
- Research tools detected with at least WebFetch available
- Available schemas discovered (at least one required)
- Available domains discovered (zero acceptable with warning)
- Available brands discovered (zero acceptable with default)
- Initialization summary displayed to user
- Auto-proceeded to step 2 (no user interaction in this step)

## Instructions

### 1. Detect Available Research Tools

**Check for cached tool config first:**

Read `{data-root}/tools-cache.yaml`.

**If cache exists and is valid:**
- Check `auto_detect` field — if `false`, use cached config as-is (manual override mode)
- Check `detected` timestamp — if less than `cache_max_age` days old (default 7), use cached config
- Read `preferred_order` from cache and store as `{detected_tools}` (first entry is primary tool)
- Report: "**Tools (cached):** {detected_tools}"
- Skip to section 2

**If cache is missing, expired, or `detected` is null — run fresh detection:**

Check for available research tools in priority order:

1. **Playwright CLI** — check if `playwright` or `npx playwright` is available as a shell command
2. **Firecrawl MCP** — check if Firecrawl MCP tools are available in the current tool set
3. **WebFetch** — always available as baseline

Store the detected tool priority as `{detected_tools}` (e.g., "playwright", "firecrawl", or "webfetch").

**Write detection results to cache:**

Update `{data-root}/tools-cache.yaml` with:
- `detected`: current timestamp
- `available`: map of each tool to true/false
- `preferred_order`: list of available tools sorted by priority (best first)
- Preserve existing `auto_detect` and `cache_max_age` values

### 2. Load QI Rules (Optional)

Check for QI rules in two locations:

1. **Internal ledger:** `{data-root}/qi-rules.yaml`
2. **External QI module:** `{project-root}/_bmad/ckbm-qi/data/qi-rules-ledger.yaml`

- **If internal found:** Load all rules. Store as `{qi_rules}`.
- **If external also found:** Merge external rules into `{qi_rules}`. External rules take precedence on ID conflicts.
- **If neither found:** Skip gracefully. No error — QI is optional.

### 3. Discover Available Schemas

Read the module's schemas directory. For each YAML file found in the schemas folder under the module's data directory:
- Extract schema name and description from the YAML
- Build `{schemas_list}` — array of {name, description, file_path}

**If no schemas found:**
Display error: "No research schemas found. Create one first with [CS] Create Schema."
Then HALT.

### 4. Discover Available Domains

Read the module's domains directory. For each YAML file found in the domains folder under the module's data directory:
- Extract domain name and description from the YAML
- Build `{domains_list}` — array of {name, description, file_path}

**If no domains found:**
Display warning: "No research domains found. Research will proceed without domain specialization."
Set `{domains_list}` to empty.

### 5. Discover Available Brands

Read the module's brands directory. For each YAML file found in the brands folder under the module's data directory:
- Extract brand name and description from the YAML
- Build `{brands_list}` — array of {name, description, file_path}

**If no brands found:**
Display info: "No brand files found. Will use default professional-analyst style."
Set `{brands_list}` to [{name: "professional-analyst", description: "Default professional tone", file_path: null}].

### 6. Report Initialization Summary

Display initialization results:

"**Pipeline initialized.**

**Research root:** {research-root}
**Tools:** {detected_tools} {If cached: '(cached)' | else: '(fresh detection)'}
**QI rules:** {count} rules loaded (internal) | {count} rules loaded (internal + external) | not configured
**Schemas available:** {count} ({list names})
**Domains available:** {count} ({list names})
**Brands available:** {count} ({list names})

**Proceeding to intake...**"

### 7. Auto-Proceed to Intake

After initialization is complete, immediately load, read entire file, then execute {nextStepFile}.

This is an initialization step with no user choices — proceed directly to next step after reporting summary.

## Quality Criteria

- Config loaded and {research-root} resolved before any discovery steps
- Tool detection completed with at least WebFetch available
- Schemas discovered (at least one) — halt if none found
- Domains and brands discovered gracefully (zero is acceptable)
- Initialization summary displayed before proceeding
- No user questions asked during init — this step is fully automatic
