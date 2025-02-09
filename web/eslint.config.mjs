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
            'id-length': ['error', { min: 2 }],
            'import/order': [
                'error',
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
            'max-lines': [
                'error',
                {
                    max: 500,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
            'max-lines-per-function': [
                'error',
                { max: 200, skipBlankLines: true, skipComments: true },
            ],
            'react/prop-types': 'off',
        },
    },
    prettierPlugin,
);
