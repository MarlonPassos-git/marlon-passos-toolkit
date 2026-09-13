<p align="center">
  <img src="./assets/icon.svg" alt="Marlon Passos Toolkit icon" width="96" height="96" />
</p>

# Marlon Passos Toolkit

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributing-guide-0f172a?style=for-the-badge" alt="Contributing guide" /></a>
  <img src="https://img.shields.io/badge/pnpm-monorepo-f69220?style=for-the-badge" alt="pnpm monorepo" />
  <img src="https://img.shields.io/badge/biome-ready-60a5fa?style=for-the-badge" alt="Biome ready" />
</p>

Monorepo with reusable configuration packages for my projects.

## Packages

- [`@m-p-toolkit/biome-config`](./packages/biome-config/README.md)

## Shared resources

- [Renovate configuration preset](./packages/renovate-config/README.md): keeps
  dependency updates consistent across projects and is consumed directly from
  GitHub, optionally pinned to an annotated tag.

```json
{
  "extends": [
    "github>MarlonPassos-git/marlon-passos-toolkit//packages/renovate-config/default.json#renovate-config-v1.0.0"
  ]
}
```

## Contributing

See the [contributing guide](./CONTRIBUTING.md).
