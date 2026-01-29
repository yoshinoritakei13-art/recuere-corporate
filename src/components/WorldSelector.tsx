'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WorldSelector() {
  const [hoveredWorld, setHoveredWorld] = useState<'none' | 'consulting' | 'counseling'>('none');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 - ホバーで変化 */}
      <div className="absolute inset-0 transition-all duration-700">
        {/* ベース - ダーク */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            hoveredWorld === 'none' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0f0f1a 50%, #050510 100%)',
          }}
        />
        {/* コンサル - 青の世界 */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            hoveredWorld === 'consulting' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, #1a3a5c 0%, #0f2a4a 40%, #051525 100%)',
          }}
        />
        {/* カウンセリング - パステルの世界 */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            hoveredWorld === 'counseling' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse at 70% 60%, #3d2a4a 0%, #2a1a3a 40%, #150f20 100%)',
          }}
        />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12">
        {/* タイトル */}
        <div className="text-center mb-16 md:mb-24">
          <p className="tracking-[0.3em] text-[0.7rem] text-neutral-400 mb-6 uppercase">Choose Your Path</p>
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-wide text-neutral-200 leading-relaxed">
            どちらの世界から始めますか？
          </h2>
        </div>

        {/* 2つの選択肢 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* コンサルティング */}
          <Link
            href="/services"
            className="group relative"
            onMouseEnter={() => setHoveredWorld('consulting')}
            onMouseLeave={() => setHoveredWorld('none')}
          >
            <div className="relative p-8 md:p-12 border border-neutral-700 hover:border-blue-400/50 transition-all duration-500 bg-black/20 backdrop-blur-sm hover:bg-blue-950/30">
              {/* 光の演出 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <p className="text-[0.7rem] tracking-[0.2em] text-blue-300/70 mb-4 uppercase">For Business</p>
                <h3 className="text-[1.8rem] md:text-[2.2rem] font-light tracking-wide text-neutral-100 mb-6">
                  Consulting
                </h3>
                <p className="text-neutral-400 leading-[1.9] mb-8 text-[0.95rem]">
                  気づきと整えてから進む世界
                </p>
                <p className="text-neutral-500 leading-[1.8] text-[0.85rem] mb-10">
                  経営の意思決定を、再現性ある仕組みへ。<br />
                  論理と感性を融合した支援で、<br />
                  組織の持続的成長を実現します。
                </p>

                <div className="flex items-center text-[0.8rem] tracking-[0.1em] text-neutral-400 group-hover:text-blue-300 transition-colors duration-300">
                  <span>Enter this world</span>
                  <span className="ml-4 w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-12"></span>
                </div>
              </div>
            </div>
          </Link>

          {/* カウンセリング */}
          <Link
            href="/session"
            className="group relative"
            onMouseEnter={() => setHoveredWorld('counseling')}
            onMouseLeave={() => setHoveredWorld('none')}
          >
            <div className="relative p-8 md:p-12 border border-neutral-700 hover:border-purple-300/50 transition-all duration-500 bg-black/20 backdrop-blur-sm hover:bg-purple-950/30">
              {/* 光の演出 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <p className="text-[0.7rem] tracking-[0.2em] text-purple-300/70 mb-4 uppercase">For Individual</p>
                <h3 className="text-[1.8rem] md:text-[2.2rem] font-light tracking-wide text-neutral-100 mb-6">
                  Counseling
                </h3>
                <p className="text-neutral-400 leading-[1.9] mb-8 text-[0.95rem]">
                  委ねてから気づく世界
                </p>
                <p className="text-neutral-500 leading-[1.8] text-[0.85rem] mb-10">
                  本当の願いに気づき、<br />
                  行動が自然に続く状態へ。<br />
                  心の奥にある答えを一緒に見つけます。
                </p>

                <div className="flex items-center text-[0.8rem] tracking-[0.1em] text-neutral-400 group-hover:text-purple-300 transition-colors duration-300">
                  <span>Enter this world</span>
                  <span className="ml-4 w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-12"></span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
