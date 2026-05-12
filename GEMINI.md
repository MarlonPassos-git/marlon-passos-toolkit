# Marlon Passos Toolkit (m-p-toolkit)

A personal monorepo containing configurations and utilities for projects by Marlon Passos.

## Project Overview

- **Architecture:** Monorepo using `pnpm` workspaces.
- **Main Technologies:** TypeScript, Biome, pnpm.
- **Goal:** Centralize personal project configurations with Biome.
- **Package Manager:** `pnpm` (configured at version `10.33.0`).

## Directory Structure

- `packages/`: Contains the individual toolkits/configs.
  - `biome-config/`: Personal Biome configuration package (`@m-p-toolkit/biome-config`).
    - Includes `base.json`, `node.json`, and `react.json`.
    - `node.json` is configured for Node.js environments (allowing Node modules, enforcing protocol-prefixed imports).
    - `react.json` includes React-specific rules (a11y, hooks, security).
- `.github/workflows/`: CI/CD configurations.
  - `main.yml`: Automates linting and publishing to NPM via `workflow_dispatch` (uses Node 24 and Actions v5/v6).
- `renovate.json`: Configures Renovate for dependency updates with a schedule (January and July).

## Building and Running

The project uses Biome for linting and pnpm workspace recursion for task orchestration. Key commands from the root:

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
- Node version requirement: `>=18`.

### Linting & Code Style
- **Biome:** This toolkit uses its own Biome configuration (`@m-p-toolkit/biome-config/node.json`) for linting and formatting.
- Biome configuration is enforced at the root via `biome.json` which extends `./packages/biome-config/node.json`.

### CI/CD and Publishing
- Linting and formatting are verified on every push and PR to `main`.
- Publishing is manual via GitHub Actions (`workflow_dispatch`), allowing selection of specific packages or all packages.

### Adding New Packages
1. Create a new directory in `packages/`.
2. Ensure the `package.json` follows the naming convention `@m-p-toolkit/<name>`.
3. Add package scripts so root `pnpm -r` commands can run them.
