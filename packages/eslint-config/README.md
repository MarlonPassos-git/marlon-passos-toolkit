<p align="center">
  <img src="../../assets/icon.svg" alt="Marlon Passos Toolkit icon" width="96" height="96" />
</p>

# `@m-p-toolkit/eslint-config`

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-0f172a?style=for-the-badge" alt="Package version 0.0.1" />
  <img src="https://img.shields.io/badge/eslint-flat%20config-4b32c3?style=for-the-badge" alt="ESLint flat config" />
  <img src="https://img.shields.io/badge/shared-config-38bdf8?style=for-the-badge" alt="Shared config" />
</p>

Personal ESLint configuration shared across Marlon Passos projects.

## Installation

```bash
pnpm add -D @m-p-toolkit/eslint-config eslint
```

## Usage

This ESLint configuration is designed for flat config files such as `eslint.config.{mjs|cjs|js}`.

### Simple

```js
import config from '@m-p-toolkit/eslint-config'

export default config
```

### Extending configurations

```js
import config from '@m-p-toolkit/eslint-config'

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  ...config,
]
```
