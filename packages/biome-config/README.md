# `@m-p-toolkit/biome-config`

Personal Biome configuration shared across Marlon Passos projects.

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
