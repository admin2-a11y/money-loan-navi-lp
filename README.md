# キャッシングスカイ LPO ローカル版

対象ページの画面構成・文章・画像・アンケート操作をローカル化し、質問2と診断分岐、診断結果の商品カードだけを変更した独立プロジェクトです。

## 起動

```powershell
python -m http.server 4175
```

ブラウザで `http://127.0.0.1:4175/index.html` を開きます。

## 主なファイル

- `index.html` — 診断開始ページ
- `result.html` — 結果ページ（最近のマネーローンナビ商品カードを表示）
- `operationinfo.html` — 運営者情報
- `redirect.html` — CTAの遷移制御
- `js/lender-card.js` — 4社カードと結果別表示
- `css/lender-cards.css` — 最近のカード用CSS
- `assets/page/` — 対象ページからローカル化した画像等
- `assets/lenders/` — 4社カード用画像
- `original/` — 取得時点の未加工ソース
- `docs/implementation-notes.md` — 分岐表と判断メモ
- `docs/qa-report.md` — 実ブラウザ確認結果

## 外部遷移パラメータ

診断固有値（`cq_*`、`result_offer`、`item`）は広告リンクへ渡しません。`utm_*` と主要広告クリックIDだけを許可リスト方式で引き継ぎます。
