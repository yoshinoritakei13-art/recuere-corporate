'use client';

import { useEffect, useRef } from 'react';

interface WaveCanvasProps {
  color?: string;
  className?: string;
}

export default function WaveCanvas({
  color = '#ffffff',
  className = '',
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina対応
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // 波のパラメータ - より大きく動くように
    const waves = [
      { amplitude: 60, frequency: 0.008, speed: 0.02, yOffset: 0.2, opacity: 0.25, lineWidth: 2 },
      { amplitude: 45, frequency: 0.006, speed: 0.015, yOffset: 0.35, opacity: 0.2, lineWidth: 1.5 },
      { amplitude: 70, frequency: 0.004, speed: 0.012, yOffset: 0.5, opacity: 0.18, lineWidth: 2.5 },
      { amplitude: 50, frequency: 0.007, speed: 0.018, yOffset: 0.65, opacity: 0.15, lineWidth: 1.5 },
      { amplitude: 55, frequency: 0.005, speed: 0.01, yOffset: 0.8, opacity: 0.12, lineWidth: 2 },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = wave.opacity;
        ctx.lineWidth = wave.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const baseY = height * wave.yOffset;

        for (let x = 0; x <= width; x += 2) {
          // 複数のサイン波を重ねて有機的な動きに
          const y =
            baseY +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.3) * wave.amplitude * 0.4 +
            Math.sin(x * wave.frequency * 2 + time * wave.speed * 0.7) * wave.amplitude * 0.2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      time += 0.016; // 秒単位
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
