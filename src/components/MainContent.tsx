'use client';

import { useEffect, useRef, useState } from 'react';
import WaveCanvas from './WaveCanvas';

interface MainContentProps {
  className?: string;
}

export default function MainContent({ className = '' }: MainContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`main-content relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(180deg, #EAF2F7 0%, #f0f4f8 50%, #e8f0f5 100%)',
      }}
    >
      {/* 背景の波アニメーション（Canvas） */}
      <WaveCanvas color="#7FA6BF" className="z-0" />

      {/* 有機的なグラデーションオーバーレイ */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(127, 166, 191, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(255, 153, 255, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 60% 20%, rgba(230, 201, 120, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* ボックスレイアウト - 2x2グリッド */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Box 1 */}
          <div
            className={`box box1 bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <h3 className="text-lg font-medium text-[#1a1a1a] mb-4">企業理念</h3>
            <p className="text-[#555] text-sm leading-relaxed">
              一人ひとりが本来の自分に気づき、その力を自然に発揮できる状態をつくること。
            </p>
          </div>

          {/* Box 2 */}
          <div
            className={`box box2 bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-lg font-medium text-[#1a1a1a] mb-4">アプローチ</h3>
            <p className="text-[#555] text-sm leading-relaxed">
              経営の論理性と心理学の知見を融合し、持続的な成長を支援します。
            </p>
          </div>

          {/* Box 3 */}
          <div
            className={`box box3 bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-lg font-medium text-[#1a1a1a] mb-4">サービス</h3>
            <p className="text-[#555] text-sm leading-relaxed">
              企業向けコンサルティングから、個人向けセッションまで幅広く対応。
            </p>
          </div>

          {/* Box 4 - 大きな写真 */}
          <div
            className={`box box4 relative overflow-hidden rounded-lg shadow-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms', minHeight: '300px' }}
          >
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <clipPath id="box4Mask">
                  <rect x="0" y="0" width="400" height="300" rx="12" ry="12" />
                </clipPath>
              </defs>

              <g clipPath="url(#box4Mask)">
                <image
                  href="/images/k1.jpg"
                  width="400"
                  height="300"
                  preserveAspectRatio="xMidYMid slice"
                  className={`box4-image ${isVisible ? 'visible' : ''}`}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Box4画像のアニメーションスタイル */}
      <style jsx>{`
        .box4-image {
          opacity: 0;
          transform: translateY(10px) scale(0.96);
          transform-origin: center center;
          transition: opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .box4-image.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          animation: floatBreathBox4 7s ease-in-out infinite;
          animation-delay: 1.4s;
        }

        @keyframes floatBreathBox4 {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.008);
          }
        }
      `}</style>
    </div>
  );
}
