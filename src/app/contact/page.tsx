'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import ParallaxText from '@/components/ParallaxText';

/**
 * Contact Page - recuere コーポレートサイト
 *
 * NSSG風のミニマルデザイン
 * 企業/個人の切り替えタブ
 * reCAPTCHA v3 + Resend送信
 */

type InquiryType = 'business' | 'personal';

export default function ContactPage() {
  const router = useRouter();
  const [inquiryType, setInquiryType] = useState<InquiryType>('business');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors([]);

    const formData = new FormData(e.currentTarget);

    try {
      // reCAPTCHAトークン取得（設定されている場合のみ）
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as unknown as { grecaptcha?: { execute: (siteKey: string, options: { action: string }) => Promise<string> } }).grecaptcha) {
        const grecaptcha = (window as unknown as { grecaptcha: { execute: (siteKey: string, options: { action: string }) => Promise<string> } }).grecaptcha;
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) {
          recaptchaToken = await grecaptcha.execute(siteKey, { action: 'contact' });
        }
      }

      const data = {
        type: inquiryType,
        company: formData.get('company') as string || undefined,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || undefined,
        message: formData.get('message') as string,
        recaptchaToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          setFieldErrors(result.details);
        }
        throw new Error(result.error || '送信に失敗しました');
      }

      // 送信完了ページへ
      router.push('/contact/thanks');
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };

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

      <div className="relative">
        {/* Hero Section */}
        <section className="relative pt-[180px] pb-[20px] px-8 max-md:pt-[120px] max-md:pb-[10px] overflow-hidden">
          {/* 白グラデーションオーバーレイ */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.95) 80%, rgba(255,255,255,1) 100%)',
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto text-left">
            <FadeIn blur>
              <p className="tracking-[0.3em] text-[0.7rem] text-[#666] mb-8 uppercase">Contact</p>
            </FadeIn>
            <ParallaxText
              text="お問い合わせ"
              delay={100}
              charDelay={60}
              className="font-sans text-[clamp(2rem,4vw,3rem)] tracking-[0.02em] font-normal leading-[1.5] text-[#333] mb-4"
            />
            <FadeIn blur delay={0.2}>
              <p className="text-[0.95rem] leading-[2.0] text-[#666]">
                ご相談・ご質問など、お気軽にお問い合わせください。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Form Section - パステル背景のまま */}
        <section className="relative pt-[60px] pb-[120px] px-8 max-md:pt-[40px] max-md:pb-[80px] z-10">
          {/* 薄い白オーバーレイ */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.7) 100%)',
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto">
            {/* すりガラス風フォームカード */}
            <FadeIn blur delay={0.1}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                }}
              >
                {/* タブヘッダー */}
                <div className="flex">
                  {/* 企業の方タブ */}
                  <button
                    type="button"
                    onClick={() => setInquiryType('business')}
                    className="flex-1 py-5 text-[0.95rem] tracking-[0.05em] transition-all duration-300 rounded-tl-2xl"
                    style={{
                      backgroundColor: inquiryType === 'business' ? '#ffffff' : '#f5f0eb',
                      color: inquiryType === 'business' ? '#333' : '#888',
                      fontWeight: inquiryType === 'business' ? '500' : '400',
                    }}
                  >
                    企業の方
                  </button>
                  {/* 個人の方タブ */}
                  <button
                    type="button"
                    onClick={() => setInquiryType('personal')}
                    className="flex-1 py-5 text-[0.95rem] tracking-[0.05em] transition-all duration-300 rounded-tr-2xl"
                    style={{
                      backgroundColor: inquiryType === 'personal' ? '#ffffff' : '#f5f0eb',
                      color: inquiryType === 'personal' ? '#333' : '#888',
                      fontWeight: inquiryType === 'personal' ? '500' : '400',
                    }}
                  >
                    個人の方
                  </button>
                </div>

                {/* フォームエリア */}
                <div className="p-6 md:p-8 bg-white">
                {/* エラー表示 */}
                {(error || fieldErrors.length > 0) && (
                  <div className="mb-8 p-4 bg-[#fff5f5] border border-[#ffcccc] text-[#cc6666] text-[0.9rem] rounded-lg">
                    {error && <p>{error}</p>}
                    {fieldErrors.length > 0 && (
                      <ul className="list-disc list-inside mt-2">
                        {fieldErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* フォーム */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* 会社名（企業向けのみ） */}
                    {inquiryType === 'business' && (
                      <div>
                        <label className="block text-[0.85rem] text-[#555] mb-2 font-medium">
                          会社名 <span className="text-[#cc6666]">*</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          className="w-full px-4 py-4 text-[1rem] bg-white/80 border border-[#e0e0e0] rounded-lg focus:border-[#333] focus:outline-none focus:bg-white transition-all duration-300"
                          placeholder="株式会社〇〇"
                        />
                      </div>
                    )}

                    {/* お名前 */}
                    <div>
                      <label className="block text-[0.85rem] text-[#555] mb-2 font-medium">
                        お名前 <span className="text-[#cc6666]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-4 text-[1rem] bg-white/80 border border-[#e0e0e0] rounded-lg focus:border-[#333] focus:outline-none focus:bg-white transition-all duration-300"
                        placeholder="山田 太郎"
                      />
                    </div>

                    {/* メールアドレス */}
                    <div>
                      <label className="block text-[0.85rem] text-[#555] mb-2 font-medium">
                        メールアドレス <span className="text-[#cc6666]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-4 text-[1rem] bg-white/80 border border-[#e0e0e0] rounded-lg focus:border-[#333] focus:outline-none focus:bg-white transition-all duration-300"
                        placeholder="example@email.com"
                      />
                    </div>

                    {/* 電話番号 */}
                    <div>
                      <label className="block text-[0.85rem] text-[#555] mb-2 font-medium">
                        電話番号 <span className="text-[0.75rem] text-[#999]">（任意）</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-4 text-[1rem] bg-white/80 border border-[#e0e0e0] rounded-lg focus:border-[#333] focus:outline-none focus:bg-white transition-all duration-300"
                        placeholder="090-1234-5678"
                      />
                    </div>

                    {/* お問い合わせ内容 */}
                    <div>
                      <label className="block text-[0.85rem] text-[#555] mb-2 font-medium">
                        お問い合わせ内容 <span className="text-[#cc6666]">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        className="w-full px-4 py-4 text-[1rem] bg-white/80 border border-[#e0e0e0] rounded-lg focus:border-[#333] focus:outline-none focus:bg-white transition-all duration-300 resize-none"
                        placeholder={
                          inquiryType === 'business'
                            ? 'ご相談内容をご記入ください（例：経営課題について相談したい、研修について詳しく知りたい など）'
                            : 'ご相談内容をご記入ください（例：セッションについて詳しく知りたい、自分に合うサービスを相談したい など）'
                        }
                      />
                    </div>

                    {/* 送信ボタン */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 text-[0.95rem] tracking-[0.1em] font-medium transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                        style={{
                          backgroundColor: isSubmitting ? '#e8e3de' : '#f5f0eb',
                          color: '#333',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) e.currentTarget.style.backgroundColor = '#ebe6e1';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) e.currentTarget.style.backgroundColor = '#f5f0eb';
                        }}
                      >
                        {isSubmitting ? '送信中...' : '送信する'}
                      </button>
                    </div>

                    {/* 注意事項 */}
                    <p className="text-[0.8rem] text-[#888] leading-[1.8] text-center">
                      ※ 通常2〜3営業日以内にご返信いたします
                    </p>
                  </div>
                </form>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </>
  );
}
