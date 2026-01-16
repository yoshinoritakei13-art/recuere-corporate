# recuere コーポレートサイト - 進捗管理表

## Phase 進捗

- [x] Phase 0: 要件定義
- [x] Phase 1: トップページ + 流動リボン背景
- [x] Phase 2: Servicesページ（企業向け）
- [x] Phase 3: Sessionページ（個人向け）
- [x] Phase 4: Philosophyページ
- [x] Phase 5: Companyページ
- [x] Phase 6: お問い合わせフォーム
- [x] Phase 7: デプロイ（Vercel）
- [x] Phase 8: 商標表記統一（recuere® / リキュウレ®）

---

## 統合ページ管理表

| ID | ページ名 | ルート | 統合機能 | 着手 | 完了 |
|----|---------|-------|---------|------|------|
| P-001 | トップページ | `/` | HERO（流動リボン背景）, Philosophy概要, Services概要, Founder, Contact導線 | [x] | [x] |
| P-002 | Philosophy | `/philosophy` | コンセプト詳細, Vision/Mission, 名前の由来, CTA | [x] | [x] |
| P-003 | Company | `/company` | 会社情報, 代表プロフィール, 専門分野・資格, CTA | [x] | [x] |
| P-004 | Services | `/services` | 企業向け4サービス, 費用案内, 個人向け誘導, Contact CTA | [x] | [x] |
| P-005 | Session | `/session` | Awakening, PersonalCoaching, Hypno, Branding, CTA | [x] | [x] |
| P-006 | Contact | `/contact` | 企業/個人フォーム切替, reCAPTCHA v3, Resend送信 | [x] | [x] |
| P-006-T | 送信完了 | `/contact/thanks` | 完了メッセージ, トップ導線 | [x] | [x] |

---

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フロントエンド | Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS 4 |
| アニメーション | CSS/SVG + JS, lottie-react, PastelLiquidGradient |
| バックエンド | Next.js Route Handlers, Resend |
| インフラ | Vercel |
| スパム対策 | Google reCAPTCHA v3 |

---

## 外部サービス

| サービス | 用途 | 状態 |
|---------|------|------|
| Vercel | ホスティング | ✅ デプロイ済み |
| Resend | メール送信 | 要設定（本番ドメイン認証） |
| Google reCAPTCHA | スパム対策 | 要設定 |
| crowd-calendar.com | セッション予約 | ✅ 設定済み |

---

## 成功指標チェックリスト

### 定量的指標
- [ ] LCP 2.5秒以内
- [ ] Lighthouse モバイル 90点以上
- [ ] 流動リボンアニメーション: スマホで滑らかに動作
- [ ] long task（50ms以上）なし

### 定性的指標
- [ ] fivot.co.jp風の「透明感」「余白」「流線の美しさ」
- [ ] 流動リボン「呼吸するようなゆっくりした揺らぎ」
- [ ] 「ミニマル × 心理 × 組織」の世界観
- [ ] 企業担当者が「信頼できる」と感じるトーン

---

## ブランド表記ルール

**商標**: recuere / リキュウレ（両方とも商標登録済み）

| 使用箇所 | 表記 | 備考 |
|---------|------|------|
| ロゴ・会社名 | `recuere` | ®不要 |
| コピーライト | `© 2025 recuere Inc.` | ®不要 |
| 文章中・初出 | `recuere®` / `リキュウレ®` | 各ページ最初のみ |
| 文章中・2回目以降 | `recuere` / `リキュウレ` | ®不要 |

**重要**: 全て小文字で統一（Recuere、RECUERE は使用しない）

---

## ブランドキーワード（参照用）

- 気づき
- 豊かさ
- 本来の自分に戻る
- 静けさ
- 透明感
- やわらかな未来感
- 内側の変化が外側へ波紋のように広がる

---

## 禁忌表現（参照用）

- 派手な虹色
- 強いグラデ
- 濃い線
- 占い・幻想系に見える表現
- 暗い背景
- 幾何学模様の機械感
