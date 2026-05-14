<p align="center">
  <img src="../../assets/icon.svg" alt="Marlon Passos Toolkit icon" width="96" height="96" />
</p>

# `@m-p-toolkit/biome-config`

<p align="center">
  <a href="https://www.npmjs.com/package/@m-p-toolkit/biome-config">
    <img src="https://img.shields.io/npm/v/@m-p-toolkit/biome-config?style=for-the-badge&color=60A5FA&label=npm" alt="npm version for @m-p-toolkit/biome-config" />
  </a>
</p>

Personal Biome configuration shared across Marlon Passos projects.

## Presets

- `base`: shared formatter and linter defaults
- `node`: Node-specific rules on top of `base`
- `react`: React-specific rules on top of `base`

## Installation

```bash
pnpm add -D @m-p-toolkit/biome-config @biomejs/biome
```

## Usage

Create a `biome.json` file and extend one of the published presets.

### Base

```json
{
  "extends": ["@m-p-toolkit/biome-config/base"]
}
```

### Node

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"]
}
```

### React

```json
{
  "extends": ["@m-p-toolkit/biome-config/react"]
}
```

### Optional Plugins

The `base` preset declares the warning variant of package plugins. Biome
currently resolves plugin paths from the consuming project configuration, so
add package plugins explicitly if the plugin is not loaded through `extends` in
your project.

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"],
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/prefer-direct-filter-callback.warn.grit"
  ]
}
```

Use the error variant when the diagnostic must fail CI without relying on a
global warning policy:

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"],
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/prefer-direct-filter-callback.error.grit"
  ]
}
```

Rule documentation:

- [`preferDirectFilterCallback`](./docs/rules/preferDirectFilterCallback.md)
- [Plugin severity variants](./docs/plugin-severity.md)

## Contributing

See the [contributing guide](../../CONTRIBUTING.md).

## Changelog

See the [package changelog](./CHANGELOG.md).
