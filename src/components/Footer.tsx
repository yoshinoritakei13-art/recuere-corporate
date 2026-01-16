import Link from 'next/link';

/**
 * Footer Component
 *
 * サイトフッター
 * - 左: ロゴ + 説明
 * - 右: ナビゲーションリンク（縦並び）
 * - 下部: 会社情報 + コピーライト
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      {/* 上部: ロゴ + ナビゲーション */}
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 relative">
          {/* 左側: ロゴ + 説明 */}
          <div>
            <p className="text-xl font-normal tracking-[0.08em] text-[#1a1a1a] mb-4">
              recuere®
            </p>
            <p className="text-[0.85rem] leading-[1.8] text-[#666] mb-6">
              気づきから、豊かさへ。<br />
              人と組織の可能性を解き放つ
            </p>
          </div>

          {/* 中央: ナビゲーション（2列で縦並び） */}
          <nav className="flex gap-12 md:absolute md:left-1/2 md:-translate-x-1/2">
            {/* 左列 */}
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Top
              </Link>
              <Link
                href="/company"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Company
              </Link>
              <Link
                href="/philosophy"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Philosophy
              </Link>
              <Link
                href="/services"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Services
              </Link>
            </div>
            {/* 右列 */}
            <div className="flex flex-col gap-3">
              <Link
                href="/session"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Session
              </Link>
              <Link
                href="/hypnotherapy"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Hypnotherapy
              </Link>
              <Link
                href="/contact"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#1a1a1a]"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* 下部: コピーライト */}
      <div className="border-t border-[#eee]">
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <p className="text-[0.7rem] text-[#999]">
            &copy; {currentYear} recuere Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
