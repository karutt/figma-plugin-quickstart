import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), viteSingleFile(), tsconfigPaths()],
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        minify: true,
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
            output: {
                entryFileNames: chunkInfo => {
                    if (chunkInfo.name === 'ui') return 'ui.js';
                    return '[name].js';
                },
                assetFileNames: '[name][extname]',
                manualChunks: undefined,
            },
            treeshake: true,
        },
        cssCodeSplit: false,
    },
});
