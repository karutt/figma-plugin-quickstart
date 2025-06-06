# Figma Plugin クイックスタート（React + Vite）

このリポジトリは、React + Vite を使った Figma プラグイン開発のためのスターターテンプレートです。高速な開発体験、UIとプラグインロジックの明確な分離、シングルファイルUIバンドルが特徴です。Figma プラグイン開発をこれから始める方にも、すぐに実践したい方にも最適です。

## 🚀 クイックスタート

### 開発モード（推奨）

1. **依存パッケージのインストール**
    ```sh
    pnpm install
    ```
2. **開発サーバーを起動**
    ```sh
    # 初回のみ: dist/index.htmlが必要なのでビルドも実行
    pnpm build && pnpm dev
    # 2回目以降は通常通り
    # pnpm dev
    ```
    - Vite のローカルサーバー（例: http://localhost:5173）が起動します。
    - この URL を Figma のプラグイン UI として利用することで、即時リロードで開発できます。
3. **Figma でプラグインを読み込む**
    - `cmd + k` で「Import plugin from manifest...」を選択し、このプロジェクトの `manifest.json` を指定します。
4. **プラグインを実行**
    - `cmd + k` で「Figma Plugin Quickstart」を実行すると、開発サーバーの UI が表示されます。

> 💡 **Tips:** 開発中はViteサーバーのURLを`manifest.json`の`ui`フィールドに設定しておくと、即時リロードが効きます。

### 本番ビルド

```sh
pnpm build
```

dist/`フォルダに`index.html`（UI）と `code.js`（プラグインロジック）が生成されます。

## 主な編集ファイル・リソース

- ✨ **プラグイン UI の編集**: [`App.tsx`](./src/app/App.tsx)
- 🛠️ **Figma API との連携**: [`controller.ts`](./src/plugin/controller.ts)
- 📚 **詳細ドキュメント**: [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/)

## 🛠️ ツール類

- **React** + **Vite**: 高速なモダンUI開発
- **TypeScript**: 型安全な開発
- **vite-plugin-singlefile**: UIを1つのHTMLファイルにバンドル
- **ESLint** & **Prettier**: コード品質と整形
- **pnpm**: 高速で効率的なパッケージ管理

## 📁 ディレクトリ構成

- `src/app/` – React UI（シングルファイルにバンドル）
- `src/plugin/` – Figma プラグインコントローラ（TypeScript）
- `dist/` – ビルド成果物（`index.html`, `code.js`）

## 🔖 よく使うコマンド

- `pnpm build` – 本番ビルド（UI + controller）
- `pnpm dev` – 開発サーバー起動
- `pnpm format` – Prettierでコード整形
- `pnpm lint:fix` – ESLint自動修正

## 💡 VS Code 推奨設定（任意）

Chakra UIのprops自動整列や保存時の自動修正を快適にするため、VS Codeのユーザー設定（settings.json）に以下を追加しておくと便利です。

```json
"eslint.rules.customizations": [
    { "rule": "chakra-ui/props-order", "severity": "off" }
],
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
},
"eslint.useFlatConfig": true,
```

- `eslint.rules.customizations`  
  Chakra UIのprops順序違反をエラーにしない（自動整列で十分なため）。
- `editor.codeActionsOnSave`  
  保存時にESLintの自動修正を明示的に実行。
- `eslint.useFlatConfig`  
  FlatConfig（新しいESLint設定方式）を有効化。

> コマンドパレット（Cmd + Shift + P）で「Preferences: Open User Settings (JSON)」を開き、上記を追記してください。

## ♻️ ホットリロード

Figma には、プラグインのホットリロード機能があります。これを有効にすると、コードを編集してビルドするたびに、プラグインが自動的に再起動し、最新の変更が即座に反映されます。ホットリロードをオフにしている場合は、手動でプラグインを再起動する必要があります。

![Hot Reloading](https://static.figma.com/uploads/d8cf8d1e1f383f26fa6c800a33dbcfdaf201a807)

## 📝 manifest.json について

`manifest.json` は、Figma プラグインの動作や表示場所を定義する設定ファイルです。必須項目の例と、各フィールドの簡単な説明を下記にまとめます。

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

### 主なフィールド

- **name**: Figma メニューに表示されるプラグイン名
- **id**: プラグイン固有のID。新規作成時に自動付与され、公開時に利用
- **api**: 利用する Figma Plugin API のバージョン
- **main**: プラグイン本体（ロジック）の JavaScript ファイルパス
- **ui**: プラグインのカスタムUI（iframeで表示）のHTMLファイルパス
- **capabilities**: プラグインの特別な機能（例: `textreview`, `codegen`, `inspect`, `vscode`）
- **enableProposedApi**: 開発中APIの利用可否（開発時のみ有効）
- **documentAccess**: Figmaファイルへのアクセス方法。`"dynamic-page"` 推奨
- **editorType**: プラグインが対応するFigmaエディタ（`figma`, `figjam`, `dev`, `slides`）
- **networkAccess**: プラグインがアクセス可能なドメインのリスト
    - `allowedDomains`: 通信許可ドメイン（例: `["none"]` で全ブロック、`["*"]` で全許可、特定ドメイン指定も可）
    - `devAllowedDomains`: 開発中のローカルサーバーなど、開発時に許可するドメイン

## 📣 コントリビュート・質問

バグ報告・機能要望・質問はIssueまたはPRで歓迎します！
