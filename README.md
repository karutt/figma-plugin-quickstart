# Figma Plugin Quickstart (React + Vite)

This repository is a starter template for developing Figma plugins using React and Vite. It features a fast development experience, clear separation of UI and plugin logic, and single-file UI bundling. Perfect for both beginners and those who want to get started quickly with Figma plugin development.

## 🚀 Quickstart

### Development Mode (Recommended)

1. **Install dependencies**
    ```sh
    pnpm install
    ```
2. **Start the development server**
    ```sh
    # First time only: build is required so that dist/index.html exists for manifest.json
    pnpm build && pnpm dev
    # On subsequent runs, just use:
    # pnpm dev
    ```
    - The Vite local server (e.g., http://localhost:5173) will start.
    - Use this URL as the Figma plugin UI for instant reload during development.
3. **Load the plugin in Figma**
    - Press `cmd + k` and select "Import plugin from manifest...", then choose this project's `manifest.json`.
4. **Run the plugin**
    - Press `cmd + k` and run "Figma Plugin Quickstart" to see the development server UI in Figma.

> 💡 **Tips:** During development, set the Vite server URL in the `ui` field of `manifest.json` for instant reload.

### Production Build

```sh
pnpm build
```

The `dist/` folder will contain `index.html` (UI) and `code.js` (plugin logic).

## Main Files & Resources

- ✨ **Edit Plugin UI**: [`App.tsx`](./src/app/App.tsx)
- 🛠️ **Figma API Integration**: [`controller.ts`](./src/plugin/controller.ts)
- 📚 **Official Docs**: [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/)

## 🛠️ Tools

- **React** + **Vite**: Modern, fast UI development
- **TypeScript**: Type-safe development
- **vite-plugin-singlefile**: Bundle UI into a single HTML file
- **ESLint** & **Prettier**: Code quality and formatting
- **pnpm**: Fast and efficient package management

## 📁 Directory Structure

- `src/app/` – React UI (bundled as a single file)
- `src/plugin/` – Figma plugin controller (TypeScript)
- `dist/` – Build outputs (`index.html`, `code.js`)

## 🔖 Common Commands

- `pnpm build` – Production build (UI + controller)
- `pnpm dev` – Start development server
- `pnpm format` – Format code with Prettier
- `pnpm lint:fix` – Auto-fix with ESLint

## 💡 Recommended VS Code Settings (Optional)

To make working with Chakra UI and ESLint more comfortable, add the following to your VS Code `settings.json`:

```jsonc
"eslint.rules.customizations": [
    { "rule": "chakra-ui/props-order", "severity": "off" }
],
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
},
"eslint.useFlatConfig": true,
```

- `eslint.rules.customizations`: Disables errors for Chakra UI prop order (auto-sorting is sufficient).
- `editor.codeActionsOnSave`: Explicitly runs ESLint auto-fix on save.
- `eslint.useFlatConfig`: Enables the new ESLint FlatConfig system.

> Open the command palette (`Cmd + Shift + P`), select "Preferences: Open User Settings (JSON)", and add the above.

## ♻️ Hot Reloading

Figma provides the option to hot reload your plugin, making development even faster. When enabled, your plugin will automatically restart with the latest changes each time you edit the code and rebuild. If hot reloading is turned off, you will need to manually restart the plugin to see updates.

![Hot Reloading](https://static.figma.com/uploads/d8cf8d1e1f383f26fa6c800a33dbcfdaf201a807)

## 📝 About manifest.json

`manifest.json` defines how your Figma plugin works and where it appears. Below is an example with key fields explained.

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
        "allowedDomains": ["none"],
        "devAllowedDomains": ["http://localhost:5173"]
    }
}
```

### Key Fields

- **name**: Plugin name shown in the Figma menu
- **id**: Unique plugin ID (auto-assigned on creation, used for publishing)
- **api**: Figma Plugin API version
- **main**: Path to the plugin logic JavaScript file
- **ui**: Path to the custom UI HTML file (shown in an iframe)
- **capabilities**: Special plugin features (e.g., `textreview`, `codegen`, `inspect`, `vscode`)
- **enableProposedApi**: Enable experimental APIs (for development only)
- **documentAccess**: How the plugin accesses Figma files (`"dynamic-page"` recommended)
- **editorType**: Supported Figma editors (`figma`, `figjam`, `dev`, `slides`)
- **networkAccess**: List of allowed domains for network access
    - `allowedDomains`: Domains allowed in production (e.g., `["none"]` blocks all, `["*"]` allows all, or specify domains)
    - `devAllowedDomains`: Domains allowed during development (e.g., local server)

## 📣 Contributing & Questions

Bug reports, feature requests, and questions are welcome via Issues or PRs!
