'use client';

import { useEffect, useState, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number; // 0.1 = 遅い, 0.5 = 中, 1 = スクロールと同速
  direction?: 'up' | 'down';
}

/**
 * パララックスエフェクト用フック
 * スクロール位置に応じて要素を異なる速度で動かす
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.3, direction = 'up' } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 要素が画面内にあるかチェック
      if (rect.top < windowHeight && rect.bottom > 0) {
        // 画面中央からの距離を計算
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        // パララックスオフセットを計算
        const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? 1 : -1);
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期値を設定

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed, direction]);

  return offset;
}

/**
 * スクロール進行度を取得するフック
 * ページ全体のスクロール位置を 0-1 で返す
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
