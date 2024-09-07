# `@turbo/eslint-config`

Collection of internal eslint configurations.

## Installation

```bash
pnpm install -D 'https://gitpkg.vercel.app/MarlonPassos-git/marlon-passos-toolkit/packages/eslint-config?main'
```

## Usage 

### Simple 

```js
import config from '@m-p-toolkit/eslint-config'

export default config,
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