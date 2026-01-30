'use client';

import FadeIn from '@/components/FadeIn';

/**
 * Privacy Policy Page - プライバシーポリシー
 */

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn blur>
            <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-6 uppercase font-medium">
              Privacy Policy
            </p>
          </FadeIn>
          <FadeIn blur delay={0.1}>
            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight leading-[1.4] text-[#333] mb-4">
              プライバシーポリシー
            </h1>
          </FadeIn>
          <FadeIn blur delay={0.2}>
            <p className="text-[#666] text-sm">
              （個人情報保護方針）
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn blur delay={0.3}>
            <div className="text-[#444] text-[0.95rem] leading-[2] space-y-12">
              {/* 前文 */}
              <p>
                recuere（以下「当サービス」）は、ユーザーの個人情報の重要性を認識し、以下のとおりプライバシーポリシーを定め、適切な管理・保護に努めます。
              </p>

              {/* 1. 個人情報の取得について */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  1. 個人情報の取得について
                </h2>
                <p className="mb-4">
                  当サービスでは、以下の場合にユーザーの個人情報を取得することがあります。
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#555]">
                  <li>お問い合わせフォームの送信時</li>
                  <li>各種サービス・セッションへのお申し込み時</li>
                  <li>メールマガジン・LINE公式アカウントへの登録時</li>
                </ul>
                <p className="mt-4">
                  取得する情報には、氏名、メールアドレス、その他入力フォームに記載された情報が含まれます。
                </p>
              </div>

              {/* 2. 個人情報の利用目的 */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  2. 個人情報の利用目的
                </h2>
                <p className="mb-4">
                  取得した個人情報は、以下の目的の範囲内で利用します。
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#555]">
                  <li>お問い合わせへの対応</li>
                  <li>サービス提供およびご連絡</li>
                  <li>必要に応じたご案内・情報提供</li>
                  <li>サービス品質向上のための分析・改善</li>
                </ul>
                <p className="mt-4">
                  上記目的以外で利用することはありません。
                </p>
              </div>

              {/* 3. 個人情報の安全管理措置 */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  3. 個人情報の安全管理措置
                </h2>
                <p className="mb-4">
                  当サービスは、個人情報の漏えい・紛失・改ざん等を防止するため、以下の安全管理措置を講じています。
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#555]">
                  <li>個人情報へのアクセス制限の設定</li>
                  <li>SSL暗号化通信の使用</li>
                  <li>パスワードの適切な管理</li>
                  <li>個人情報を含む書類・データの適切な保管・廃棄</li>
                </ul>
              </div>

              {/* 4. 個人情報の第三者提供について */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  4. 個人情報の第三者提供について
                </h2>
                <p className="mb-4">
                  以下の場合を除き、本人の同意なく第三者に個人情報を開示・提供することはありません。
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#555]">
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要な場合</li>
                  <li>公衆衛生の向上または児童の健全な育成の推進のために必要な場合</li>
                </ul>
              </div>

              {/* 5. アクセス解析ツールについて */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  5. アクセス解析ツールについて
                </h2>
                <p>
                  当サービスでは、Google Analytics等のアクセス解析ツールを利用する場合があります。
                  これらのツールはCookieを使用し、個人を特定する情報は含まれません。
                </p>
              </div>

              {/* 6. Cookie（クッキー）について */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  6. Cookie（クッキー）について
                </h2>
                <p>
                  ユーザーは、ブラウザ設定によりCookieの使用を拒否することができます。
                  ただし、その場合一部機能が利用できなくなることがあります。
                </p>
              </div>

              {/* 7. 個人情報の開示・訂正・削除について */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  7. 個人情報の開示・訂正・削除について
                </h2>
                <p className="mb-4">
                  ユーザーご本人から、自己の個人情報の開示・訂正・削除等のご請求があった場合、本人確認の上、速やかに対応いたします。
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-[#555]">
                  <p className="font-medium mb-2">【開示請求の手続き】</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>請求方法：下記お問い合わせ窓口へメールにてご連絡ください</li>
                    <li>本人確認：ご登録情報との照合により確認いたします</li>
                    <li>手数料：無料</li>
                  </ul>
                </div>
              </div>

              {/* 8. プライバシーポリシーの変更 */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  8. プライバシーポリシーの変更
                </h2>
                <p>
                  本ポリシーの内容は、法令の変更やサービス内容の変更に応じて、予告なく改定されることがあります。
                  改定後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。
                </p>
              </div>

              {/* 9. お問い合わせ窓口 */}
              <div>
                <h2 className="text-[1.1rem] font-medium text-[#333] mb-4 pb-2 border-b border-gray-200">
                  9. お問い合わせ窓口
                </h2>
                <p className="mb-4">
                  個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-[#555]">
                  <p><span className="font-medium">サービス名：</span>recuere</p>
                  <p><span className="font-medium">運営者：</span>たなか里乃</p>
                  <p><span className="font-medium">メールアドレス：</span>info@recuere.com</p>
                  <p className="mt-2 text-xs text-[#888]">
                    ※住所・電話番号は、ご請求があった場合に遅滞なく開示いたします。
                  </p>
                </div>
              </div>

              {/* 制定日 */}
              <div className="text-right text-sm text-[#888] pt-8 border-t border-gray-100">
                <p>制定日：2026年1月26日</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
