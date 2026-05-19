# @m-p-toolkit/biome-config

## 1.0.0

### Major Changes

- Promoted the shared Biome config to `1.0.0`.
- Breaking change: the base preset now treats Biome's `noExplicitAny` rule as an error instead of a warning.
  Projects extending the base preset must remove explicit `any` usage before adopting this version.

### Minor Changes

- Added a Biome GritQL plugin that warns on redundant direct callback forwarding in method calls.
  The plugin diagnostic text is emitted in English.

## 0.1.0

### Minor Changes

- Published the initial shared Biome configuration package.
- Added `base`, `node`, and `react` presets for reusable formatter and linter configuration.
- Exported presets through package subpaths so consumers can extend `@m-p-toolkit/biome-config/base`, `@m-p-toolkit/biome-config/node`, or `@m-p-toolkit/biome-config/react`.
- Declared `@biomejs/biome` as a peer dependency for consumer-controlled Biome versions.
