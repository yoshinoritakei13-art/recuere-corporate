'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidBackgroundProps {
  className?: string;
}

export default function LiquidBackground({ className = '' }: LiquidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(undefined);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // リキッドシェーダー - より液体っぽく
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      // Simplex noise function
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

      void main() {
        vUv = uv;
        vec3 pos = position;

        // 複数のノイズを重ねてリキッド感を出す
        float noise1 = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * 0.3)) * 0.15;
        float noise2 = snoise(vec3(pos.x * 4.0, pos.y * 4.0, uTime * 0.5)) * 0.08;
        float noise3 = snoise(vec3(pos.x * 8.0, pos.y * 8.0, uTime * 0.7)) * 0.04;

        // マウスの影響 - リップル効果
        float dist = distance(pos.xy, uMouse * 1.5);
        float ripple = sin(dist * 10.0 - uTime * 3.0) * exp(-dist * 2.0) * 0.2;

        pos.z += noise1 + noise2 + noise3 + ripple;

        // 法線計算用
        vPosition = pos;
        vNormal = normalize(vec3(
          snoise(vec3(pos.x * 2.0 + 0.01, pos.y * 2.0, uTime * 0.3)) - noise1,
          snoise(vec3(pos.x * 2.0, pos.y * 2.0 + 0.01, uTime * 0.3)) - noise1,
          0.1
        ));

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      // リキュウレカラー
      vec3 color1 = vec3(0.0, 0.271, 0.510);    // #004582 青
      vec3 color2 = vec3(1.0, 0.6, 1.0);        // #FF99FF ピンク
      vec3 color3 = vec3(0.498, 0.651, 0.749);  // #7FA6BF 水色
      vec3 color4 = vec3(0.902, 0.788, 0.471);  // #E6C978 ゴールド
      vec3 bgColor = vec3(0.918, 0.949, 0.969); // #EAF2F7 背景

      void main() {
        vec2 uv = vUv;
        vec3 normal = normalize(vNormal);

        // 環境マッピング風の反射
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        vec3 reflectDir = reflect(-viewDir, normal);

        // フレネル効果（エッジで反射が強くなる）
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

        // 動的なカラーブレンド
        float t = uTime * 0.2;
        float blend1 = sin(uv.x * 3.0 + t) * 0.5 + 0.5;
        float blend2 = cos(uv.y * 2.0 + t * 1.3) * 0.5 + 0.5;
        float blend3 = sin((uv.x + uv.y) * 2.0 + t * 0.7) * 0.5 + 0.5;

        // ベースカラー
        vec3 baseColor = bgColor;
        baseColor = mix(baseColor, color3, blend1 * 0.4);
        baseColor = mix(baseColor, color1, blend2 * 0.3);
        baseColor = mix(baseColor, color2, blend3 * 0.2);
        baseColor = mix(baseColor, color4, (blend1 * blend2) * 0.15);

        // リキッドハイライト
        float highlight = pow(max(dot(reflectDir, vec3(0.5, 0.5, 1.0)), 0.0), 20.0);
        vec3 highlightColor = mix(vec3(1.0), color3, 0.3);

        // 最終カラー
        vec3 finalColor = baseColor;
        finalColor += highlightColor * highlight * 0.8;
        finalColor += fresnel * 0.15 * color3;

        // 虹色っぽいイリデセンス効果
        float iridescence = sin(vPosition.z * 50.0 + uTime) * 0.5 + 0.5;
        finalColor = mix(finalColor, mix(color2, color4, iridescence), fresnel * 0.2);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Geometry & Material
    const geometry = new THREE.PlaneGeometry(4, 4, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    const animate = () => {
      timeRef.current += 0.016;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (material.uniforms) {
        material.uniforms.uTime.value = timeRef.current;
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
