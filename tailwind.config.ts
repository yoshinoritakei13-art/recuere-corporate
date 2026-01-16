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
        // 決定カラーパレット
        primary: '#004582',      // 揺るがない軸
        secondary: '#FF99FF',    // 内なる輝き・マゼンタ
        tertiary: '#7FA6BF',     // 寄り添い
        accent: '#E6C978',       // 気づき
        background: '#EAF2F7',   // 余白・静けさ
        foreground: '#2C3E50',   // テキスト
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
