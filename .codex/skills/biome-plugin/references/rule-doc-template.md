# Rule Documentation Template

Use this shape for local Biome plugin rule docs, mirroring official Biome rule pages such as `noAccumulatingSpread`.

````markdown
# <ruleName>

- JavaScript (and super languages)

## Summary

- Rule available since: `<package version or unreleased>`
- Diagnostic Category: `plugin/<ruleName>` or `plugin`
- This rule is not recommended by Biome by default.
- This rule doesn't have a fix.
- The default severity of this rule is `warning`.

## How to configure

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"],
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/<rule-file>.warn.grit"
  ]
}
````

Use the error variant when this rule should fail the command:

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"],
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/<rule-file>.error.grit"
  ]
}
```

> [!INFO]
> Biome doesn't currently let GritQL plugins receive options or map plugin diagnostics into `linter.rules`. Ship separate `warn` and `error` plugin files while that limitation exists.

For this repository, prefer:

```json
{
  "extends": ["./packages/biome-config/node.json"],
  "plugins": ["./packages/biome-config/plugins/<rule-file>.warn.grit"]
}
```

## Description

State what the rule disallows and why. Include safety notes and why autofix is absent when relevant.

## Examples

### Invalid

Code that should emit a diagnostic. Include the diagnostic message under the first representative example.

### Valid

Code that must not emit a diagnostic.

## Implementation Notes

Mention Biome/GritQL limitations, conservative exclusions, and test strategy.

## Related links

- Biome GritQL plugins: https://biomejs.dev/linter/plugins/
- Biome GritQL reference: https://biomejs.dev/reference/gritql/
```

Keep headings in this order. Do not use "positive/negative" naming in the final docs; use "Invalid/Valid".
