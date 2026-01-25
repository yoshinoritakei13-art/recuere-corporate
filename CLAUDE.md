# recuere コーポレートサイト - プロジェクト設定

## 基本設定
```yaml
プロジェクト名: recuere コーポレートサイト
開始日: 2025年12月10日
最終更新日: 2025年12月13日
技術スタック:
  frontend: Next.js 15 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 3.4 + lottie-react
  backend: Next.js Route Handlers + Resend
  cms: microCMS (microcms-js-sdk v3.2.0)
  hosting: Vercel (On-demand ISR)
```

## 開発環境
```yaml
ポート設定:
  # 複数プロジェクト並行開発のため、一般的でないポートを使用
  frontend: 3247

環境変数:
  設定ファイル: .env.local（ルートディレクトリ）
  必須項目:
    - MICROCMS_SERVICE_DOMAIN
    - MICROCMS_API_KEY
    - RESEND_API_KEY
    - NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    - RECAPTCHA_SECRET_KEY
    - RECAPTCHA_THRESHOLD
    - REVALIDATE_SECRET
    - CONTACT_EMAIL_BUSINESS
    - CONTACT_EMAIL_PERSONAL
```

## テスト認証情報
```yaml
開発用アカウント:
  email: test@recuere.local
  password: dev-password-2025

外部サービス:
  microCMS: 開発環境用APIキーを使用
  Resend: テストモードで送信
  reCAPTCHA: テスト用キー使用可能
```

## カラーパレット
```yaml
ブランドカラー:
  primary: "#4A6572"    # ブルーグレー（メインカラー）
  accent: "#B8A88A"     # 控えめサンド/ベージュ（アクセント）

背景:
  dark-bg: "#232F34"    # ダーク背景
  light-bg: "#F5F5F5"   # ライト背景

テキスト:
  text: "#333333"       # 本文テキスト
```

## コーディング規約

### 命名規則
```yaml
ファイル名:
  - コンポーネント: PascalCase.tsx (例: HeroSection.tsx, RopeBackground.tsx)
  - ユーティリティ: camelCase.ts (例: microcms.ts, resend.ts)
  - 定数: UPPER_SNAKE_CASE.ts (例: API_ENDPOINTS.ts)

変数・関数:
  - 変数: camelCase
  - 関数: camelCase
  - 定数: UPPER_SNAKE_CASE
  - 型/インターフェース: PascalCase
```

### コード品質
```yaml
必須ルール:
  - TypeScript: strictモード有効
  - 未使用の変数/import禁止
  - console.log本番環境禁止
  - エラーハンドリング必須
  - 関数行数: 100行以下
  - ファイル行数: 700行以下
  - 複雑度: 10以下
  - 行長: 120文字

フォーマット:
  - インデント: スペース2つ
  - セミコロン: あり
  - クォート: シングル
```

## ディレクトリ構成
```
recuere-corporate/
├── app/
│   ├── layout.tsx              # 共通レイアウト
│   ├── page.tsx                # トップページ (P-001)
│   ├── services/
│   │   ├── business/
│   │   │   └── page.tsx        # 企業向け (P-002)
│   │   └── personal/
│   │       └── page.tsx        # 個人向け (P-003)
│   ├── about/
│   │   └── page.tsx            # 会社概要 (P-004)
│   ├── contact/
│   │   ├── page.tsx            # お問い合わせ (P-005)
│   │   └── thanks/
│   │       └── page.tsx        # 送信完了 (P-005-T)
│   └── api/
│       ├── contact/
│       │   └── route.ts        # メール送信API
│       ├── revalidate/
│       │   └── route.ts        # microCMS Webhook
│       └── health/
│           └── route.ts        # ヘルスチェック
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   └── Button.tsx
│   └── hero/
│       └── RopeBackground.tsx  # Lottieアニメーション
├── lib/
│   ├── microcms.ts             # microCMSクライアント
│   └── resend.ts               # Resendクライアント
├── hooks/
│   └── usePrefersReducedMotion.ts
├── types/
│   └── index.ts                # 型定義
├── public/
│   └── lottie/
│       └── rope.json           # Lottieアニメーションデータ
└── docs/
    ├── requirements.md         # 要件定義書
    └── SCOPE_PROGRESS.md       # 進捗管理表
```

## プロジェクト固有ルール

### APIエンドポイント
```yaml
命名規則:
  - RESTful形式を厳守
  - ケバブケース使用 (/api/contact)

エンドポイント一覧:
  - POST /api/contact: お問い合わせ送信
  - POST /api/revalidate: microCMS Webhook
  - GET /api/health: ヘルスチェック
```

### 型定義
```yaml
配置:
  - types/index.ts

microCMSの型:
  - News: お知らせ
  - Service: サービス
  - Profile: 代表プロフィール
```

### Lottieアニメーション（RopeBackground）
```yaml
実装要件:
  - dynamic import（ssr: false）
  - IntersectionObserverでの遅延描画
  - prefers-reduced-motion対応
  - pointer-events: none
  - 透明度: 0.25〜0.5

パフォーマンス基準:
  - long task（50ms以上）を発生させない
  - Lighthouse 90以上を維持
  - JSON軽量化必須
```

## デザイン方針

### 基本路線
```yaml
スタイル:
  - ミニマル / 余白 / 大きい見出し / スクロールで魅せる
  - 参考: tokyotechnology.jp の「静けさ」「整理された情報設計」

トーン:
  - コーポレート寄り + 医療寄りの信頼感
  - 「論理性×人への理解×信頼感」
  - スピリチュアル寄りにしない

ビジュアル:
  - 写真: 少なめ
  - イラスト: 控えめ・抽象的（必須ではない）
```

### タイポグラフィ
```yaml
フォント:
  - 日本語: Noto Sans JP
  - 英数字: システムフォント

行間・文字間:
  - line-height: 1.8
  - letter-spacing: 0.02em
```

## 開発フロー

### ローカル開発
```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

### デプロイ（Vercel）
```bash
# Vercel CLIでデプロイ
vercel

# 本番デプロイ
vercel --prod
```

## 開発フェーズ

```yaml
Phase 1: トップ（骨組み）＋ヒーロー背景（ロープ）【最優先】
  - 世界観・余白・トーンを確定
  - パフォーマンス（Lighthouse 90以上）確認

Phase 2: 企業向けサービスページ
  - 主軸サービスの詳細実装

Phase 3: microCMS連携
  - News / サービス文言 / プロフィール

Phase 4: お問い合わせフォーム（Resend）
  - 企業用/個人用フォーム
  - reCAPTCHA v3
  - 送信完了ページ

Phase 5: 個人向けサービス / 会社概要
  - 残りページの実装
  - フッター導線の整備
```

## TOPページ仕様（2025年1月更新）

### スナップスクロール
```yaml
実装方式: JavaScript制御（SnapScrollContainer.tsx）
対象セクション:
  - Hero: HeroAnimationコンポーネント
  - Philosophy: 理念セクション
  - Services: 企業/個人向けサービス（横並びカード）
  - Founder: 代表者紹介

非スナップセクション:
  - Contact: 通常スクロール（Footerへ自然に繋がる）

スクロール動作:
  - イージング: easeOutQuart
  - 遷移時間: 900ms
  - タッチ対応: 80px以上のスワイプで発火
  - 連続スクロール防止: 300ms間隔制限
```

### Servicesセクション
```yaml
レイアウト: 横並びカード（2カラム）
装飾:
  - ぽよぽよ浮遊画像（BlobImage + animate-poyopoyo）
  - 左エリア: ビル写真（200px + 100px）
  - 右下エリア: 朝日写真（190px）
  - CircleAnimation背景

カード内容:
  企業向け:
    - 経営コンサルティング
    - 医療法人・歯科医院向けコンサルティング
    - プロジェクト遂行支援
    - 人材育成研修
  個人向け:
    - Personal Awakening Session
    - Hypnotherapy（催眠療法）
    - Branding Awakening Session
    - Personal Coaching
```

### Founderセクション
```yaml
表示内容:
  - 写真: rinosan2.jpg（1枚のみ）
  - 名前: たなか里乃
  - 肩書き: 経営コンサルタント・心理カウンセラー・ヒプノセラピスト
  - リンク: "プロフィールはこちらから" → /company#founder

背景: PastelLiquidGradient（ピンク系パステル）
```

### ヘッダー
```yaml
ロゴ: "recuere"（®マークなし）
メニュー項目:
  - Company
  - Philosophy
  - Services
  - Session
  - Hypnotherapy
  - Contact
```

## 最新技術情報（知識カットオフ対応）
```yaml
# Web検索で解決した破壊的変更を記録

Next.js 15:
  - App Router推奨
  - React 19対応
  - Turbopack安定版

lottie-react:
  - "use client"ディレクティブ必須
  - dynamic importでssr: false推奨

microCMS:
  - microcms-js-sdk v3.2.0
  - customRequestInitでfetchオプション設定可能
  - On-demand ISR（revalidateTag）推奨

Resend:
  - 無料枠: 月3,000通/日100通
  - React Email対応
  - 送信元ドメイン認証が必要（本番時）
```

---

**作成日**: 2025年12月10日
**最終更新日**: 2025年12月13日
**バージョン**: 2.0（要件定義更新版）
