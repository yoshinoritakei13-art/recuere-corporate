'use client';

import { useEffect, useRef } from 'react';

/**
 * FounderBackground Component
 *
 * Founderセクション専用の背景SVGアニメーション
 * - 38本の流線（ヒーローより控えめ）
 * - 青・金・薄グレーのカラーパレット
 * - すりガラス効果 + 下端フェード
 * - prefers-reduced-motion 対応
 */

interface LineData {
  el: SVGPathElement;
  offset: number;
  speed: number;
  spread: number;
  randomShift: number;
}

export default function FounderBackground() {
  const groupRef = useRef<SVGGElement>(null);
  const linesRef = useRef<LineData[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // prefers-reduced-motion チェック
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lineCount = 38;
    const lines: LineData[] = [];

    // カラーパレット: 青 / 金 / 薄グレー
    const colors = [
      (a: number) => `rgba(143, 183, 214, ${a})`, // #8FB7D6
      (a: number) => `rgba(226, 200, 143, ${a})`, // #E2C88F
      (a: number) => `rgba(221, 227, 232, ${a})`, // #DDE3E8
    ];

    // 既存のパスをクリア
    while (group.firstChild) {
      group.removeChild(group.firstChild);
    }

    for (let i = 0; i < lineCount; i++) {
      const isBand = i < 3;
      const isCentral = i >= 14 && i <= 26;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      let weight: number;
      let stroke: string;

      if (isBand) {
        weight = 15 + Math.random() * 12;
        stroke = `rgba(226, 200, 143, 0.18)`; // 金の帯をはっきり
      } else {
        weight = isCentral ? 1.2 + Math.random() * 1.8 : 0.3 + Math.random() * 0.5;
        const colorFn = colors[Math.floor(Math.random() * colors.length)];
        const alpha = isCentral ? 0.45 : 0.30; // はっきり見えるように
        stroke = colorFn(alpha);
      }

      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke', stroke);
      path.setAttribute('stroke-width', String(weight));

      group.appendChild(path);

      lines.push({
        el: path,
        offset: Math.random() * Math.PI * 2,
        speed: isBand ? 0.0025 : 0.004 + Math.random() * 0.003,
        spread: isBand ? (Math.random() - 0.5) * 16 : (i - lineCount / 2) * 10.5,
        randomShift: (Math.random() - 0.5) * 90,
      });
    }

    linesRef.current = lines;

    let time = 0;

    const tick = () => {
      if (!prefersReducedMotion) time += 0.006;

      for (const line of linesRef.current) {
        const w = Math.sin(time + line.offset) * 9;

        const startX = 1100 - line.spread;
        const startY = 220 - line.spread * 0.1;

        const endX = -1100 - line.spread;
        const endY = -220 - line.spread * 0.1;

        const cp1x = -600 - w - line.randomShift;
        const cp1y = 500 + w;

        const cp2x = 700 + w + line.spread * 2.4;
        const cp2y = -500 - w;

        line.el.setAttribute(
          'd',
          `M${startX},${startY}C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`
        );
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* 背景アニメーション */}
      <div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
        style={{
          opacity: 0.85,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      >
        <svg
          className="w-[160%] h-[160%]"
          style={{
            filter: 'blur(1px)',
            transform: 'translate3d(0,0,0)',
          }}
          viewBox="-300 -225 600 450"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g ref={groupRef} id="founder-lines"></g>
        </svg>
      </div>

      {/* すりガラス膜 - 薄くして背景を見せる */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          background: 'rgba(252, 252, 252, 0.1)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
