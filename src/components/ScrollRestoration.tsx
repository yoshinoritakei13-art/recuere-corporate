'use client';

import { useEffect } from 'react';

/**
 * ブラウザの自動スクロール復元を無効化し、
 * ページ読み込み時にトップに移動する
 */
export default function ScrollRestoration() {
  useEffect(() => {
    // ブラウザの自動スクロール復元を無効化
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // ページ読み込み時にトップへ
    window.scrollTo(0, 0);
  }, []);

  return null;
}
