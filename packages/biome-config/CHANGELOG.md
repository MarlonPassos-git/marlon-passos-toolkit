# @m-p-toolkit/biome-config

## 0.1.0

### Minor Changes

- Published the initial shared Biome configuration package.
- Added `base`, `node`, and `react` presets for reusable formatter and linter configuration.
- Exported presets through package subpaths so consumers can extend `@m-p-toolkit/biome-config/base`, `@m-p-toolkit/biome-config/node`, or `@m-p-toolkit/biome-config/react`.
- Declared `@biomejs/biome` as a peer dependency for consumer-controlled Biome versions.
