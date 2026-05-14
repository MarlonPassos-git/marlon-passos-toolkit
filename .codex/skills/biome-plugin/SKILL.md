---
name: biome-plugin
description: Create or update Biome GritQL plugins in this repository. Use when adding custom Biome rules, moving rules into packages/biome-config, writing Biome-style rule documentation, creating Node native tests for plugins, or standardizing plugin diagnostics and packaging.
---

# Biome Plugin

## Workflow

1. Inspect `packages/biome-config`, root `biome.json`, existing `plugins/`, `.grit/patterns/`, and `scripts/test-*.mjs` before editing.
2. Put reusable published plugins under `packages/biome-config/plugins/<rule-name>.warn.grit` and `<rule-name>.error.grit` when consumers need severity control. Do not keep an unsuffixed duplicate for the same rule.
3. Register shared plugins in `packages/biome-config/base.json`; keep explicit root usage in root `biome.json` until Biome loads plugin paths transitively from extended package configs.
4. Export plugin files from `packages/biome-config/package.json` and include the `plugins` directory in `files`.
5. Write rule docs in Biome rule-page style. Read `references/rule-doc-template.md` when creating or updating docs.
6. Test plugin behavior with Node native `node:test`, not ad hoc assertions. Read `references/test-harness.md` when adding or changing plugin tests.
7. Run targeted Biome checks, `pnpm test:biome-plugin`, `pnpm lint`, and `pnpm --filter @m-p-toolkit/biome-config pack --dry-run`.

## Standards

- Keep plugins conservative. Prefer missing a case over producing a false positive.
- Use `register_diagnostic` only; do not add autofix unless explicitly requested and proven safe.
- Diagnostic messages must explain the preferred style and the safe scope.
- Biome GritQL plugin severity is embedded in `register_diagnostic`; document and test separate `warn` and `error` variants instead of pretending `linter.rules` can configure plugin severity.
- Document Biome/GritQL limitations in the rule doc when they affect tests, matching precision, or consumer configuration.
- Add a changeset for published package behavior changes.

## References

- `references/rule-doc-template.md`: required documentation shape based on official Biome rule pages.
- `references/test-harness.md`: required structure for Node native plugin tests.
