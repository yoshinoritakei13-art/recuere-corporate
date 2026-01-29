'use client';

import dynamic from 'next/dynamic';
import FadeIn from '@/components/FadeIn';
import ArrowLink from '@/components/ArrowLink';
import HeroAnimation from '@/components/HeroAnimation';
import BlobDivider from '@/components/BlobDivider';
import CircleAnimation from '@/components/CircleAnimation';
import BlobImage from '@/components/BlobImage';
import SnapScrollContainer from '@/components/SnapScrollContainer';

const LiquidGradient = dynamic(
  () => import('@/components/LiquidGradientUnified'),
  { ssr: false }
);

/**
 * Top Page - recuere コーポレートサイト
 *
 * セクション構成:
 * 1. Hero - ドラマチックアニメーション（スナップ）
 * 2. Philosophy - 理念（スナップ）
 * 3. Services - 企業/個人向けサービス（スナップ）
 * 4. Founder - 代表者紹介（スナップ）
 * 5. Contact - お問い合わせ（通常スクロール→Footer）
 */

/* ========================================
   Section Components
   ======================================== */

/** Philosophy Section - デスクトップ版 */
function PhilosophyDesktop() {
  return (
    <div className="relative z-10 max-w-[800px] mx-auto text-left hidden lg:block">
      <FadeIn>
        <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-8 uppercase">
          Philosophy
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-[0.02em] leading-[1.5] text-[#333] mb-4 !font-bold">
          気づきから、豊かさへ。
        </h2>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="text-[0.95rem] tracking-[0.1em] text-[#666] mb-16">
          ひとつの気づきが、道をひらき、現実を動かす
        </p>
      </FadeIn>

      <div className="text-[1rem] leading-[2.4] text-[#333] space-y-12">
        <FadeIn delay={0.45} duration={0.8}>
          <p>
            人は、教えられて変わるのではなく、
            <br />
            自分で気づいたときに、自然と動き出します。
          </p>
        </FadeIn>
        <FadeIn delay={0.6} duration={0.8}>
          <p>
            一人ひとりが本来の自分に気づき、
            <br />
            その力を、無理なく発揮できる状態をつくること。
            <br />
            それが、個人と組織の豊かさを、
            <br />
            静かに、そして確かに育てていくと考えています。
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

/** Philosophy Section - モバイル版 */
function PhilosophyMobile() {
  return (
    <div className="relative z-10 lg:hidden text-left">
      <FadeIn>
        <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-4 uppercase">
          Philosophy
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h2 className="font-sans text-[1.5rem] tracking-[0.02em] !font-bold leading-[1.6] text-[#333] mb-3" style={{ fontWeight: 700 }}>
          気づきから、豊かさへ。
        </h2>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="text-[0.85rem] tracking-[0.1em] text-[#666] mb-10">
          ひとつの気づきが、道をひらき、現実を動かす
        </p>
      </FadeIn>

      <div className="text-[0.9rem] leading-[2.2] text-[#333] space-y-6">
        <FadeIn delay={0.45} duration={0.8}>
          <p>
            人は、教えられて変わるのではなく、
            自分で気づいたときに、自然と動き出します。
          </p>
        </FadeIn>
        <FadeIn delay={0.6} duration={0.8}>
          <p>
            一人ひとりが本来の自分に気づき、
            その力を、無理なく発揮できる状態をつくること。
            それが、個人と組織の豊かさを、静かに、そして確かに育てていくと考えています。
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

/** Services Section - 浮遊画像（デスクトップのみ） */
function ServicesFloatingImages() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
      {/* 左エリア - ビル写真（vwでレスポンシブ対応） */}
      <div className="absolute top-[50%] -translate-y-1/2 left-[2%] animate-poyopoyo-slow" style={{ width: 'clamp(160px, 18vw, 380px)', height: 'clamp(160px, 18vw, 380px)' }}>
        <BlobImage imageSrc="/images/S__69246981.jpg" size="100%" direction="left" disableScrollEffect />
      </div>

      {/* 右エリア（vwでレスポンシブ対応） */}
      <div className="absolute top-[50%] -translate-y-1/2 right-[2%] animate-poyopoyo-slow" style={{ width: 'clamp(160px, 18vw, 380px)', height: 'clamp(160px, 18vw, 380px)', animationDelay: '1s' }}>
        <BlobImage imageSrc="/images/s7.jpg" size="100%" direction="right" imagePosition="top" disableScrollEffect imageScale={0.6} />
      </div>
    </div>
  );
}

/** Services Section - サービスカード */
function ServiceCard({
  title,
  description,
  items,
  href,
  colorFrom,
  colorTo,
  hoverBorderColor,
  delay,
}: {
  title: string;
  description: string;
  items: string[];
  href: string;
  colorFrom: string;
  colorTo: string;
  hoverBorderColor: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} direction="up" duration={1}>
      <article
        className={`bg-white/95 backdrop-blur-sm p-8 lg:p-10 border border-[#eee] hover:border-[${hoverBorderColor}] transition-all duration-300 shadow-sm h-full`}
      >
        <div
          className="h-[2px] w-12 mb-6"
          style={{ background: `linear-gradient(to right, ${colorFrom}, ${colorTo})` }}
        />
        <h3 className="text-[1.3rem] tracking-[0.01em] font-normal mb-3 text-[#333]">
          {title}
        </h3>
        <p className="text-[#888] leading-[1.8] mb-5 text-[0.85rem]">
          {description}
        </p>
        <ul className="text-[#555] text-[0.85rem] leading-[2] mb-6 space-y-1">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ArrowLink href={href}>くわしく見る</ArrowLink>
      </article>
    </FadeIn>
  );
}

/** Founder Section - プロフィールカード */
function FounderProfileCard({ isMobile = false }: { isMobile?: boolean }) {
  const paddingClass = isMobile ? 'p-8' : 'p-12';
  const nameSize = isMobile ? 'text-[1.6rem]' : 'text-[2rem]';
  const titleSize = isMobile ? 'text-[0.8rem]' : 'text-[0.85rem]';
  const marginBottom = isMobile ? 'mb-8' : 'mb-10';
  const textAlign = isMobile ? 'text-center mt-8' : '';

  return (
    <div className={`bg-white/90 backdrop-blur-sm ${paddingClass} ${isMobile ? 'max-w-none' : 'max-w-[500px]'} ${textAlign}`}>
      <h3 className={`${nameSize} tracking-[0.02em] font-light text-[#333] mb-2 md:mb-3`}>
        たなか里乃
      </h3>
      <p className={`text-[#666] tracking-[0.1em] ${titleSize} ${marginBottom}`}>
        経営コンサルタント・心理カウンセラー・ヒプノセラピスト
      </p>
      <ArrowLink href="/company#founder">プロフィールはこちらから</ArrowLink>
    </div>
  );
}

/* ========================================
   Main Page Component
   ======================================== */

export default function HomePage() {
  return (
    <SnapScrollContainer>
      <div className="relative bg-white">
        {/* ========================================
           Hero Section
           ======================================== */}
        <div data-snap-section>
          <HeroAnimation />
        </div>

        {/* ========================================
           Philosophy Section
           ======================================== */}
        <section
          data-snap-section
          className="relative md:min-h-screen flex flex-col justify-center pt-[80px] pb-[40px] px-8 max-md:pt-[60px] max-md:pb-[20px] overflow-hidden"
        >
          {/* 白グラデーションオーバーレイ */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg,
                rgba(255,255,255,0.45) 0%,
                rgba(255,255,255,0.55) 20%,
                rgba(255,255,255,0.7) 40%,
                rgba(255,255,255,0.85) 60%,
                rgba(255,255,255,0.95) 80%,
                rgba(255,255,255,1) 100%
              )`,
            }}
          />
          <PhilosophyDesktop />
          <PhilosophyMobile />
        </section>

        {/* Divider: Philosophy → Services */}
        <div className="relative z-[11] bg-white">
          <BlobDivider fromColor="transparent" toColor="#ffffff" />
        </div>

        {/* ========================================
           Services Section
           ======================================== */}
        <section
          data-snap-section
          className="relative min-h-screen flex flex-col justify-center py-[60px] px-8 z-[10] overflow-hidden bg-white"
        >
          <CircleAnimation className="z-[1]" />
          <ServicesFloatingImages />

          <div className="relative z-[5] max-w-[900px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-6 uppercase">
                Services
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.02em] font-medium leading-[1.5] mb-10">
                <span className="services-gradient-text">目的に応じた、<br className="md:hidden" />二つのアプローチ</span>
              </h2>
            </FadeIn>

            {/* SP版: カード内に写真配置（くわしく見るの横） */}
            <div className="lg:hidden space-y-6">
              <FadeIn delay={0.2} direction="up" duration={1}>
                <article className="bg-white/95 backdrop-blur-sm p-6 border border-[#eee] shadow-sm">
                  <div
                    className="h-[2px] w-12 mb-4"
                    style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-tertiary))' }}
                  />
                  <h3 className="text-[1.3rem] tracking-[0.01em] font-normal mb-3 text-[#333]">企業向けサービス</h3>
                  <p className="text-[#888] leading-[1.8] mb-4 text-[0.85rem]">経営の意思決定を、再現性ある仕組みへ。</p>
                  <ul className="text-[#555] text-[0.85rem] leading-[2] mb-6 space-y-1">
                    <li>経営コンサルティング</li>
                    <li>医療法人・歯科医院向けコンサルティング</li>
                    <li>プロジェクト遂行支援</li>
                    <li>人材育成研修</li>
                  </ul>
                  <div className="flex items-start justify-between">
                    <ArrowLink href="/services#business">くわしく見る</ArrowLink>
                    <div className="animate-poyopoyo-slow -mt-16">
                      <BlobImage imageSrc="/images/S__69246981.jpg" size={180} direction="left" disableScrollEffect />
                    </div>
                  </div>
                </article>
              </FadeIn>
              <FadeIn delay={0.4} direction="up" duration={1}>
                <article className="bg-white/95 backdrop-blur-sm p-6 border border-[#eee] shadow-sm">
                  <div
                    className="h-[2px] w-12 mb-4"
                    style={{ background: 'linear-gradient(to right, var(--color-secondary), var(--color-accent))' }}
                  />
                  <h3 className="text-[1.3rem] tracking-[0.01em] font-normal mb-3 text-[#333]">個人向けサービス</h3>
                  <p className="text-[#888] leading-[1.8] mb-4 text-[0.85rem]">本当の願いに気づき、行動が自然に続く状態へ。</p>
                  <ul className="text-[#555] text-[0.85rem] leading-[2] mb-6 space-y-1">
                    <li>Personal Awakening Session</li>
                    <li>Hypnotherapy（催眠療法）</li>
                    <li>Branding Awakening Session</li>
                    <li>Personal Coaching</li>
                  </ul>
                  <div className="flex items-start justify-between">
                    <ArrowLink href="/session">くわしく見る</ArrowLink>
                    <div className="animate-poyopoyo-slow -mt-16" style={{ animationDelay: '1s' }}>
                      <BlobImage imageSrc="/images/s7.jpg" size={180} direction="right" imagePosition="top" disableScrollEffect imageScale={0.6} />
                    </div>
                  </div>
                </article>
              </FadeIn>
            </div>

            {/* PC版: 2カラムグリッド */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
              <ServiceCard
                title="企業向けサービス"
                description="経営の意思決定を、再現性ある仕組みへ。"
                items={[
                  '経営コンサルティング',
                  '医療法人・歯科医院向けコンサルティング',
                  'プロジェクト遂行支援',
                  '人材育成研修',
                ]}
                href="/services#business"
                colorFrom="var(--color-primary)"
                colorTo="var(--color-tertiary)"
                hoverBorderColor="var(--color-primary)"
                delay={0.2}
              />
              <ServiceCard
                title="個人向けサービス"
                description="本当の願いに気づき、行動が自然に続く状態へ。"
                items={[
                  'Personal Awakening Session',
                  'Hypnotherapy（催眠療法）',
                  'Branding Awakening Session',
                  'Personal Coaching',
                ]}
                href="/session"
                colorFrom="var(--color-secondary)"
                colorTo="var(--color-accent)"
                hoverBorderColor="var(--color-secondary)"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* ========================================
           Founder Section
           ======================================== */}
        <section
          data-snap-section
          id="founder"
          className="relative min-h-screen flex flex-col justify-center py-[80px] px-8 max-md:py-[60px] overflow-hidden"
        >
          <LiquidGradient preset="pastel" opacity={0.85} />

          {/* 上部フェードオーバーレイ */}
          <div
            className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none z-[1]"
            style={{
              background: `linear-gradient(180deg,
                #ffffff 0%,
                rgba(255,255,255,0.8) 30%,
                rgba(255,255,255,0.3) 70%,
                transparent 100%
              )`,
            }}
          />

          <div className="relative z-10 max-w-[1000px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-12 uppercase">
                Founder
              </p>
            </FadeIn>

            {/* モバイル版 - 写真をカード内上部中央に */}
            <div className="md:hidden">
              <FadeIn delay={0.2} duration={0.8}>
                <div className="bg-white/90 backdrop-blur-sm p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <BlobImage
                      imageSrc="/images/rinosan2_2.png"
                      size={160}
                      direction="left"
                      imagePosition="top"
                      disableScrollEffect
                    />
                  </div>
                  <h3 className="text-[1.5rem] tracking-[0.02em] font-light text-[#333] mb-2">
                    たなか里乃
                  </h3>
                  <p className="text-[#666] tracking-[0.1em] text-[0.75rem] mb-6">
                    経営コンサルタント・心理カウンセラー・ヒプノセラピスト
                  </p>
                  <ArrowLink href="/company#founder">プロフィールはこちらから</ArrowLink>
                </div>
              </FadeIn>
            </div>

            {/* デスクトップ版 - 左テキスト、右に写真3枚（三角形配置） */}
            <div className="hidden md:flex items-start justify-center gap-12">
              {/* 左: テキストカード */}
              <FadeIn delay={0.2} direction="up" duration={0.8}>
                <div className="mt-12">
                  <FounderProfileCard />
                </div>
              </FadeIn>

              {/* 右: 写真3枚（三角形配置：りのさん上、ビル左下、夕日右上） */}
              <div className="relative">
                {/* 上段：りのさん（左）と夕日（右上） */}
                <div className="flex items-start gap-4">
                  {/* りのさん写真（左上・メイン） */}
                  <FadeIn delay={0.3} direction="up" duration={1}>
                    <BlobImage
                      imageSrc="/images/rinosan2_2.png"
                      size={220}
                      direction="left"
                      imagePosition="top"
                    />
                  </FadeIn>

                  {/* s1写真（右・りのさんより下に） */}
                  <FadeIn delay={0.4} direction="up" duration={1}>
                    <div className="mt-32 animate-poyopoyo-slow">
                      <BlobImage
                        imageSrc="/images/s7.jpg"
                        size={150}
                        direction="right"
                        imagePosition="top"
                        imageScale={0.6}
                      />
                    </div>
                  </FadeIn>
                </div>

                {/* 下段：ビル写真（左下） */}
                <FadeIn delay={0.5} direction="up" duration={1}>
                  <div className="-mt-8 ml-8 animate-poyopoyo-slow" style={{ animationDelay: '1.5s' }}>
                    <BlobImage
                      imageSrc="/images/S__69246981.jpg"
                      size={140}
                      direction="left"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
           Contact Section
           ======================================== */}
        <section
          data-snap-section
          className="relative py-[120px] px-8 max-md:py-[80px] bg-white"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg,
                rgba(255,255,255,0.35) 0%,
                rgba(255,255,255,0.15) 50%,
                rgba(255,255,255,0) 100%
              )`,
            }}
          />

          <div className="relative z-10 max-w-[800px] mx-auto text-center">
            <FadeIn>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#555] mb-8 uppercase">
                Contact
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] font-light leading-[1.6] text-[#333] mb-8">
                まずは、お気軽にご相談ください
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[#444] leading-[2.0] mb-12">
                企業の課題整理から、個人の内面の整理まで。<br className="hidden md:block" />目的に合わせて、最適な関わり方をご提案します。
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ArrowLink href="/contact">Contact Us</ArrowLink>
            </FadeIn>
          </div>
        </section>
      </div>
    </SnapScrollContainer>
  );
}
