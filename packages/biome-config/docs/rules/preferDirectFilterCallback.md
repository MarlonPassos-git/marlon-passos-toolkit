# preferDirectFilterCallback

- JavaScript (and super languages)

## Summary

- Rule available since: `unreleased`
- Diagnostic Category: `plugin/preferDirectFilterCallback`
- This rule is not recommended by Biome by default.
- This rule doesn't have a fix.
- The default severity of this rule is `warning`.

## How to configure

The `base` preset declares the warning variant of this plugin. Biome currently
resolves plugin paths from the consuming project configuration, so shared config
consumers may still need to list this plugin explicitly.

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"],
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/prefer-direct-filter-callback.warn.grit"
  ]
}
```

Use the error variant when this rule should fail the command:

```json
{
  "extends": ["@m-p-toolkit/biome-config/node"],
  "plugins": [
    "./node_modules/@m-p-toolkit/biome-config/plugins/prefer-direct-filter-callback.error.grit"
  ]
}
```

For this repository:

```json
{
  "extends": ["./packages/biome-config/node.json"],
  "plugins": [
    "./packages/biome-config/plugins/prefer-direct-filter-callback.warn.grit"
  ]
}
```

> [!INFO]
> Biome doesn't currently let GritQL plugins receive options or map plugin
> diagnostics into `linter.rules`. This package ships separate `warn` and
> `error` plugin files so consumers can choose severity while Biome doesn't
> support per-plugin configuration. See
> [Plugin severity variants](../plugin-severity.md) for the rationale and
> migration plan.

## Description

Disallow callbacks that only forward their single argument to a simple function
inside a method call.

Passing the function directly is shorter and communicates that the method should
use that predicate, mapper, or callback without extra callback logic.

This rule is intentionally conservative. It only reports callbacks with one
simple parameter, one direct call, one forwarded argument, and a simple
identifier callee. It doesn't report member expressions, optional calls, extra
arguments, destructuring, block-bodied arrows, or additional logic.

This rule doesn't provide a fix because array iteration methods pass extra
arguments such as `index` and `array` to callbacks. Rewriting to `.method(fn)`
is only behavior-preserving when the function ignores those extra arguments.

## Examples

### Invalid

```typescript
const validAccounts = accounts.filter((account) => isSuccessfulAccount(account));
```

```text
plugin ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! Pass the function directly to the method: `.method(fn)`, when the callback only forwards the same argument.

  > 1 │ const validAccounts = accounts.filter((account) => isSuccessfulAccount(account));
      │                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

```typescript
const validItems = items.find((item: Item) => isValidItem(item));
```

```typescript
const normalizedItems = items.map(function (item) {
  return normalizeItem(item);
});
```

### Valid

```typescript
const validAccounts = accounts.filter(isSuccessfulAccount);
```

```typescript
const validAccounts = accounts.filter((account, index) =>
  isSuccessfulAccount(account, index)
);
```

```typescript
const validAccounts = accounts.filter((account) =>
  accountValidator.isSuccessfulAccount(account)
);
```

```typescript
const validAccounts = accounts.filter((account) =>
  isSuccessfulAccount(account) && account.active
);
```

```typescript
const validItems = items.filter((item) => isValidItem(item, true));
```

```typescript
const validItems = items.filter((item) => isValidItem(item.id));
```

```typescript
const validItems = items.filter(({ id }) => isValidId(id));
```

```typescript
const validItems = items.filter((item) => isValidItem?.(item));
```

```typescript
const validItems = items.filter((item) => isValidItem.call(null, item));
```

## Implementation Notes

The production plugin lives at
`packages/biome-config/plugins/prefer-direct-filter-callback.warn.grit`.

This repository tests the production rule through Biome and a Node native
`node:test` harness, not through `grit patterns test`, because the rule depends
on Biome-specific AST node names such as `JsCallExpression`,
`JsArrowFunctionExpression`, and `JsFunctionExpression`. The current Grit CLI
does not compile those node names.

## Related links

- Biome GritQL plugins: https://biomejs.dev/linter/plugins/
- Biome GritQL reference: https://biomejs.dev/reference/gritql/
- Plugin severity variants: ../plugin-severity.md
- Rule style reference: https://biomejs.dev/linter/rules/no-accumulating-spread/
