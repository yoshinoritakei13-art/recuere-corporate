import * as THREE from 'three';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  force: number;
  vx: number;
  vy: number;
}

export default class TouchTexture {
  size: number;
  width: number;
  height: number;
  maxAge: number;
  radius: number;
  trail: TrailPoint[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.Texture;
  last: { x: number; y: number } | null;

  constructor() {
    this.size = 150;  // 大きなモヤ
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.maxAge = 120; // 長く残る
    this.radius = 0.15;
    this.trail = [];
    this.last = null;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.texture = new THREE.Texture(this.canvas);
    this.texture.needsUpdate = true;
  }

  update() {
    this.clear();

    // Age points
    this.trail.forEach((point, i) => {
      point.age++;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    });

    // Draw points
    this.trail.forEach((point) => {
      this.drawPoint(point);
    });

    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0;
    let vx = 0;
    let vy = 0;

    if (this.last) {
      const dx = point.x - this.last.x;
      const dy = point.y - this.last.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
      vx = dx;
      vy = dy;
    }

    this.last = { x: point.x, y: point.y };

    this.trail.push({
      x: point.x,
      y: point.y,
      age: 0,
      force,
      vx,
      vy,
    });
  }

  drawPoint(point: TrailPoint) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    const radius = this.size;
    const intensity = 1 - point.age / this.maxAge;

    // 放射状グラデーションでソフトなエッジを作成
    const gradient = this.ctx.createRadialGradient(
      pos.x,
      pos.y,
      0,
      pos.x,
      pos.y,
      radius
    );

    const alpha = Math.floor(intensity * 255);
    gradient.addColorStop(0, `rgba(${alpha}, ${alpha}, ${alpha}, 1)`);
    gradient.addColorStop(0.5, `rgba(${alpha * 0.5}, ${alpha * 0.5}, ${alpha * 0.5}, 1)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.beginPath();
    this.ctx.fillStyle = gradient;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}
