/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    build: { outDir: '../dist/web' },
    plugins: [react(), process.env.BUILD_MODE ? false : eslintPlugin()],
    resolve: {
        alias: {
            '@common': resolve(__dirname, 'src/common'),
            '@components': resolve(__dirname, 'src/components'),
            '@containers': resolve(__dirname, 'src/containers'),
            '@utils': resolve(__dirname, 'src/utils'),
        },
    },
    server: {
        port: 3000,
    },
});
