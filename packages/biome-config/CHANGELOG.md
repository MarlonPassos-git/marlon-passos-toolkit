# @m-p-toolkit/biome-config

## 2.0.0

### Major Changes

- 65489cc: Require Biome 2.5 or newer and migrate promoted lint rules from the nursery group to style.

### Minor Changes

- b7a47b0: Add base naming conventions for variables, parameters, functions, classes, types, global constants, enum members, private class members, and namespace imports.

### Patch Changes

- 15723a6: Add a Svelte preset that follows Biome's experimental HTML super-language guidance for `.svelte` files.

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
