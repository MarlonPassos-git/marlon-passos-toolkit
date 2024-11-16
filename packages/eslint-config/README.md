# `@turbo/eslint-config`

Collection of internal eslint configurations.

## Installation

```bash
pnpm install -D 'https://gitpkg.vercel.app/MarlonPassos-git/marlon-passos-toolkit/packages/eslint-config?main'
```

## Usage 
This eslint configuration is only compatible with the new eslint file standard like `eslint.config.{mjs|cjs|js}`

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
