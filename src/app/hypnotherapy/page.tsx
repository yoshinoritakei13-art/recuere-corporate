'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import FloatingParticles from '@/components/FloatingParticles';
import ArrowLink from '@/components/ArrowLink';
import FadeIn from '@/components/FadeIn';

const PastelLiquidGradient = dynamic(
  () => import('@/components/PastelLiquidGradient'),
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
            <p className="text-gray-600 text-sm leading-relaxed mb-3">"{t.text}"</p>
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* パステルグラデーション背景 */}
      {mounted && (
        <div className="fixed inset-0 -z-10">
          <PastelLiquidGradient opacity={0.8} />
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="relative z-10">

        {/* ===== ヒーロー ===== */}
        <section className="min-h-[80vh] flex items-center pt-20 pb-32 relative overflow-hidden">
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
            <FadeIn className="md:ml-[10%]">
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-6 uppercase font-medium">Hypnotherapy</p>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-[#333] mb-6">
                ヒプノセラピー
              </h1>
              <p className="text-[#666] leading-[2] max-w-md font-light">
                潜在意識の扉を静かに開き、<br />
                心の深層へアクセスする心理療法です。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== ヒプノセラピーとは ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* SP版 */}
            <div className="md:hidden">
              <div className="mb-8">
                <div className="relative">
                  <div className="text-[#002d5a]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2">
                    About
                  </div>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                    What is Hypnotherapy
                  </p>
                  <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[#333] relative z-10">
                    ヒプノセラピーとは
                  </h2>
                </div>
              </div>

              <FadeIn delay={0.1} className="mb-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/AdobeStock_1686407697_Preview.jpeg"
                    alt="ヒプノセラピーイメージ"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="text-gray-600 text-[0.9rem] leading-relaxed space-y-4 mb-8">
                  <p>
                    ヒプノセラピーは、<br />
                    催眠状態（深くリラックスした状態）で、<br />
                    潜在意識（普段は意識に上りにくい思考や感情）に<br />
                    静かに意識を向けていく心理療法です。
                  </p>
                  <p>
                    安心できる空間の中で、<br />
                    心の深い部分にあるテーマに気づき、<br />
                    自分自身への理解を深めていくセッションです。
                  </p>
                  <p className="text-gray-500 text-xs">
                    ※事前面談・セラピー・事後面談を含め、<br />
                    3時間程度のセッションとなります。
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* PC版 */}
            <div className="hidden md:grid md:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <div>
                  <div className="relative mb-8">
                    <FadeIn direction="clipReveal" delay={0} className="text-[#002d5a]/10 text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      About
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.2} className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-8">
                      What is Hypnotherapy
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.5} className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#333] relative z-10">
                      ヒプノセラピーとは
                    </FadeIn>
                  </div>
                  <div className="text-gray-500 text-[0.95rem] leading-[2.2] space-y-4">
                    <p>
                      ヒプノセラピーは、<br />
                      催眠状態（深くリラックスした状態）で、<br />
                      潜在意識（普段は意識に上りにくい思考や感情）に<br />
                      静かに意識を向けていく心理療法です。
                    </p>
                    <p>
                      安心できる空間の中で、<br />
                      心の深い部分にあるテーマに気づき、<br />
                      自分自身への理解を深めていくセッションです。
                    </p>
                    <p className="text-gray-400 text-sm">
                      ※事前面談・セラピー・事後面談を含め、<br />
                      3時間程度のセッションとなります。
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="right">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/AdobeStock_1686407697_Preview.jpeg"
                    alt="ヒプノセラピーイメージ"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== 期待できる変化の一例 ===== */}
        <section className="py-16 md:py-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <p className="text-[#002d5a]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Changes
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] uppercase font-medium relative z-10 -mt-3">
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

            <FadeIn delay={0.6}>
              <p className="text-gray-400 text-xs text-center mt-8">
                ※ 効果を保証するものではありません
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== 主なアプローチ ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <p className="text-[#002d5a]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Approach
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] uppercase font-medium relative z-10 -mt-3">
                    Methods
                  </p>
                </div>
                <h2 className="text-[clamp(1.6rem,3vw,2rem)] tracking-[-0.02em] font-extralight text-[#333] mt-4">
                  ヒプノセラピーで用いる主なアプローチ
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {['年齢退行療法', '前世療法', '心身緩和セラピー', 'グリーフセラピー', 'フューチャーペーシング'].map((theme, i) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                <Link
                  href="/hypnotherapy/methods"
                  className="inline-flex items-center gap-2 text-[#002d5a] hover:text-[#004080] transition-colors text-sm"
                >
                  <span>詳しく知りたい方へ</span>
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== 料金 ===== */}
        <section className="py-16 md:py-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="relative inline-block">
                  <p className="text-[#002d5a]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Price
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] uppercase font-medium relative z-10 -mt-3">
                    料金表
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
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
            <FadeIn>
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <p className="text-[#002d5a]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                    Voice
                  </p>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] uppercase font-medium relative z-10 -mt-3">
                    Testimonials
                  </p>
                </div>
                <h2 className="text-[clamp(1.6rem,3vw,2rem)] tracking-[-0.02em] font-extralight text-[#333] mt-4">
                  体験者の声
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <TestimonialsScroll testimonials={testimonials} />
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 bg-[#faf8f5]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn direction="scaleUp">
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-8 uppercase font-medium">Contact</p>
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#333] mb-6">
                まずはお気軽にご相談ください
              </h2>
              <p className="text-[#666] text-[0.95rem] leading-[2] mb-10 font-light">
                ご不明な点やご質問がございましたら、<br className="md:hidden" />お気軽にお問い合わせください。
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
