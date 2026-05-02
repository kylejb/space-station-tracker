import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    build: { outDir: '../dist/web' },
    plugins: [react(), tailwindcss()],
    resolve: {
        tsconfigPaths: true,
    },
    server: {
        port: 3000,
    },
});
