# recuere-corporate 現状ドキュメント

最終更新: 2026-01-30

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | recuere-corporate |
| タイプ | コーポレートサイト |
| フレームワーク | Next.js 16.0.8 + React 19.2.1 |
| スタイリング | Tailwind CSS 4 |
| 開発ポート | 3247 |
| テーマ | 「気づきから、豊かさへ」 |

**事業内容:**
- 企業・医療法人向け経営コンサルティング
- 個人向け自己実現セッション・ヒプノセラピー
- ブランディング構築支援

---

## 2. 技術スタック

### フロントエンド
- **Next.js** 16.0.8 (App Router)
- **React** 19.2.1
- **TypeScript** 5
- **Tailwind CSS** 4

### アニメーション・3D
- **Three.js** 0.182.0 - リキッドグラデーション背景
- **Framer Motion** 12.23.25 - アニメーション
- **Lottie Web** 5.13.0 - JSONアニメーション

### バックエンド・API
- **Resend** 6.6.0 - メール送信
- **reCAPTCHA v3** - スパム対策
- **microCMS** 3.2.0 - CMS連携（将来用）

---

## 3. デプロイ状況

| 項目 | 内容 |
|------|------|
| ホスティング | Vercel |
| プロジェクト名 | recuere-corp-new |
| GitHub | https://github.com/necconeco/recuere-corporate |
| 本番URL | https://recuere-corp-new.vercel.app |
| ブランチ | main |

---

## 4. ページ構成

| パス | ページ名 | 説明 |
|------|----------|------|
| `/` | トップ | Hero + Philosophy + Services + Founder + Contact |
| `/about` | About | 理念・ビジョン・事業領域 |
| `/company` | Company | 会社概要・代表プロフィール |
| `/philosophy` | Philosophy | ミッション・ビジョン・バリュー |
| `/services` | Services | 企業向けコンサルティング |
| `/session` | Session | 個人向けセッション・料金表 |
| `/hypnotherapy` | Hypnotherapy | ヒプノセラピー詳細 |
| `/contact` | Contact | お問い合わせフォーム |
| `/contact/thanks` | Thanks | 送信完了 |
| `/privacy` | Privacy | プライバシーポリシー |
| `/legal` | Legal | 特定商取引法表記 |

---

## 5. コンポーネント一覧

### レイアウト
| コンポーネント | 説明 |
|----------------|------|
| Header | グローバルナビ・モバイルメニュー |
| Footer | フッター・法的リンク |
| ScrollRestoration | スクロール位置リセット |
| SnapScrollContainer | PC版スナップスクロール |

### アニメーション
| コンポーネント | 説明 |
|----------------|------|
| FadeIn | IntersectionObserver フェードイン（up/down/left/right/scaleUp/clipReveal） |
| LiquidGradientUnified | Three.js リキッドグラデーション（silk/pastel） |
| AnimatedGradient | Canvas グラデーション |
| FloatingParticles | 浮遊パーティクル |
| ParallaxSection | パララックス効果 |
| ParallaxText | 文字アニメーション |
| TextReveal | テキスト展開 |
| CircleAnimation | 回転円弧 |

### メディア
| コンポーネント | 説明 |
|----------------|------|
| BlobImage | SVG Blob クリップ画像 |
| BlobDivider | Blob ディバイダー |
| HeroAnimation | Hero背景・マウス追従光 |
| FounderBackground | 代表者セクション背景 |

### UI
| コンポーネント | 説明 |
|----------------|------|
| ArrowLink | 矢印付きリンク |
| SectionHeader | セクション見出し |
| ContactCTA | Contact CTA |
| TiltCard | 3Dチルトカード |

### カスタムフック
| フック | 説明 |
|--------|------|
| useIntersectionObserver | 要素の可視化検出 |
| useMouseGlow | マウス追従グロー |
| useParallax | パララックス効果 |
| useRecaptcha | reCAPTCHA v3 |

---

## 6. デザインシステム

### カラーパレット

```css
/* Brand Colors */
--color-primary: #004582     /* メインブルー */
--color-secondary: #FF99FF   /* マゼンタ */
--color-tertiary: #7FA6BF    /* ライトブルー */
--color-accent: #E6C978      /* ゴールド */
--color-background: #EAF2F7  /* 背景 */
--color-foreground: #2C3E50  /* テキスト */

/* Navy Palette */
--color-navy: #002d5a
--color-navy-dark: #001a33
--color-navy-light: #1a5a8a

/* Text Colors */
--color-text: #333
--color-text-muted: #666
```

### フォント
- **Noto Sans JP** - メイン（200, 300, 400, 500）
- **Noto Serif JP** - セリフ（200-600）
- **Inter** - 英字（300-600）
- **Sweet Apricot** - ロゴ用カスタム

### レスポンシブ
- **ブレークポイント**: 768px (md)
- **SP版**: 375px 基準
- **PC版**: 768px 以上

---

## 7. 主要アニメーション

### FadeIn directions
```typescript
type AnimationType = 'up' | 'down' | 'left' | 'right' | 'none' | 'scaleUp' | 'clipReveal';
```

### CSS アニメーション
```css
.animate-float           /* 浮遊 6s */
.animate-float-slow      /* 浮遊 8s */
.animate-poyopoyo        /* ぷよぷよ 4s */
.animate-poyopoyo-slow   /* ぷよぷよ 6s */
.animate-loading-line    /* ローディング線 */
.animate-infinite-zoom   /* ズーム 15s */
```

### LiquidGradient プリセット
- **silk**: 青系グラデーション
- **pastel**: パステルレインボー

---

## 8. 環境変数

```env
# microCMS
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_THRESHOLD=0.5

# Resend
RESEND_API_KEY=
CONTACT_FROM_EMAIL=noreply@recuere.com
CONTACT_ADMIN_EMAIL=info@recuere.com
CONTACT_EMAIL_BUSINESS=business@recuere.com
CONTACT_EMAIL_PERSONAL=personal@recuere.com

# Site
NEXT_PUBLIC_SITE_URL=https://recuere.com
REVALIDATE_SECRET=
```

---

## 9. ファイル構成

```
recuere-corporate/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── page.tsx            # トップページ
│   │   ├── api/contact/        # Contact API
│   │   ├── about/
│   │   ├── company/
│   │   ├── philosophy/
│   │   ├── services/
│   │   ├── session/
│   │   ├── hypnotherapy/
│   │   ├── contact/
│   │   ├── privacy/
│   │   └── legal/
│   ├── components/             # 22コンポーネント
│   ├── hooks/                  # 4カスタムフック
│   └── lib/
│       ├── TouchTexture.ts
│       └── shaders/noise.ts
├── public/
│   ├── images/                 # 63画像
│   ├── fonts/
│   └── lottie/
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 10. 最近の変更履歴

| コミット | 内容 |
|----------|------|
| 00e8ea1 | SP版テキストの改行を自然に調整（375px対応） |
| 33a415f | ParallaxSection children をオプショナルに |
| 4229e92 | SP版の長文テキストに改行を追加 |
| e7038c6 | ブラーフェード効果追加、img→Image置換 |
| 342b86d | ヘッダー固定化、ラベルスタイル統一 |

---

## 11. 未コミット変更

| ファイル | 状態 | 内容 |
|----------|------|------|
| src/app/layout.tsx | 修正 | ScrollRestoration追加 |
| src/app/page.tsx | 修正 | SP版テキストmax-width調整 |
| src/components/SnapScrollContainer.tsx | 修正 | コメント整理 |
| src/components/ScrollRestoration.tsx | 新規 | ブラウザスクロール復元無効化 |

---

## 12. 今後の課題・TODO

- [ ] 未コミット変更のコミット＆プッシュ
- [ ] microCMS連携の実装
- [ ] SEO最適化（OGP画像等）
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ対応強化

---

## 13. 開発コマンド

```bash
# 開発サーバー起動
npm run dev          # localhost:3247

# ビルド
npm run build

# プロダクション起動
npm start

# Lint
npm run lint
```

---

## 14. 参考リンク

- **Vercel Dashboard**: https://vercel.com
- **GitHub**: https://github.com/necconeco/recuere-corporate
- **本番サイト**: https://recuere-corp-new.vercel.app
