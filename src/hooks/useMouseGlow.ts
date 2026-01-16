'use client';

import { useEffect, RefObject } from 'react';

interface UseMouseGlowOptions {
  selector: string;
  enable3DTilt?: boolean;
  maxTilt?: number;
}

/**
 * マウス追従グローエフェクト用カスタムフック
 * カードにマウス位置に応じたグロー効果と3Dチルトを適用
 */
export function useMouseGlow(
  ref: RefObject<HTMLDivElement | null>,
  options: UseMouseGlowOptions
) {
  const { selector, enable3DTilt = false, maxTilt = 8 } = options;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const cards = ref.current.querySelectorAll(selector);
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // グロー位置
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);

        // 3Dチルト計算（オプション）
        if (enable3DTilt) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -maxTilt;
          const rotateY = ((x - centerX) / centerX) * maxTilt;

          (card as HTMLElement).style.setProperty('--rotate-x', `${rotateX}deg`);
          (card as HTMLElement).style.setProperty('--rotate-y', `${rotateY}deg`);
        }
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (enable3DTilt) {
        const card = e.currentTarget as HTMLElement;
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
      }
    };

    const container = ref.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);

      if (enable3DTilt) {
        const cards = container.querySelectorAll(selector);
        cards.forEach((card) => {
          card.addEventListener('mouseleave', handleMouseLeave as EventListener);
        });
      }
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        if (enable3DTilt) {
          const cards = container.querySelectorAll(selector);
          cards.forEach((card) => {
            card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
          });
        }
      }
    };
  }, [ref, selector, enable3DTilt, maxTilt]);
}
