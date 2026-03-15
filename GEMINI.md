# Marlon Passos Toolkit (m-p-toolkit)

A personal monorepo containing configurations and utilities for projects by Marlon Passos.

## Project Overview

- **Architecture:** Monorepo using `pnpm` workspaces and `Turborepo`.
- **Main Technologies:** TypeScript, Biome, Turborepo, pnpm.
- **Goal:** Centralize personal project configurations (ESLint and Biome).
- **Package Manager:** `pnpm` (configured at version `9.12.3`).

## Directory Structure

- `packages/`: Contains the individual toolkits/configs.
  - `eslint-config/`: Personal ESLint configuration package (`@m-p-toolkit/eslint-config`).
    - Uses ESLint's new "flat config" standard (`core.js`, `core.d.ts`).
    - Depends on `@stylistic/eslint-plugin`, `typescript-eslint`, `eslint-plugin-jsonc`, etc.
  - `biome-config/`: Personal Biome configuration package (`@m-p-toolkit/biome-config`).
    - Includes `base.json`, `node.json`, and `react.json`.
    - `node.json` is configured for Node.js environments (allowing Node modules, enforcing protocol-prefixed imports).
    - `react.json` includes React-specific rules (a11y, hooks, security).
- `.github/workflows/`: CI/CD configurations.
  - `main.yml`: Automates linting and publishing to NPM via `workflow_dispatch`.
- `renovate.json`: Configures Renovate for dependency updates with a schedule (January and July).

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

### Turborepo Tasks
- `build`: Depends on `^build`, inputs include `.env*`, and has specific outputs for `.next/**` (Next.js pre-configuration).
- `lint` & `format`: Use Biome and cache results.
- `dev`: Persistent and non-cached task for development.

## Development Conventions

### Package Management
- Always use `pnpm` as the package manager.
- Workspace dependencies are managed in `pnpm-workspace.yaml`.
- Node version requirement: `>=18`.

### Linting & Code Style
- **Biome (Primary):** This toolkit uses its own Biome configuration (`@m-p-toolkit/biome-config/node.json`) for linting and formatting.
- **ESLint:** Provided as an alternative configuration in `packages/eslint-config` using the flat config standard.
- Biome configuration is enforced at the root via `biome.json` which extends `./packages/biome-config/node.json`.

### CI/CD and Publishing
- Linting and formatting are verified on every push and PR to `main`.
- Publishing is manual via GitHub Actions (`workflow_dispatch`), allowing selection of specific packages or all packages.

### Adding New Packages
1. Create a new directory in `packages/`.
2. Ensure the `package.json` follows the naming convention `@m-p-toolkit/<name>`.
3. Configure `turbo.json` if new tasks are required.
