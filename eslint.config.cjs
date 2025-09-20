const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importX = require('eslint-plugin-import-x');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Config files (CommonJS)
    files: ['eslint.config.cjs', '**/*.config.{js,cjs}'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Source files
    files: ['**/*.{js,mjs,ts}', 'src/**/*.{js,ts}'],
    ignores: ['**/*.config.{js,cjs}', 'eslint.config.cjs'],
    plugins: {
      'import-x': importX,
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,

      // Basic JavaScript/TypeScript rules
      'no-unused-vars': 'off', // Handled by TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',

      // Prettier rules
      'prettier/prettier': 'error',

      // Import/export rules
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'import-x/no-unresolved': 'off', // TypeScript handles this
      'import-x/no-duplicates': 'error',
    },
  },
];
