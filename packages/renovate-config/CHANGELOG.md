# `renovate-config`

## 1.0.0

### Major Changes

- Added the initial GitHub-hosted Renovate preset with a 30-day release
  cooldown and routine update windows on February 1 and August 1.
- Grouped minor, patch, pin, and digest updates while keeping major updates
  separate.
- Enabled immediate GitHub and OSV vulnerability updates with security labels
  while keeping automerge disabled.
- Added a manual workflow for creating annotated `renovate-config-vX.Y.Z`
  tags without publishing an npm package or GitHub Release.
