# 本番配信時の運用設定

## 計測タグの同意連携

Meta Pixel と SquadBeyond の外部計測・識別子保存は、解析同意が得られるまで開始しません。ページ上の文言を変更しないため、このリポジトリ内では同意バナーを新設していません。

利用するCMP（同意管理画面）で解析同意を得た時点に、次のいずれかを実行してください。

```js
window.CQConsent.grantAnalytics();
```

または、既存CMPからイベントで連携できます。

```js
window.dispatchEvent(new CustomEvent("cq:analytics-consent", {
  detail: { granted: true }
}));
```

同意撤回時は `window.CQConsent.revokeAnalytics()` を実行し、ページを再読み込みしてください。同意状態は `localStorage` の `cq_analytics_consent` に保存されます。

外部リンクへ引き継ぐURLパラメータは広告計測用の許可リストに限定され、アンケート回答を表す `cq_*`、`param1`〜`param5`、`result_offer`、`item` は外部計測URLへ渡しません。

## セキュリティヘッダー

GitHub Pagesではリポジトリから任意のHTTPレスポンスヘッダーを設定できません。カスタムドメインのCDNまたはリバースプロキシ側で、少なくとも次を設定してください。

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

`Referrer-Policy` はHTMLの `meta` にも設定済みです。CSPはインラインスクリプト、Meta Pixel、SquadBeyond、診断結果一覧の同一オリジンiframeを考慮する必要があります。いきなり強制せず、まず本番CDNで `Content-Security-Policy-Report-Only` とレポート送信先を設定し、違反がないことを確認してから強制ポリシーへ移行してください。

初期候補は次のディレクティブです。実際の配信先と、同意後に有効化する計測先を確認して許可元を絞り込んでください。

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'self';
frame-src 'self';
img-src 'self' data: https:;
media-src 'self';
style-src 'self' 'unsafe-inline';
script-src 'self' 'unsafe-inline' https://connect.facebook.net;
connect-src 'self' https://www.facebook.com https://bq-api.squadbeyond.com;
form-action 'self' https:;
upgrade-insecure-requests
```

最終的にはインラインスクリプトを外部ファイル化し、nonceまたはhash方式へ移行して `'unsafe-inline'` を外すことを推奨します。
