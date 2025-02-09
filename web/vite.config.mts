import { resolve } from 'path';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    build: { outDir: '../dist/web' },
    plugins: [react(), tailwindcss(), tsconfigPaths()],
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
