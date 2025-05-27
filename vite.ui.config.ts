import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
    plugins: [react(), viteSingleFile()],
    build: {
        outDir: "dist",
        emptyOutDir: false, // 上書き出力にする
        rollupOptions: {
            input: resolve(__dirname, "index.html"),
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "ui") return "ui.js";
                    return "[name].js";
                },
                assetFileNames: "[name][extname]",
            },
        },
        minify: false,
    },
});
