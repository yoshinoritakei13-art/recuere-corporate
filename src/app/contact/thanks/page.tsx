'use client';

import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

/**
 * Contact Thanks Page - recuere コーポレートサイト
 *
 * お問い合わせ送信完了ページ
 */

export default function ContactThanksPage() {
  return (
    <>
      {/* パステル背景画像 - 固定配置 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/S__68460551.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center">
        {/* 白オーバーレイ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
          }}
        />

        <div className="relative z-10 max-w-[600px] mx-auto px-8 py-20 text-center">
          <FadeIn>
            <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-8 uppercase">Thank you</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] tracking-[0.02em] font-light leading-[1.6] text-[#333] mb-8">
              お問い合わせを<br className="md:hidden" />
              受け付けました
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[0.95rem] leading-[2.2] text-[#555] mb-12">
              この度はお問い合わせいただき、<br />
              ありがとうございます。<br /><br />
              内容を確認の上、<br />
              2〜3営業日以内にご連絡いたします。<br />
              今しばらくお待ちくださいませ。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link
              href="/"
              className="inline-flex items-center text-[0.85rem] tracking-[0.1em] text-[#333] hover:text-[#7FA6BF] transition-colors duration-300"
            >
              トップページへ戻る
              <span className="ml-4 w-10 h-[1px] bg-current"></span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
