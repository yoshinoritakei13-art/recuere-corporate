'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/* ========================================
   Constants
   ======================================== */

const MENU_ITEMS = [
  { href: '/', label: 'Top', labelJa: 'トップ' },
  { href: '/company', label: 'Company', labelJa: '会社概要' },
  { href: '/philosophy', label: 'Mission', labelJa: '理念' },
  { href: '/services', label: 'Consulting', labelJa: 'コンサルティング' },
  { href: '/session', label: 'Personal Session', labelJa: '個人セッション' },
  { href: '/hypnotherapy', label: 'Hypnotherapy', labelJa: 'ヒプノセラピー' },
  { href: '/contact', label: 'Contact', labelJa: 'お問い合わせ' },
] as const;

const ANIMATION_BASE_DELAY = 230;
const ANIMATION_ITEM_DELAY = 90;

/* ========================================
   Sub Components
   ======================================== */

/** ロゴ */
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-2xl font-normal tracking-[0.02em] text-primary hover:text-tertiary transition-colors"
      style={{ fontFamily: "'Sweet Apricot', cursive" }}
    >
      <Image
        src="/images/recuereicon.png"
        alt="recuere"
        width={24}
        height={24}
      />
      recuere
    </Link>
  );
}

/** デスクトップナビゲーション */
function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5 items-center max-md:hidden">
      {MENU_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[0.75rem] tracking-[0.05em] font-normal transition-colors duration-300 hover:text-primary uppercase relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-foreground/70 after:transition-transform after:duration-300 after:origin-center ${
              isActive ? 'text-foreground/90 after:scale-x-100' : 'text-foreground/70 after:scale-x-0'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** ハンバーガーボタン */
function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  const lineBaseClass = 'block w-6 h-[1.5px] bg-[#333] transition-all duration-300';

  return (
    <button
      type="button"
      className="hidden max-md:flex items-center gap-3 z-[101]"
      onClick={onClick}
      aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
      aria-expanded={isOpen}
    >
      {isOpen && (
        <span className="text-[0.65rem] tracking-[0.15em] text-[#333]/60 uppercase">
          Close
        </span>
      )}
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-8 h-8 gap-1.5">
          <span
            className={`${lineBaseClass} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span
            className={`${lineBaseClass} ${isOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`${lineBaseClass} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </div>
        {!isOpen && (
          <span className="text-[0.55rem] tracking-[0.1em] text-[#333]/60 uppercase -mt-1">
            Menu
          </span>
        )}
      </div>
    </button>
  );
}

/** モバイルメニューオーバーレイ */
function MobileMenuOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[99] md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {/* ベースのダーク背景 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0f0f1a 50%, #050510 100%)',
        }}
      />
      {/* 背景画像（hero-bg.jpg） */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/heroimage.jpg)',
          filter: 'saturate(0.4)',
        }}
      />
      {/* 白オーバーレイで明るく */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255,255,255,0.25)',
        }}
      />
      {/* 中央の光 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="relative flex flex-col justify-center h-full px-8">
        {/* ナビゲーションリンク */}
        <nav>
          <ul className="grid gap-y-3">
            {MENU_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className={`transition-all duration-[900ms] ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
                style={{
                  transitionDelay: `${ANIMATION_BASE_DELAY + index * ANIMATION_ITEM_DELAY}ms`,
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-baseline gap-3 py-2 hover:opacity-80 transition-opacity"
                  style={{ color: '#1a1a2e' }}
                  onClick={onClose}
                >
                  <span className="text-[1.8rem] font-light tracking-[0.02em]">{item.label}</span>
                  <span className="text-[0.85rem] text-gray-500">{item.labelJa}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* フッター情報 */}
        <div
          className={`absolute bottom-12 left-8 right-8 transition-all duration-[900ms] ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
          style={{
            transitionDelay: `${ANIMATION_BASE_DELAY + MENU_ITEMS.length * ANIMATION_ITEM_DELAY}ms`,
          }}
        >
          <p className="text-[0.75rem] text-[#1a1a2e]/50 tracking-[0.05em]">
            recuere
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   Main Component
   ======================================== */

/**
 * Header Component
 *
 * グローバルナビゲーション
 * - 固定ヘッダー（backdrop-filter でガラスモーフィズム効果）
 * - ロゴ + メインナビゲーション
 * - モバイル: フルスクリーンメニュー + アニメーション
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // メニューが開いている間はスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="relative w-full z-[100] px-12 py-6 flex justify-between items-center bg-white border-b border-black/[0.03] max-md:px-6 max-md:py-4">
        <Logo />
        <DesktopNav />
        <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </header>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
