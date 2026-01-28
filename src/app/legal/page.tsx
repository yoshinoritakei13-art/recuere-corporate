'use client';

import FadeIn from '@/components/FadeIn';

/**
 * Legal Page - 特定商取引法に基づく表記
 */

export default function LegalPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-6 uppercase font-medium">
              Legal
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight leading-[1.4] text-[#333]">
              特定商取引法に基づく表記
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="space-y-0">
              {/* テーブル形式 */}
              <div className="divide-y divide-gray-200">
                {/* 販売事業者名 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    販売事業者名
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    recuere
                  </div>
                </div>

                {/* 運営責任者名 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    運営責任者名
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    たなか里乃
                  </div>
                </div>

                {/* 所在地 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    所在地
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    請求があった場合、遅滞なく開示いたします。
                  </div>
                </div>

                {/* 電話番号 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    電話番号
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    請求があった場合、遅滞なく開示いたします。
                  </div>
                </div>

                {/* メールアドレス */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    メールアドレス
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    info@recuere.com
                  </div>
                </div>

                {/* 販売価格 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    販売価格
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    各サービス・セッション・鑑定ページに記載の金額（税込）
                  </div>
                </div>

                {/* 商品代金以外の必要料金 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    商品代金以外の必要料金
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    <ul className="list-disc list-inside space-y-1">
                      <li>インターネット接続に伴う通信費</li>
                      <li>銀行振込の場合の振込手数料</li>
                    </ul>
                  </div>
                </div>

                {/* お支払い方法 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    お支払い方法
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    <ul className="list-disc list-inside space-y-1">
                      <li>クレジットカード決済</li>
                      <li>銀行振込</li>
                    </ul>
                  </div>
                </div>

                {/* お支払い時期 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    お支払い時期
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    <ul className="list-disc list-inside space-y-1">
                      <li>クレジットカード決済：ご注文時</li>
                      <li>銀行振込：お申し込み後、指定期日までにお支払い</li>
                    </ul>
                  </div>
                </div>

                {/* サービス提供時期 */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    サービス提供時期
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    <ul className="list-disc list-inside space-y-1">
                      <li>個別セッション、ヒプノセラピー、鑑定：日程調整後、実施</li>
                      <li>コンサルティング、研修等の企業向けサービス：決済確認後、または契約書に基づき実施</li>
                    </ul>
                  </div>
                </div>

                {/* キャンセル・返金について */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    キャンセル・返金について
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    <p className="mb-2">
                      個人向けセッション・鑑定サービスについては、下記キャンセルポリシーに基づき対応いたします。
                    </p>
                    <p>
                      企業向けサービスについては、別途締結する契約書の内容を優先いたします。
                    </p>
                  </div>
                </div>

                {/* 表現およびサービスに関する注意書き */}
                <div className="py-5 md:flex">
                  <div className="md:w-1/3 text-[#333] font-medium text-[0.95rem] mb-2 md:mb-0">
                    表現およびサービスに関する注意書き
                  </div>
                  <div className="md:w-2/3 text-[#555] text-[0.95rem]">
                    <p>
                      本サービスに示された表現や鑑定内容は、必ずしも効果や成果を保証するものではありません。
                      感じ方や結果には個人差があります。
                    </p>
                  </div>
                </div>
              </div>

              {/* キャンセルポリシー */}
              <div className="mt-16">
                <h2 className="text-[1.3rem] font-medium text-[#333] mb-8 pb-4 border-b border-gray-200">
                  キャンセルポリシー（個人セッション・ヒプノセラピー・鑑定）
                </h2>

                <p className="text-[#555] text-[0.95rem] mb-6 leading-relaxed">
                  お申込み後、お支払い手続きが完了した時点で、本ポリシーに同意いただいたものとみなします。<br />
                  日程のご都合が合わない場合は、可能な限り日程変更にて対応いたしますのでご相談ください。
                </p>

                <h3 className="text-[1rem] font-medium text-[#333] mb-4">キャンセル料について</h3>
                <p className="text-[#555] text-[0.95rem] mb-4">
                  お申込者様のご都合によりキャンセルされる場合、以下のキャンセル料を申し受けます。
                </p>

                <ul className="text-[#555] text-[0.95rem] space-y-2 mb-6">
                  <li>・セッション7日前まで：無料</li>
                  <li>・6日〜4日前：料金の20％</li>
                  <li>・3日〜2日前：料金の50％</li>
                  <li>・前日：料金の80％</li>
                  <li>・当日および無断キャンセル：料金の100％</li>
                </ul>

                <p className="text-[#888] text-[0.85rem] mb-2">
                  ※日程変更は原則1回まで無料で対応いたします。
                </p>
                <p className="text-[#888] text-[0.85rem]">
                  ※返金が発生する場合の振込手数料はお客様負担となります。
                </p>
              </div>

              {/* 企業向けサービスについて */}
              <div className="mt-12">
                <h2 className="text-[1.3rem] font-medium text-[#333] mb-6 pb-4 border-b border-gray-200">
                  企業向けコンサルティング・研修について
                </h2>
                <p className="text-[#555] text-[0.95rem] leading-relaxed">
                  企業向けサービス（コンサルティング、研修、コーチング等）に関しては、別途締結する契約書の内容を優先いたします。
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
