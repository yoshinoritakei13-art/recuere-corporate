'use client';

import { useEffect, useRef, useState } from 'react';

interface BlobDividerProps {
  fromColor?: string;
  toColor?: string;
  className?: string;
}

export default function BlobDivider({
  fromColor = '#EAF2F7',
  toColor = '#ffffff',
  className = '',
}: BlobDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      {/* 白グラデーションオーバーレイ - 常に表示して背景を隠す */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: fromColor === 'transparent'
            ? 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)'
            : `linear-gradient(180deg, ${fromColor} 0%, ${fromColor} 30%, transparent 100%)`,
        }}
      />

      <svg
        viewBox="-50 0 1540 400"
        preserveAspectRatio="none"
        className="relative w-full h-[120px] md:h-[180px]"
        style={{ display: 'block' }}
      >
        {/* 背景の水色エリア（透明でない場合のみ） */}
        {fromColor !== 'transparent' && (
          <path
            d="M-50,0 L1490,0 L1490,200 L-50,200 Z"
            fill={fromColor}
          />
        )}

        {/* メインの大きな波 - 滑らかな曲線 */}
        <path
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          fill={toColor}
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M-50,280 C200,180 400,320 720,200 C1040,80 1240,260 1490,180 L1490,400 L-50,400 Z;
              M-50,200 C200,300 400,120 720,240 C1040,360 1240,140 1490,220 L1490,400 L-50,400 Z;
              M-50,240 C200,140 400,280 720,160 C1040,40 1240,220 1490,160 L1490,400 L-50,400 Z;
              M-50,280 C200,180 400,320 720,200 C1040,80 1240,260 1490,180 L1490,400 L-50,400 Z
            "
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </path>

        {/* 薄い第2の波 - 奥行き感（透明でない場合のみ） */}
        {fromColor !== 'transparent' && (
          <path
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
            fill={fromColor}
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M-50,300 C300,180 600,280 900,200 C1200,120 1350,240 1490,200 L1490,400 L-50,400 Z;
                M-50,240 C300,320 600,160 900,260 C1200,360 1350,180 1490,240 L1490,400 L-50,400 Z;
                M-50,300 C300,180 600,280 900,200 C1200,120 1350,240 1490,200 L1490,400 L-50,400 Z
              "
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
        )}
      </svg>

      {/* 右下の装飾ライン（透明でない場合のみ） */}
      {fromColor !== 'transparent' && (
        <svg
          className="absolute right-0 bottom-0 w-[400px] h-[300px] opacity-20 pointer-events-none"
          viewBox="0 0 400 300"
          fill="none"
        >
          <path
            d="M 450 300 C 350 250, 320 150, 400 50"
            stroke={fromColor}
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M 450 300 C 350 250, 320 150, 400 50;
                M 450 300 C 380 220, 340 120, 380 30;
                M 450 300 C 350 250, 320 150, 400 50
              "
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
        </svg>
      )}
    </div>
  );
}
