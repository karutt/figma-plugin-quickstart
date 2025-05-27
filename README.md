# Figma Plugin Modern Template

## ディレクトリ構成

- `src/app/` ... React UI（Vite+singlefileで1ファイル化）
- `src/plugin/` ... Figma Plugin本体（controller.ts, esbuildで最速ビルド）
- `public/` ... 静的アセット
- `dist/` ... ビルド成果物（ui.html, code.js）

## 開発コマンド

- `pnpm build` ... 本番ビルド（UI+controller）
- `pnpm watch` ... UI/controller両方を自動監視
- `pnpm typecheck` ... 型チェックのみ
- `pnpm format` ... Prettierでコード整形
- `pnpm lint:fix` ... ESLint自動修正

## その他

- manifest.jsonは手動管理。自動化したい場合はご相談ください。
- UI単体テスト用のpublic/index.htmlを用意してもOK。
