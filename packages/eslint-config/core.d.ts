import type { FlatESLintConfig } from "eslint-define-config";

declare const config: FlatESLintConfig;

// biome-ignore lint/style/noDefaultExport: This is the entry point of the ESLint config package
export default config;
