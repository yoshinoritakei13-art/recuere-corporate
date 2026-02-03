'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import FloatingParticles from '@/components/FloatingParticles';
import ArrowLink from '@/components/ArrowLink';
import FadeIn from '@/components/FadeIn';
import ParallaxText from '@/components/ParallaxText';

const LiquidGradient = dynamic(
  () => import('@/components/LiquidGradientUnified'),
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
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* パステルグラデーション背景 */}
      <div className="fixed inset-0 -z-10">
        <LiquidGradient preset="pastel" opacity={0.8} />
      </div>

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
            <div className="md:ml-[10%]">
              <FadeIn blur>
                <p className="tracking-[0.3em] text-[0.7rem] text-[var(--color-navy)] mb-8 uppercase">Session</p>
              </FadeIn>
              <ParallaxText
                text="心と向き合い、本来の自分を取り戻す"
                delay={100}
                charDelay={60}
                className="font-sans text-[clamp(1.5rem,4vw,3rem)] tracking-[0.02em] font-normal leading-[1.5] text-[var(--color-text)] mb-6"
              />
              <FadeIn blur delay={0.2}>
                <p className="text-[var(--color-text-muted)] leading-[2] max-w-md font-light">
                  思考や感情に気づき、<br />
                  自分の意思と次の一歩を明確にするセッション
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== アウェイキングセッション ===== */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* SP版：シンプルな縦並び（タイトル→画像→テキスト） */}
            <div className="md:hidden">
              {/* タイトル */}
              <div className="mb-8">
                <div className="relative isolation-auto">
                  <div className="text-[var(--color-navy)]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2 z-0 select-none pointer-events-none" aria-hidden="true">
                    Awakening
                  </div>
                  <p className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                    Awakening Session
                  </p>
                  <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                    アウェイキング<br />セッション
                  </h2>
                  <p className="text-[0.85rem] text-[var(--color-text-muted)] mt-2 relative z-10">（気づきのセッション）</p>
                </div>
              </div>

              {/* 画像（PC版風に複数配置） */}
              <FadeIn blur delay={0.1} className="mb-8">
                <div className="relative h-[180px]">
                  {/* メイン画像 */}
                  <div className="absolute left-0 top-0 w-[140px] aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                    <Image src="/images/Firefly_c6aa9de6-66d4-4fa3-9824-32e22229655f.webp" alt="セッション風景" fill className="object-cover" />
                  </div>
                  {/* サブ画像1 */}
                  <div className="absolute right-4 top-4 w-[120px] aspect-[4/5] rounded-lg overflow-hidden shadow-sm">
                    <Image src="/images/AdobeStock_1581418014.webp" alt="リラックスしたセッション" fill className="object-cover" />
                  </div>
                  {/* サブ画像2 */}
                  <div className="absolute left-[30%] bottom-0 w-[130px] aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                    <Image src="/images/AdobeStock_1718433882.webp" alt="心の安らぎ" fill className="object-cover" />
                  </div>
                </div>
              </FadeIn>

              {/* テキスト */}
              <FadeIn blur delay={0.2}>
                <div className="text-gray-600 text-[0.9rem] leading-relaxed space-y-4 mb-8 max-w-[300px]">
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
                  <FadeIn blur direction="clipReveal" delay={0} className="text-[var(--color-navy)]/10 text-7xl lg:text-8xl font-extralight tracking-wider absolute -top-6 -left-2">
                    Awakening
                  </FadeIn>
                  <FadeIn blur direction="clipReveal" delay={0.4} className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-8">
                    Awakening Session
                  </FadeIn>
                  <FadeIn blur direction="clipReveal" delay={0.8} className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                    アウェイキングセッション
                  </FadeIn>
                  <FadeIn blur delay={1.0} className="text-[0.9rem] text-[var(--color-text-muted)] mt-2 relative z-10">
                    （気づきのセッション）
                  </FadeIn>
                </div>
              </div>

              {/* 画像1：右上 */}
              <FadeIn blur delay={0.1} className="absolute top-[80px] right-[25%] w-[180px]">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/Firefly_c6aa9de6-66d4-4fa3-9824-32e22229655f.webp" alt="セッション風景" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white" />
                </div>
              </FadeIn>

              {/* 画像2：左 */}
              <FadeIn blur delay={0.2} className="absolute top-[200px] left-[5%] w-[200px]">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <Image src="/images/AdobeStock_1581418014.webp" alt="リラックスしたセッション" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white" />
                </div>
              </FadeIn>

              {/* 画像3：右下 */}
              <FadeIn blur delay={0.4} className="absolute bottom-[30px] right-[5%] w-[280px]">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/AdobeStock_1718433882.webp" alt="心の安らぎ" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
                </div>
              </FadeIn>

              {/* 中央：白いカード */}
              <FadeIn blur delay={0.3} className="absolute top-[200px] left-[25%] w-[45%]">
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
              <FadeIn blur>
                <div className="bg-white/50 md:bg-white/50 md:backdrop-blur-md border border-gray-100 md:border-white/60 rounded-2xl p-5 md:p-8 max-w-5xl mx-auto">
                  <div className="relative mb-6 text-center">
                    <p className="text-[var(--color-navy)]/10 text-4xl md:text-5xl font-extralight tracking-wider">
                      Price
                    </p>
                    <p className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] uppercase font-medium relative z-10 -mt-5">料金表</p>
                  </div>
                  {/* SP: 縦並び / PC: 3カラム横並び */}
                  <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-gray-200 md:divide-gray-300 gap-6 md:gap-0">
                    {selfRealizationPricing.map((item, index) => (
                      <div key={index} className="px-0 md:px-6 py-4 md:py-4 flex flex-col border-b md:border-b-0 border-gray-200 last:border-b-0">
                        <div className="flex-1">
                          <p className="text-[clamp(0.9rem,3vw,1.25rem)] font-medium mb-1 text-center text-gray-700 whitespace-nowrap">
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

                  {/* 注意事項 */}
                  <div className="mt-6 pt-6 border-t border-gray-200/50">
                    <div className="text-center space-y-1 mb-6">
                      <p className="text-gray-500 text-xs">
                        ※ 延長料金 10分毎 ¥2,200プラスさせていただきます。
                      </p>
                      <p className="text-gray-500 text-xs">
                        ※ 対面の場合、交通費、ご自分の飲食代のご負担をお願いします。
                      </p>
                    </div>

                    {/* ボイジャータロット - カード形式 */}
                    <div className="pt-6 border-t border-gray-200/50">
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 md:p-8">
                        {/* SP版 */}
                        <div className="md:hidden relative min-h-[180px] overflow-visible">
                          {/* 左上: タロット画像 */}
                          <div className="absolute -left-8 -top-2 w-[80px] aspect-[3/4] rounded-lg overflow-hidden z-10">
                            <Image src="/images/t1.webp" alt="ボイジャータロット" width={80} height={107} className="object-cover w-full h-full" />
                          </div>

                          {/* 中央: テキスト */}
                          <div className="text-center pt-2 px-[75px]">
                            <p className="text-gray-700 text-sm font-medium mb-3">
                              + タロットリーディング
                            </p>
                            <p className="text-gray-500 text-xs leading-relaxed">
                              ご希望の方は、「タロットを中心」としたセッションも承っています。<br />予約時にお申し出ください。
                            </p>
                          </div>

                          {/* 右下: りのさん */}
                          <div className="absolute -right-8 -bottom-2 w-[80px] aspect-[3/4] rounded-lg overflow-hidden">
                            <Image src="/images/rinosan3.webp" alt="たなか里乃" width={80} height={107} className="object-cover object-top w-full h-full" />
                          </div>
                        </div>

                        {/* PC版 */}
                        <div className="hidden md:flex items-center gap-8">
                          {/* 左: タロット画像 */}
                          <FadeIn blur delay={0.2}>
                            <div className="w-[180px] aspect-[3/4] rounded-lg overflow-hidden shrink-0">
                              <Image src="/images/t1.webp" alt="ボイジャータロット" width={180} height={240} className="object-cover w-full h-full" />
                            </div>
                          </FadeIn>

                          {/* 中央: テキスト */}
                          <div className="flex-1">
                            <p className="text-gray-700 text-lg font-medium mb-3">
                              + タロットリーディング
                            </p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                              ご希望の方は、「タロットを中心」としたセッションも承っています。<br />予約時にお申し出ください。
                            </p>
                          </div>

                          {/* 右: りのさん */}
                          <FadeIn blur delay={0.3}>
                            <div className="w-[180px] aspect-[3/4] rounded-lg overflow-hidden shrink-0">
                              <Image src="/images/rinosan3.webp" alt="たなか里乃" width={180} height={240} className="object-cover object-top w-full h-full" />
                            </div>
                          </FadeIn>
                        </div>
                      </div>
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
              <div className="relative mb-6 isolation-auto">
                <div className="text-[var(--color-navy)]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2 z-0 select-none pointer-events-none" aria-hidden="true">
                  Coaching
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                  Personal Coaching
                </p>
                <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                  パーソナルコーチング<br />セッション
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
              {/* 画像（SP: 2番目、PC: 左） */}
              <FadeIn blur direction="left">
                <div className="relative group">
                  {/* SP版: メイン左、サブ右下にがっつり重ねる */}
                  <div className="md:hidden relative h-[150px]">
                    <div className="absolute left-0 top-0 w-[180px] aspect-[4/3] rounded-lg overflow-hidden shadow-md z-0">
                      <Image src="/images/AdobeStock_1517811434.webp" alt="パーソナルコーチング" fill className="object-cover" />
                    </div>
                    <div className="absolute right-8 bottom-[-10px] w-[100px] aspect-square rounded-lg overflow-hidden shadow-lg z-10">
                      <Image src="/images/AdobeStock_1524162172.webp" alt="穏やかなセッション空間" fill className="object-cover" />
                    </div>
                  </div>
                  {/* PC版: 2枚重ねレイアウト */}
                  <div className="hidden md:block relative h-[400px]">
                    {/* メイン画像（左上） */}
                    <div className="absolute left-[60px] top-[60px] w-[320px] aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src="/images/AdobeStock_1517811434.webp"
                        alt="パーソナルコーチングセッションイメージ"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* サブ画像（右下に重ねる） */}
                    <div className="absolute right-[-60px] bottom-0 w-[200px] aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src="/images/AdobeStock_1524162172.webp"
                        alt="穏やかなセッション空間"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* テキスト（SP: 3番目、PC: 右） */}
              <FadeIn blur delay={0.2} direction="right">
                <div className="md:pl-8">
                  {/* PC版のみタイトル表示 */}
                  <div className="relative mb-6 hidden md:block">
                    <FadeIn blur direction="clipReveal" delay={0} className="text-[var(--color-navy)]/10 text-4xl md:text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      Coaching
                    </FadeIn>
                    <FadeIn blur direction="clipReveal" delay={0.3} className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                      Personal Coaching
                    </FadeIn>
                    <FadeIn blur direction="clipReveal" delay={0.6} className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                      パーソナルコーチングセッション
                    </FadeIn>
                  </div>
                  <div className="text-gray-500 leading-relaxed mb-8 text-[0.9rem] space-y-4 max-w-[300px] md:max-w-none">
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
              <div className="relative mb-6 isolation-auto">
                <div className="text-[var(--color-navy)]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2 z-0 select-none pointer-events-none" aria-hidden="true">
                  Hypno
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                  Hypnotherapy
                </p>
                <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                  ヒプノセラピー
                </h2>
              </div>

              {/* 画像（1枚） */}
              <div className="relative w-[200px] aspect-[4/3] mb-6 rounded-lg overflow-hidden mx-auto">
                <Image src="/images/AdobeStock_1686407697.webp" alt="ヒプノセラピー" fill className="object-cover" />
              </div>

              {/* テキスト */}
              <p className="text-gray-500 leading-relaxed mb-4 text-[0.9rem] max-w-[300px]">
                催眠状態で潜在意識にアクセスし、心の深い部分にある課題に働きかける心理療法です。安心できる空間で、あなたの内なる世界を探求します。
              </p>

              {/* 詳しく見るリンク */}
              <div className="flex justify-end mb-6">
                <ArrowLink href="/hypnotherapy">
                  詳しく見る
                </ArrowLink>
              </div>

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
                <div className="flex flex-col gap-4 text-center">
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

              <p className="text-gray-500 text-xs">
                ※ 医療行為ではありません
              </p>
            </div>

            {/* PC版レイアウト */}
            <div className="hidden md:grid md:grid-cols-2 gap-16">
              {/* 左：テキスト */}
              <FadeIn blur direction="left">
                <div>
                  <div className="relative mb-6">
                    <FadeIn blur direction="clipReveal" delay={0} className="text-[var(--color-navy)]/10 text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      Hypno
                    </FadeIn>
                    <FadeIn blur direction="clipReveal" delay={0.2} className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                      Hypnotherapy
                    </FadeIn>
                    <FadeIn blur direction="clipReveal" delay={0.5} className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                      ヒプノセラピー
                    </FadeIn>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-6 text-[0.9rem]">
                    催眠状態で潜在意識にアクセスし、
                    心の深い部分にある課題に働きかける心理療法です。
                    安心できる空間で、あなたの内なる世界を探求します。
                  </p>

                  <div className="mb-8 flex justify-end">
                    <ArrowLink href="/hypnotherapy">
                      詳しく見る
                    </ArrowLink>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">扱えるテーマ</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {hypnoThemes.map((theme, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {theme}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-xs">
                    ※ 医療行為ではありません
                  </p>
                </div>
              </FadeIn>

              {/* 右：画像+料金 */}
              <FadeIn blur delay={0.2} direction="right">
                <div className="space-y-8">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/AdobeStock_1686407697.webp"
                      alt="ヒプノセラピーイメージ"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-end justify-center gap-8">
                      <div className="text-center">
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
              <div className="relative mb-6 isolation-auto">
                <div className="text-[var(--color-navy)]/10 text-4xl font-extralight tracking-wider absolute -top-4 -left-2 z-0 select-none pointer-events-none" aria-hidden="true">
                  Brand
                </div>
                <p className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                  Branding
                </p>
                <h2 className="text-[1.8rem] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
                  ブランディング<br />構築セッション
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* SP版：画像を先に / PC版：テキスト左 */}
              <FadeIn blur direction="left" className="order-2 md:order-1">
                <div>
                  {/* PC版のみタイトル表示 */}
                  <div className="relative mb-6 hidden md:block">
                    <FadeIn blur direction="clipReveal" delay={0} className="text-[var(--color-navy)]/10 text-4xl md:text-6xl font-extralight tracking-wider absolute -top-4 -left-2">
                      Brand
                    </FadeIn>
                    <FadeIn blur direction="clipReveal" delay={0.2} className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-3 uppercase font-medium relative z-10 pt-6">
                      Branding
                    </FadeIn>
                    <FadeIn blur direction="clipReveal" delay={0.4} className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[var(--color-text)] relative z-10">
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
              <FadeIn blur delay={0.2} direction="right" className="order-1 md:order-2">
                {/* SP版: 1枚中央配置 */}
                <div className="md:hidden flex justify-center">
                  <div className="relative w-[260px] aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <Image src="/images/AdobeStock_770224949.webp" alt="ブランディング" fill className="object-cover" />
                  </div>
                </div>
                {/* PC版 */}
                <div className="hidden md:block relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src="/images/AdobeStock_770224949.webp"
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
            <FadeIn blur direction="scaleUp">
              <p className="tracking-[0.5em] text-[0.65rem] text-[var(--color-navy)] mb-8 uppercase font-medium">Contact</p>
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight text-[var(--color-text)] mb-6">
                まずはお気軽にご相談ください
              </h2>
              <p className="text-[var(--color-text-muted)] text-[0.95rem] leading-[2] mb-10 font-light max-w-[300px] mx-auto md:max-w-none">
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
