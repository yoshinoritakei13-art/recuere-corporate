import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestoration from '@/components/ScrollRestoration';

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'recuere | 気づきから、豊かさへ',
  description:
    '企業・医療法人の経営コンサルティングから、個人の自己実現セッションまで。気づきを通じて、本来の自分に戻り、豊かさへと導きます。',
  keywords: [
    '経営コンサルティング',
    '医療法人',
    '歯科医院',
    '人材育成',
    '研修',
    '自己実現',
    'コーチング',
    'ヒプノセラピー',
    'ブランディング',
  ],
  openGraph: {
    title: 'recuere | 気づきから、豊かさへ',
    description:
      '企業・医療法人の経営コンサルティングから、個人の自己実現セッションまで。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <ScrollRestoration />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
