# Contributing

Use the workspace checks before opening a pull request:

```bash
pnpm install
pnpm check
pnpm build
```

## Releasing `renovate-config`

After a preset change is merged into `main`:

1. Open **Actions** and select **Release Renovate Config**.
2. Select `patch`, `minor`, or `major` and run the workflow.
3. Confirm that the workflow created the annotated
   `renovate-config-vX.Y.Z` tag from the current `main` commit.
4. Update consumers to the new tag explicitly.

The first release starts from `0.0.0`, so select `major` to create
`renovate-config-v1.0.0`. The workflow does not overwrite tags or create a
GitHub Release.
