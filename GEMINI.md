# Marlon Passos Toolkit (m-p-toolkit)

A personal monorepo containing configurations and utilities for projects by Marlon Passos.

## Project Overview

- **Architecture:** Monorepo using `pnpm` workspaces and `Turborepo`.
- **Main Technologies:** TypeScript, Biome, Turborepo, pnpm.
- **Goal:** Centralize personal project configurations (ESLint and Biome).

## Directory Structure

- `packages/`: Contains the individual toolkits/configs.
  - `eslint-config/`: Personal ESLint configuration package (`@m-p-toolkit/eslint-config`).
  - `biome-config/`: Personal Biome configuration package (`@m-p-toolkit/biome-config`).
- `.github/workflows/`: CI/CD configurations.

## Building and Running

The project uses Biome for linting and Turborepo for task orchestration. Key commands from the root:

- **Build all packages:**
  ```bash
  pnpm build
  ```
- **Run development mode:**
  ```bash
  pnpm dev
  ```
- **Lint all projects (using Biome):**
  ```bash
  pnpm lint
  ```
- **Format code (using Biome):**
  ```bash
  pnpm format
  ```

## Development Conventions

### Package Management
- Always use `pnpm` as the package manager.
- Workspace dependencies are managed in `pnpm-workspace.yaml`.

### Linting & Code Style
- **Biome (Primary):** This toolkit uses its own Biome configuration (`@m-p-toolkit/biome-config/node.json`) for linting and formatting.
- **ESLint:** Provided as an alternative configuration in `packages/eslint-config`.
- Biome configuration is enforced at the root via `biome.json`.

### Adding New Packages
1. Create a new directory in `packages/`.
2. Ensure the `package.json` follows the naming convention `@m-p-toolkit/<name>`.
3. Configure `turbo.json` if new tasks are required.
