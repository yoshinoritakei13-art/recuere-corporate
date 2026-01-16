/**
 * お問い合わせAPI（要件定義 P-005, Section 6）
 * POST /api/contact
 *
 * 処理フロー:
 * 1. reCAPTCHAトークン検証
 * 2. スコア閾値判定
 * 3. フォームデータバリデーション
 * 4. 送信先振り分け（企業/個人）
 * 5. Resendでメール送信（管理者通知 + 自動返信）
 *
 * 参考: poprockweb-main/api/contact/submit.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// 型定義
interface ContactFormData {
  type: 'business' | 'personal';
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  recaptchaToken: string;
}

interface ReCaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

// reCAPTCHA検証
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    return { success: true, score: 1.0 };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: ReCaptchaResponse = await response.json();

    return {
      success: data.success,
      score: data.score || 0,
    };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return { success: false, score: 0 };
  }
}

// バリデーション
function validateFormData(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 共通バリデーション
  if (!data.name || data.name.length < 1) {
    errors.push('お名前は必須です');
  } else if (data.name.length > 50) {
    errors.push('お名前は50文字以内で入力してください');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('有効なメールアドレスを入力してください');
  }

  if (!data.message || data.message.length < 10) {
    errors.push('お問い合わせ内容は10文字以上で入力してください');
  } else if (data.message.length > 2000) {
    errors.push('お問い合わせ内容は2000文字以内で入力してください');
  }

  // 電話番号（任意）
  if (data.phone && !/^[0-9\-+()]{10,15}$/.test(data.phone)) {
    errors.push('電話番号の形式が正しくありません');
  }

  // 企業向け追加バリデーション
  if (data.type === 'business') {
    if (!data.company || data.company.length < 1) {
      errors.push('会社名は必須です');
    } else if (data.company.length > 100) {
      errors.push('会社名は100文字以内で入力してください');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 管理者通知メール送信
 */
async function sendAdminNotification(
  resend: Resend,
  data: ContactFormData,
  submittedAt: string
): Promise<void> {
  const typeLabel = data.type === 'business' ? '企業の方' : '個人の方';
  const toEmail = data.type === 'business'
    ? process.env.CONTACT_EMAIL_BUSINESS || process.env.CONTACT_ADMIN_EMAIL || 'info@recuere.com'
    : process.env.CONTACT_EMAIL_PERSONAL || process.env.CONTACT_ADMIN_EMAIL || 'info@recuere.com';

  const subject = data.type === 'business'
    ? `【recuere】企業お問い合わせ: ${data.company}`
    : `【recuere】個人お問い合わせ: ${data.name}`;

  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || 'noreply@recuere.com',
    to: toEmail,
    subject,
    replyTo: data.email,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #1a1a1a; font-weight: 400; border-bottom: 1px solid #eee; padding-bottom: 16px;">
          お問い合わせがありました
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; width: 120px;">種別</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${typeLabel}</td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888;">会社名</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${data.company}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888;">お名前</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888;">メールアドレス</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888;">電話番号</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${data.phone || '未入力'}</td>
          </tr>
        </table>

        <div style="margin-top: 32px;">
          <p style="color: #888; margin-bottom: 12px;">お問い合わせ内容:</p>
          <div style="background-color: #f9f9f9; padding: 20px; white-space: pre-wrap; line-height: 1.8;">${data.message}</div>
        </div>

        <p style="margin-top: 32px; color: #999; font-size: 12px;">送信日時: ${submittedAt}</p>
      </div>
    `,
  });
}

/**
 * 自動返信メール送信
 */
async function sendAutoReply(
  resend: Resend,
  data: ContactFormData
): Promise<void> {
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || 'noreply@recuere.com',
    to: data.email,
    subject: '【recuere】お問い合わせありがとうございます',
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.9;">
        <p style="margin-bottom: 24px;">${data.name} 様</p>

        <p>この度はお問い合わせいただき、誠にありがとうございます。</p>

        <p>以下の内容でお問い合わせを受け付けました。<br>
        内容を確認の上、2〜3営業日以内にご連絡いたします。</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

        <div style="background-color: #f9f9f9; padding: 24px;">
          <p style="margin: 0 0 16px 0; color: #888;">お問い合わせ内容:</p>
          <div style="white-space: pre-wrap;">${data.message}</div>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

        <p style="color: #999; font-size: 12px;">
          ※このメールは自動送信です。<br>
          ご不明な点がございましたら、このメールにご返信ください。
        </p>

        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #1a1a1a;">recuere®（リキュウレ®）</p>
          <p style="margin: 8px 0 0 0; color: #888; font-size: 12px;">https://recuere.com</p>
        </div>
      </div>
    `,
  });
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // 1. reCAPTCHA検証
    const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);
    const threshold = parseFloat(process.env.RECAPTCHA_THRESHOLD || '0.5');

    if (!recaptchaResult.success || recaptchaResult.score < threshold) {
      return NextResponse.json(
        { error: 'セキュリティ検証に失敗しました。お手数ですが、もう一度お試しください。' },
        { status: 400 }
      );
    }

    // 2. バリデーション
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: '入力内容に問題があります', details: validation.errors },
        { status: 400 }
      );
    }

    // 3. Resend初期化
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured, skipping email');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const resend = new Resend(resendApiKey);
    const submittedAt = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    });

    // 4. メール送信（管理者通知 + 自動返信を並列で）
    await Promise.all([
      sendAdminNotification(resend, body, submittedAt),
      sendAutoReply(resend, body),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。しばらく経ってからお試しください。' },
      { status: 500 }
    );
  }
}
