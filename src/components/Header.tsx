'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ========================================
   Constants
   ======================================== */

const MENU_ITEMS = [
  { href: '/company', label: 'Company' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/services', label: 'Services' },
  { href: '/session', label: 'Session' },
  { href: '/hypnotherapy', label: 'Hypnotherapy' },
  { href: '/contact', label: 'Contact' },
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
  return (
    <nav className="flex gap-8 items-center max-md:hidden">
      {MENU_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-[0.8rem] tracking-[0.1em] font-normal text-foreground/70 transition-colors duration-300 hover:text-primary uppercase"
        >
          {item.label}
        </Link>
      ))}
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
        <span className="text-[0.75rem] tracking-[0.15em] text-[#333]/60 uppercase">
          Close
        </span>
      )}
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
      className={`fixed inset-0 z-[99] bg-[#1a1a2e] md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="flex flex-col justify-center h-full px-8">
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
                  className="block text-[1.8rem] font-light text-white tracking-[0.02em] py-2 hover:text-white/80 transition-colors"
                  onClick={onClose}
                >
                  {item.label}
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
          <p className="text-[0.75rem] text-white/40 tracking-[0.05em]">
            recuere Inc.
          </p>
          <p className="text-[0.75rem] text-white/40 tracking-[0.05em]">
            Tokyo, JAPAN
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
      <header className="fixed top-0 left-0 right-0 z-[100] px-12 py-6 flex justify-between items-center bg-white/85 backdrop-blur-xl border-b border-black/[0.03] max-md:px-6 max-md:py-4">
        <Logo />
        <DesktopNav />
        <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </header>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
