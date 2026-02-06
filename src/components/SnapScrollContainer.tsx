'use client';

import { ReactNode } from 'react';

/* ========================================
   CSS Snap Scroll Container

   軽量なCSSネイティブスナップスクロール実装
   - JSによるスクロール制御を廃止
   - ブラウザネイティブのスナップ機能を使用
   - Windows環境でもスムーズに動作
   ======================================== */

interface SnapScrollContainerProps {
  children: ReactNode;
}

export default function SnapScrollContainer({ children }: SnapScrollContainerProps) {
  return (
    <div className="snap-scroll-container">
      {children}
    </div>
  );
}
