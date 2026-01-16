# 外部サービス設定 クイックリファレンス

設定作業用のサマリーです。詳細は `DEPLOYMENT_GUIDE.md` を参照。

---

## 1. microCMS

### 作成手順

1. https://microcms.io/ でアカウント作成
2. 「サービスを作成」→ サービス名: `recuere`
3. 3つのAPIを作成（下記参照）
4. 「API設定」→「APIキー管理」→「新規作成」（権限: GETのみ）

### 作成するAPI

| API名 | エンドポイント | 型 | フィールド |
|-------|--------------|-----|----------|
| News | `news` | リスト | title(テキスト), content(リッチエディタ) |
| Services | `services` | リスト | title, abstractHeading, description, category, subcategory, isSpecialized |
| Profile | `profile` | **オブジェクト** | name, title, bio, image |

### 取得するキー → 環境変数

| 取得場所 | 環境変数名 |
|---------|-----------|
| サービス作成時のID（例: `recuere`） | `MICROCMS_SERVICE_DOMAIN` |
| APIキー管理で作成したキー | `MICROCMS_API_KEY` |

### 詰まりやすいポイント

- **Profile APIは「オブジェクト形式」** を選ぶ（リスト形式ではない）
- APIキーの権限は **GETのみ** でOK（セキュリティ上）
- コンテンツを作成後、**「公開」ボタンを押す** まで取得できない
- エンドポイント名は **小文字** で正確に（`news`, `services`, `profile`）

---

## 2. Google reCAPTCHA v3

### 作成手順

1. https://www.google.com/recaptcha/admin でGoogleログイン
2. 「+」で新規サイト登録
3. タイプ: **reCAPTCHA v3** を選択
4. ドメイン追加: `localhost`, `recuere.com`, `recuere.vercel.app`
5. 送信 → キーが表示される

### 取得するキー → 環境変数

| 取得場所 | 環境変数名 |
|---------|-----------|
| サイトキー | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` |
| シークレットキー | `RECAPTCHA_SECRET_KEY` |

### 追加で設定する環境変数

| 環境変数名 | 値 | 備考 |
|-----------|-----|------|
| `RECAPTCHA_THRESHOLD` | `0.5` | スパム閾値（0.0〜1.0） |

### 詰まりやすいポイント

- **v3を選ぶ**（v2ではない）- v2はチェックボックス式、v3はバックグラウンド判定
- ドメインに **`localhost`を忘れずに追加** しないとローカルでテストできない
- `*.vercel.app` も追加しておくとプレビューデプロイでも動作
- サイトキーは `NEXT_PUBLIC_` プレフィックス付き（フロント公開用）

---

## 3. Resend

### 作成手順

1. https://resend.com/ でアカウント作成（GitHub連携が楽）
2. 「API Keys」→「Create API Key」
3. Permission: **Full access** または **Sending access**
4. （本番前）「Domains」→ ドメイン認証

### 取得するキー → 環境変数

| 取得場所 | 環境変数名 |
|---------|-----------|
| API Keysで作成したキー | `RESEND_API_KEY` |

### 追加で設定する環境変数

| 環境変数名 | 値の例 | 備考 |
|-----------|-------|------|
| `CONTACT_EMAIL_BUSINESS` | `info@recuere.com` | 企業問合せの送信先 |
| `CONTACT_EMAIL_PERSONAL` | `support@recuere.com` | 個人問合せの送信先 |

### 詰まりやすいポイント

- **APIキーは作成時に1回だけ表示** される → 必ずコピーして保存
- テスト段階は `onboarding@resend.dev` から送信される（ドメイン認証前）
- **本番では独自ドメイン認証が必須**（DNSレコード追加）
- ドメイン認証後、コード内の `from:` アドレスを変更する必要あり

### ドメイン認証で追加するDNSレコード

| タイプ | ホスト | 値（Resend画面に表示される） |
|-------|-------|---------------------------|
| TXT | `_resend` | `resend-domain-verification=xxxxx` |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |

---

## 環境変数まとめ（コピペ用）

```bash
# microCMS
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_THRESHOLD=0.5

# Resend
RESEND_API_KEY=
CONTACT_EMAIL_BUSINESS=
CONTACT_EMAIL_PERSONAL=

# サイト
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=
```

---

## 設定完了チェック

### microCMS
- [ ] サービスID取得 → `MICROCMS_SERVICE_DOMAIN`
- [ ] APIキー取得 → `MICROCMS_API_KEY`
- [ ] News API作成（リスト形式）
- [ ] Services API作成（リスト形式）
- [ ] Profile API作成（**オブジェクト形式**）

### reCAPTCHA v3
- [ ] サイトキー取得 → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] シークレットキー取得 → `RECAPTCHA_SECRET_KEY`
- [ ] ドメイン追加（localhost, 本番, vercel.app）

### Resend
- [ ] APIキー取得 → `RESEND_API_KEY`
- [ ] 送信先メール決定 → `CONTACT_EMAIL_BUSINESS`, `CONTACT_EMAIL_PERSONAL`
- [ ] （本番前）ドメイン認証

---

## 次のステップ

全てのキーが揃ったら:

1. `.env.local` を作成してローカルテスト
2. Vercelに環境変数を設定
3. デプロイ実行
