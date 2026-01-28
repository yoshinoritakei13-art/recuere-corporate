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
    <footer className="bg-white relative z-50">
      {/* 上部: ロゴ + ナビゲーション */}
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 relative">
          {/* 左側: ロゴ + 説明 */}
          <div>
            <p className="text-xl font-normal tracking-[0.08em] text-[#333] mb-4" style={{ fontFamily: "'Sweet Apricot', cursive" }}>
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
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Top
              </Link>
              <Link
                href="/company"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Company
              </Link>
              <Link
                href="/philosophy"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Philosophy
              </Link>
              <Link
                href="/services"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Services
              </Link>
            </div>
            {/* 右列 */}
            <div className="flex flex-col gap-3">
              <Link
                href="/session"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Session
              </Link>
              <Link
                href="/hypnotherapy"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Hypnotherapy
              </Link>
              <Link
                href="/contact"
                className="text-[0.85rem] text-[#555] transition-colors duration-300 hover:text-[#333]"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* 下部: 法的リンク + コピーライト */}
      <div className="border-t border-[#eee]">
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex gap-4 text-[0.8rem] text-[#555]">
              <Link
                href="/legal"
                className="hover:text-[#555] transition-colors duration-300"
              >
                特定商取引法に基づく表記
              </Link>
              <span className="text-[#ddd]">|</span>
              <Link
                href="/privacy"
                className="hover:text-[#555] transition-colors duration-300"
              >
                プライバシーポリシー
              </Link>
            </div>
            <p className="text-[0.7rem] text-[#999]">
              &copy; {currentYear} recuere All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
