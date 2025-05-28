# Figma Plugin クイックスタート（React + Vite）

React と Vite を使った Figma プラグイン開発のための、堅牢でモダンなスターターテンプレートです。高速な開発体験、UIとプラグインロジックの明確な分離、シングルファイルUIバンドルが特徴です。

## クイックスタート

### 開発モード（推奨）

1. 依存パッケージのインストール:
    ```sh
    pnpm install
    ```
2. 開発サーバーを起動:
    ```sh
    pnpm dev
    ```
    - Vite のローカルサーバー（例: http://localhost:5173）が起動します。
    - この URL を Figma のプラグイン UI として利用することで、即時リロードで開発できます。
3. Figma で「Plugins」→「Development」→「Import plugin from manifest...」を選択し、このプロジェクトの `manifest.json` を選択します。

### 本番ビルド

1. 本番用ビルドを作成:
    ```sh
    pnpm build
    ```
    - `dist/` フォルダに `index.html`（UI）と `code.js`（プラグインロジック）が生成されます。
2. `manifest.json` の `ui` フィールドを `dist/index.html` に戻します。
3. Figma でプラグインを再インポートすると、本番ビルドの UI が利用されます。

- ✨ プラグイン UI の編集は [`App.tsx`](./src/app/components/App.tsx)
- 🛠️ Figma API との連携は [`controller.ts`](./src/plugin/controller.ts)
- 📚 詳細は [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/) を参照してください

## ツール類

- **React** + **Vite**: 高速なモダンUI開発
- **TypeScript**: 型安全な開発
- **vite-plugin-singlefile**: UIを1つのHTMLファイルにバンドル
- **ESLint** & **Prettier**: コード品質と整形
- **pnpm**: 高速で効率的なパッケージ管理

## ディレクトリ構成

- `src/app/` – React UI（シングルファイルにバンドル）
- `src/plugin/` – Figma プラグインコントローラ（TypeScript）
- `dist/` – ビルド成果物（`ui.html`, `code.js`）

## よく使うコマンド

- `pnpm build` – 本番ビルド（UI + controller）
- `pnpm watch` – UI/controller両方の自動監視
- `pnpm typecheck` – 型チェックのみ
- `pnpm format` – Prettierでコード整形
- `pnpm lint:fix` – ESLint自動修正

## manifest.json について

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
        "allowedDomains": ["none"]
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
    - 未許可ドメインへの通信はFigma側でブロックされます
