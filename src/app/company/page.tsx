'use client';

import Link from 'next/link';
import { useRef } from 'react';
import FadeIn from '@/components/FadeIn';
import ArrowLink from '@/components/ArrowLink';
import { useMouseGlow } from '@/hooks/useMouseGlow';

/**
 * Company Page - recuere コーポレートサイト
 *
 * サービスページと同じブルー系
 * マウス追従エフェクト + グラスモーフィズム
 */

// 経歴データ
const career = [
  '元大手外資系メーカーに35年勤務',
  '2022年9月　recuere　開業',
];

// 資格・所属団体データ
const qualifications = [
  '日本能力開発推進協会　メンタル心理カウンセラー資格取得',
  '日本能力開発推進協会　上級心理カウンセラー資格取得',
  '自己肯定感アカデミー/torie　アドラー流メンタルコーチ資格取得',
  '自己肯定感アカデミー/torie　アドラー流ライフデザイン診断士資格取得',
  '米国催眠療法協会　認定員',
  '日本臨床歯科学会（SJCD）会員',
  '医療機器販売管理者および賃貸管理者講習　【高度管理医療機器等】修了',
  'グロービスマネジメントスクール：ベンチャーマネジメントコース修了（主要＋関連科目修了）（現グロービス経営大学院）',
  'ジェームス・ワンレス公認ボイジャータロット 国際認定講座　基礎・アドバンスクラス受講修了',
  '日本ヒプノセラピーアカデミー 認定 基礎講座インストラクター、認定 前世療法講座修了、認定 年齢退行療法講座、心身緩和療法講座',
  'ACU (Academy of Universe Code)　コンシャスネスアストロロジー LEVEL 1、2 修了',
];

// 肩書き
const title = 'コンサルタント、上級心理カウンセラー、ヒプノセラピスト';

export default function CompanyPage() {
  const cardsRef = useRef<HTMLDivElement>(null);

  // マウス追従グローエフェクト（3Dチルトなし）
  useMouseGlow(cardsRef, {
    selector: '.glass-card',
    enable3DTilt: false
  });

  return (
    <main className="bg-white">
      {/* 白背景 + ネイビーアクセント */}
      <div className="relative">
        {/* Hero Section - 白背景 */}
        <section className="relative min-h-[60vh] flex items-center pt-20 pb-24 px-8 overflow-hidden bg-white">
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="md:ml-[10%]">
            <FadeIn>
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-8 uppercase font-medium">Company</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-[#333] mb-6">
                会社情報
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#888] text-[0.9rem] tracking-[0.1em] font-light">
                About recuere
              </p>
            </FadeIn>
            </div>
          </div>

          {/* ネイビーのアクセントライン */}
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#002d5a] to-transparent opacity-20" />
        </section>

        {/* Company Info Section - 白背景 / スティッキー */}
        <section className="sticky top-0 py-[60px] px-8 md:py-[80px] z-10 bg-white" ref={cardsRef}>
          <div className="max-w-[900px] mx-auto">
            <FadeIn>
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-12 uppercase font-medium">Overview</p>
            </FadeIn>

            {/* シンプルなカード - 白背景＋ネイビーボーダー */}
            <FadeIn delay={0.1}>
              <div
                className="glass-card relative rounded-2xl p-8 md:p-12 overflow-hidden"
                style={{
                  background: '#fafafa',
                  border: '1px solid #e5e5e5',
                  boxShadow: '0 10px 40px rgba(0, 45, 90, 0.05)',
                }}
              >
                {/* マウス追従グラデーション */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 45, 90, 0.03), transparent 40%)',
                  }}
                />

                {/* 会社情報テーブル */}
                <div className="relative z-10 space-y-0">
                  <div className="flex flex-col md:flex-row py-6 border-b border-[#eee]">
                    <span className="text-[0.7rem] text-[#002d5a] w-[160px] shrink-0 mb-3 md:mb-0 tracking-[0.2em] uppercase font-medium">Business Name</span>
                    <span className="text-[1.1rem] text-[#333] font-light tracking-wide">recuere（リキュウレ）</span>
                  </div>

                  <div className="flex flex-col md:flex-row py-6 border-b border-[#eee]">
                    <span className="text-[0.7rem] text-[#002d5a] w-[160px] shrink-0 mb-3 md:mb-0 tracking-[0.2em] uppercase font-medium">Representative</span>
                    <span className="text-[1.1rem] text-[#333] font-light tracking-wide">たなか里乃</span>
                  </div>

                  <div className="flex flex-col md:flex-row py-6 border-b border-[#eee]">
                    <span className="text-[0.7rem] text-[#002d5a] w-[160px] shrink-0 mb-3 md:mb-0 tracking-[0.2em] uppercase font-medium">Founded</span>
                    <span className="text-[1.1rem] text-[#333] font-light tracking-wide">2022年9月</span>
                  </div>

                  <div className="flex flex-col md:flex-row py-6">
                    <span className="text-[0.7rem] text-[#002d5a] w-[160px] shrink-0 mb-5 md:mb-0 tracking-[0.2em] uppercase font-medium">Services</span>
                    <div className="text-[1rem] text-[#555] leading-[2.2] space-y-5 font-light">
                      <p>
                        <span className="text-[#002d5a] text-[0.75rem] tracking-[0.15em] uppercase block mb-2 font-medium">For Business</span>
                        経営コンサルティング / 医療法人・歯科医院向けコンサルティング / 人材育成研修
                      </p>
                      <p>
                        <span className="text-[#002d5a] text-[0.75rem] tracking-[0.15em] uppercase block mb-2 font-medium">For Individual</span>
                        自己実現セッション / ヒプノセラピー / パーソナルブランディング構築
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* スペーサー（Overviewを最後まで見せるため） */}
        <div className="h-[900px] md:h-[500px]" />
        <div id="founder" className="relative top-[500px] md:top-[850px]" />

        {/* Founder Section - スティッキーで競り上がり */}
        <section
          className="sticky top-[60vh] md:top-[70vh] pt-[60px] pb-[550px] px-6 md:pt-[120px] md:pb-[1000px] md:px-8 rounded-t-[40px] md:rounded-t-[60px] z-20 overflow-hidden"
          style={{
            boxShadow: '0 -20px 60px rgba(0, 45, 90, 0.3)',
          }}
        >
          {/* 背景画像 */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/images/business-hero.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* ネイビーオーバーレイ（上は薄く、下は濃く） */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 45, 90, 0.4) 0%, rgba(0, 45, 90, 0.65) 50%, rgba(0, 45, 90, 0.75) 100%)',
            }}
          />
          <div className="max-w-[900px] mx-auto relative z-[2]">
            {/* SP版: 画像（円形）→タイトル→テキスト */}
            <div className="md:hidden">
              <FadeIn>
                <p className="tracking-[0.5em] text-[0.65rem] text-white/60 mb-8 uppercase font-light text-center">Founder</p>
              </FadeIn>

              {/* 画像 - SP版は円形で上部に中央配置 */}
              <FadeIn delay={0.1}>
                <div className="flex justify-center mb-8">
                  <div
                    className="w-[180px] h-[180px] rounded-full overflow-hidden"
                    style={{ boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
                  >
                    <img
                      src="/images/rinosan2.jpg"
                      alt="代表 たなか里乃"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="text-center mb-8">
                  <p className="text-white/50 tracking-[0.1em] text-[0.6rem] mb-2">
                    コンサルタント、上級心理カウンセラー、ヒプノセラピスト
                  </p>
                  <h3 className="text-[2rem] tracking-[-0.02em] font-extralight text-white leading-[1.2]">
                    たなか里乃
                  </h3>
                </div>
              </FadeIn>

              {/* テキスト */}
              <FadeIn delay={0.3}>
                <div className="leading-[2.2] text-white/80 text-[0.9rem] mb-8 font-light space-y-4">
                  <p>
                    人は、誰かに教えられて変わるのではなく、自分で気づいたときに、自然と動き出します。
                  </p>
                  <p>
                    変われないのではなく、無意識のブレーキがかかっているだけ。
                  </p>
                  <p>
                    そのブレーキがゆるみ、愛・やりたいこと・強みに意識が向くことで、現実は、静かに変わっていきます。
                  </p>
                  <p>
                    私は、その「気づき」に伴走したいと考えています。
                  </p>
                </div>
              </FadeIn>

              {/* 経歴 */}
              <FadeIn delay={0.4}>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[0.6rem] text-white/40 mb-3 tracking-[0.3em] uppercase">Career</p>
                  <ul className="text-[0.8rem] text-white/70 leading-[2] font-light space-y-1">
                    {career.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* 資格・所属団体 */}
              <FadeIn delay={0.5}>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[0.6rem] text-white/40 mb-3 tracking-[0.3em] uppercase">Qualifications & Affiliations</p>
                  <ul className="text-[0.75rem] text-white/60 leading-[2] font-light space-y-1">
                    {qualifications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* PC版: 従来のレイアウト */}
            <div className="hidden md:block">
              <FadeIn>
                <p className="tracking-[0.5em] text-[0.65rem] text-white/60 mb-12 uppercase font-light">Founder</p>
              </FadeIn>

              <FadeIn delay={0.2} duration={1.0}>
                <div
                  className="flex flex-row gap-16 items-start p-12 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* 画像 */}
                  <FadeIn delay={0.4} direction="up" duration={0.8}>
                    <div className="w-[280px] shrink-0">
                      <div
                        className="relative overflow-hidden rounded-xl"
                        style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
                      >
                        <img
                          src="/images/rinosan2.jpg"
                          alt="代表 たなか里乃"
                          className="w-full aspect-[3/4] object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </FadeIn>

                  {/* テキスト */}
                  <div className="flex-1">
                    <FadeIn delay={0.5} direction="up" duration={0.7}>
                      <p className="text-white/50 tracking-[0.1em] text-[0.65rem] mb-4">
                        コンサルタント、上級心理カウンセラー、ヒプノセラピスト
                      </p>
                    </FadeIn>
                    <FadeIn delay={0.6} direction="up" duration={0.7}>
                      <h3 className="text-[3rem] tracking-[-0.02em] font-extralight text-white mb-10 leading-[1.1]">
                        たなか里乃
                      </h3>
                    </FadeIn>
                    <FadeIn delay={0.7} direction="up" duration={0.7}>
                      <div className="leading-[2.2] text-white/80 text-[0.95rem] mb-8 font-light space-y-4">
                        <p>
                          人は、誰かに教えられて変わるのではなく、<br />
                          自分で気づいたときに、自然と動き出します。
                        </p>
                        <p>
                          変われないのではなく、<br />
                          無意識のブレーキがかかっているだけ。
                        </p>
                        <p>
                          そのブレーキがゆるみ、<br />
                          愛・やりたいこと・強みに意識が向くことで、<br />
                          現実は、静かに変わっていきます。
                        </p>
                        <p>
                          私は、その「気づき」に伴走したいと考えています。
                        </p>
                      </div>
                    </FadeIn>
                    {/* 経歴 */}
                    <FadeIn delay={0.8} direction="up" duration={0.7}>
                      <div className="pt-8 border-t border-white/10">
                        <p className="text-[0.65rem] text-white/40 mb-4 tracking-[0.3em] uppercase">Career</p>
                        <ul className="text-[0.85rem] text-white/70 leading-[2] font-light space-y-1">
                          {career.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </FadeIn>

                    {/* 資格・所属団体 */}
                    <FadeIn delay={0.9} direction="up" duration={0.7}>
                      <div className="pt-8 border-t border-white/10">
                        <p className="text-[0.65rem] text-white/40 mb-4 tracking-[0.3em] uppercase">Qualifications & Affiliations</p>
                        <ul className="text-[0.8rem] text-white/60 leading-[2.2] font-light space-y-1">
                          {qualifications.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact CTA Section - スティッキーで競り上がり */}
        <section className="sticky top-[50vh] md:top-[85vh] pt-[60px] pb-[60px] px-8 md:pt-[140px] md:pb-[80px] bg-white z-30" style={{ boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.1)' }}>
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
                企業の課題整理から、個人の内面の整理まで。<br className="hidden md:block" />目的に合わせて、最適な関わり方をご提案します。
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
    </main>
  );
}
