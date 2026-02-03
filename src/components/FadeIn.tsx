'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type AnimationType = 'up' | 'down' | 'left' | 'right' | 'none' | 'scaleUp' | 'clipReveal';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: AnimationType;
  duration?: number;
  className?: string;
  blur?: boolean; // ブラーからシャープに
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  blur = false,
}: FadeInProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  // clipReveal: 1文字ずつアニメーション
  if (direction === 'clipReveal') {
    const text = String(children || '').trim();
    return (
      <div ref={ref} className={className}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all duration-500 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isVisible ? `${delay * 1000 + index * 50}ms` : '0ms',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  }

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(40px)';
        case 'down':
          return 'translateY(-40px)';
        case 'left':
          return 'translateX(-40px)';
        case 'right':
          return 'translateX(40px)';
        case 'scaleUp':
          return 'scale(0.95)';
        default:
          return 'none';
      }
    }
    return direction === 'scaleUp' ? 'scale(1)' : 'none';
  };

  // classNameにabsoluteが含まれている場合はpositionを上書きしない
  const hasAbsolute = className.includes('absolute');

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(6px)') : 'none',
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s, filter ${duration}s ease-out ${delay}s`,
        willChange: 'opacity, transform, filter',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
