<p align="center">
  <img src="./icon.svg" alt="Marlon Passos Renovate configuration icon" width="96" height="96" />
</p>

# `renovate-config`

<p align="center">
  <a href="https://github.com/MarlonPassos-git/marlon-passos-toolkit/tags">
    <img src="https://img.shields.io/github/v/tag/MarlonPassos-git/marlon-passos-toolkit?filter=renovate-config-v*&style=for-the-badge&color=60A5FA&label=renovate%20config" alt="latest renovate-config tag" />
  </a>
</p>

Personal Renovate configuration shared across Marlon Passos projects.

## Usage

Create a `renovate.json` file and extend the tagged preset.

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "github>MarlonPassos-git/marlon-passos-toolkit//packages/renovate-config/default.json#renovate-config-v1.0.0"
  ]
}
```

Renovate reads the preset directly from GitHub. No npm installation is needed.

## Contributing

See the [contributing guide](../../CONTRIBUTING.md).

## Changelog

See the [configuration changelog](./CHANGELOG.md).
