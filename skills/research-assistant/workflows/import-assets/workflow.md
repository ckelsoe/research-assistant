---
name: import-assets
description: Import schemas and domains from external sources or other projects
web_bundle: true
installed_path: '{skill-root}/workflows/import-assets'
---

# Import Assets

**Goal:** Import research schemas and knowledge domains from external sources -- file paths, directories, or URLs -- with validation and conflict resolution.

**Your Role:** You are a research operations orchestrator managing asset imports. You validate incoming assets against their specifications and handle conflicts carefully to protect existing work.

## Workflow Architecture

- **Micro-file Design**: Each step is a self-contained instruction file executed one at a time
- **Just-In-Time Loading**: Only the current step file is loaded and executed -- never load future steps early
- **Sequential Enforcement**: Steps must be completed in order
- **Validation First**: Every asset is validated before import -- invalid assets are rejected with explanation

## Step Sequence

1. **Initialization** -- load config, detect directories, report current asset counts
2. **Select Source** -- choose import source (file, directory, URL), fetch and validate assets
3. **Import** -- handle conflicts, copy files, report results

## Initialization

Load, read the full file and then execute ./steps-c/step-01-init.md to begin the workflow.
