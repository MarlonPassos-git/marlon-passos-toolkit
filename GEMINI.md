# Marlon Passos Toolkit (m-p-toolkit)

A personal monorepo containing configurations and utilities for projects by Marlon Passos.

## Project Overview

- **Architecture:** Monorepo using `pnpm` workspaces and `Turborepo`.
- **Main Technologies:** TypeScript, ESLint (Flat Config), Biome, Turborepo, pnpm.
- **Goal:** Centralize personal project configurations (ESLint and Biome).

## Directory Structure

- `packages/`: Contains the individual toolkits/configs.
  - `eslint-config/`: Personal ESLint configuration package (`@m-p-toolkit/eslint-config`).
  - `biome-config/`: Personal Biome configuration package (`@m-p-toolkit/biome-config`).
- `.github/workflows/`: CI/CD configurations.

## Building and Running

The project uses Turborepo for task orchestration. Key commands from the root:

- **Build all packages:**
  ```bash
  pnpm build
  ```
- **Run development mode:**
  ```bash
  pnpm dev
  ```
- **Lint all packages (ESLint + Biome):**
  ```bash
  pnpm lint
  ```

## Development Conventions

### Package Management
- Always use `pnpm` as the package manager.
- Workspace dependencies are managed in `pnpm-workspace.yaml`.

### Linting & Code Style
- **ESLint:** Custom configuration in `packages/eslint-config`.
- **Biome:** Custom configuration in `packages/biome-config`.
  - Provides `base.json`, `node.json`, and `react.json`.
  - To use, extend in your `biome.json`: `"extends": ["@m-p-toolkit/biome-config/base.json"]`.
- Configuration follows the **ESLint Flat Config** and **Biome** standards.
- Key rules enforced (ESLint):
  - Strict type imports.
  - No unused variables (with `_` prefix exception).
  - Restricted `no-console` (allows `warn`, `error`, `info`).
  - Specific padding and sorting requirements for imports.

### Adding New Packages
1. Create a new directory in `packages/`.
2. Ensure the `package.json` follows the naming convention `@m-p-toolkit/<name>`.
3. Configure `turbo.json` if new tasks are required.
