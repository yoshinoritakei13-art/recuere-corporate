'use client';

import dynamic from 'next/dynamic';
import FloatingParticles from '@/components/FloatingParticles';
import ArrowLink from '@/components/ArrowLink';
import FadeIn from '@/components/FadeIn';
import ParallaxText from '@/components/ParallaxText';

const LiquidGradient = dynamic(
  () => import('@/components/LiquidGradientUnified'),
  { ssr: false }
);

// 期待できる変化のカテゴリ
const changeCategories = [
  {
    title: '対人関係',
    items: '対人恐怖、親子関係、職場・パートナーとの関係性 など',
  },
  {
    title: '習慣・癖へのアプローチ',
    items: '喫煙、食に関する問題、あがり性、過度の緊張 など',
  },
  {
    title: '自己イメージ・性格',
    items: '自己肯定感、積極性、自分らしさの回復',
  },
  {
    title: '能力・パフォーマンス',
    items: '集中力、学習、スポーツ、モチベーション、表現力',
  },
  {
    title: '心身の調整・ストレスケア',
    items: 'ストレス対処、緊張緩和、心身のバランス調整',
  },
  {
    title: '人生・自己探求',
    items: '人生の方向性、目的、抱えているテーマへの気づき',
  },
];

// 療法の詳細データ
const methods = [
  {
    id: 'age-regression',
    title: '年齢退行療法（インナーチャイルド療法）',
    description: `現在抱えている問題、心の痛みや苦しみ、抜け出せない行動パターン、心理的反応の原因となっている過去の出来事へ遡っていき、問題の軽減、解消につなげる療法です。

そのほとんどが幼少の頃の体験に起因しています。ずっと癒されないまま放置され続けてきた潜在意識下のインナーチャイルドに、目を向け、耳を傾け、トラウマを癒していきます。`,
  },
  {
    id: 'past-life',
    title: '前世療法',
    description: `催眠下において見えてくる前世イメージ（信じる、信じないは別としても）は、見事にその時抱えている問題、出来事にシンクロし、ある行動パターンや反応の癖、体の状態と同類のテーマが隠されていたりします。

前世の記憶にアクセスすることで、現在の課題に対する新たな視点や気づきを得ることができます。`,
  },
  {
    id: 'psychosomatic',
    title: '心身緩和セラピー',
    description: `病は気からという言葉通り、心身の病には心理的要素が働いています。

過去のトラウマや感情が病気の直接的な原因となっていたり、抑圧されたサブパーソナリティーが対応処置や休息などを求めて病気にさせることもあります。

潜在意識の中に潜んでいる要因を解放し、病気以前の自分以上に豊かさを手に入れていきます。`,
  },
  {
    id: 'grief',
    title: 'グリーフセラピー',
    description: `大切な人（家族、パートナー、親友など）を亡くされた方のためのセラピーです。

死そのものがどのような目的を果たしたのか。生前伝えられなかったことを伝え、又聞けなかった思いを聞き、メッセージを受け取ることで、心の整理がつき、生き貫く力が蘇ってきます。`,
  },
  {
    id: 'future-pacing',
    title: 'フューチャーペーシング',
    description: `少し先の未来の自分が、どのような環境の中で、また精神状態で生きているかを確認していきます。

本来の自分を取り戻し、解放された状態で、潜在意識から浮かび上がってくる理想の自分像と未来ビジョンは、希望の光となり、自分自身に大きな自信と活力を与えてくれます。`,
  },
];

// 体験者の声
const testimonials = [
  { text: '自分と向き合うなんて無理と思っていたけど、「許せた」瞬間がありました。', author: '40代女性' },
  { text: '幼少時代に戻り、親への想いが大きく変化しました。', author: '30代男性' },
  { text: 'リラックスして心の深い所に降りていく感覚がよかったです。', author: '30代女性' },
  { text: '言葉にできなかった感情が、セッション中に自然と溢れてきました。', author: '50代女性' },
  { text: '過去の自分を受け入れることで、今の自分が楽になりました。', author: '40代男性' },
];

// 体験者の声 - 自動横スクロール（ゆっくり）
function TestimonialsScroll({ testimonials }: { testimonials: { text: string; author: string }[] }) {
  // 無限ループ用にアイテムを複製
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-4 animate-scroll-slow"
        style={{ width: 'max-content' }}
      >
        {duplicatedTestimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white/70 rounded-xl p-5 w-[280px] shrink-0 border border-gray-100"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
            <p className="text-gray-500 text-xs text-right">— {t.author}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-slow {
          animation: scroll-slow 60s linear infinite;
        }
        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default function HypnotherapyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* パステルグラデーション背景 */}
      <div className="fixed inset-0 -z-10">
        <LiquidGradient preset="pastel" opacity={0.8} />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10">

        {/* ===== ヒーロー ===== */}
        <section className="min-h-[50vh] flex items-center pt-24 pb-12 relative overflow-hidden">
          {/* 背景画像 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/AdobeStock_1686407697.webp)',
            }}
          />
          {/* オーバーレイ */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.9) 100%)',
            }}
          />

          {/* 浮遊パーティクル */}
          <FloatingParticles count={15} color="#7FA6BF" />

          {/* 装飾サークル */}
          <div className="absolute right-[10%] top-[20%] w-[250px] h-[250px] rounded-full border border-[#7FA6BF]/10 opacity-50 max-md:hidden" />
          <div className="absolute right-[15%] top-[30%] w-[150px] h-[150px] rounded-full border border-[#7FA6BF]/10 opacity-30 max-md:hidden" />

          {/* 下部グラデーション（白に溶ける） */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.9) 70%, #ffffff 100%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <div className="md:ml-[10%]">
              <FadeIn blur>
                <p className="tracking-[0.3em] text-[0.7rem] text-[#7FA6BF] mb-8 uppercase">Hypnotherapy</p>
              </FadeIn>
              <ParallaxText
                text="ヒプノセラピー"
                delay={100}
                charDelay={60}
                className="font-sans text-[clamp(1.5rem,4vw,3rem)] tracking-[0.02em] font-normal leading-[1.5] text-[#333] mb-6"
              />
              <FadeIn blur delay={0.2}>
                <p className="text-[#666] leading-[2] max-w-md font-light">
                  潜在意識の扉を静かに開き、<br />
                  心の深層へアクセスする心理療法です。
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== ヒプノセラピーとは ===== */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn blur direction="up" duration={1}>
              <div className="relative inline-block mb-4">
                <div className="text-[#7FA6BF]/10 text-4xl md:text-6xl font-extralight tracking-wider">
                  About
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[#7FA6BF] uppercase font-medium relative z-10 -mt-3">
                  What is Hypnotherapy
                </p>
              </div>
            </FadeIn>
            <FadeIn blur delay={0.15} direction="up" duration={1}>
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#333] mb-12">
                ヒプノセラピーとは
              </h2>
            </FadeIn>

            <FadeIn blur delay={0.3} direction="up" duration={1}>
              <p className="text-gray-500 text-[0.95rem] leading-[2.8] max-w-[300px] mx-auto md:max-w-none">
                ヒプノセラピーは、催眠状態（深くリラックスした状態）で、<br />
                潜在意識（普段は意識に上りにくい思考や感情）に<br />
                静かに意識を向けていく心理療法です。
                <br /><br />
                安心できる空間の中で、心の深い部分にあるテーマに気づき、<br />
                自分自身への理解を深めていくセッションです。
              </p>
            </FadeIn>

            <FadeIn blur delay={0.6} direction="up" duration={1}>
              <p className="text-gray-400 text-sm mt-10">
                ※事前面談・セラピー・事後面談を含め、3時間程度のセッションとなります。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== 期待できる変化の一例 ===== */}
        <section className="-mt-8 pt-2 pb-16 md:-mt-12 md:pt-6 md:pb-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn blur>
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <p className="text-[#7FA6BF]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Changes
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#7FA6BF] uppercase font-medium relative z-10 -mt-3">
                    Expected Changes
                  </p>
                </div>
                <h2 className="text-[clamp(1.6rem,3vw,2rem)] tracking-[-0.02em] font-extralight text-[#333] mt-4">
                  期待できる変化の一例
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {changeCategories.map((category, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 h-full shadow-sm">
                    <h3 className="text-[#333] text-lg font-medium mb-3">{category.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{category.items}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn blur delay={0.6}>
              <p className="text-gray-400 text-xs text-center mt-8">
                ※ 効果を保証するものではありません
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== 主なアプローチ（詳細） ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn blur>
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <p className="text-[#7FA6BF]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Approach
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#7FA6BF] uppercase font-medium relative z-10 -mt-3">
                    Methods
                  </p>
                </div>
                <h2 className="text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] font-extralight text-[#333] mt-4">
                  ヒプノセラピーで用いる<br />主なアプローチ
                </h2>
                <p className="text-gray-500 text-sm mt-4 max-w-[280px] mx-auto md:max-w-none">
                  セッションでは、お悩みやご希望に応じて最適な療法を選択します。
                </p>
              </div>
            </FadeIn>

            {/* 3-2 カードレイアウト */}
            <div className="max-w-5xl mx-auto">
              {/* 上段: 3カラム */}
              <div className="grid md:grid-cols-3 gap-5 mb-5">
                {methods.slice(0, 3).map((method, i) => (
                  <FadeIn key={method.id} delay={0.1 * i}>
                    <article className="bg-[#faf8f5] rounded-xl p-6 h-full">
                      <span className="text-[#7FA6BF] text-xs font-medium">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-[#333] text-base font-medium mt-2 mb-3 leading-snug">
                        {method.title}
                      </h3>
                      <p className="text-gray-500 text-[0.8rem] leading-[1.9] whitespace-pre-line">
                        {method.description}
                      </p>
                    </article>
                  </FadeIn>
                ))}
              </div>

              {/* 下段: 2カラム（PC版のみ中央寄せ） */}
              <div className="grid md:grid-cols-2 gap-5 md:px-[16.666%]">
                {methods.slice(3, 5).map((method, i) => (
                  <FadeIn key={method.id} delay={0.1 * (i + 3)}>
                    <article className="bg-[#faf8f5] rounded-xl p-6 h-full">
                      <span className="text-[#7FA6BF] text-xs font-medium">
                        {String(i + 4).padStart(2, '0')}
                      </span>
                      <h3 className="text-[#333] text-base font-medium mt-2 mb-3 leading-snug">
                        {method.title}
                      </h3>
                      <p className="text-gray-500 text-[0.8rem] leading-[1.9] whitespace-pre-line">
                        {method.description}
                      </p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn blur delay={0.5}>
              <p className="text-gray-400 text-xs text-center mt-12 max-w-[300px] mx-auto md:max-w-none">
                ※ ヒプノセラピーは医療行為ではありません。精神疾患の治療を目的としたものではなく、心の探求や自己理解を深めるためのセッションです。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== 料金 ===== */}
        <section className="py-16 md:py-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn blur>
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <p className="text-[#7FA6BF]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Price
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#7FA6BF] uppercase font-medium relative z-10 -mt-3">
                    料金表
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn blur delay={0.2}>
              <div className="max-w-md mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 text-center shadow-sm">
                  <p className="text-gray-600 text-sm mb-2">ヒプノセラピーセッション</p>
                  <p className="text-gray-500 text-sm mb-4">約3時間</p>
                  <p className="font-serif text-4xl text-gray-800 mb-6">
                    ¥33,000
                    <span className="text-sm text-gray-400 ml-2">税込</span>
                  </p>
                  <a
                    href="https://crowd-calendar.com/t/recuerehipno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 rounded-full text-sm transition-colors text-center bg-gradient-to-r from-[#E8D5E3] to-[#D5E3E8] text-gray-700 font-medium shadow-sm hover:shadow-md hover:from-[#DFC8DB] hover:to-[#C8DBE0]"
                  >
                    予約する
                  </a>
                </div>

                <div className="mt-6 text-center space-y-2">
                  <p className="text-gray-500 text-xs">
                    ※ 対面の場合、交通費のご負担をお願いします
                  </p>
                  <p className="text-gray-500 text-xs">
                    ※ オンラインでの実施も可能です
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== 体験者の声 ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn blur>
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <p className="text-[#7FA6BF]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Voice
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#7FA6BF] uppercase font-medium relative z-10 -mt-3">
                    Testimonials
                  </p>
                </div>
                <h2 className="text-[clamp(1.6rem,3vw,2rem)] tracking-[-0.02em] font-extralight text-[#333] mt-4">
                  体験者の声
                </h2>
              </div>
            </FadeIn>

            {/* SP版: 縦リスト */}
            <div className="md:hidden space-y-4">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="bg-white/70 rounded-xl p-5 border border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                    <p className="text-gray-500 text-xs text-right">— {t.author}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* PC版: カルーセル */}
            <FadeIn blur delay={0.2} className="hidden md:block">
              <TestimonialsScroll testimonials={testimonials} />
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 bg-[#faf8f5]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn blur direction="scaleUp">
              <p className="tracking-[0.5em] text-[0.65rem] text-[#7FA6BF] mb-8 uppercase font-medium">Contact</p>
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#333] mb-6">
                まずはお気軽にご相談ください
              </h2>
              <p className="text-[#666] text-[0.95rem] leading-[2] mb-10 font-light max-w-[280px] mx-auto md:max-w-none">
                ご不明な点やご質問がございましたら、お気軽にお問い合わせください。
              </p>
              <ArrowLink href="/contact">
                Contact Us
              </ArrowLink>
            </FadeIn>
          </div>
        </section>

      </div>
    </div>
  );
}
