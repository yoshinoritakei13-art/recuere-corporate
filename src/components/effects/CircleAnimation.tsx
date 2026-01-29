'use client';

import { useEffect, useRef, useState } from 'react';

interface CircleAnimationProps {
  className?: string;
}

export default function CircleAnimation({ className = '' }: CircleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina対応
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let scale = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // スマホ対応: 画面幅に応じてスケール調整
      scale = Math.min(1, width / 800);
    };
    resize();
    window.addEventListener('resize', resize);

    // 円のパラメータ - リキュウレカラー（ゆっくり回転）
    const getCircles = () => [
      { radius: 280 * scale, speed: 0.0008, startAngle: 0, arcLength: 0.7, colors: ['#004582', '#7FA6BF'] },
      { radius: 240 * scale, speed: -0.001, startAngle: Math.PI * 0.5, arcLength: 0.5, colors: ['#7FA6BF', '#FF99FF'] },
      { radius: 200 * scale, speed: 0.0012, startAngle: Math.PI, arcLength: 0.6, colors: ['#FF99FF', '#E6C978'] },
      { radius: 160 * scale, speed: -0.0015, startAngle: Math.PI * 1.5, arcLength: 0.4, colors: ['#E6C978', '#004582'] },
      { radius: 120 * scale, speed: 0.0018, startAngle: Math.PI * 0.3, arcLength: 0.5, colors: ['#004582', '#FF99FF'] },
      { radius: 80 * scale, speed: -0.002, startAngle: Math.PI * 1.2, arcLength: 0.3, colors: ['#7FA6BF', '#E6C978'] },
    ];

    // 薄いガイドライン用（点線）
    const getGuideCircles = () => [
      { radius: 300 * scale, opacity: 0.08 },
      { radius: 260 * scale, opacity: 0.05 },
      { radius: 220 * scale, opacity: 0.08 },
      { radius: 180 * scale, opacity: 0.05 },
      { radius: 140 * scale, opacity: 0.08 },
      { radius: 100 * scale, opacity: 0.05 },
    ];

    // 細いグレーの実線円（2px）
    const getThinGrayCircles = () => [
      { radius: 320 * scale, speed: 0.0004, startAngle: 0, arcLength: 0.4 },
      { radius: 290 * scale, speed: -0.0005, startAngle: Math.PI * 0.7, arcLength: 0.3 },
      { radius: 250 * scale, speed: 0.0006, startAngle: Math.PI * 1.3, arcLength: 0.35 },
      { radius: 210 * scale, speed: -0.0007, startAngle: Math.PI * 0.2, arcLength: 0.25 },
      { radius: 170 * scale, speed: 0.0005, startAngle: Math.PI * 1.6, arcLength: 0.3 },
      { radius: 130 * scale, speed: -0.0006, startAngle: Math.PI * 0.9, arcLength: 0.2 },
      { radius: 90 * scale, speed: 0.0008, startAngle: Math.PI * 1.1, arcLength: 0.35 },
    ];

    let time = 0;

    const draw = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.95;  // もっと右
      const centerY = height * 0.05; // もっと上

      // 線の太さもスケール
      const lineScale = Math.max(0.5, scale);

      // 薄いガイドライン（点線）
      getGuideCircles().forEach((guide) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, guide.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150, 150, 150, ${guide.opacity})`;
        ctx.lineWidth = 1 * lineScale;
        ctx.setLineDash([4 * lineScale, 8 * lineScale]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 細いグレーの円弧（2px）
      getThinGrayCircles().forEach((circle) => {
        const currentAngle = circle.startAngle + time * circle.speed;
        const arcEnd = currentAngle + Math.PI * 2 * circle.arcLength;

        ctx.beginPath();
        ctx.arc(centerX, centerY, circle.radius, currentAngle, arcEnd);
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.4)';
        ctx.lineWidth = 2 * lineScale;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // カラフルな円弧
      getCircles().forEach((circle) => {
        const currentAngle = circle.startAngle + time * circle.speed;
        const arcEnd = currentAngle + Math.PI * 2 * circle.arcLength;

        // グラデーション作成
        const gradient = ctx.createLinearGradient(
          centerX + Math.cos(currentAngle) * circle.radius,
          centerY + Math.sin(currentAngle) * circle.radius,
          centerX + Math.cos(arcEnd) * circle.radius,
          centerY + Math.sin(arcEnd) * circle.radius
        );
        gradient.addColorStop(0, circle.colors[0]);
        gradient.addColorStop(1, circle.colors[1]);

        ctx.beginPath();
        ctx.arc(centerX, centerY, circle.radius, currentAngle, arcEnd);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 6 * lineScale;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      time += 16; // 約60fps
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
    </div>
  );
}
