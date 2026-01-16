'use client';

import { useEffect, useRef } from 'react';

/**
 * FloatingParticles - ふわふわ浮遊するパーティクル
 */
export default function FloatingParticles({
  count = 20,
  color = '#002d5a',
}: {
  count?: number;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // パーティクルを生成
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 15;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${left}%;
        bottom: -10px;
        opacity: ${Math.random() * 0.15 + 0.05};
        animation: floatUp ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
      `;

      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [count, color]);

  return (
    <>
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          50% {
            transform: translateY(-50vh) translateX(20px) scale(1.2);
            opacity: 0.15;
          }
          90% {
            opacity: 0.05;
          }
          100% {
            transform: translateY(-100vh) translateX(-10px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </>
  );
}
