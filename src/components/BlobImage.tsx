'use client';

import { useEffect, useRef, useState, useId } from 'react';

interface BlobImageProps {
  imageSrc: string;
  size?: number;
  className?: string;
  speed?: number; // スクロール追従の速度
  direction?: 'right' | 'left'; // 入ってくる方向
  imagePosition?: 'center' | 'top' | 'bottom'; // 画像の表示位置
  disableScrollEffect?: boolean; // スクロール追従を無効にする
}

export default function BlobImage({
  imageSrc,
  size = 280,
  className = '',
  speed = 0.2,
  direction = 'right',
  imagePosition = 'center',
  disableScrollEffect = false,
}: BlobImageProps) {
  const uniqueId = useId();
  const clipId = `blobClip-${uniqueId.replace(/:/g, '')}`;
  const ref = useRef<HTMLDivElement>(null);
  const initialX = disableScrollEffect ? 0 : (direction === 'right' ? 100 : -100);
  const initialState = disableScrollEffect
    ? { x: 0, y: 0, scale: 1 }
    : { x: initialX, y: -80, scale: 0.85 };
  const [offset, setOffset] = useState(initialState);
  const targetOffset = useRef(initialState);
  const animationFrame = useRef<number>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  // フェードイン検知
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // スクロールエフェクト無効時はアニメーションなし
    if (disableScrollEffect) return;

    // 滑らかな補間アニメーション
    const animate = () => {
      setOffset(prev => ({
        x: prev.x + (targetOffset.current.x - prev.x) * 0.04, // ゆっくり追従
        y: prev.y + (targetOffset.current.y - prev.y) * 0.04,
        scale: prev.scale + (targetOffset.current.scale - prev.scale) * 0.04,
      }));
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [disableScrollEffect]);

  useEffect(() => {
    // スクロールエフェクト無効時は何もしない
    if (disableScrollEffect) return;

    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - windowHeight / 2;
        // 斜め上からふわふわ移動（方向に応じて左右反転）+ スケール変化
        const progress = Math.max(0, distanceFromCenter * speed);
        const xDirection = direction === 'right' ? 1 : -1;
        // 画面中央に近づくほど大きくなる（0.85 → 1.0）
        const scaleProgress = Math.min(1, Math.max(0, 1 - Math.abs(distanceFromCenter) / windowHeight));
        targetOffset.current = {
          x: progress * xDirection,
          y: -progress * 0.5 + Math.sin(distanceFromCenter * 0.008) * 10, // 斜め + ふわふわ
          scale: 0.85 + scaleProgress * 0.15,
        };
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disableScrollEffect]);

  return (
    <div
      ref={ref}
      className={`blob-image-container ${className}`}
      style={disableScrollEffect ? {} : {
        transform: `translateX(${offset.x}px) translateY(${offset.y}px) scale(${offset.scale})`,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className="blob-svg"
      >
        <defs>
          <clipPath id={clipId}>
            <path
              className="blob-morph"
              transform="translate(100 100)"
            >
              <animate
                attributeName="d"
                dur="12s"
                repeatCount="indefinite"
                values="
                  M45,-58 C62,-48 75,-28 78,-5 C81,18 74,42 58,58 C42,74 18,81 -5,78 C-28,75 -48,62 -58,45 C-68,28 -68,-2 -58,-25 C-48,-48 -28,-68 -5,-73 C18,-78 28,-68 45,-58 Z;
                  M50,-55 C68,-42 78,-22 80,2 C82,26 72,48 55,62 C38,76 14,82 -10,78 C-34,74 -52,60 -62,42 C-72,24 -72,-4 -62,-28 C-52,-52 -34,-70 -10,-75 C14,-80 32,-68 50,-55 Z;
                  M42,-60 C58,-50 72,-32 76,-10 C80,12 76,38 62,55 C48,72 24,80 -2,78 C-28,76 -50,64 -60,46 C-70,28 -70,0 -60,-24 C-50,-48 -28,-66 -2,-72 C24,-78 26,-70 42,-60 Z;
                  M45,-58 C62,-48 75,-28 78,-5 C81,18 74,42 58,58 C42,74 18,81 -5,78 C-28,75 -48,62 -58,45 C-68,28 -68,-2 -58,-25 C-48,-48 -28,-68 -5,-73 C18,-78 28,-68 45,-58 Z
                "
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
              />
            </path>
          </clipPath>
        </defs>

        {/* 画像 - gでラップしてアニメーション適用 */}
        <g className={`blob-image-wrapper ${isVisible ? 'visible' : ''}`}>
          <image
            href={imageSrc}
            x="-50"
            y={imagePosition === 'top' ? '-50' : imagePosition === 'bottom' ? '-50' : '-50'}
            width="300"
            height="300"
            preserveAspectRatio="xMidYMid meet"
            clipPath={`url(#${clipId})`}
            className="blob-image"
          />
        </g>
      </svg>

      <style jsx>{`
        .blob-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .blob-svg {
          overflow: visible;
        }

        /* 初期状態 - フェードイン前 */
        .blob-image-wrapper {
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          transform-origin: center center;
          transition: opacity 1.4s cubic-bezier(.22,1,.36,1),
                      transform 1.4s cubic-bezier(.22,1,.36,1);
        }

        /* フェードイン後 */
        .blob-image-wrapper.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          animation: floatBreath 7s ease-in-out infinite;
          animation-delay: 1.4s;
        }

        /* 高級感のある静かな漂いモーション */
        @keyframes floatBreath {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.008);
          }
        }

        .blob-svg:hover .blob-image-wrapper {
          animation-play-state: paused;
          transform: scale(1.03);
          transition: transform 0.4s cubic-bezier(.22,1,.36,1);
        }
      `}</style>
    </div>
  );
}
