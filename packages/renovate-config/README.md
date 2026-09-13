# Renovate configuration

Shared Renovate preset for Marlon Passos projects. It is consumed directly
from GitHub and is not published to npm.

## Behavior

- Renovate creates normal dependency branches and pull requests only on the
  first day of February and August, from 00:00 through 03:59 in the
  `America/Sao_Paulo` timezone. This is a semiannual calendar, not a minimum
  release age of six months.
- Normal updates must have been released for at least 30 days. In the
  Dependency Dashboard, **Pending Status Checks** represents this cooldown.
- **Awaiting Schedule** means an update has completed the cooldown but is
  waiting for the February or August window.
- Selecting an update's checkbox in the Dependency Dashboard forces Renovate
  to create it before the scheduled window.
- Minor, patch, pin, and digest updates are grouped. Major updates remain
  separate.
- GitHub and OSV vulnerability updates ignore the cooldown and calendar, and
  receive the `security` and `dependencies` labels.
- Automerge remains disabled for every update.

## Usage

To follow the preset from the toolkit's default branch without a tag:

```json
{
  "extends": [
    "github>MarlonPassos-git/marlon-passos-toolkit//packages/renovate-config/default.json"
  ]
}
```

For reproducible configuration, pin the preset to an annotated tag:

```json
{
  "extends": [
    "github>MarlonPassos-git/marlon-passos-toolkit//packages/renovate-config/default.json#renovate-config-v1.0.0"
  ]
}
```

The current consumers, `mairo-vergara-plus` and `lint-forge`, use
`renovate-config-v1.0.0`.

The Renovate installation must be able to read both the consumer and this
repository. Public repositories need no additional preset access; private
consumers must grant the Renovate app access to the consumer repository.

## Releasing a new version

After a preset change reaches `main`, open **Actions**, select
**Release Renovate Config**, and choose the SemVer increment. For example,
selecting `minor` after `renovate-config-v1.0.0` creates the annotated tag
`renovate-config-v1.1.0` on the current `main` commit.

If no Renovate config tag exists yet, the workflow starts from `0.0.0`;
selecting `major` creates the initial `renovate-config-v1.0.0` tag.

The workflow refuses to overwrite an existing tag and does not create a GitHub
Release. Consumers must update their pinned reference explicitly; there is no
custom manager or other automatic tag-reference update at this time.
