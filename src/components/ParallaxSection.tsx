'use client';

import { ReactNode, useRef, useEffect, useState, useCallback } from 'react';

interface ParallaxSectionProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  fadeIn?: boolean;
  blur?: boolean;
}

/**
 * パララックス + フェード + ブラー効果を持つセクション
 * スクロールに応じて要素が異なる速度で動き、ふわっと表示される
 */
export default function ParallaxSection({
  children,
  className = '',
  speed = 0.15,
  fadeIn = true,
  blur = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // パララックス効果
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;
        const parallaxOffset = distanceFromCenter * speed;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  // Intersection Observer (visibility)
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        opacity: fadeIn ? (isVisible ? 1 : 0) : 1,
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(4px)') : 'none',
        transition: `opacity 0.8s ease-out${blur ? ', filter 0.8s ease-out' : ''}`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
