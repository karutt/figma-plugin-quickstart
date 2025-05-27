import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
    plugins: [react(), viteSingleFile()],
    build: {
        outDir: 'dist',
        emptyOutDir: false, // 上書き出力にする
        minify: true, // 本番用に圧縮
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
            output: {
                entryFileNames: chunkInfo => {
                    if (chunkInfo.name === 'ui') return 'ui.js';
                    return '[name].js';
                },
                assetFileNames: '[name][extname]',
                manualChunks: undefined, // tree shaking有効化
            },
            treeshake: true,
        },
        cssCodeSplit: false, // CSSもインライン化
    },
});
