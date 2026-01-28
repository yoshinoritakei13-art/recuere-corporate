'use client';

import FadeIn from '@/components/FadeIn';

/**
 * SectionHeader - 共通セクションヘッダーコンポーネント
 *
 * 各ページで繰り返し使われる「ラベル + タイトル + 説明」パターンを統一
 *
 * @param label - 上部のラベル（例: "Services", "Philosophy"）
 * @param title - メインタイトル
 * @param description - 説明文（オプション）
 * @param variant - 'light' (白/グレー背景用) | 'dark' (紺/青背景用)
 * @param align - 'left' | 'center'
 * @param className - 追加のクラス名
 */

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
  labelDelay?: number;
  titleDelay?: number;
  descDelay?: number;
}

export default function SectionHeader({
  label,
  title,
  description,
  variant = 'light',
  align = 'left',
  className = '',
  labelDelay = 0,
  titleDelay = 0.1,
  descDelay = 0.15,
}: SectionHeaderProps) {
  const isLight = variant === 'light';
  const isCenter = align === 'center';

  // カラー定義
  const labelColor = isLight ? 'text-[var(--color-navy)]' : 'text-white/60';
  const titleColor = isLight ? 'text-[var(--color-text)]' : 'text-white';
  const descColor = isLight ? 'text-[var(--color-text-muted)]' : 'text-white/70';

  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className}`}>
      <FadeIn delay={labelDelay}>
        <p className={`tracking-wide-4xl text-label-xs ${labelColor} mb-6 uppercase font-medium`}>
          {label}
        </p>
      </FadeIn>
      <FadeIn delay={titleDelay}>
        <h2 className={`text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em] font-extralight leading-[1.3] ${titleColor} mb-6`}>
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={descDelay}>
          <p className={`${descColor} leading-[2] max-w-md font-light`}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
