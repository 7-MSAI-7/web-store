/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Framer에서 사용한 색상들을 여기에 추가할 수 있습니다
      },
      fontFamily: {
        // Framer에서 사용한 폰트들을 여기에 추가할 수 있습니다
      },
    },
  },
  plugins: [],
} 