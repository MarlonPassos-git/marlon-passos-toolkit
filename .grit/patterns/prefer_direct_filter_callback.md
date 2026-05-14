# prefer_direct_filter_callback

Detects callbacks that only forward their single argument to a simple function
inside a method call.

The production plugin lives at
`packages/biome-config/plugins/prefer-direct-filter-callback.grit`. Biome plugin
paths are resolved from the consuming project configuration, so shared config
consumers must list this plugin explicitly in their `biome.json`.

This repository runs the production rule through Biome, not through
`grit patterns test`, because the rule depends on Biome-specific AST node names
such as `JsCallExpression`, `JsArrowFunctionExpression`, and
`JsFunctionExpression`. The current Grit CLI does not compile those node names.

## Pattern

```gritql
JsCallExpression(
  callee = JsStaticMemberExpression(),
  arguments = JsCallArguments(args = [$callback])
) where {
  or {
    $callback <: JsArrowFunctionExpression(
      parameters = JsParameters(items = [JsFormalParameter(binding = $parameter)]),
      body = $direct_call
    ),
    $callback <: JsArrowFunctionExpression(
      parameters = $parameter,
      body = $direct_call
    ),
    $callback <: JsFunctionExpression(
      parameters = JsParameters(items = [JsFormalParameter(binding = $parameter)]),
      body = JsFunctionBody(statements = [JsReturnStatement(argument = $direct_call)])
    )
  },
  $direct_call <: JsCallExpression(
    callee = $function_name,
    arguments = JsCallArguments(args = [$forwarded_argument])
  ),
  $parameter <: JsIdentifierBinding(),
  $forwarded_argument <: JsIdentifierExpression(),
  $forwarded_argument <: $parameter,
  $function_name <: JsIdentifierExpression(),
  not $direct_call <: contains `?.`
}
```

## Positive cases

```typescript
const validAccounts = accounts.filter((account) => isSuccessfulAccount(account));
```

```typescript
const validItems = items.find((item: Item) => isValidItem(item));
```

```typescript
const normalizedItems = items.map(function (item) {
  return normalizeItem(item);
});
```

## Negative cases

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
