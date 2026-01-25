'use client';

import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import FloatingParticles from '@/components/FloatingParticles';
import TiltCard from '@/components/TiltCard';
import AnimatedGradient from '@/components/AnimatedGradient';
import ArrowLink from '@/components/ArrowLink';

/**
 * Philosophy Page - recuere コーポレートサイト
 *
 * エフェクト満載デザイン
 */

export default function PhilosophyPage() {
  return (
    <>
      {/* アニメーショングラデーション背景 - 固定配置 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <AnimatedGradient />
      </div>

      <div className="relative">
        {/* Hero / Philosophy Section - Session風の左寄せレイアウト */}
        <section className="relative min-h-[80vh] flex items-center pt-20 pb-32 px-8 overflow-hidden">
          {/* 浮遊パーティクル */}
          <FloatingParticles count={25} color="#002d5a" />

          {/* 背景画像 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url(/images/AdobeStock_1597965362_Preview.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.12,
            }}
          />

          {/* 装飾サークル */}
          <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] rounded-full border border-[#002d5a]/10 opacity-50 max-md:hidden" />
          <div className="absolute right-[15%] top-[25%] w-[200px] h-[200px] rounded-full border border-[#002d5a]/10 opacity-40 max-md:hidden" />

          {/* 下部グラデーション（白に溶ける） */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.9) 70%, #ffffff 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="md:ml-[10%]">
              <FadeIn>
                <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-6 uppercase font-medium">Philosophy</p>
              </FadeIn>

              {/* メインキャッチコピー */}
              <FadeIn delay={0.1}>
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-[#333] mb-6">
                  気づきから、<br />
                  豊かさへ。
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-[#888] text-[0.85rem] tracking-[0.1em] font-light mb-8">
                  From awareness to abundance
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-[#666] leading-[2] max-w-md font-light">
                  一人ひとりが本来の自分に気づき、<br />
                  その力を自然に発揮できる状態をつくること。<br />
                  それが、個人と組織の持続的な成長につながると考えています。
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Vision & Mission - カード形式 / スティッキー */}
        <section className="md:sticky md:top-0 z-10 bg-white py-[60px] md:py-[100px] md:pb-[350px] px-6 md:px-8"
          style={{ boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="max-w-[1100px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-6 uppercase font-medium">Mission / Vision / Value（MVV）</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#333] mb-8 md:mb-12">
                私たちが大切にしていること
              </h2>
            </FadeIn>

            {/* カードグリッド - SP: 縦並び / PC: 3列グリッド */}
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
              {/* Mission | Brilliant */}
              <FadeIn delay={0.1}>
                <TiltCard className="w-full">
                  <div
                    className="relative h-[320px] md:h-[500px] rounded-lg overflow-hidden group cursor-pointer"
                    style={{
                      backgroundImage: 'url(/images/AdobeStock_1816208131_Preview.jpeg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-[#0a1628]/60 group-hover:bg-[#0a1628]/50 transition-all duration-500" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
                      <p className="tracking-[0.4em] text-[0.6rem] text-white/50 mb-2 uppercase font-medium">Mission</p>
                      <h3 className="text-[1.5rem] tracking-[0.05em] font-normal text-white mb-2">
                        Brilliant
                      </h3>
                      <p className="text-[0.8rem] text-white/60 mb-4">輝き</p>
                      <p className="text-[0.85rem] leading-[1.9] text-white/80 font-normal text-left">
                        recuere®は、一人ひとりの本質的な輝きを引き出し、意思決定と行動を通して、現実を前に進めるための伴走を行います。
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>

              {/* Vision | Abundance */}
              <FadeIn delay={0.2}>
                <TiltCard className="w-full">
                  <div
                    className="relative h-[320px] md:h-[500px] rounded-lg overflow-hidden group cursor-pointer"
                    style={{
                      backgroundImage: 'url(/images/AdobeStock_770224949_Preview.jpeg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-[#0a1628]/60 group-hover:bg-[#0a1628]/50 transition-all duration-500" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
                      <p className="tracking-[0.4em] text-[0.6rem] text-white/50 mb-2 uppercase font-medium">Vision</p>
                      <h3 className="text-[1.5rem] tracking-[0.05em] font-normal text-white mb-2">
                        Abundance
                      </h3>
                      <p className="text-[0.8rem] text-white/60 mb-4">豊かさ</p>
                      <p className="text-[0.85rem] leading-[1.9] text-white/80 font-normal text-left">
                        人や組織が、自分らしい価値を発揮しながら、経済的にも、精神的にも、豊かさを循環させている世界。
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>

              {/* Value | Trust & Treasure */}
              <FadeIn delay={0.3}>
                <TiltCard className="w-full">
                  <div
                    className="relative h-[320px] md:h-[500px] rounded-lg overflow-hidden group cursor-pointer"
                    style={{
                      backgroundImage: 'url(/images/AdobeStock_1718433882_Preview.jpeg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-[#0a1628]/60 group-hover:bg-[#0a1628]/50 transition-all duration-500" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
                      <p className="tracking-[0.4em] text-[0.6rem] text-white/50 mb-2 uppercase font-medium">Value</p>
                      <h3 className="text-[1.5rem] tracking-[0.05em] font-normal text-white mb-2">
                        Trust & Treasure
                      </h3>
                      <p className="text-[0.8rem] text-white/60 mb-4">信頼と最愛</p>
                      <p className="text-[0.85rem] leading-[1.9] text-white/80 font-normal text-left">
                        recuere®が最も大切にしている価値は、関わる人との「信頼」と、その人生・選択・存在そのものを尊重する「最愛の姿勢」です。
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Brand Story Section - スティッキーで迫り出す / 白背景 */}
        <section
          className="md:sticky md:top-0 pt-[80px] md:pt-[140px] pb-[60px] md:pb-[450px] px-6 md:px-8 md:rounded-t-[60px] z-20 bg-white overflow-hidden"
          style={{
            boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* 装飾: 大きな薄いテキスト */}
          <div className="absolute top-[80px] right-[-50px] text-[200px] md:text-[300px] font-extralight text-[#f0f4f8] leading-none select-none pointer-events-none">
            Re
          </div>

          {/* 装飾ライン */}
          <div className="absolute left-[10%] top-[30%] w-[1px] h-[150px] bg-gradient-to-b from-transparent via-[#002d5a]/20 to-transparent" />

          <div className="relative z-10 max-w-[800px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-8 uppercase font-medium">Brand Story</p>
            </FadeIn>

            {/* 大きなタイトル */}
            <FadeIn delay={0.2}>
              <h3 className="text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.02em] font-extralight text-[#333] mb-6 leading-[1.3]">
                recuere®（リキュウレ®）について
              </h3>
            </FadeIn>

            {/* 数式風の表現 */}
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-4 mb-10 flex-wrap">
                <span className="text-[1.2rem] md:text-[1.4rem] font-light text-[#002d5a]">cue</span>
                <span className="text-[0.75rem] text-[#888]">気づきのきっかけ</span>
                <span className="text-[1.3rem] text-[#ccc]">+</span>
                <span className="text-[1.2rem] md:text-[1.4rem] font-light text-[#002d5a]">re</span>
                <span className="text-[0.75rem] text-[#888]">再び・繰り返し</span>
                <span className="text-[1.3rem] text-[#ccc]">=</span>
                <span className="text-[1.4rem] md:text-[1.8rem] font-extralight text-[#333] tracking-wide">recuere</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-[1rem] leading-[2.2] text-[#555] max-w-[650px] font-light">
                <strong className="font-medium">recuere®（リキュウレ®）</strong>は、心理学用語 cue（無意識に反応を引き起こす「気づきのきっかけ」）と、re（再び・繰り返し）を組み合わせた言葉です。
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-[0.95rem] leading-[2.2] text-[#777] mt-8 max-w-[650px] font-light">
                人は、一度の気づきだけで変われるほど単純ではありません。だからこそ、立ち止まり、気づき直す瞬間が、人生や仕事の中で何度も必要だと、私たちは考えています。
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-[0.95rem] leading-[2.2] text-[#777] mt-6 max-w-[650px] font-light">
                recuere®は、その節目ごとに、何度でも「気づきのきっかけ（cue）」を差し出し、自分らしい選択へとつながる時間を支える存在でありたい。
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="text-[0.95rem] leading-[2.2] text-[#666] mt-6 max-w-[650px] font-light">
                気づきが一過性で終わらず、人が自分らしく、輝き続けるための伴走者であり続けたいと考えています。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact CTA Section - スティッキーで迫り出す */}
        <section
          className="md:sticky md:top-0 pt-[80px] md:pt-[140px] pb-[100px] md:pb-[200px] px-6 md:px-8 bg-white z-30 md:min-h-screen md:rounded-t-[60px]"
          style={{ boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="relative z-10 max-w-[800px] mx-auto text-center">
            <FadeIn>
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-10 uppercase font-medium">Contact</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] font-extralight leading-[1.4] text-[#333] mb-10">
                まずは、お気軽に<br className="md:hidden" />ご相談ください
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#666] leading-[2.2] mb-14 font-light text-[0.95rem]">
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
