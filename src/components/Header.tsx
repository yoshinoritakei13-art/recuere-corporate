'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Header Component
 *
 * グローバルナビゲーション
 * - 固定ヘッダー（backdrop-filter でガラスモーフィズム効果）
 * - ロゴ + メインナビゲーション
 * - モバイル: フルスクリーン白メニュー + clip-pathアニメーション
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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

  const menuItems = [
    { href: '/', label: 'Top' },
    { href: '/company', label: 'Company' },
    { href: '/philosophy', label: 'Philosophy' },
    { href: '/services', label: 'Services' },
    { href: '/session', label: 'Session' },
    { href: '/hypnotherapy', label: 'Hypnotherapy' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-12 py-6 flex justify-between items-center bg-white/85 backdrop-blur-xl border-b border-black/[0.03] max-md:px-6 max-md:py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-normal tracking-[0.08em] text-primary hover:text-tertiary transition-colors">
          <Image src="/images/recuereicon.png" alt="recuere" width={24} height={24} />
          recuere®
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex gap-8 items-center max-md:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.8rem] tracking-[0.1em] font-normal text-foreground/70 transition-colors duration-300 hover:text-primary uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="hidden max-md:flex items-center gap-3 z-[101]"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen && (
            <span className="text-[0.75rem] tracking-[0.15em] text-[#1a1a1a]/60 uppercase">Close</span>
          )}
          <div className="flex flex-col justify-center items-center w-8 h-8 gap-1.5">
            <span
              className={`block w-6 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>
      </header>

      {/* Mobile Full Screen Menu - Navy */}
      <div
        className={`fixed inset-0 z-[99] bg-[#1a1a2e] md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center h-full px-8">
          {/* Navigation Links */}
          <nav>
            <ul className="grid gap-y-3">
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  className={`transition-all duration-[900ms] ${
                    isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                  }`}
                  style={{ transitionDelay: `${230 + index * 90}ms` }}
                >
                  <Link
                    href={item.href}
                    className="block text-[1.8rem] font-light text-white tracking-[0.02em] py-2 hover:text-white/80 transition-colors"
                    style={{ color: '#ffffff' }}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Info */}
          <div
            className={`absolute bottom-12 left-8 right-8 transition-all duration-[900ms] ${
              isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
            style={{ transitionDelay: `${230 + menuItems.length * 90}ms` }}
          >
            <p className="text-[0.75rem] text-white/40 tracking-[0.05em]">recuere Inc.</p>
            <p className="text-[0.75rem] text-white/40 tracking-[0.05em]">Tokyo, JAPAN</p>
          </div>
        </div>
      </div>
    </>
  );
}
