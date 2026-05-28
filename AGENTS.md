# AGENTS.md

## Code style

- Functions: 4-20 lines. Split if longer.
- Files: under 500 lines. Split by responsibility.
- One thing per function, one responsibility per module (SRP).
- Names: specific and unique. Avoid `data`, `handler`, `Manager`.
  Prefer names that return <5 grep hits in the codebase.
- Types: explicit. No `any`, no `Dict`, no untyped functions.
- No code duplication. Extract shared logic into a function/module.
- Early returns over nested ifs. Max 2 levels of indentation.
- Exception messages must include the offending value and expected shape.

## Comments

- Keep existing comments. Do not strip them on refactor; they carry intent and provenance.
- Write WHY, not WHAT. Skip comments like `// increment counter` above `i++`.
- Docstrings on public functions must explain intent and include one usage example.
- Reference issue numbers or commit SHAs when a line exists because of a specific bug or upstream constraint.

## Tests

- Tests run with a single project-specific command.
- Every new function gets a test. Bug fixes get a regression test.
- JSON-only changes in `packages/biome-config/*.json` do not require tests.
- Mock external I/O with named fake classes, not inline stubs.
- Tests must be F.I.R.S.T: fast, independent, repeatable, self-validating, timely.

## Dependencies

- Inject dependencies through constructor/parameter, not global/import.
- Wrap third-party libraries behind a thin interface owned by this project.

## Structure

- Follow the framework convention.
- Prefer small focused modules over god files.
- Use predictable paths: controller/model/view, src/lib/test, etc.

## Formatting

- Use the language default formatter.
- For this repo, prefer `pnpm check`.

## Logging

- Use structured JSON for debugging and observability logs.
- Use plain text only for user-facing CLI output.

## Release management

- Run `pnpm changeset` for important user-visible changes to published packages.
- Important changes include public API changes, preset behavior changes, dependency changes that affect consumers, bug fixes, and documentation that changes package usage.
- Do not run `pnpm changeset` for internal-only chores that do not affect published packages.
- Use SemVer bump types consistently: `patch` for fixes, `minor` for backwards-compatible features, and `major` for breaking changes.
- Run `pnpm changeset:version` only when preparing the release/version update.
- Keep each package changelog included in the package files so npm users can find release notes.
