'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import FloatingParticles from '@/components/FloatingParticles';
import ArrowLink from '@/components/ArrowLink';
import FadeIn from '@/components/FadeIn';

const PastelLiquidGradient = dynamic(
  () => import('@/components/PastelLiquidGradient'),
  { ssr: false }
);

// 自己実現セッション料金
const selfRealizationPricing = [
  {
    duration: 'セッション 30分',
    price: '6,600',
    url: 'https://crowd-calendar.com/t/recuere30',
    description: '具体的なご相談（どのような状況で、何の悩みか等お話いただける方）',
    format: '対面・オンライン'
  },
  {
    duration: 'セッション 60分',
    price: '13,200',
    url: 'https://crowd-calendar.com/t/recuere60',
    description: 'なんとなくモヤモヤすることがあり、スッキリしたい方',
    format: '対面・オンライン'
  },
  {
    duration: 'セッション 90分',
    price: '19,800',
    url: 'https://crowd-calendar.com/t/recuere90',
    description: '初めての方、悩みの背景などをじっくりお話したい方におすすめです。',
    format: '対面・オンライン'
  },
];

// ヒプノセラピーで扱えるテーマ
const hypnoThemes = [
  '対人関係', 'トラウマ', '恐怖症', '自信回復', '不眠',
  'インナーチャイルド', '前世', '故人との再会', '未来体験',
];

export default function SessionPage() {
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

        {/* ===== ヒーロー（画像なし・テキストのみ） ===== */}
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
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-6 uppercase font-medium">Session</p>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] font-extralight leading-[1.3] text-[#1a1a1a] mb-6">
                心と向き合い、<br />
                本来の自分を<br />
                取り戻す
              </h1>
              <p className="text-[#666] leading-[2] max-w-md font-light">
                思考や感情に気づき、<br />
                自分の意思と次の一歩を明確にするセッション
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== アウェイキングセッション ===== */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* SP版：シンプルな縦並び（タイトル→画像→テキスト） */}
            <div className="md:hidden">
              {/* タイトル */}
              <div className="mb-8">
                <div className="relative">
                  <div className="text-[#002d5a]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2">
                    Awakening
                  </div>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                    Awakening Session
                  </p>
                  <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                    アウェイキング<br />セッション
                  </h2>
                  <p className="text-[0.85rem] text-[#666] mt-2 relative z-10">（気づきのセッション）</p>
                </div>
              </div>

              {/* 画像（1枚） */}
              <FadeIn delay={0.1} className="mb-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src="/images/Firefly_c6aa9de6-66d4-4fa3-9824-32e22229655f.jpeg" alt="セッション風景" fill className="object-cover" />
                </div>
              </FadeIn>

              {/* テキスト */}
              <FadeIn delay={0.2}>
                <div className="text-gray-600 text-[0.9rem] leading-relaxed space-y-4 mb-8">
                  <p>
                    アウェイキングセッションでは、答えを与えたり、何かを変えたりするためのセッションではありません。
                  </p>
                  <p>
                    日常の中で積み重なった思考や感情、言葉にならない違和感を、対話を通して静かに整理していきます。
                  </p>
                  <p>
                    recuere®のセッションでは、「変える」ことよりも「気づく」ことを大切にしています。
                  </p>
                  <p>
                    自分の内側に何が起きているのかに気づいたとき、次の選択や行動は、自然と自分の中から見えてくるからです。
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* PC版：絶対配置のオーバーラップレイアウト */}
            <div className="relative min-h-[650px] hidden md:block">
              {/* 左上：タイトル */}
              <div className="absolute -top-12 left-[10%] z-10">
                <div className="relative">
                  <FadeIn direction="clipReveal" delay={0} className="text-[#002d5a]/10 text-7xl lg:text-8xl font-extralight tracking-wider absolute -top-6 -left-2">
                    Awakening
                  </FadeIn>
                  <FadeIn direction="clipReveal" delay={0.4} className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-8">
                    Awakening Session
                  </FadeIn>
                  <FadeIn direction="clipReveal" delay={0.8} className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                    アウェイキングセッション
                  </FadeIn>
                  <FadeIn delay={1.0} className="text-[0.9rem] text-[#666] mt-2 relative z-10">
                    （気づきのセッション）
                  </FadeIn>
                </div>
              </div>

              {/* 画像1：右上 */}
              <FadeIn delay={0.1} className="absolute top-[80px] right-[25%] w-[180px]">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/Firefly_c6aa9de6-66d4-4fa3-9824-32e22229655f.jpeg" alt="セッション風景" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white" />
                </div>
              </FadeIn>

              {/* 画像2：左 */}
              <FadeIn delay={0.2} className="absolute top-[200px] left-[5%] w-[200px]">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <Image src="/images/AdobeStock_1581418014_Preview.jpeg" alt="リラックスしたセッション" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white" />
                </div>
              </FadeIn>

              {/* 画像3：右下 */}
              <FadeIn delay={0.4} className="absolute bottom-[30px] right-[5%] w-[280px]">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/AdobeStock_1718433882_Preview.jpeg" alt="心の安らぎ" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
                </div>
              </FadeIn>

              {/* 中央：白いカード */}
              <FadeIn delay={0.3} className="absolute top-[200px] left-[25%] w-[45%]">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm">
                  <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                    <p>
                      アウェイキングセッションでは、答えを与えたり、何かを変えたりするためのセッションではありません。
                    </p>
                    <p>
                      日常の中で積み重なった思考や感情、言葉にならない違和感を、対話を通して静かに整理していきます。
                    </p>
                    <p>
                      recuere®のセッションでは、「変える」ことよりも「気づく」ことを大切にしています。
                    </p>
                    <p>
                      自分の内側に何が起きているのかに気づいたとき、次の選択や行動は、自然と自分の中から見えてくるからです。
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* 料金セクション */}
            <div id="awakening-price" className="mt-4 md:mt-8">
              <FadeIn>
                <div className="bg-gray-50 md:bg-white/50 md:backdrop-blur-md border border-gray-100 md:border-white/60 rounded-2xl p-5 md:p-8 max-w-5xl mx-auto">
                  <div className="relative mb-6 text-center">
                    <p className="text-[#002d5a]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                      Price
                    </p>
                    <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] uppercase font-medium relative z-10 -mt-5">料金表</p>
                  </div>
                  {/* SP: 縦並び / PC: 3カラム横並び */}
                  <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-gray-200 md:divide-gray-300 gap-6 md:gap-0">
                    {selfRealizationPricing.map((item, index) => (
                      <div key={index} className="px-0 md:px-6 py-4 md:py-4 flex flex-col border-b md:border-b-0 border-gray-200 last:border-b-0">
                        <div className="flex-1">
                          <p className="text-lg md:text-xl font-medium mb-1 text-center text-gray-700">
                            {item.duration}
                          </p>
                          <p className="text-sm mb-3 text-center text-gray-500">
                            {item.format}
                          </p>
                          <p className="font-serif text-2xl md:text-3xl mb-4 text-center text-gray-800">
                            ¥{item.price}
                            <span className="text-xs ml-1 text-gray-300">税込</span>
                          </p>
                          <p className="text-xs leading-relaxed mb-6 text-gray-500 text-center">
                            {item.description}
                          </p>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2.5 rounded-full text-sm transition-colors text-center bg-gradient-to-r from-[#E8D5E3] to-[#D5E3E8] text-gray-700 font-medium shadow-sm hover:shadow-md hover:from-[#DFC8DB] hover:to-[#C8DBE0]"
                        >
                          予約する
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* 下部の追加情報 */}
                  <div className="mt-6 pt-6 border-t border-gray-200/50 space-y-4">
                    {/* ボイジャータロット */}
                    <div className="flex items-center justify-center gap-4 md:gap-10">
                      {/* 左: タロット */}
                      <FadeIn delay={0.2}>
                        <div className="w-[40px] h-[50px] md:w-[90px] md:h-[115px] overflow-hidden">
                          <Image src="/images/t1.png" alt="ボイジャータロット" width={90} height={115} className="object-cover w-full h-full" />
                        </div>
                      </FadeIn>
                      {/* 中央: テキスト */}
                      <div>
                        <p className="text-gray-600 text-sm md:text-lg">+ ボイジャータロットリーディング</p>
                        <p className="text-gray-400 text-xs md:text-sm text-center">（組み合わせ可能）</p>
                      </div>
                      {/* 右: りのさん */}
                      <FadeIn delay={0.4}>
                        <div className="w-[50px] h-[62px] md:w-[100px] md:h-[125px] overflow-hidden">
                          <Image src="/images/rinosan3.jpg" alt="たなか里乃" width={100} height={125} className="object-cover object-top w-full h-full" />
                        </div>
                      </FadeIn>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-gray-500 text-xs">
                        ※ 延長料金 10分毎 ¥2,200プラスさせていただきます。
                      </p>
                      <p className="text-gray-500 text-xs">
                        ※ 対面の場合、交通費、ご自分の飲食代のご負担をお願いします。
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== パーソナルコーチング（SP: タイトル→画像→テキスト） ===== */}
        <section className="py-16 md:py-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-6">
            {/* SP版：タイトルを先に */}
            <div className="md:hidden mb-8">
              <div className="relative mb-6">
                <div className="text-[#002d5a]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2">
                  Coaching
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                  Personal Coaching
                </p>
                <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                  パーソナルコーチング<br />セッション
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
              {/* 画像（SP: 2番目、PC: 左） */}
              <FadeIn direction="left">
                <div className="relative group">
                  <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image
                      src="/images/AdobeStock_1517811434_Preview.jpeg"
                      alt="パーソナルコーチングセッションイメージ"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-1/2 aspect-square rounded-xl overflow-hidden shadow-lg hidden md:block transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                    <Image
                      src="/images/AdobeStock_1524162172_Preview.jpeg"
                      alt="穏やかなセッション空間"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* テキスト（SP: 3番目、PC: 右） */}
              <FadeIn delay={0.2} direction="right">
                <div className="md:pl-8">
                  {/* PC版のみタイトル表示 */}
                  <div className="relative mb-6 hidden md:block">
                    <FadeIn direction="clipReveal" delay={0} className="text-[#002d5a]/10 text-4xl md:text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      Coaching
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.3} className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                      Personal Coaching
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.6} className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                      パーソナルコーチングセッション
                    </FadeIn>
                  </div>
                  <div className="text-gray-500 leading-relaxed mb-8 text-[0.9rem] space-y-4">
                    <p>
                      気づきを現実の選択や行動につなげていくための継続的なサポートです。
                    </p>
                    <p>
                      このコースは定期的にお話しながら今の状況や心の状態を整理し、次の一歩を一緒にみつけていく継続的なサポートです。
                    </p>
                    <p>
                      目標や進め方はクライアント様一人ひとりに合わせて柔軟に組み立てます。
                    </p>
                  </div>

                  <p className="text-gray-500 text-xs">
                    ※ 費用は個別にご相談にて決定します
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== ヒプノセラピー ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* SP版レイアウト */}
            <div className="md:hidden">
              {/* タイトル */}
              <div className="relative mb-6">
                <div className="text-[#002d5a]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2">
                  Hypno
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                  Hypnotherapy
                </p>
                <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                  ヒプノセラピー
                </h2>
              </div>

              {/* 画像 */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/AdobeStock_1686407697_Preview.jpeg"
                  alt="ヒプノセラピーイメージ"
                  fill
                  className="object-cover"
                />
              </div>

              {/* テキスト */}
              <p className="text-gray-500 leading-relaxed mb-6 text-[0.9rem]">
                催眠状態で潜在意識にアクセスし、
                心の深い部分にある課題に働きかける心理療法です。
                安心できる空間で、あなたの内なる世界を探求します。
              </p>

              {/* テーマタグ */}
              <p className="text-gray-600 text-sm mb-4">扱えるテーマ</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {hypnoThemes.map((theme, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {theme}
                  </span>
                ))}
              </div>

              {/* 料金カード */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">約3時間</p>
                    <p className="font-serif text-2xl text-gray-800">
                      ¥33,000
                      <span className="text-xs text-gray-300 ml-1">税込</span>
                    </p>
                  </div>
                  <a
                    href="https://crowd-calendar.com/t/recuerehipno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-[#E8D5E3] to-[#D5E3E8] text-gray-700 rounded-full text-sm font-medium shadow-sm text-center"
                  >
                    予約する
                  </a>
                </div>
              </div>

              <p className="text-gray-500 text-xs mb-4">
                ※ 医療行為ではありません
              </p>
              <div className="flex justify-end">
                <ArrowLink href="/hypnotherapy">
                  詳しく見る
                </ArrowLink>
              </div>
            </div>

            {/* PC版レイアウト */}
            <div className="hidden md:grid md:grid-cols-2 gap-16">
              {/* 左：テキスト */}
              <FadeIn direction="left">
                <div>
                  <div className="relative mb-6">
                    <FadeIn direction="clipReveal" delay={0} className="text-[#002d5a]/10 text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      Hypno
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.2} className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                      Hypnotherapy
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.5} className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                      ヒプノセラピー
                    </FadeIn>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-8 text-[0.9rem]">
                    催眠状態で潜在意識にアクセスし、
                    心の深い部分にある課題に働きかける心理療法です。
                    安心できる空間で、あなたの内なる世界を探求します。
                  </p>

                  <p className="text-gray-600 text-sm mb-4">扱えるテーマ</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {hypnoThemes.map((theme, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {theme}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-xs mb-4">
                    ※ 医療行為ではありません
                  </p>
                  <div className="flex justify-end">
                    <ArrowLink href="/hypnotherapy">
                      詳しく見る
                    </ArrowLink>
                  </div>
                </div>
              </FadeIn>

              {/* 右：画像+料金 */}
              <FadeIn delay={0.2} direction="right">
                <div className="space-y-8">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/AdobeStock_1686407697_Preview.jpeg"
                      alt="ヒプノセラピーイメージ"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-gray-500 text-sm mb-1">約3時間</p>
                        <p className="font-serif text-3xl text-gray-800">
                          ¥33,000
                          <span className="text-xs text-gray-300 ml-1">税込</span>
                        </p>
                      </div>
                      <a
                        href="https://crowd-calendar.com/t/recuerehipno"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-gradient-to-r from-[#E8D5E3] to-[#D5E3E8] text-gray-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:from-[#DFC8DB] hover:to-[#C8DBE0] transition-all duration-300"
                      >
                        予約する
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== ブランディング（SP: タイトル→画像→テキスト） ===== */}
        <section className="py-16 md:py-24 bg-[#f5f8fa]">
          <div className="max-w-7xl mx-auto px-6">
            {/* SP版：タイトルを先に */}
            <div className="md:hidden mb-8">
              <div className="relative mb-6">
                <div className="text-[#002d5a]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2">
                  Brand
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                  Branding
                </p>
                <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                  ブランディング<br />構築セッション
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* SP版：画像を先に / PC版：テキスト左 */}
              <FadeIn direction="left" className="order-2 md:order-1">
                <div>
                  {/* PC版のみタイトル表示 */}
                  <div className="relative mb-6 hidden md:block">
                    <FadeIn direction="clipReveal" delay={0} className="text-[#002d5a]/10 text-4xl md:text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      Brand
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.2} className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-3 uppercase font-medium relative z-10 pt-6">
                      Branding
                    </FadeIn>
                    <FadeIn direction="clipReveal" delay={0.4} className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#1a1a1a] relative z-10">
                      ブランディング構築セッション
                    </FadeIn>
                  </div>
                  <div className="text-gray-500 text-[0.9rem] leading-relaxed mb-8 space-y-4">
                    <ul className="space-y-2">
                      <li>・自分らしい強みを見つけたい</li>
                      <li>・こんな自分を表現したい</li>
                      <li>・自分や、自分の事業について、周囲の人に理解してもらいたい</li>
                    </ul>
                    <p>
                      そうした想いをもとに、自分の強みや価値を整理し、仕事や活動として表現していくブランディング構築セッションです。
                    </p>
                    <p>
                      改めて、「自分の強みとは何か」「発信したい自分の姿」「自分の仕事や役割」を一緒に整理していきます。
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 mb-4 border border-gray-100">
                    <p className="text-gray-600 text-sm mb-2">コンセプト、ネーミング作成 他</p>
                    <p className="font-serif text-2xl text-gray-800">
                      ¥250,000〜<span className="text-xs text-gray-500 ml-1">税込</span>
                    </p>
                  </div>
                  <p className="text-gray-500 text-xs">
                    ※ ロゴ、WEBデザイン等の作成は、別途費用をいただきます
                  </p>
                </div>
              </FadeIn>

              {/* SP版：画像が先 / PC版：画像右 */}
              <FadeIn delay={0.2} direction="right" className="order-1 md:order-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src="/images/AdobeStock_770224949_Preview.jpeg"
                    alt="ブランディングセッションイメージ"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/40" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn direction="scaleUp">
              <p className="tracking-[0.5em] text-[0.65rem] text-[#002d5a] mb-8 uppercase font-medium">Contact</p>
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[#1a1a1a] mb-6">
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
