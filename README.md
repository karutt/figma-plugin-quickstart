# Figma Plugin Quickstart with React and Vite

A robust and modern starting point for building Figma plugins with React and Vite. This template is designed for fast iteration, easy customization, and a clear separation between UI and plugin logic.

## Quickstart

### Development Mode (Recommended)

1. Install dependencies:
    ```sh
    pnpm install
    ```
2. Start the development server:
    ```sh
    pnpm dev
    ```
    - This launches a Vite local server (e.g., http://localhost:5173).
    - You can use this URL as the plugin UI in Figma for instant hot-reload development.
3. In Figma, go to `Plugins` → `Development` → `Import plugin from manifest...` and select this project's `manifest.json`.

### Production Build

1. Build for production:
    ```sh
    pnpm build
    ```
    - This generates `index.html` (UI) and `code.js` (plugin logic) in the `dist/` folder.
2. Change the `ui` field in `manifest.json` back to `dist/index.html`.
3. Re-import the plugin in Figma to use the production build UI.

- ✨ Edit your plugin UI in [`App.tsx`](./src/app/components/App.tsx)
- 🛠️ Work with the Figma API in [`controller.ts`](./src/plugin/controller.ts)
- 📚 See the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/) for more details

## Tooling Highlights

- **React** + **Vite** for a lightning-fast, modern development experience
- **TypeScript** for type safety
- **vite-plugin-singlefile** for compact UI bundles
- **ESLint** & **Prettier** for code quality and consistency
- **pnpm** for efficient package management

## Project Structure

- `src/app/` – React UI (bundled into a single file)
- `src/plugin/` – Figma plugin controller (TypeScript)
- `dist/` – Build output (`ui.html`, `code.js`)

## Useful Commands

- `pnpm build` – Production build (UI + controller)
- `pnpm watch` – Watch mode for both UI and controller
- `pnpm typecheck` – Type checking only
- `pnpm format` – Format code with Prettier
- `pnpm lint:fix` – Auto-fix lint issues with ESLint

## About `manifest.json`

The `manifest.json` file defines how your Figma plugin behaves and where it appears in Figma. It's required for every plugin project. Below is a simple example and a brief explanation of each field:

```json
{
    "name": "Figma Plugin Quickstart",
    "id": "4255163407468189952",
    "api": "1.0.0",
    "main": "dist/code.js",
    "ui": "dist/index.html",
    "capabilities": [],
    "enableProposedApi": false,
    "documentAccess": "dynamic-page",
    "editorType": ["figma", "figjam", "slides"],
    "networkAccess": {
        "allowedDomains": ["none"]
    }
}
```

### Key Fields

- **name**: The display name of your plugin in Figma menus.
- **id**: Unique plugin identifier, assigned when you create a new plugin. Used for publishing updates.
- **api**: The Figma Plugin API version your plugin uses. Use the latest version if possible.
- **main**: Path to your plugin's main JavaScript file (the logic). This runs in a sandboxed environment and can't access browser APIs directly.
- **ui**: Path to your plugin's custom UI HTML file (shown in an iframe). This can use browser features and communicates with the main logic via messages.
- **capabilities**: Special features your plugin uses. Examples:
    - `textreview`: For plugins that check or suggest text edits.
    - `codegen`: For plugins that generate code snippets (requires `editorType: dev`).
    - `inspect`: For plugins that add panels to Dev Mode's Inspect view (requires `editorType: dev`).
    - `vscode`: For plugins that run in Figma for VS Code.
- **enableProposedApi**: Allows use of experimental Figma APIs (for development only, not for published plugins).
- **documentAccess**: Controls how your plugin accesses Figma files. Use `"dynamic-page"` for best performance and access to large files. Some APIs require async loading for non-visible pages.
- **editorType**: Specifies which Figma editors your plugin supports:
    - `"figma"`: Figma Design
    - `"figjam"`: FigJam (some APIs/features differ)
    - `"dev"`: Dev Mode (read-only access)
    - `"slides"`: Figma Slides (some APIs/features differ)
        > Note: `"dev"` and `"figjam"` cannot be used together.
- **networkAccess**: Controls which domains your plugin can access over the network.
    - `allowedDomains`: List of allowed domains (e.g., `["none"]` to block all, `["*"]` to allow all, or specific domains). For development, use `devAllowedDomains` for local servers.
    - Any network requests to domains not listed here will be blocked by Figma.
