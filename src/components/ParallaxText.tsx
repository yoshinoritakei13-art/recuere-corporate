'use client';

import { useEffect, useRef, useState } from 'react';
import TextReveal from './TextReveal';

interface ParallaxTextProps {
  text: string;
  delay?: number;
  charDelay?: number;
  className?: string;
  speed?: number; // パララックスの速度 (0.1 = ゆっくり, 1 = 通常)
}

export default function ParallaxText({
  text,
  delay = 300,
  charDelay = 180,
  className = '',
  speed = 0.15,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - windowHeight / 2;
        setOffset(distanceFromCenter * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期位置を設定

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <TextReveal text={text} delay={delay} charDelay={charDelay} />
    </div>
  );
}
