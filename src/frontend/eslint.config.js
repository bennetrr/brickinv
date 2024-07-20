import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import pluginTs from 'typescript-eslint';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-config-prettier';
import pluginReactConfig from 'eslint-plugin-react';
import pluginReactRefreshConfig from 'eslint-plugin-react-refresh';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url))
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.es2020 } } },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  pluginPrettier,
  pluginReactConfig.configs.flat.recommended,
  {
    files: ['**/*.{ts,js}x'],
    plugins: {
      'react-refresh': pluginReactRefreshConfig
    },
    rules: {
      'react-refresh/only-export-components': 'warn'
    }
  },
  ...fixupConfigRules(
    compat.extends('plugin:react-hooks/recommended', 'plugin:mobx/recommended')
  )
];
