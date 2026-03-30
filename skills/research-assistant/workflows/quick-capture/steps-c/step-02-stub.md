---
name: 'step-02-stub'
description: 'Create topic folder and write stub.md with research metadata frontmatter'
nextStepFile: './step-03-confirm.md'
---

# Step 2: Stub

## Goal

Create the topic folder (if it doesn't exist) and write the stub.md file with frontmatter containing the captured research metadata.

## Desired Outcomes

- Topic folder created (or confirmed existing)
- stub.md written with correct frontmatter
- All provided fields populated, empty fields set to ""
- capture_date set to current date
- Auto-proceeded to confirmation step

## Instructions

### 1. Check for Existing Stub

Check if a file already exists at the resolved output path.

**If file exists:**
"**Warning:** A stub already exists at `{resolved_output_path}`.

- **[O]verwrite** -- Replace the existing stub
- **[R]ename** -- Create with a numbered suffix (e.g., `stub-2.md`)
- **[X]** -- Cancel and exit workflow"

Wait for user input.

- IF O: Continue to step 2 (overwrite existing file)
- IF R: Append numbered suffix to filename (e.g., `stub-2.md`), update `resolved_output_path`, continue to step 2
- IF X: "**Cancelled.** No stub created." Then HALT.
- IF Any other: help user respond, then redisplay the duplicate menu

**If file does not exist:** Continue to step 2.

### 2. Create Topic Folder

Create the topic folder at the resolved path if it doesn't already exist.

"**Creating folder:** `{resolved_folder_path}`"

### 3. Write Stub File

Write `stub.md` at the resolved output path with the following content:

```markdown
---
subject: "{subject}"
suggested_schema: "{suggested_schema}"
suggested_domains: "{suggested_domains}"
priority: "{priority}"
capture_date: "{current_date}"
status: stub
---

# {subject}

*Captured for later research execution.*
```

For any optional fields that were not provided, use an empty string `""`.

### 4. Auto-Proceed

"**Stub created.** Proceeding to confirmation..."

After stub file is written, immediately load, read entire file, then execute {nextStepFile}.

## Quality Criteria

- Existing stub check performed before writing
- Topic folder created before file write
- stub.md written with correct frontmatter format
- All provided fields populated; empty fields set to ""
- capture_date set to current date, status set to "stub"
- Captured data from step 01 not modified
- No extra content beyond the specified format
