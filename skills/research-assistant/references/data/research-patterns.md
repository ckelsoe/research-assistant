# Research Patterns

Documented research execution patterns for the Research Director and spawned agents. These patterns capture proven approaches for common research operations.

---

## Parallel Vendor Catalog Research

When researching a product category with 10+ potential vendors, a single agent produces shallow results or exhausts its context. The proven approach is to split the vendor list across 2-3 parallel research agents, each with a focused scope, then assemble the results into a single vendor catalog.

### When to Use

- A research target of type `vendor-catalog` references a product category with 10 or more known or expected vendors
- A deliverable or dossier names multiple products within a single category that warrants cataloging
- The user requests a comprehensive vendor landscape or market map for a category

### Planning the Split

Divide vendors into 2-3 groups based on scope:

1. **Known major vendors** — 1-2 per group for deep research (market leaders, highest usage)
2. **Known minor/niche vendors** — 2-4 per group for standard research
3. **Discovery mandate** — assign one group an explicit "find others" scope with relevant search terms to surface vendors the orchestrator didn't know about

Balance groups so each agent has a manageable scope (3-5 vendors) and can go deep without context pressure.

### Spawning Agents

Spawn each research agent using `run_in_background: true` so they execute in parallel. Each agent prompt must include:

- **Specific vendors to research** — list by name
- **What to capture per vendor:** product URL, what it does, who uses it, integrations, key differentiators, ownership/funding status
- **The product category name** — so the agent can contextualize findings
- **Search terms** (for the discovery agent) — category keywords, industry terms, competitor lists
- **Output format** — structured findings per vendor, ready for assembly

### Scoping Each Agent

Each agent's prompt should be self-contained. Do not assume the agent has context from prior conversation. Include:

```
You are the Research Analyst (Fieldwork) from the research-assistant module.

Read your agent definition at:
{skill-root}/agents/research-analyst.md

VENDOR CATALOG RESEARCH:
- Product category: {category_name}
- Vendors to research: {vendor_list}
- {If discovery agent: "Also search for additional vendors in this category using terms: {search_terms}"}
- Research tool: {detected_tools}

FOR EACH VENDOR CAPTURE:
- Product name and URL
- What it does (1-2 sentences)
- Target market / who uses it
- Key integrations
- Differentiators vs. category peers
- Ownership, funding status, acquisition history
- Status: active | acquired | defunct | pivoted

QI RULES: {qi_rules or "No QI rules loaded."}

Write structured findings to: {output_path}
Return summary: vendors researched, vendors discovered, key findings.
```

### Assembling Results

After all agents complete:

1. **Collect findings** from each agent's output
2. **Merge into a single vendor catalog** — deduplicate any vendors researched by multiple agents
3. **Organize into tiers:**
   - Tier 1: Major / market-leading vendors
   - Tier 2: Niche / specialized vendors
   - Tier 3: Defunct, acquired, or historical entries
4. **Add market structure summary** — total vendor count, consolidation trends, key findings
5. **Write the catalog** with standard frontmatter including `related: '[[source-deliverable]]'` linking back to the parent document
6. **Update parent `derived_artifacts`** — append `"[[vendor-catalog-filename]]"` to the `derived_artifacts` list in the source dossier and/or deliverable frontmatter. This ensures bidirectional navigability in Obsidian
7. **Log in pipeline amendments** — add the catalog creation to the pipeline log's Post-Pipeline Amendments table and `derivative_artifacts` list

### Recommended Group Sizes

| Total Vendors | Agent Count | Rationale |
|---------------|-------------|-----------|
| 10-15         | 2           | Manageable scope per agent; low coordination overhead |
| 15-25         | 3           | Optimal balance of parallelism and focus |
| 25+           | 4 max       | Beyond 4 agents, coordination overhead increases and status tracking becomes harder |

### Progress Reporting

With multiple background agents, the orchestrator should report progress as each agent completes rather than waiting in silence. Use the agent progress reporting protocol:

- Announce when each agent is dispatched: "Dispatching Agent {N}: researching {vendor_list}..."
- Report as each agent returns: "Agent {N} complete: {summary}. {remaining} agents still running."
- When all agents complete: "All vendor research complete. Assembling catalog..."

This keeps the user informed during what can otherwise be a long silent wait.
