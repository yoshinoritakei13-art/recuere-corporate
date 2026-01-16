'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import ArrowLink from '@/components/ArrowLink';
import TextReveal from '@/components/TextReveal';
import ParallaxText from '@/components/ParallaxText';
import HeroAnimation from '@/components/HeroAnimation';
import BlobDivider from '@/components/BlobDivider';
import CircleAnimation from '@/components/CircleAnimation';
import BlobImage from '@/components/BlobImage';

const PastelLiquidGradient = dynamic(
  () => import('@/components/PastelLiquidGradient'),
  { ssr: false }
);

/**
 * Top Page - recuere コーポレートサイト
 *
 * ドラマチックなヒーローアニメーション + NUTRADスタイル
 */

export default function HomePage() {
  return (
    <>
      <div className="relative bg-white">
        {/* Hero Section - ドラマチックアニメーション */}
        <HeroAnimation />

        {/* Philosophy Section - hero-bgが白くフェードアウト */}
        <section className="relative pt-[180px] pb-[20px] px-8 max-md:pt-[120px] max-md:pb-[10px] overflow-hidden">
          {/* 白グラデーションオーバーレイ - hero-bgを白くフェードアウト */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.95) 80%, rgba(255,255,255,1) 100%)',
            }}
          />

          {/* デスクトップ版 */}
          <div className="relative z-10 max-w-[800px] mx-auto text-left hidden lg:block">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-8 uppercase">Philosophy</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-[0.02em] leading-[1.5] text-[#333] mb-4 !font-bold">
                気づきから、豊かさへ。
              </h2>
            </FadeIn>
            <FadeIn delay={0.8}>
              <p className="text-[0.95rem] tracking-[0.1em] text-[#666] mb-16">
                ひとつの気づきが、道をひらき、現実を動かす
              </p>
            </FadeIn>

            <div className="text-[1rem] leading-[2.4] text-[#333] space-y-12">
              <p>
                <TextReveal text="人は、教えられて変わるのではなく、" delay={600} charDelay={15} />
                <br />
                <TextReveal text="自分で気づいたときに、自然と動き出します。" delay={800} charDelay={15} />
              </p>

              <p>
                <TextReveal text="一人ひとりが本来の自分に気づき、" delay={1100} charDelay={15} />
                <br />
                <TextReveal text="その力を、無理なく発揮できる状態をつくること。" delay={1300} charDelay={15} />
                <br />
                <TextReveal text="それが、個人と組織の豊かさを、" delay={1500} charDelay={15} />
                <br />
                <TextReveal text="静かに、そして確かに育てていくと考えています。" delay={1700} charDelay={15} />
              </p>
            </div>
          </div>

          {/* スマホ版 */}
          <div className="relative z-10 lg:hidden text-left">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-4 uppercase">Philosophy</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-sans text-[1.5rem] tracking-[0.02em] font-bold leading-[1.6] text-[#333] mb-3">
                気づきから、<br />豊かさへ。
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-[0.85rem] tracking-[0.1em] text-[#666] mb-10">
                ひとつの気づきが、道をひらき、現実を動かす
              </p>
            </FadeIn>

            <div className="text-[0.9rem] leading-[2.2] text-[#333] space-y-6">
              <p>
                <TextReveal text="人は、教えられて変わるのではなく、" delay={400} charDelay={15} />
                <TextReveal text="自分で気づいたときに、自然と動き出します。" delay={600} charDelay={15} />
              </p>

              <p>
                <TextReveal text="一人ひとりが本来の自分に気づき、" delay={900} charDelay={15} />
                <TextReveal text="その力を、無理なく発揮できる状態をつくること。" delay={1100} charDelay={15} />
                <TextReveal text="それが、個人と組織の豊かさを、静かに、そして確かに育てていくと考えています。" delay={1300} charDelay={12} />
              </p>
            </div>
          </div>
        </section>

        {/* 背景画像→白の波形ディバイダー - Philosophy → Services */}
        <div className="relative z-[11] bg-white">
          <BlobDivider fromColor="transparent" toColor="#ffffff" />
        </div>

        {/* Services Section - 完全白背景 + 有機的な画像 */}
        <section
          className="relative pt-[80px] pb-[120px] px-8 max-md:pt-[60px] max-md:pb-[80px] z-[10] overflow-hidden bg-white"
        >
          {/* 回転する同心円アニメーション */}
          <CircleAnimation className="z-[1]" />


          <div className="relative z-[5] max-w-[1200px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-8 uppercase">Services</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-[0.02em] font-medium leading-[1.5] mb-20">
                <span className="services-gradient-text">目的に応じた、二つのアプローチ</span>
              </h2>
            </FadeIn>

            {/* 企業向けサービス - 画像とカードを横並び */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 mb-16 lg:mb-24">
              {/* ブロブ画像 - 左に大きく */}
              <div className="lg:flex-1 lg:mr-[-80px] z-[1]">
                <BlobImage
                  imageSrc="/images/k1.jpg"
                  size={300}
                  direction="left"
                  className="lg:!w-[500px] lg:!h-[500px]"
                />
              </div>

              {/* カード - 右に重なる */}
              <FadeIn delay={0.3} direction="left" duration={1.2} className="lg:flex-1 z-[2]">
                <article className="bg-white p-8 md:p-10 lg:p-12 border border-[#eee] hover:border-[var(--color-primary)] transition-colors duration-300 shadow-sm">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-tertiary)] mb-8"></div>

                  <h3 className="text-[1.4rem] tracking-[0.01em] font-normal mb-4 text-[#333]">
                    企業向けサービス
                  </h3>
                  <p className="text-[#888] leading-[1.9] mb-6 text-[0.9rem]">
                    経営の意思決定を、再現性ある仕組みへ。
                  </p>

                  <ul className="text-[#555] text-[0.9rem] leading-[2.2] mb-8 space-y-2">
                    <li>経営コンサルティング</li>
                    <li>医療法人・歯科医院向けコンサルティング</li>
                    <li>プロジェクト遂行支援</li>
                    <li>人材育成研修</li>
                  </ul>

                  <ArrowLink href="/services#business">
                    くわしく見る
                  </ArrowLink>
                </article>
              </FadeIn>
            </div>

            {/* 個人向けサービス - 逆向き配置 */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
              {/* ブロブ画像 - SP版では上、PC版では右に */}
              <div className="lg:flex-1 lg:ml-[-80px] z-[1] lg:order-2">
                <BlobImage
                  imageSrc="/images/s1.jpg"
                  size={300}
                  direction="right"
                  className="lg:!w-[500px] lg:!h-[500px]"
                />
              </div>

              {/* カード - SP版では下、PC版では左に */}
              <FadeIn delay={0.5} direction="right" duration={1.2} className="lg:flex-1 z-[2] lg:order-1">
                <article className="bg-white p-8 md:p-10 lg:p-12 border border-[#eee] hover:border-[var(--color-secondary)] transition-colors duration-300 shadow-sm">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] mb-8"></div>

                  <h3 className="text-[1.4rem] tracking-[0.01em] font-normal mb-4 text-[#333]">
                    個人向けサービス
                  </h3>
                  <p className="text-[#888] leading-[1.9] mb-6 text-[0.9rem]">
                    本当の願いに気づき、行動が自然に続く状態へ。
                  </p>

                  <ul className="text-[#555] text-[0.9rem] leading-[2.2] mb-8 space-y-2">
                    <li>Personal Awakening Session</li>
                    <li>Hypnotherapy（催眠療法）</li>
                    <li>Branding Awakening Session</li>
                    <li>Personal Coaching</li>
                  </ul>

                  <ArrowLink href="/session">
                    くわしく見る
                  </ArrowLink>
                </article>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Founder Section - ピンク系パステルグラデーション背景 */}
        <section className="relative pt-[120px] pb-[140px] px-8 max-md:pt-[80px] max-md:pb-[100px] overflow-hidden" id="founder">
          {/* パステルリキッドグラデーション背景 */}
          <PastelLiquidGradient opacity={0.85} />
          {/* 上部：白からグラデーションへ溶けるオーバーレイ */}
          <div
            className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none z-[1]"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.3) 70%, transparent 100%)',
            }}
          />
          <div className="relative z-10 max-w-[1000px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-12 uppercase">Founder</p>
            </FadeIn>

            {/* スマホ版: 3つの有機的な円 + テキスト（ふわっと演出） */}
            <div className="md:hidden flex flex-col items-center">
              {/* 3つの円を横に並べる（りのさん真ん中） */}
              <div className="flex items-center justify-center gap-2 mb-10">
                {/* 円1: 企業のビル写真（小さめ） */}
                <FadeIn delay={0.1} direction="left" duration={0.8}>
                  <BlobImage
                    imageSrc="/images/S__69246981.jpg"
                    size={85}
                    direction="left"
                  />
                </FadeIn>

                {/* 円2: たなか里乃（真ん中・大きめ） */}
                <FadeIn delay={0.2} direction="up" duration={0.8}>
                  <BlobImage
                    imageSrc="/images/rinosan2.jpg"
                    size={160}
                    direction="left"
                    imagePosition="top"
                  />
                </FadeIn>

                {/* 円3: 朝日の写真（小さめ） */}
                <FadeIn delay={0.3} direction="right" duration={0.8}>
                  <BlobImage
                    imageSrc="/images/S__69246983.jpg"
                    size={85}
                    direction="right"
                  />
                </FadeIn>
              </div>

              {/* テキスト - ふわっとフェードイン */}
              <FadeIn delay={0.4} duration={0.8}>
                <div className="bg-white/90 backdrop-blur-sm p-8 text-center">
                  <p className="text-[#666] tracking-[0.15em] text-[0.75rem] mb-2">
                    経営コンサルタント・心理カウンセラー
                  </p>
                  <h3 className="text-[1.6rem] tracking-[0.02em] font-light text-[#333] mb-6">
                    たなか里乃
                  </h3>
                  <p className="leading-[2.2] text-[#444] text-[0.9rem] mb-8">
                    人は、正しさだけでは動けません。<br />
                    けれど、感情だけでも未来は続かない。<br />
                    経営と心理、両方を知るからこそ、<br />
                    現実を変える「一歩」を共に設計できます。
                  </p>
                  <ArrowLink href="/company#founder">
                    くわしく見る
                  </ArrowLink>
                </div>
              </FadeIn>
            </div>

            {/* PC版: テキストカード + 3つの有機的な円 */}
            <div className="hidden md:block">
              <div className="flex items-start justify-center gap-8">
                {/* 左: テキストカード */}
                <FadeIn delay={0.4} direction="right" duration={0.8}>
                  <div className="bg-white/90 backdrop-blur-sm p-12 max-w-[500px]">
                    <p className="text-[#666] tracking-[0.15em] text-[0.75rem] mb-2">
                      経営コンサルタント・心理カウンセラー
                    </p>
                    <h3 className="text-[2rem] tracking-[0.02em] font-light text-[#333] mb-6">
                      たなか里乃
                    </h3>
                    <p className="leading-[2.2] text-[#444] text-[0.9rem] mb-8">
                      人は、正しさだけでは動けません。<br />
                      けれど、感情だけでも未来は続かない。<br />
                      経営と心理、両方を知るからこそ、<br />
                      現実を変える「一歩」を共に設計できます。
                    </p>
                    <ArrowLink href="/company#founder">
                      くわしく見る
                    </ArrowLink>
                  </div>
                </FadeIn>

                {/* 右: 3つの円を縦に配置（りのさん上）- 順番に上から現れる */}
                <div className="relative w-[280px] h-[480px] -ml-8">
                  {/* 円1: たなか里乃（上・大きめ）- 最初に現れる */}
                  <FadeIn delay={0.2} direction="up" duration={0.7}>
                    <div className="absolute -top-[20px] -left-[30px]">
                      <BlobImage
                        imageSrc="/images/rinosan2.jpg"
                        size={260}
                        direction="left"
                        imagePosition="top"
                      />
                    </div>
                  </FadeIn>

                  {/* 円2: 企業のビル写真（右）- 少し遅れて現れる */}
                  <FadeIn delay={0.5} direction="up" duration={0.7}>
                    <div className="absolute top-[180px] right-0">
                      <BlobImage
                        imageSrc="/images/S__69246981.jpg"
                        size={170}
                        direction="right"
                      />
                    </div>
                  </FadeIn>

                  {/* 円3: 朝日の写真（左・ビルと横並び）- 最後に現れる */}
                  <FadeIn delay={0.8} direction="up" duration={0.7}>
                    <div className="absolute top-[260px] -left-[60px]">
                      <BlobImage
                        imageSrc="/images/S__69246983.jpg"
                        size={130}
                        direction="right"
                      />
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - 白オーバーレイ 70%→0%（Footerで完全にパステル） */}
        <section className="relative py-[180px] px-8 max-md:py-[120px]">
          {/* Founderの続きから透明へ */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
            }}
          />
          <div className="relative z-10 max-w-[800px] mx-auto text-center">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#555] mb-8 uppercase">Contact</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] font-light leading-[1.6] text-[#333] mb-8">
                まずは、お気軽にご相談ください
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#444] leading-[2.0] mb-12">
                企業の課題整理から、個人の内面の整理まで。
                <br />
                目的に合わせて、最適な関わり方をご提案します。
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <ArrowLink href="/contact">
                Contact Us
              </ArrowLink>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
