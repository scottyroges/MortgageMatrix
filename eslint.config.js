import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Define project-specific rules
const projectRules = {
  // Naming conventions
  '@typescript-eslint/naming-convention': [
    'error',
    // Component names must be PascalCase
    {
      selector: ['typeLike', 'interface', 'enum'],
      format: ['PascalCase'],
    },
    // React components must be PascalCase
    {
      selector: 'variable',
      types: ['function'],
      format: ['camelCase', 'PascalCase'],
    },
    // Variables, functions, and class members must be camelCase
    {
      selector: [
        'variable',
        'function',
        'classMethod',
        'classProperty',
        'accessor',
        'parameterProperty',
      ],
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },
    // Constants can be UPPER_CASE
    {
      selector: 'variable',
      modifiers: ['const'],
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    },
    // Parameters must be camelCase
    {
      selector: 'parameter',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },
  ],

  // React specific rules
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  'react/jsx-pascal-case': 'error',
  'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
  'react/jsx-key': 'error',
  'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  'react/self-closing-comp': 'error',
  'react/no-array-index-key': 'warn',
  'react/hook-use-state': 'error',

  // Import rules
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'import/no-duplicates': 'error',
  'import/extensions': 'off',

  // TypeScript specific rules
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

  // General code style
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
  'no-var': 'error',
  eqeqeq: ['error', 'always'],

  // Prettier integration
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
      tabWidth: 2,
      semi: true,
    },
  ],
};

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'build/**',
      'coverage/**',
      'node_modules/**',
      'package-lock.json',
      'yarn.lock',
      '.env',
      '.env.*',
      '.idea/**',
      '.vscode/**',
      '**/*.log',
      '**/*.d.ts',
    ],
  },
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Allow React import even if not directly used (for JSX)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: 'React',
          argsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: 'React',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Test files configuration
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/test/**/*'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'import/extensions': 'off',
    },
  },

  // TypeScript files configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Convert jsx-a11y rules to warnings instead of errors
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...projectRules,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },

  // JavaScript files configuration
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Convert jsx-a11y rules to warnings instead of errors
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Exclude TypeScript-specific rules
      ...Object.fromEntries(
        Object.entries(projectRules).filter(([key]) => !key.startsWith('@typescript-eslint'))
      ),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Configuration files
  {
    files: ['*.config.{js,ts}', 'vite.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-default-export': 'off',
    },
  }
);
