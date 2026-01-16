import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FounderBackground from '@/components/FounderBackground';
import ArrowLink from '@/components/ArrowLink';

/**
 * About Page
 *
 * recuereについて - 6セクション構成
 * 1. Hero
 * 2. Philosophy (理念/Vision/Mission)
 * 3. WhatWeDo (事業領域)
 * 4. Founder (代表紹介 + 背景アニメ)
 * 5. Qualifications (資格・専門分野 - 折りたたみ)
 * 6. CTA
 */

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-[#fcfcfc] text-[#1f2937] pt-20">
        {/* 1) ABOUT HERO */}
        <section className="py-[120px] px-6 max-md:py-[90px]" id="about-hero">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-[70px] items-center max-md:grid-cols-1 max-md:gap-10">
              {/* 左: テキスト */}
              <div>
                <p className="tracking-[0.24em] text-[0.82rem] text-[#6b7280] mb-3.5">
                  ABOUT
                </p>
                <h1 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.06em] font-semibold mb-6">
                  About recuere
                </h1>
                <p className="text-[1.05rem] leading-[2.0] text-[#6b7280] mb-8">
                  経営の論理性と、
                  <br />
                  人の内面をひらく心理の知見を融合し、
                  <br />
                  組織と個人の「本来の力」を持続的な成長へとつなげます。
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="#philosophy"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.92rem] tracking-[0.06em] bg-[#7aa9c6] text-white border border-transparent hover:bg-[#5B8FA8] transition-colors"
                  >
                    recuere®の考え方を見る
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.92rem] tracking-[0.06em] bg-white/70 text-[#1f2937] border border-black/10 hover:bg-white transition-colors"
                  >
                    お問い合わせ
                  </Link>
                </div>
              </div>

              {/* 右: 写真 */}
              <figure className="max-md:order-first">
                <img
                  src="/images/rinosan.png"
                  alt="代表 たなか里乃のプロフィール写真"
                  className="w-full h-auto rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 2) PHILOSOPHY */}
        <section className="py-[120px] px-6 max-md:py-[90px]" id="philosophy">
          <div className="max-w-[1120px] mx-auto">
            <p className="tracking-[0.24em] text-[0.82rem] text-[#6b7280] mb-3.5">
              PHILOSOPHY
            </p>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.06em] font-semibold mb-10">
              理念・Vision・Mission
            </h2>

            <div className="grid grid-cols-3 gap-[22px] max-md:grid-cols-1">
              {/* Card 1 */}
              <article className="border border-black/10 rounded-[28px] bg-white/[0.72] backdrop-blur-[10px] p-7">
                <h3 className="tracking-[0.06em] font-medium mb-3">Trust &amp; Treasure</h3>
                <p className="text-[#6b7280] leading-[2.0] m-0">
                  信頼を土台に、人生と事業の価値を育てる。
                </p>
              </article>

              {/* Card 2 */}
              <article className="border border-black/10 rounded-[28px] bg-white/[0.72] backdrop-blur-[10px] p-7">
                <h3 className="tracking-[0.06em] font-medium mb-3">Abundance</h3>
                <p className="text-[#6b7280] leading-[2.0] m-0">
                  精神的・経済的に満たされた状態を、長く続く形で。
                </p>
              </article>

              {/* Card 3 */}
              <article className="border border-black/10 rounded-[28px] bg-white/[0.72] backdrop-blur-[10px] p-7">
                <h3 className="tracking-[0.06em] font-medium mb-3">Brilliant</h3>
                <p className="text-[#6b7280] leading-[2.0] m-0">
                  一人ひとりが、本来の輝きを取り戻すこと。
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 3) WHAT WE DO */}
        <section className="py-[120px] px-6 max-md:py-[90px]" id="whatwedo">
          <div className="max-w-[1120px] mx-auto">
            <p className="tracking-[0.24em] text-[0.82rem] text-[#6b7280] mb-3.5">
              WHAT WE DO
            </p>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.06em] font-semibold mb-10">
              事業領域
            </h2>

            <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
              {/* 企業向け */}
              <article className="border border-black/10 rounded-[28px] bg-white/[0.72] backdrop-blur-[10px] p-7">
                <h3 className="tracking-[0.06em] font-medium mb-4">企業向け</h3>
                <ul className="list-disc pl-5 text-[#6b7280] leading-[2.0] mb-4">
                  <li>経営コンサルティング</li>
                  <li>医療法人・歯科医院向け支援</li>
                  <li>人事評価・報酬制度構築</li>
                  <li>人材育成・研修</li>
                </ul>
                <ArrowLink href="/services#business">
                  企業向けサービスを見る
                </ArrowLink>
              </article>

              {/* 個人向け */}
              <article className="border border-black/10 rounded-[28px] bg-white/[0.72] backdrop-blur-[10px] p-7">
                <h3 className="tracking-[0.06em] font-medium mb-4">個人向け</h3>
                <ul className="list-disc pl-5 text-[#6b7280] leading-[2.0] mb-4">
                  <li>Personal Awakening Session</li>
                  <li>Hypnotherapy（催眠療法）</li>
                  <li>Branding Awakening Session</li>
                  <li>Personal Coaching（月次）</li>
                </ul>
                <ArrowLink href="/session">
                  個人向けサービスを見る
                </ArrowLink>
              </article>
            </div>
          </div>
        </section>

        {/* 4) FOUNDER */}
        <section
          className="relative py-[120px] px-6 overflow-hidden max-md:py-[90px]"
          id="founder"
        >
          {/* 背景アニメーション */}
          <FounderBackground />

          <div className="relative z-[2] max-w-[1120px] mx-auto">
            <div className="grid grid-cols-[1.1fr_0.9fr] gap-[60px] items-stretch max-md:grid-cols-1">
              {/* 左: テキスト */}
              <div>
                <p className="tracking-[0.24em] text-[0.82rem] text-[#6b7280] mb-3.5">
                  FOUNDER
                </p>
                <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.06em] font-semibold mb-6">
                  代表紹介
                </h2>

                <p className="text-[#6b7280] tracking-[0.08em] mb-1.5">
                  Founder / 経営コンサルタント・心理カウンセラー
                </p>
                <h3 className="text-[1.6rem] tracking-[0.08em] font-medium mb-5">
                  たなか里乃
                </h3>

                <p className="leading-[2.0] text-[#1f2937] mb-6">
                  人は、正しさだけでは動けません。
                  <br />
                  けれど、感情だけでも未来は続かない。
                  <br />
                  経営と心理、両方を知るからこそ、
                  <br />
                  現実を変える「一歩」を共に設計できます。
                </p>

                <ul className="list-disc pl-5 text-[#6b7280] leading-[1.9] mb-6">
                  <li>グローバル外資系企業にて35年間勤務</li>
                  <li>経営・人材・医療領域に携わる</li>
                  <li>2022年9月 recuere 開業</li>
                </ul>

                <ArrowLink href="/about/profile">
                  代表プロフィールを見る
                </ArrowLink>
              </div>

              {/* 右: 装飾エリア */}
              <div className="relative rounded-[28px] overflow-hidden border border-black/10 bg-gradient-to-b from-[rgba(122,169,198,0.18)] to-transparent min-h-[300px] max-md:hidden">
                {/* 背景は FounderBackground で描画 */}
              </div>
            </div>
          </div>
        </section>

        {/* 5) QUALIFICATIONS */}
        <section className="py-[120px] px-6 max-md:py-[90px]" id="qualifications">
          <div className="max-w-[1120px] mx-auto">
            <p className="tracking-[0.24em] text-[0.82rem] text-[#6b7280] mb-3.5">
              EXPERTISE
            </p>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.06em] font-semibold mb-10">
              専門分野・資格
            </h2>

            {/* Accordion 1 - 心理・カウンセリング */}
            <details className="border border-black/10 rounded-[18px] p-3.5 bg-white/65 mb-3.5" open>
              <summary className="cursor-pointer py-2.5 px-1.5 tracking-[0.06em] text-[#1f2937] font-medium">
                心理・カウンセリング
              </summary>
              <ul className="list-disc pl-5 text-[#6b7280] leading-[1.9] mt-3 pb-2">
                <li>日本能力開発推進協会 メンタル心理カウンセラー</li>
                <li>日本能力開発推進協会 上級心理カウンセラー</li>
                <li>自己肯定感アカデミー/torie アドラー流メンタルトレーナー</li>
                <li>自己肯定感アカデミー/torie アドラー流ライフデザイン診断士</li>
              </ul>
            </details>

            {/* Accordion 2 - ヒプノセラピー・意識領域 */}
            <details className="border border-black/10 rounded-[18px] p-3.5 bg-white/65 mb-3.5">
              <summary className="cursor-pointer py-2.5 px-1.5 tracking-[0.06em] text-[#1f2937] font-medium">
                ヒプノセラピー・意識領域
              </summary>
              <ul className="list-disc pl-5 text-[#6b7280] leading-[1.9] mt-3 pb-2">
                <li>米国催眠療法協会 認定</li>
                <li>日本ヒプノセラピーアカデミー 認定基礎講座インストラクター</li>
                <li>（前世療法、年齢退行、心身緩和セラピー講座）修了</li>
                <li>ACU（Academy of Universe Code）コンシャスネスアストロロジー Level1/2</li>
                <li>ジェームス・ワンレス公認ボイジャータロット 国際認定講座 修了</li>
              </ul>
            </details>

            {/* Accordion 3 - ビジネス・医療 */}
            <details className="border border-black/10 rounded-[18px] p-3.5 bg-white/65">
              <summary className="cursor-pointer py-2.5 px-1.5 tracking-[0.06em] text-[#1f2937] font-medium">
                ビジネス・医療
              </summary>
              <ul className="list-disc pl-5 text-[#6b7280] leading-[1.9] mt-3 pb-2">
                <li>グロービスマネジメントスクール：ベンチャーマネジメントコース 修了</li>
                <li>日本臨床歯科学会（SJCD）会員</li>
                <li>医療機器販売管理者・賃貸管理者講習（高度管理医療機器等）修了</li>
              </ul>
            </details>
          </div>
        </section>

        {/* 6) CTA */}
        <section className="py-[120px] px-6 max-md:py-[90px]" id="about-cta">
          <div className="max-w-[1120px] mx-auto">
            <div className="border border-black/10 rounded-[28px] p-11 bg-white/[0.72] backdrop-blur-[10px] flex justify-between items-center gap-6 max-md:flex-col max-md:items-start max-md:p-8">
              <div>
                <p className="tracking-[0.24em] text-[0.82rem] text-[#6b7280] mb-3.5">
                  NEXT STEP
                </p>
                <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-[0.06em] font-semibold mb-2">
                  ご相談内容に応じて、最適な関わり方をご提案します。
                </h2>
                <p className="text-[#6b7280] leading-[2.0]">
                  企業の課題整理から、個人の内面の整理まで。まずは一度、お話をお聞かせください。
                </p>
              </div>
              <div className="flex gap-3 flex-wrap shrink-0">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.92rem] tracking-[0.06em] bg-[#7aa9c6] text-white border border-transparent hover:bg-[#5B8FA8] transition-colors"
                >
                  サービスを見る
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.92rem] tracking-[0.06em] bg-white/70 text-[#1f2937] border border-black/10 hover:bg-white transition-colors"
                >
                  お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
