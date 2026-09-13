# Changelog

All notable changes to `renovate-config` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this preset adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-12

### Added

- Added the initial GitHub-hosted Renovate preset with a 30-day release
  cooldown and routine update windows on February 1 and August 1.
- Grouped minor, patch, pin, and digest updates while keeping major updates
  separate.
- Enabled immediate GitHub and OSV vulnerability updates with security labels
  while keeping automerge disabled.
- Added a manual workflow for creating annotated `renovate-config-vX.Y.Z`
  tags without publishing an npm package or GitHub Release.

[unreleased]: https://github.com/MarlonPassos-git/marlon-passos-toolkit/compare/renovate-config-v1.0.0...HEAD
[1.0.0]: https://github.com/MarlonPassos-git/marlon-passos-toolkit/tree/renovate-config-v1.0.0
