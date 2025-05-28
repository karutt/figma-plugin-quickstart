// vite.config.ts
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), viteSingleFile(), tsconfigPaths()],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                ui: resolve(__dirname, 'index.html'),
                code: resolve(__dirname, 'src/plugin/controller.ts'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].[hash].js',
                assetFileNames: '[name].[ext]',
                dir: 'dist',
            },
        },
        target: ['esnext'],
        minify: false,
    },
});
