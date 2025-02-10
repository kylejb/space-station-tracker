// @ts-check
import eslint from '@eslint/js';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['.github/**', '.vscode/**', 'coverage', '**.config.*'] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    jsxA11y.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    reactPlugin.configs.flat['jsx-runtime'],
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
            // sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            // @ts-ignore
            'react-hooks': reactHooksPlugin,
        },
        settings: {
            react: { version: 'detect' },
        },
    },
    {
        rules: {
            // TODO: remove after fixing all issues
            '@typescript-eslint/consistent-type-definitions': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-redundant-type-constituents': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            // END TODO
            'id-length': ['warn', { min: 2 }], // TODO: set to error after addressing all issues
            'import/order': [
                'warn', // TODO: set to error after addressing all issues
                {
                    alphabetize: { caseInsensitive: true, order: 'asc' },
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        ['sibling', 'index'],
                        'unknown',
                    ],
                    'newlines-between': 'always',
                },
            ],
            'no-console': 'error',
            'max-depth': ['error', 4],
            // TODO: uncomment after fixing issues
            // 'max-lines': [
            //     'error',
            //     {
            //         max: 500,
            //         skipBlankLines: true,
            //         skipComments: true,
            //     },
            // ],
            // 'max-lines-per-function': [
            //     'error',
            //     { max: 200, skipBlankLines: true, skipComments: true },
            // ],
            // END TODO
            'react/prop-types': 'off',
        },
    },
    {
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
    },
    prettierPlugin,
);
