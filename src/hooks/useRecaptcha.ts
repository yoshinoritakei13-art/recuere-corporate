/**
 * reCAPTCHA v3 フック（要件定義 Section 6）
 *
 * 使用方法:
 * const { executeRecaptcha, isReady } = useRecaptcha();
 * const token = await executeRecaptcha('contact');
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // reCAPTCHAが未設定の場合はスキップ
    if (!RECAPTCHA_SITE_KEY) {
      setIsReady(true);
      return;
    }

    // 既にスクリプトが読み込まれている場合
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setIsReady(true));
      return;
    }

    // スクリプトを動的に読み込む
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => setIsReady(true));
    };

    document.head.appendChild(script);

    return () => {
      // クリーンアップ時にスクリプトを削除しない（他のコンポーネントで使用される可能性があるため）
    };
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string> => {
    // reCAPTCHAが未設定の場合はダミートークンを返す
    if (!RECAPTCHA_SITE_KEY) {
      return 'dummy-token';
    }

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  }, []);

  return { executeRecaptcha, isReady };
}
