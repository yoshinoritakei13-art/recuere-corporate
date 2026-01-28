import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ===== Brand Colors =====
        primary: '#004582',      // 揺るがない軸（メインブルー）
        secondary: '#FF99FF',    // 内なる輝き・マゼンタ
        tertiary: '#7FA6BF',     // 寄り添い（ライトブルー）
        accent: '#E6C978',       // 気づき（ゴールド）
        background: '#EAF2F7',   // 余白・静けさ
        foreground: '#2C3E50',   // テキスト

        // ===== Extended Blue Palette =====
        navy: {
          DEFAULT: '#002d5a',    // Services背景メイン
          dark: '#001a33',       // 最も暗いネイビー
          light: '#1a5a8a',      // 明るめネイビー
        },

        // ===== Text Colors =====
        text: {
          DEFAULT: '#333',       // メインテキスト
          light: '#555',         // サブテキスト
          muted: '#666',         // ミュートテキスト
          faint: '#888',         // 薄いテキスト
        },

        // ===== UI Colors =====
        ui: {
          dark: '#1a1a2e',       // ダークUI背景
          darker: '#0f0f1a',     // より暗いUI
          darkest: '#050510',    // 最も暗いUI
          border: '#eee',        // ボーダー
          'border-light': '#e5e5e5',
        },

        // ===== Session Page Colors =====
        session: {
          warm: '#faf8f5',       // 暖かいベージュ背景
          cool: '#f5f8fa',       // クールなグレー背景
          pink: {
            from: '#E8D5E3',
            to: '#D5E3E8',
            'hover-from': '#DFC8DB',
            'hover-to': '#C8DBE0',
          },
        },
      },

      // ===== Spacing Tokens =====
      spacing: {
        'section-y': '140px',        // セクション縦余白（PC）
        'section-y-sp': '100px',     // セクション縦余白（SP）
        'section-x': '32px',         // セクション横余白（8 * 4 = 32px）
        'content-max': '1200px',     // コンテンツ最大幅
        'content-narrow': '800px',   // 狭いコンテンツ幅
      },

      // ===== Font Size Tokens =====
      fontSize: {
        // ラベル・キャプション
        'label-xs': ['0.65rem', { letterSpacing: '0.5em', lineHeight: '1.5' }],
        'label-sm': ['0.7rem', { letterSpacing: '0.2em', lineHeight: '1.5' }],
        'label-md': ['0.85rem', { letterSpacing: '0.1em', lineHeight: '1.5' }],

        // 見出し
        'heading-sm': ['1.1rem', { letterSpacing: '0.02em', lineHeight: '1.6' }],
        'heading-md': ['1.8rem', { letterSpacing: '-0.02em', lineHeight: '1.4' }],
        'heading-lg': ['2.5rem', { letterSpacing: '-0.02em', lineHeight: '1.3' }],

        // 本文
        'body-sm': ['0.9rem', { lineHeight: '2' }],
        'body-md': ['0.95rem', { lineHeight: '2' }],
        'body-lg': ['1rem', { lineHeight: '2' }],
      },

      // ===== Letter Spacing Tokens =====
      letterSpacing: {
        'wide-xs': '0.02em',
        'wide-sm': '0.05em',
        'wide-md': '0.1em',
        'wide-lg': '0.15em',
        'wide-xl': '0.2em',
        'wide-2xl': '0.3em',
        'wide-3xl': '0.4em',
        'wide-4xl': '0.5em',
      },

      // ===== Border Radius =====
      borderRadius: {
        'card': '8px',
        'card-lg': '16px',
        'section': '40px',
        'section-lg': '60px',
      },

      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Brand Gradients
        'gradient-navy': 'linear-gradient(180deg, #001a33 0%, #002d5a 30%, #004582 100%)',
        'gradient-cta': 'linear-gradient(135deg, #002d5a 0%, #004582 50%, #1a5a8a 100%)',
        'gradient-session': 'linear-gradient(to right, #E8D5E3, #D5E3E8)',
      },
    },
  },
  plugins: [],
};

export default config;
