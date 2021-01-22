module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-classes-per-file': 'off',
    'no-plusplus': 'off',
    // Article on no-restricted-syntax with "for...of" loops
    // https://medium.com/@paul.beynon/thanks-for-taking-the-time-to-write-the-article-i-enjoyed-it-db916026647
    'no-restricted-syntax': 'off',
    'no-bitwise': 'warn',
    'max-len': 'warn',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-continue': 'off', // https://github.com/airbnb/javascript/issues/1103
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
    },
  ],
};
