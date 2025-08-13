import { FlatCompat } from "@eslint/eslintrc";
import angularEslintPlugin from "@angular-eslint/eslint-plugin";
import angularEslintTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import prettierPlugin from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "path";

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  ...compat.extends("plugin:@angular-eslint/recommended"),
  ...compat.extends("plugin:@angular-eslint/template/process-inline-templates"),
  // 👇 라이브러리 (ibsheet-angular) 설정
  {
    files: ["projects/ibsheet-angular/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./projects/ibsheet-angular/tsconfig.lib.prod.json"],
        tsconfigRootDir: path.resolve("./"),
        sourceType: "module",
      },
    },
    plugins: {
      "@angular-eslint": angularEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  {
    files: ["projects/ibsheet-angular/**/*.spec.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./projects/ibsheet-angular/tsconfig.spec.json"],
        tsconfigRootDir: path.resolve(),
        sourceType: "module",
      },
    },
    plugins: {
      "@angular-eslint": angularEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  // 👇 데모 앱 설정
  {
    files: ["projects/demo/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./projects/demo/tsconfig.app.json"],
        tsconfigRootDir: path.resolve("./"),
        sourceType: "module",
      },
    },
    plugins: {
      "@angular-eslint": angularEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  {
    files: ["projects/demo/**/*.spec.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./projects/demo/tsconfig.spec.json"],
        tsconfigRootDir: path.resolve(),
        sourceType: "module",
      },
    },
    plugins: {
      "@angular-eslint": angularEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  // 👇 템플릿 파일 설정
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularEslintTemplatePlugin,
    },
    rules: angularEslintTemplatePlugin.configs.recommended.rules,
  },
  {
    ignores: ["dist/**/*", "node_modules/**/*"],
  },
];
