# Node Native Plugin Test Harness

Use `node:test` and `node:assert/strict`.

Required structure:

- Keep `positiveCases` and `negativeCases` as named arrays near the top.
- Create a temporary Biome project with `mkdtemp`.
- Copy each production `.warn.grit` and `.error.grit` plugin into a temporary project.
- Write a minimal `biome.json` with the copied plugin, formatter disabled, and recommended rules disabled.
- For each case, write `case.ts`, run `pnpm exec biome check <case> --config-path <temp>`, and assert whether plugin output appears.
- Clean up the temp directory in `after`.

Assertions:

- Positive cases assert `hasDiagnostic === true`.
- Warning positive cases assert `status === 0`; error positive cases assert `status === 1`.
- Valid cases assert `hasDiagnostic === false`.
- Valid cases assert `status === 0`.
- Failure messages include Biome stdout/stderr.

Verification commands:

```bash
pnpm test:biome-plugin
pnpm exec biome check <changed files>
pnpm lint
pnpm --filter @m-p-toolkit/biome-config pack --dry-run
```
