'use client';

import Link from 'next/link';
import { useRef } from 'react';
import FadeIn from '@/components/FadeIn';
import ArrowLink from '@/components/ArrowLink';
import { useMouseGlow } from '@/hooks/useMouseGlow';

/**
 * Services Page
 *
 * 企業向けサービスメインのページ
 * 紺色・青系カラーでコーポレート感を演出
 * マウス追従の光るカードエフェクト
 */

export default function ServicesPage() {
  const cardsRef = useRef<HTMLDivElement>(null);

  // マウス追従グローエフェクト（3Dチルトなし）
  useMouseGlow(cardsRef, {
    selector: '.service-card',
    enable3DTilt: false
  });
  return (
    <main className="bg-white">
      {/* 全体を包む紺色背景のコンテナ */}
      <div className="bg-gradient-navy">
        {/* Hero Section - Session風の左寄せレイアウト */}
        <section className="relative min-h-[80vh] flex items-center pt-20 pb-32 px-8 overflow-hidden">
          {/* 背景画像（ヒーローセクションのみ） */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/images/heroimage.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          {/* グラデーションオーバーレイ */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,26,51,0.3) 0%, rgba(0,45,90,0.5) 40%, rgba(0,45,90,0.8) 70%, #002d5a 100%)',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="md:ml-[10%]">
              <FadeIn>
                <p className="tracking-[0.5em] text-[0.65rem] text-white/60 mb-6 uppercase font-medium">Services</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-white mb-6">
                  経営の意思決定を、<br />
                  再現性ある仕組みへ。
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-white/70 leading-[2] max-w-md font-light">
                  経営の論理性と心理学の知見を融合し、<br />
                  現状と将来像のギャップを整理します。
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Business Services - Main（境界線なしで自然に繋がる） */}
        <section className="relative pt-[60px] pb-[140px] px-8 max-md:pt-[40px] max-md:pb-[100px]" id="business">
        <div className="max-w-7xl mx-auto">
          <div className="md:ml-[10%] mb-16">
            <FadeIn>
              <p className="tracking-[0.5em] text-[0.65rem] text-white/60 mb-6 uppercase font-medium">Our Services</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-white mb-6">
                4つの専門的な視点を通じて、<br className="md:hidden" />
                経営の意思決定と実行を支援します。
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-white/70 leading-[2] max-w-md font-light">
                現状と将来像のギャップを捉えながら、<br />
                意思決定から実行までを一体で設計します。
              </p>
            </FadeIn>
          </div>

          {/* Service Cards - 2x2 Grid with mouse glow effect */}
          <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 mb-20">
            {/* Card 1 - 経営コンサルティング／意思決定支援 */}
            <FadeIn delay={0.1}>
              <article className="bg-white/10 backdrop-blur-sm rounded-lg h-full border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="p-6 md:p-10 lg:p-12 h-full">
                  <p className="tracking-[0.5em] text-[0.65rem] text-white/50 mb-4 uppercase font-medium">01</p>
                  <h3 className="text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-[-0.02em] font-extralight mb-2 text-white">
                    経営コンサルティング／意思決定支援
                  </h3>
                  <p className="text-white/60 text-[0.8rem] mb-4">（企業・組織向け）</p>
                  <p className="text-white/80 leading-[2] mb-8 text-[0.95rem] font-light">
                    経営者・幹部の意思決定に伴走し、組織・事業・人の流れを整理しながら、中長期視点で現実を動かしていきます。
                  </p>
                </div>
              </article>
            </FadeIn>

            {/* Card 2 - 業界特化型経営支援（歯科・医療） */}
            <FadeIn delay={0.3}>
              <article className="bg-white/10 backdrop-blur-sm rounded-lg h-full border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="p-6 md:p-10 lg:p-12 h-full">
                  <p className="tracking-[0.5em] text-[0.65rem] text-white/50 mb-4 uppercase font-medium">02</p>
                  <h3 className="text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-[-0.02em] font-extralight mb-4 text-white">
                    業界特化型経営支援（歯科・医療）
                  </h3>
                  <p className="text-white/80 leading-[2] mb-8 text-[0.95rem] font-light">
                    歯科・医療業界で培った実践を活かし、院長の意思決定に寄り添いながら、医院経営・組織運営・人材の課題を整理し、医院のステージを一段引き上げる支援を行います。
                  </p>
                </div>
              </article>
            </FadeIn>

            {/* Card 3 - 人材育成・研修／伴走支援 */}
            <FadeIn delay={0.5}>
              <article className="bg-white/10 backdrop-blur-sm rounded-lg h-full border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="p-6 md:p-10 lg:p-12 h-full">
                  <p className="tracking-[0.5em] text-[0.65rem] text-white/50 mb-4 uppercase font-medium">03</p>
                  <h3 className="text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-[-0.02em] font-extralight mb-4 text-white">
                    人材育成・研修／伴走支援
                  </h3>
                  <p className="text-white/80 leading-[2] mb-8 text-[0.95rem] font-light">
                    組織の方針と個々の役割をつなぎ、人が育ち、チームが機能するための実践的な研修と伴走支援を行います。
                  </p>
                </div>
              </article>
            </FadeIn>

            {/* Card 4 - 経営者向け意思決定コーチング */}
            <FadeIn delay={0.7}>
              <article className="bg-white/10 backdrop-blur-sm rounded-lg h-full border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="p-6 md:p-10 lg:p-12 h-full">
                  <p className="tracking-[0.5em] text-[0.65rem] text-white/50 mb-4 uppercase font-medium">04</p>
                  <h3 className="text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-[-0.02em] font-extralight mb-4 text-white">
                    経営者向け意思決定コーチング
                  </h3>
                  <p className="text-white/60 text-[0.85rem] mb-4 italic">
                    判断力が、組織の未来をつくる
                  </p>
                  <p className="text-white/80 leading-[2] mb-4 text-[0.95rem] font-light">
                    経営者自身の思考・判断のクセを整理し、本質的な意思決定ができる状態をつくる伴走型コーチングです。
                  </p>
                  <p className="text-white/60 leading-[2] text-[0.9rem] font-light">
                    判断が変わることで、組織の流れや成果が自然と変わっていきます。
                  </p>
                </div>
              </article>
            </FadeIn>
          </div>

          {/* 費用について - 白地カード */}
          <FadeIn delay={0.5}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-12 p-8 bg-white rounded-lg">
              <p className="text-body-lg tracking-wide-xs font-light text-text">
                企業向けコンサルティングはすべてオリジナル提案。課題・期間・体制により個別にお見積り。
              </p>
              <ArrowLink href="/contact">
                ご相談はこちら
              </ArrowLink>
            </div>
          </FadeIn>
        </div>
      </section>
      </div>

      {/* Personal Session - 白背景 */}
      <section className="py-[60px] px-8 max-md:py-[40px] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8 bg-white rounded-lg">
            <div>
              <FadeIn>
                <p className="tracking-wide-2xl text-label-xs mb-2 uppercase text-text">For Personal</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-heading-sm font-light text-text">
                  個人向けセッションをお探しの方へ
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <ArrowLink href="/session">
                セッション詳細を見る
              </ArrowLink>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact CTA - 青系 */}
      <section className="relative py-[140px] px-8 max-md:py-[100px] overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-cta" />

        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="tracking-[0.3em] text-[0.7rem] text-white/50 mb-6 uppercase">Contact</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] font-extralight leading-[1.6] text-white mb-8">
              まずは、お気軽にご相談ください
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/70 leading-[2.0] mb-12">
              企業の課題整理から、個人の内面の整理まで。<br className="hidden md:block" />目的に合わせて、最適な関わり方をご提案します。
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <ArrowLink href="/contact" variant="light">
              Contact Us
            </ArrowLink>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
