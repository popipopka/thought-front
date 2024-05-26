module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'no-console': 'warn',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'prefer-const': 'error',
    'semi': ['error', 'never'],
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off"
  },
}