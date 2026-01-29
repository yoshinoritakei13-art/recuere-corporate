'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import TouchTexture from '@/lib/TouchTexture';

// シルクウェーブ風カラー - 青系グラデーション
const COLORS = {
  deepBlue: new THREE.Color('#4A7BA7'),    // 深めの青
  midBlue: new THREE.Color('#6A9EC7'),     // 中間の青
  lightBlue: new THREE.Color('#A8C8DC'),   // 淡い水色
  cream: new THREE.Color('#E8DFD0'),       // クリーム/ベージュ
  white: new THREE.Color('#F5F5F0'),       // オフホワイト
  background: new THREE.Color('#B8D0E0'),  // 背景（淡い青）
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform sampler2D uTouch;

  // Silk Wave Colors
  uniform vec3 uDeepBlue;
  uniform vec3 uMidBlue;
  uniform vec3 uLightBlue;
  uniform vec3 uCream;
  uniform vec3 uWhite;
  uniform vec3 uColorBg;

  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // ノイズのオクターブ合成（FBM）
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 adjustedUv = uv * aspect;

    float time = uTime * 0.15; // ゆっくり動く

    // タッチテクスチャからの影響
    float touch = texture2D(uTouch, uv).r;
    float touchBlur = 0.0;
    for (float i = -3.0; i <= 3.0; i += 1.0) {
      for (float j = -3.0; j <= 3.0; j += 1.0) {
        vec2 offset = vec2(i, j) * 0.02;
        touchBlur += texture2D(uTouch, uv + offset).r;
      }
    }
    touchBlur /= 49.0;
    float combinedTouch = max(touch, touchBlur * 2.0);

    // シルクウェーブ効果 - 斜めに流れる波
    float wave1 = sin((uv.x + uv.y) * 3.0 + time * 2.0) * 0.5 + 0.5;
    float wave2 = sin((uv.x - uv.y * 0.5) * 4.0 + time * 1.5 + 1.0) * 0.5 + 0.5;
    float wave3 = sin((uv.x * 0.7 + uv.y * 1.3) * 2.5 + time * 1.8) * 0.5 + 0.5;
    float wave4 = sin((-uv.x + uv.y * 0.8) * 3.5 + time * 1.2) * 0.5 + 0.5;

    // ノイズでウェーブをソフトに
    float n1 = snoise(vec3(uv * 2.0, time * 0.5)) * 0.3 + 0.5;
    float n2 = snoise(vec3(uv * 3.0 + 50.0, time * 0.4)) * 0.3 + 0.5;

    // マウスリップル
    vec2 ripple = vec2(
      snoise(vec3(uv * 5.0, time * 3.0)),
      snoise(vec3(uv * 5.0 + 50.0, time * 3.0))
    ) * combinedTouch * 0.1;

    vec2 distortedUv = uv + ripple;

    // 再計算
    float w1 = sin((distortedUv.x + distortedUv.y) * 3.0 + time * 2.0) * 0.5 + 0.5;
    float w2 = sin((distortedUv.x - distortedUv.y * 0.5) * 4.0 + time * 1.5) * 0.5 + 0.5;

    // 各ウェーブにノイズを乗せてソフトなエッジに
    wave1 = smoothstep(0.3, 0.7, wave1 * n1);
    wave2 = smoothstep(0.2, 0.8, wave2 * n2);
    wave3 = smoothstep(0.35, 0.65, wave3);
    wave4 = smoothstep(0.25, 0.75, wave4);

    // ベースは淡い青
    vec3 color = uColorBg;

    // シルクのような重なり合うウェーブ
    color = mix(color, uLightBlue, wave1 * 0.6);
    color = mix(color, uMidBlue, wave2 * 0.7);
    color = mix(color, uDeepBlue, wave3 * 0.5);
    color = mix(color, uCream, wave4 * 0.4);

    // 対角線の光沢
    float diagonal = sin((uv.x + uv.y * 0.8) * 5.0 + time) * 0.5 + 0.5;
    diagonal = pow(diagonal, 3.0);
    color = mix(color, uWhite, diagonal * 0.3);

    // タッチで白くモヤ
    color = mix(color, uWhite, combinedTouch * 0.6);

    // シルクの光沢
    float sheen = pow(sin((uv.x - uv.y) * 8.0 + time * 2.0) * 0.5 + 0.5, 4.0);
    color += uWhite * sheen * 0.15;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface LiquidGradientProps {
  className?: string;
  opacity?: number;
}

export default function LiquidGradient({ className = '', opacity = 1 }: LiquidGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const touchTextureRef = useRef<TouchTexture | null>(null);
  const frameRef = useRef<number>(undefined);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const startTimeRef = useRef(Date.now());

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!touchTextureRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    touchTextureRef.current.addTouch({ x, y });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchTextureRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width;
    const y = 1 - (touch.clientY - rect.top) / rect.height;
    touchTextureRef.current.addTouch({ x, y });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Touch Texture
    const touchTexture = new TouchTexture();
    touchTextureRef.current = touchTexture;

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uTouch: { value: touchTexture.texture },
        uDeepBlue: { value: COLORS.deepBlue },
        uMidBlue: { value: COLORS.midBlue },
        uLightBlue: { value: COLORS.lightBlue },
        uCream: { value: COLORS.cream },
        uWhite: { value: COLORS.white },
        uColorBg: { value: COLORS.background },
      },
    });
    materialRef.current = material;

    // Mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      if (touchTextureRef.current) {
        touchTextureRef.current.update();
      }

      if (material.uniforms) {
        material.uniforms.uTime.value = elapsed;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      if (material.uniforms) {
        material.uniforms.uResolution.value.set(w, h);
      }
      if (touchTextureRef.current) {
        touchTextureRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0, opacity }}
    />
  );
}
