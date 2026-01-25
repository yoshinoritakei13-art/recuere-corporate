'use client';

import Link from 'next/link';
import Image from 'next/image';
import FloatingParticles from '@/components/FloatingParticles';
import ArrowLink from '@/components/ArrowLink';
import FadeIn from '@/components/FadeIn';

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

export default function HypnotherapyMethodsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 深いブルー系グラデーション背景 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #1a2a4a 30%, #2a3a5a 60%, #1a2a4a 100%)',
        }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-10">

        {/* ===== ヒーロー ===== */}
        <section className="min-h-[50vh] flex items-center pt-20 pb-16 relative overflow-hidden">
          {/* 浮遊パーティクル */}
          <FloatingParticles count={15} color="#7FA6BF" />

          {/* 装飾サークル */}
          <div className="absolute right-[10%] top-[20%] w-[200px] h-[200px] rounded-full border border-white/5 opacity-30 max-md:hidden" />

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <div className="flex items-center justify-between gap-8">
              {/* 左側：テキスト */}
              <FadeIn className="md:ml-[10%] flex-1">
                <Link
                  href="/hypnotherapy"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors text-sm mb-6"
                >
                  <span>←</span>
                  <span>ヒプノセラピーに戻る</span>
                </Link>
                <p className="tracking-[0.5em] text-[0.65rem] text-white/50 mb-6 uppercase font-medium">Hypnotherapy Methods</p>
                <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-white mb-4">
                  ヒプノセラピー療法について
                </h1>
                <p className="text-white/60 leading-[2] max-w-lg font-light">
                  ヒプノセラピーで用いる主なアプローチをご紹介します。<br />
                  セッションでは、お悩みやご希望に応じて最適な療法を選択します。
                </p>
              </FadeIn>

              {/* 右側：四角の挿絵（PC版のみ） */}
              <FadeIn delay={0.3} className="hidden lg:block flex-shrink-0 mr-[5%] mt-16">
                <div
                  className="relative w-[320px] h-[240px] overflow-hidden rounded-2xl"
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <Image
                    src="/images/AdobeStock_1686407697_Preview.jpeg"
                    alt="ヒプノセラピーイメージ"
                    fill
                    className="object-cover"
                  />
                  {/* オーバーレイ */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(10, 22, 40, 0.3) 100%)',
                    }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== 療法一覧 ===== */}
        <section className="py-16 md:py-24 bg-[#1a2a4a]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12">
              {methods.map((method, i) => (
                <FadeIn key={method.id} delay={0.1 * i}>
                  <article
                    id={method.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-white/20 text-4xl font-extralight">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-white text-xl md:text-2xl font-light leading-tight pt-2">
                        {method.title}
                      </h2>
                    </div>
                    <div className="text-white/70 text-[0.95rem] leading-[2.2] whitespace-pre-line pl-0 md:pl-14">
                      {method.description}
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 注意事項 ===== */}
        <section className="py-12 bg-gradient-to-b from-[#1a2a4a] to-[#0a1628]">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-white/50 text-sm leading-relaxed">
                  ※ ヒプノセラピーは医療行為ではありません。精神疾患の治療を目的としたものではなく、心の探求や自己理解を深めるためのセッションです。<br />
                  ※ セッションの効果には個人差があり、効果を保証するものではありません。<br />
                  ※ 現在精神科・心療内科に通院中の方は、主治医にご相談の上お申し込みください。
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 bg-[#0a1628]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(1.6rem,3vw,2rem)] tracking-[-0.02em] font-extralight text-white mb-6">
                セッションのご予約・お問い合わせ
              </h2>
              <p className="text-white/60 text-[0.95rem] leading-[2] mb-10 font-light">
                ヒプノセラピーにご興味をお持ちの方は、<br className="md:hidden" />お気軽にご相談ください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://crowd-calendar.com/t/recuerehipno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#4a6a8a] to-[#5a7a9a] text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:from-[#5a7a9a] hover:to-[#6a8aaa] transition-all duration-300"
                >
                  予約する
                </a>
                <ArrowLink href="/contact" variant="light">
                  お問い合わせ
                </ArrowLink>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </div>
  );
}
