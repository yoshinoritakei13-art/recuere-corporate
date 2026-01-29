'use client';

import { useEffect, useRef } from 'react';

/**
 * FlowCanvas Component
 *
 * S字軌道を描く55本の線によるアニメーション背景
 * - 固定背景として全ページで使用
 * - prefers-reduced-motion 対応
 */

interface Point {
  x: number;
  y: number;
}

class FlowLine {
  index: number;
  points: Point[];
  isBand: boolean;
  baseColor: string;
  baseWidth: number;
  alpha: number;

  constructor(index: number, segmentCount: number) {
    this.index = index;
    this.points = [];
    this.isBand = index < 6;

    const skyBlues = ['#a0cfff', '#c5e2ff', '#8dbdec'];
    const sunsetOranges = ['#ffcc80', '#ffd6a5', '#ffb347'];

    const isCentral = index >= 22 && index <= 35;
    const rand = Math.random();

    if (this.isBand) {
      if (index === 2 || index === 3) {
        this.baseColor = sunsetOranges[Math.floor(Math.random() * sunsetOranges.length)];
      } else {
        this.baseColor = skyBlues[Math.floor(Math.random() * skyBlues.length)];
      }
      this.baseWidth = 60 + Math.random() * 60;
      this.alpha = 0.025;
    } else {
      if (isCentral) {
        this.baseColor =
          rand < 0.8
            ? sunsetOranges[Math.floor(Math.random() * sunsetOranges.length)]
            : skyBlues[0];
      } else {
        this.baseColor =
          rand < 0.9
            ? skyBlues[Math.floor(Math.random() * skyBlues.length)]
            : '#eeeeee';
      }
      this.baseWidth = 0.5 + Math.random() * 1.3;
      this.alpha = 0.25 + Math.random() * 0.2;
    }

    for (let i = 0; i < segmentCount; i++) {
      this.points.push({ x: 0, y: 0 });
    }
  }

  update(time: number, width: number, height: number, segmentCount: number) {
    const p0: Point = { x: width * 1.05, y: height * -0.05 };
    const p1: Point = { x: width * 1.15, y: height * 0.85 };
    const p2: Point = { x: -width * 0.15, y: height * 0.15 };
    const p3: Point = { x: width * -0.05, y: height * 1.05 };

    for (let i = 0; i < segmentCount; i++) {
      const t = i / (segmentCount - 1);
      const pos = this.getBezierPoint(t, p0, p1, p2, p3);
      const convergence = Math.sin(t * Math.PI);

      const centerIndex = 27;
      const spreadBase = this.isBand ? 4 : 8;
      const distFromCenter = Math.abs(this.index - centerIndex);
      const spread =
        (this.index - centerIndex) *
        (spreadBase + convergence * 5) *
        (1 + distFromCenter * 0.01);

      const noiseFreq = this.isBand ? 0.00004 : 0.00008;
      const noiseAmp = this.isBand ? 8 : 20;
      const noise =
        Math.sin(time * noiseFreq + t * 3.5 + this.index * 0.45) * noiseAmp;

      this.points[i].x = pos.x + spread + noise;
      this.points[i].y = pos.y + noise;
    }
  }

  getBezierPoint(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
    const invT = 1 - t;
    return {
      x:
        Math.pow(invT, 3) * p0.x +
        3 * Math.pow(invT, 2) * t * p1.x +
        3 * invT * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x,
      y:
        Math.pow(invT, 3) * p0.y +
        3 * Math.pow(invT, 2) * t * p1.y +
        3 * invT * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y,
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalCompositeOperation = 'darken';
    ctx.strokeStyle = this.baseColor;
    ctx.globalAlpha = this.alpha;
    ctx.lineWidth = this.baseWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }
}

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const linesRef = useRef<FlowLine[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // prefers-reduced-motion チェック
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lineCount = 55;
    const segmentCount = 200;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const init = () => {
      linesRef.current = [];
      for (let i = 0; i < lineCount; i++) {
        linesRef.current.push(new FlowLine(i, segmentCount));
      }
    };

    const animate = (time: number) => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      linesRef.current.forEach((line) => {
        line.update(time, width, height, segmentCount);
        line.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-none">
      <canvas ref={canvasRef} className="block bg-white" />
    </div>
  );
}
