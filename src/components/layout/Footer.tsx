'use client';

import Link from 'next/link';

/**
 * Footer Component
 *
 * 白背景のフッター
 * - 左上: ロゴ
 * - 左: MENUラベル + ナビリンク（縦並び）
 * - 右上: ページトップへ戻るボタン
 * - 下部: 法的リンク + コピーライト
 */

const MENU_ITEMS = [
  { href: '/', label: 'Top' },
  { href: '/company', label: 'Company' },
  { href: '/philosophy', label: 'Mission' },
  { href: '/services', label: 'Services' },
  { href: '/session', label: 'Session' },
  { href: '/hypnotherapy', label: 'Hypnotherapy' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-50 bg-white">
      {/* メインコンテンツ */}
      <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-12">
        {/* 上部: ロゴ + トップへ戻るボタン */}
        <div className="flex justify-between items-start mb-12">
          <p
            className="text-xl font-normal tracking-[0.08em] text-[#333]"
            style={{ fontFamily: "'Sweet Apricot', cursive" }}
          >
            recuere®
          </p>

          {/* ページトップへ戻るボタン */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-[#ddd] flex items-center justify-center text-[#999] hover:text-[#333] hover:border-[#999] transition-all duration-300"
            aria-label="ページトップへ戻る"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>

        {/* メニュー */}
        <div className="mb-16">
          <p className="text-[0.7rem] tracking-[0.2em] text-[#999] uppercase mb-6">Menu</p>
          <nav className="flex flex-col gap-3">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 下部: 法的リンク + コピーライト */}
      <div className="border-t border-[#eee]">
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 text-[0.75rem] text-[#888]">
              <Link
                href="/legal"
                className="hover:text-[#555] transition-colors duration-300"
              >
                特定商取引法に基づく表記
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[#555] transition-colors duration-300"
              >
                プライバシーポリシー
              </Link>
            </div>
            <p className="text-[0.7rem] text-[#999]">
              &copy; {currentYear} recuere All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
