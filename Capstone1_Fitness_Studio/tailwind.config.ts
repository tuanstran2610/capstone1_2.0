import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
// import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px", // 👈 thêm để hỗ trợ tốt cho laptop lớn
    },
    fontFamily: {
      oswald: 'var(--font-oswald)',
      roboto: 'var(--font-roboto)',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#333",
          100: "#484848",
          200: "#151515",
          300: "#111",
        },
        accent: "#d4000d",
      },
      backgroundImage: {
        hero: "url('/assets/img/hero/bg.png')",
        membership: "url('/assets/img/membership/bg.jpg')",
      },
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    // lineClamp,
  ],
};

export default config;
