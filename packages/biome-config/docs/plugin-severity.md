# Plugin severity variants

## Summary

Biome GritQL plugins in this package are published as separate severity
variants when consumers need to choose between warnings and errors.

For example:

```json
{
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/prefer-direct-filter-callback.warn.grit"
  ]
}
```

```json
{
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/prefer-direct-filter-callback.error.grit"
  ]
}
```

## Why variants exist

Biome's current plugin configuration accepts plugin paths. It doesn't expose a
stable way to pass options to a GritQL plugin, and plugin diagnostics can't be
configured under `linter.rules` like native rules.

That means this native-rule style configuration isn't available for GritQL
plugins today:

```json
{
  "linter": {
    "rules": {
      "performance": {
        "noAccumulatingSpread": "error"
      }
    }
  }
}
```

> [!INFO]
> We ship `.warn.grit` and `.error.grit` files because the severity must be
> embedded in the plugin's `register_diagnostic(...)` call today. If Biome adds
> first-class plugin options or plugin rule severity configuration later, these
> variants can be replaced by a single configurable plugin path.

## Current convention

- Use `*.warn.grit` for the default shared preset behavior.
- Use `*.error.grit` when projects want the diagnostic to fail the Biome
  command.
- Do not keep an unsuffixed `*.grit` file for the same rule.

## References

- Biome plugins documentation: https://biomejs.dev/linter/plugins/
- Biome configuration reference: https://biomejs.dev/reference/configuration/
- Biome discussion about plugin options and severity:
  https://github.com/biomejs/biome/discussions/1762
