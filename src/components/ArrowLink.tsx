'use client';

import Link from 'next/link';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light'; // dark = 黒矢印（白背景用）, light = 白矢印（暗い背景用）
}

/**
 * ArrowLink - ホバーで矢印が右に進むリンクコンポーネント
 *
 * 通常時: —〉 テキスト
 * ホバー時: → テキスト（矢印が右に移動）
 */
export default function ArrowLink({
  href,
  children,
  className = '',
  variant = 'dark'
}: ArrowLinkProps) {
  const isDark = variant === 'dark';
  const color = isDark ? '#1a1a1a' : '#ffffff';

  return (
    <Link
      href={href}
      className={`group inline-flex items-center text-[0.85rem] tracking-[0.05em] transition-all duration-300 ${className}`}
      style={{ color }}
    >
      {/* 矢印部分 - ホバーで右にスライドして文字に近づく */}
      <span className="relative flex items-center w-[28px] mr-2 transition-all duration-300 ease-out group-hover:w-[20px] group-hover:mr-1">
        {/* 通常時: —〉 (離れている) */}
        <span className="absolute right-0 flex items-center transition-opacity duration-300 group-hover:opacity-0">
          <span
            className="block w-3 h-[1px]"
            style={{ backgroundColor: color }}
          />
          <span className="w-[6px]" /> {/* 隙間 */}
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
          >
            <path
              d="M1.5 1L6.5 6L1.5 11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* ホバー時: → (くっついた一体型矢印) */}
        <span className="absolute right-0 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
          >
            <path
              d="M0 6H15M10 1L15 6L10 11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>

      {/* テキスト */}
      <span>
        {children}
      </span>
    </Link>
  );
}
