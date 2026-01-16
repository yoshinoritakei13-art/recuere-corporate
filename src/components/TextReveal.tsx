'use client';

import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  charDelay?: number;
  className?: string;
}

export default function TextReveal({
  text,
  delay = 300,
  charDelay = 100,
  className = '',
}: TextRevealProps) {
  const [shown, setShown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // スクロールで画面に入ったら検知
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // 画面に入ったらdelayの後にアニメーション開始
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShown(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-[600ms] ease-out"
          style={{
            opacity: shown ? 1 : 0,
            filter: shown ? 'blur(0px)' : 'blur(10px)',
            transform: shown ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${index * charDelay}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
