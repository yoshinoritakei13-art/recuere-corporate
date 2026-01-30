'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ブラウザの自動スクロール復元を無効化し、
 * ページ遷移時にトップに移動する
 */
export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // ブラウザの自動スクロール復元を無効化
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // パスが変わるたびにトップへスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
