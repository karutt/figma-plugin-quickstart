// vite.config.ts
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
    plugins: [react(), viteSingleFile()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                ui: resolve(__dirname, "index.html"),
                code: resolve(__dirname, "src/plugin/controller.ts"),
            },
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].[hash].js",
                assetFileNames: "[name].[ext]",
                // ルート直下にHTMLを出力
                dir: "dist",
            },
        },
        // Figma plugin controllerはNode API不要なのでtargetはesnext
        target: ["esnext"],
        minify: false,
    },
});
