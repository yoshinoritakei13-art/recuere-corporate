# recuere Corporate Website - デプロイ設定ガイド

本番環境にデプロイする前に、以下の外部サービスを設定してください。

---

## 目次

1. [必要な環境変数一覧](#1-必要な環境変数一覧)
2. [microCMS 設定](#2-microcms-設定)
3. [Google reCAPTCHA v3 設定](#3-google-recaptcha-v3-設定)
4. [Resend 設定](#4-resend-設定)
5. [.env.local テンプレート](#5-envlocal-テンプレート)
6. [Vercel 環境変数の設定](#6-vercel-環境変数の設定)
7. [設定確認チェックリスト](#7-設定確認チェックリスト)

---

## 1. 必要な環境変数一覧

| 環境変数 | サービス | 用途 | 必須 |
|---------|---------|------|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS | サービスドメイン | ○ |
| `MICROCMS_API_KEY` | microCMS | APIキー | ○ |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA | サイトキー（公開） | ○ |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA | シークレットキー（秘密） | ○ |
| `RECAPTCHA_THRESHOLD` | reCAPTCHA | スコア閾値 | △ |
| `RESEND_API_KEY` | Resend | APIキー | ○ |
| `CONTACT_EMAIL_BUSINESS` | Resend | 企業問合せ送信先 | ○ |
| `CONTACT_EMAIL_PERSONAL` | Resend | 個人問合せ送信先 | ○ |
| `NEXT_PUBLIC_SITE_URL` | サイト | 本番URL | ○ |
| `REVALIDATE_SECRET` | ISR | 再検証用シークレット | △ |

---

## 2. microCMS 設定

### 2.1 アカウント作成

1. [microCMS](https://microcms.io/) にアクセス
2. 「無料ではじめる」をクリック
3. メールアドレスまたはGoogleアカウントで登録
4. メール認証を完了

### 2.2 サービス作成

1. ダッシュボードで「サービスを作成」をクリック
2. サービス名を入力（例: `recuere`）
3. **サービスID**をメモ → これが `MICROCMS_SERVICE_DOMAIN` になる
   - 例: `recuere` （URLは `recuere.microcms.io` になる）

### 2.3 APIスキーマ作成

以下の3つのAPIを作成します。

#### API 1: News（お知らせ）

| 設定項目 | 値 |
|---------|-----|
| API名 | News |
| エンドポイント | `news` |
| APIの型 | リスト形式 |

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|-------|------|------|
| `title` | タイトル | テキストフィールド | ○ |
| `content` | 内容 | リッチエディタ | ○ |

#### API 2: Services（サービス）

| 設定項目 | 値 |
|---------|-----|
| API名 | Services |
| エンドポイント | `services` |
| APIの型 | リスト形式 |

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|-------|------|------|------|
| `title` | タイトル | テキストフィールド | ○ | |
| `abstractHeading` | 抽象見出し | テキストフィールド | - | |
| `description` | 説明 | テキストエリア | ○ | |
| `category` | カテゴリ | セレクトフィールド | ○ | business / personal |
| `subcategory` | サブカテゴリ | セレクトフィールド | - | foundation / growth |
| `isSpecialized` | 特化領域 | 真偽値 | - | |

**categoryフィールドのセレクト値:**
- `business` : 企業向け
- `personal` : 個人向け

**subcategoryフィールドのセレクト値:**
- `foundation` : 土台づくり
- `growth` : 成長フェーズ

#### API 3: Profile（代表プロフィール）

| 設定項目 | 値 |
|---------|-----|
| API名 | Profile |
| エンドポイント | `profile` |
| APIの型 | **オブジェクト形式**（単一） |

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|-------|------|------|
| `name` | 名前 | テキストフィールド | ○ |
| `title` | 役職 | テキストフィールド | ○ |
| `bio` | 経歴 | テキストエリア | ○ |
| `image` | 写真 | 画像 | - |

### 2.4 APIキーの取得

1. サービス設定 → 「API設定」を開く
2. 「APIキー管理」をクリック
3. 「新規作成」をクリック
4. キー名を入力（例: `production-read`）
5. 権限: **GET（取得）のみ**にチェック
6. 作成されたAPIキーをコピー → これが `MICROCMS_API_KEY`

### 2.5 取得すべきキー

| 環境変数 | 取得場所 | 例 |
|---------|---------|-----|
| `MICROCMS_SERVICE_DOMAIN` | サービス作成時のサービスID | `recuere` |
| `MICROCMS_API_KEY` | API設定 → APIキー管理 | `xxxx-xxxx-xxxx` |

---

## 3. Google reCAPTCHA v3 設定

### 3.1 サイト登録

1. [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) にアクセス
2. Googleアカウントでログイン
3. 「+」（新しいサイトを登録）をクリック

### 3.2 サイト設定

| 設定項目 | 値 |
|---------|-----|
| ラベル | `recuere-corporate`（任意の名前） |
| reCAPTCHA タイプ | **reCAPTCHA v3** を選択 |
| ドメイン | 以下を追加 |

**追加するドメイン:**
```
localhost
recuere.com
recuere.vercel.app
```

※ Vercelのプレビューデプロイ用に `*.vercel.app` も追加推奨

### 3.3 キーの取得

登録完了後、以下が表示されます:

| 項目 | 環境変数 |
|------|---------|
| **サイトキー** | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` |
| **シークレットキー** | `RECAPTCHA_SECRET_KEY` |

### 3.4 スコア閾値について

`RECAPTCHA_THRESHOLD` はスパム判定の閾値です:
- `0.0` : 最も緩い（ほぼ全て通す）
- `0.5` : 推奨値（デフォルト）
- `0.9` : 最も厳しい（多くをブロック）

本番では `0.5` からスタートし、スパムが多い場合は上げてください。

---

## 4. Resend 設定

### 4.1 アカウント作成

1. [Resend](https://resend.com/) にアクセス
2. 「Get Started」をクリック
3. GitHubアカウントまたはメールアドレスで登録

### 4.2 APIキーの取得

1. ダッシュボード → 「API Keys」を開く
2. 「Create API Key」をクリック
3. 名前を入力（例: `recuere-production`）
4. Permission: **Full access** または **Sending access**
5. 作成されたAPIキーをコピー → これが `RESEND_API_KEY`

### 4.3 ドメイン認証（本番運用に必須）

テスト段階では `onboarding@resend.dev` から送信できますが、本番では独自ドメインの認証が必要です。

1. ダッシュボード → 「Domains」を開く
2. 「Add Domain」をクリック
3. ドメインを入力: `recuere.com`
4. 表示されるDNSレコードを追加:

| タイプ | ホスト | 値 |
|-------|-------|-----|
| TXT | `_resend` | `resend-domain-verification=xxxx` |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |

5. DNSレコード追加後、「Verify DNS Records」をクリック
6. 認証完了後、`noreply@recuere.com` からメール送信可能に

### 4.4 送信元アドレスの更新

ドメイン認証後、`src/app/api/contact/route.ts` の以下を更新:

```typescript
// 131行目付近
from: 'noreply@recuere.com',  // ← 認証済みドメインに変更
```

### 4.5 送信先メールアドレス

問い合わせの送信先を設定:

| 環境変数 | 用途 | 例 |
|---------|------|-----|
| `CONTACT_EMAIL_BUSINESS` | 企業からの問合せ | `info@recuere.com` |
| `CONTACT_EMAIL_PERSONAL` | 個人からの問合せ | `support@recuere.com` |

---

## 5. .env.local テンプレート

ローカル開発用に、プロジェクトルートに `.env.local` を作成:

```bash
# recuere-corporate/.env.local

# ===========================================
# microCMS
# ===========================================
MICROCMS_SERVICE_DOMAIN=ここにサービスIDを入力
MICROCMS_API_KEY=ここにAPIキーを入力

# ===========================================
# reCAPTCHA v3
# ===========================================
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=ここにサイトキーを入力
RECAPTCHA_SECRET_KEY=ここにシークレットキーを入力
RECAPTCHA_THRESHOLD=0.5

# ===========================================
# Resend
# ===========================================
RESEND_API_KEY=ここにAPIキーを入力
CONTACT_EMAIL_BUSINESS=business@recuere.com
CONTACT_EMAIL_PERSONAL=personal@recuere.com

# ===========================================
# サイト設定
# ===========================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=任意のランダム文字列
```

### REVALIDATESECRETの生成

ランダムな文字列を生成するコマンド:

```bash
# macOS/Linux
openssl rand -base64 32

# または Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 6. Vercel 環境変数の設定

### 6.1 Vercelプロジェクト設定画面を開く

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. プロジェクト（recuere-corporate）をクリック
3. 「Settings」タブ → 「Environment Variables」を開く

### 6.2 環境変数の追加

以下の変数を1つずつ追加:

| Key | Value | Environment |
|-----|-------|-------------|
| `MICROCMS_SERVICE_DOMAIN` | サービスID | Production, Preview, Development |
| `MICROCMS_API_KEY` | APIキー | Production, Preview, Development |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | サイトキー | Production, Preview, Development |
| `RECAPTCHA_SECRET_KEY` | シークレットキー | Production, Preview, Development |
| `RECAPTCHA_THRESHOLD` | `0.5` | Production, Preview, Development |
| `RESEND_API_KEY` | APIキー | Production, Preview, Development |
| `CONTACT_EMAIL_BUSINESS` | 企業問合せメール | Production |
| `CONTACT_EMAIL_PERSONAL` | 個人問合せメール | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://recuere.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://recuere.vercel.app` | Preview |
| `REVALIDATE_SECRET` | ランダム文字列 | Production, Preview, Development |

### 6.3 環境ごとの違い

| 環境変数 | Production | Preview | Development |
|---------|-----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://recuere.com` | `https://recuere.vercel.app` | ローカルURL |
| `CONTACT_EMAIL_*` | 本番メール | テストメール推奨 | テストメール |

### 6.4 設定後の再デプロイ

環境変数を追加した後、再デプロイが必要です:

1. 「Deployments」タブを開く
2. 最新のデプロイの「...」メニューをクリック
3. 「Redeploy」を選択

---

## 7. 設定確認チェックリスト

### microCMS

- [ ] アカウント作成完了
- [ ] サービス作成完了（サービスID取得）
- [ ] News API作成完了
- [ ] Services API作成完了
- [ ] Profile API作成完了
- [ ] APIキー取得完了
- [ ] テストコンテンツ投稿完了

### reCAPTCHA v3

- [ ] サイト登録完了
- [ ] サイトキー取得
- [ ] シークレットキー取得
- [ ] ドメイン追加（localhost, 本番ドメイン, vercel.app）

### Resend

- [ ] アカウント作成完了
- [ ] APIキー取得
- [ ] ドメイン認証完了（本番前）
- [ ] 送信先メールアドレス決定

### Vercel

- [ ] 全環境変数追加完了
- [ ] 再デプロイ完了
- [ ] 本番サイトで動作確認

### 動作確認

- [ ] トップページのNewsセクションが表示される
- [ ] お問い合わせフォームが送信できる
- [ ] 送信後、設定したメールアドレスにメールが届く
- [ ] reCAPTCHAバッジが右下に表示される

---

## トラブルシューティング

### microCMSのデータが表示されない

1. 環境変数が正しく設定されているか確認
2. APIキーの権限（GET）を確認
3. エンドポイント名が `news`, `services`, `profile` か確認
4. コンテンツが公開状態か確認

### お問い合わせが送信できない

1. reCAPTCHA キーが正しいか確認
2. Resend APIキーが有効か確認
3. 送信元ドメインが認証済みか確認（本番）
4. ブラウザのコンソールでエラーを確認

### reCAPTCHAでブロックされる

1. `RECAPTCHA_THRESHOLD` を下げる（0.3 など）
2. reCAPTCHAコンソールでスコア統計を確認
3. 正常なユーザーがブロックされている場合は閾値調整

---

## 次のステップ

設定が完了したら、[Vercelデプロイ手順](./VERCEL_DEPLOY.md)に進んでください。
