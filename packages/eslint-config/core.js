import { defineFlatConfig } from 'eslint-define-config'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tsEslint from 'typescript-eslint'

/// <reference types="@eslint-types/typescript-eslint" />
export default defineFlatConfig([
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ...stylistic.configs['recommended-flat'],
  },
  {
    languageOptions: { globals: globals.browser },
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-useless-assignment': 'error',
      'no-shadow': 'error',
      'sort-imports': [
        'error',
        { ignoreCase: true, memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'] },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'function', next: 'function' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'never', prev: 'import', next: 'import' },
        { blankLine: 'never', prev: 'const', next: 'const' },
      ],
      'no-warning-comments': [
        'error',
      ],
    },
  },
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  {
    rules: {
      'jsonc/indent': ['error',
        2,
        {},
      ],
    },

  },
])
