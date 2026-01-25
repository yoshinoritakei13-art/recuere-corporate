'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeroAnimation() {
  const [phase, setPhase] = useState<'loading' | 'active'>('loading');
  const [textStage, setTextStage] = useState<'none' | 'logoOnly' | 'sloganOnly' | 'both'>('none');
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('active'), 800);
    const t2 = setTimeout(() => setTextStage('logoOnly'), 1200);
    const t3 = setTimeout(() => setTextStage('sloganOnly'), 2500);
    const t4 = setTimeout(() => setTextStage('both'), 4000);
    const t5 = setTimeout(() => setIsContentVisible(true), 4300);

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, []);

  // スクロールで背景をフェードアウト
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // 1画面分スクロールしたら完全に消える
      const opacity = Math.max(0, 1 - (scrollY / windowHeight));
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // マウス追従
  useEffect(() => {
    let animationId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // スムーズな追従（イージング）
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[200] bg-white flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
          phase !== 'loading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative w-[300px] md:w-[450px] h-[1px] bg-neutral-100">
          <div className="absolute inset-0 bg-neutral-800 animate-loading-line origin-left" />
        </div>
      </div>

      {/* Background - スクロールでフェードアウト */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      >
        {/* ベースのダーク背景（常に表示） */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0f0f1a 50%, #050510 100%)',
          }}
        />
        {/* 画像が徐々に浮かび上がる（彩度を落とす） */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[4000ms] ${
            phase === 'active' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'saturate(0.4)',
          }}
        />
        {/* マウス追従の光 - メイン */}
        <div
          ref={lightRef}
          className="pointer-events-none absolute w-[600px] h-[600px] rounded-full"
          style={{
            left: mousePos.x - 300,
            top: mousePos.y - 300,
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* マウス追従の光 - コア（中心の明るい部分） */}
        <div
          className="pointer-events-none absolute w-[200px] h-[200px] rounded-full"
          style={{
            left: mousePos.x - 100,
            top: mousePos.y - 100,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="snap-section relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* 下部への白グラデーション - Philosophyセクションと滑らかに繋げる */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, transparent 60%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.5) 100%)',
          }}
        />

        <div className="max-w-[1440px] w-full relative h-full flex items-center justify-center px-6 md:px-12 z-10">

          {/* 装飾テキスト - 左 */}
          <div
            className={`absolute left-6 md:left-12 top-[18%] z-20 transition-all duration-1000 ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.3em] mb-2 text-neutral-500">recuere Inc.</p>
            <p className="text-[9px] tracking-[0.1em] text-neutral-400 font-medium italic">Sustainable Growth</p>
          </div>

          {/* 装飾テキスト - 右 */}
          <div
            className={`absolute right-6 md:right-12 top-[18%] z-20 text-right hidden md:block transition-all duration-1000 ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[10px] tracking-[0.2em] text-neutral-500 leading-relaxed uppercase font-medium">
              Consulting & Development
              <br />
              Unlocking Potential
            </p>
          </div>

          {/* Center Text Sequence */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center w-full">
            {/* 英語ロゴ (RECUERE) */}
            <div
              className={`transition-all duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                textStage === 'logoOnly'
                  ? 'opacity-100 translate-y-0 scale-100'
                  : textStage === 'sloganOnly'
                  ? 'opacity-0 -translate-y-20 scale-90'
                  : textStage === 'both'
                  ? 'opacity-100 -translate-y-2 md:-translate-y-3 scale-75 md:scale-90'
                  : 'opacity-0 translate-y-10 scale-100'
              }`}
            >
              <h1 className="text-[18vw] md:text-[14vw] font-black tracking-tighter leading-none text-center mix-blend-difference text-[#1a1a2e] scale-x-110 animate-subtle-float">
                recuere<span className="inline-block text-[3vw] md:text-[2vw] font-light relative top-[1vw] md:top-[0.5vw]" style={{ transform: 'scaleX(0.8) scaleY(1.1)' }}>®</span>
              </h1>
            </div>

            {/* 日本語キャッチコピー */}
            <div
              className={`transition-all duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                textStage === 'sloganOnly'
                  ? 'opacity-100 translate-y-0'
                  : textStage === 'both'
                  ? 'opacity-100 -translate-y-4 md:-translate-y-8'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="flex flex-col items-center">
                <p className="text-[4vw] md:text-[1.8vw] font-black tracking-[0.4em] text-[#333] text-center leading-relaxed">
                  「気づき」から始まる、
                </p>
                <p className="text-[3.5vw] md:text-[1.5vw] font-bold tracking-[0.4em] text-[#333] text-center mt-1">
                  組織と個人の持続的成長。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - ヒーロー内・中央下部・縦向き */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
            isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[9px] tracking-[0.3em] font-medium uppercase text-neutral-500 writing-vertical">Scroll</span>
            <div className="w-[1px] h-12 bg-neutral-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-neutral-600 animate-scroll-line-vertical" />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
