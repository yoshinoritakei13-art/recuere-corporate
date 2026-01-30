'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import TouchTexture from '@/lib/TouchTexture';
import { SIMPLEX_NOISE_FUNCTIONS, BASIC_VERTEX_SHADER, TOUCH_BLUR_FUNCTION, FBM_FUNCTION } from '@/lib/shaders/noise';

/**
 * カラープリセット
 */
const COLOR_PRESETS = {
  // シルクウェーブ風 - 青系グラデーション
  silk: {
    colors: {
      color1: new THREE.Color('#4A7BA7'),    // 深めの青
      color2: new THREE.Color('#6A9EC7'),    // 中間の青
      color3: new THREE.Color('#A8C8DC'),    // 淡い水色
      color4: new THREE.Color('#E8DFD0'),    // クリーム/ベージュ
      color5: new THREE.Color('#F5F5F0'),    // オフホワイト
      background: new THREE.Color('#B8D0E0'), // 背景（淡い青）
    },
    timeScale: 0.15,
    waveConfig: { base: 3.0, variation: 4.0 },
  },
  // パステルレインボー
  pastel: {
    colors: {
      color1: new THREE.Color('#FFB8D0'),    // パステルピンク
      color2: new THREE.Color('#D8B8FF'),    // パステル紫
      color3: new THREE.Color('#B8E8FF'),    // パステル水色
      color4: new THREE.Color('#FFF8D0'),    // パステル黄色
      color5: new THREE.Color('#C8F0E8'),    // パステルミント
      background: new THREE.Color('#F8F0FF'), // 淡い紫がかった白
    },
    timeScale: 0.12,
    waveConfig: { base: 2.5, variation: 3.0 },
  },
} as const;

type PresetKey = keyof typeof COLOR_PRESETS;

/**
 * Fragment Shader 生成関数
 */
function createFragmentShader(preset: PresetKey): string {
  const config = COLOR_PRESETS[preset];

  return `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform sampler2D uTouch;

    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uColor5;
    uniform vec3 uColorBg;

    varying vec2 vUv;

    ${SIMPLEX_NOISE_FUNCTIONS}
    ${FBM_FUNCTION}
    ${TOUCH_BLUR_FUNCTION}

    void main() {
      vec2 uv = vUv;
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 adjustedUv = uv * aspect;

      float time = uTime * ${config.timeScale.toFixed(2)};

      // タッチテクスチャからの影響
      float combinedTouch = getBlurredTouch(uTouch, uv);

      // シルクウェーブ効果 - 斜めに流れる波
      float wave1 = sin((uv.x + uv.y) * ${config.waveConfig.base.toFixed(1)} + time * 2.0) * 0.5 + 0.5;
      float wave2 = sin((uv.x - uv.y * 0.5) * ${config.waveConfig.variation.toFixed(1)} + time * 1.5 + 1.0) * 0.5 + 0.5;
      float wave3 = sin((uv.x * 0.7 + uv.y * 1.3) * 2.5 + time * 1.8) * 0.5 + 0.5;
      float wave4 = sin((-uv.x + uv.y * 0.8) * 3.5 + time * 1.2) * 0.5 + 0.5;
      ${preset === 'pastel' ? 'float wave5 = sin((uv.x * 1.2 - uv.y * 0.6) * 3.2 + time * 1.6) * 0.5 + 0.5;' : ''}

      // ノイズでウェーブをソフトに
      float n1 = snoise(vec3(uv * 2.0, time * 0.5)) * 0.3 + 0.5;
      float n2 = snoise(vec3(uv * 3.0 + 50.0, time * 0.4)) * 0.3 + 0.5;

      // マウスリップル
      vec2 ripple = vec2(
        snoise(vec3(uv * 5.0, time * 3.0)),
        snoise(vec3(uv * 5.0 + 50.0, time * 3.0))
      ) * combinedTouch * 0.1;

      vec2 distortedUv = uv + ripple;

      // 各ウェーブにノイズを乗せてソフトなエッジに
      wave1 = smoothstep(0.3, 0.7, wave1 * n1);
      wave2 = smoothstep(0.2, 0.8, wave2 * n2);
      wave3 = smoothstep(0.35, 0.65, wave3);
      wave4 = smoothstep(0.25, 0.75, wave4);
      ${preset === 'pastel' ? 'wave5 = smoothstep(0.3, 0.7, wave5);' : ''}

      // ベースカラー
      vec3 color = uColorBg;

      // 重なり合うウェーブ
      color = mix(color, uColor3, wave1 * 0.6);
      color = mix(color, uColor2, wave2 * 0.7);
      color = mix(color, uColor1, wave3 * 0.5);
      color = mix(color, uColor4, wave4 * 0.4);
      ${preset === 'pastel' ? 'color = mix(color, uColor5, wave5 * 0.3);' : ''}

      // 対角線の光沢
      float diagonal = sin((uv.x + uv.y * 0.8) * 5.0 + time) * 0.5 + 0.5;
      diagonal = pow(diagonal, 3.0);
      color = mix(color, uColor5, diagonal * 0.3);

      // タッチで白くモヤ
      color = mix(color, uColor5, combinedTouch * 0.6);

      // シルクの光沢
      float sheen = pow(sin((uv.x - uv.y) * 8.0 + time * 2.0) * 0.5 + 0.5, 4.0);
      color += uColor5 * sheen * 0.15;

      gl_FragColor = vec4(color, 1.0);
    }
  `;
}

interface LiquidGradientUnifiedProps {
  className?: string;
  opacity?: number;
  preset?: PresetKey;
}

export default function LiquidGradientUnified({
  className = '',
  opacity = 1,
  preset = 'silk',
}: LiquidGradientUnifiedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const touchTextureRef = useRef<TouchTexture | null>(null);
  const frameRef = useRef<number>(undefined);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const startTimeRef = useRef<number>(0);

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

    // 開始時刻を初期化
    startTimeRef.current = Date.now();

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const colors = COLOR_PRESETS[preset].colors;

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
      vertexShader: BASIC_VERTEX_SHADER,
      fragmentShader: createFragmentShader(preset),
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uTouch: { value: touchTexture.texture },
        uColor1: { value: colors.color1 },
        uColor2: { value: colors.color2 },
        uColor3: { value: colors.color3 },
        uColor4: { value: colors.color4 },
        uColor5: { value: colors.color5 },
        uColorBg: { value: colors.background },
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
  }, [preset, handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0, opacity }}
    />
  );
}

// 後方互換性のためのエイリアス
export { LiquidGradientUnified as LiquidGradient };
