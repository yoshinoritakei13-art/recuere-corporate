'use client';

import FadeIn from '@/components/FadeIn';
import ArrowLink from '@/components/ArrowLink';

/**
 * ContactCTA - 共通CTAセクションコンポーネント
 *
 * @param variant - 'light' (白背景) | 'dark' (青グラデーション背景)
 * @param title - 見出しテキスト（デフォルト: まずは、お気軽にご相談ください）
 * @param description - 説明テキスト
 * @param linkText - リンクテキスト（デフォルト: Contact Us）
 * @param className - 追加のクラス名
 * @param sticky - スティッキー動作を有効にするか（Company用）
 */

interface ContactCTAProps {
  variant?: 'light' | 'dark';
  title?: React.ReactNode;
  description?: React.ReactNode;
  linkText?: string;
  className?: string;
  sticky?: boolean;
}

export default function ContactCTA({
  variant = 'light',
  title,
  description,
  linkText = 'Contact Us',
  className = '',
  sticky = false,
}: ContactCTAProps) {
  const isLight = variant === 'light';

  // デフォルトテキスト
  const defaultTitle = (
    <>
      まずは、お気軽に<br className="md:hidden" />ご相談ください
    </>
  );

  const defaultDescription = (
    <>
      企業の課題整理から、個人の内面の整理まで。<br className="hidden md:block" />
      目的に合わせて、最適な関わり方をご提案します。
    </>
  );

  // スタイル定義
  const sectionStyles = isLight
    ? sticky
      ? 'sticky top-[50vh] md:top-[85vh] pt-[60px] pb-[60px] px-8 md:pt-[140px] md:pb-[80px] bg-white z-30'
      : 'relative pt-[80px] md:pt-[100px] pb-[60px] md:pb-[80px] px-6 md:px-8 bg-white z-40'
    : 'relative py-[80px] md:py-[120px] px-8 overflow-hidden';

  const labelColor = isLight ? 'text-[var(--color-navy)]' : 'text-white/50';
  const titleColor = isLight ? 'text-[var(--color-text)]' : 'text-white';
  const descColor = isLight ? 'text-[var(--color-text-muted)]' : 'text-white/70';

  return (
    <section
      className={`${sectionStyles} ${className}`}
      style={sticky ? { boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.1)' } : undefined}
    >
      {/* 青背景グラデーション（darkのみ） */}
      {!isLight && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #002d5a 0%, #004582 50%, #1a5a8a 100%)' }}
        />
      )}

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <FadeIn>
          <p className={`tracking-[0.3em] text-[0.7rem] ${labelColor} mb-10 uppercase`}>
            Contact
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className={`text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] font-extralight leading-[1.4] ${titleColor} mb-10`}>
            {title || defaultTitle}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className={`${descColor} leading-[2.2] mb-14 font-light text-body-md`}>
            {description || defaultDescription}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <ArrowLink href="/contact" variant={isLight ? 'dark' : 'light'}>
            {linkText}
          </ArrowLink>
        </FadeIn>
      </div>
    </section>
  );
}
