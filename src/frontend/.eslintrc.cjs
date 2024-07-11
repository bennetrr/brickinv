module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:mobx/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'mobx'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
  },
  overrides: [
    {
      files: ['**/*.fixture.tsx'],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    }
  ]
}
