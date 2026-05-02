import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand mint family
        mint: {
          glow: "#9CE0AE",
          mid: "#66CD83",
          deep: "#3D9656",
          ink: "#0F2E1A",
        },
        // Surfaces
        surface: {
          black: "#000000",
          // Unified to pure black — any non-#000 value creates visible banding
          // between sections on OLED displays. Cards/sections use #000 plus
          // subtle borders for separation, not background tone.
          raised: "#000000",
          elevated: "#1A1A1A",
          page: "#FAFAF8",
        },
        // Status
        status: {
          success: "#66CD83",
          error: "#FF5F57",
          warning: "#FEBC2E",
          info: "#79C0FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        // Display sizes for hero typography (banded line height per Figma spec)
        "hero-mobile": ["64px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "hero-tablet": ["96px", { lineHeight: "96px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "hero-desktop": ["128px", { lineHeight: "121.6px", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      borderRadius: {
        phone: "54px",
      },
      boxShadow: {
        "phone": "0px 0px 80px 0px rgba(102, 205, 131, 0.06), 0px 40px 80px 0px rgba(0, 0, 0, 0.6)",
        "card-mint": "0px 24px 60px 0px rgba(102, 205, 131, 0.4), 0px 32px 80px 0px rgba(0, 0, 0, 0.6)",
        "send-glow": "0 0 24px rgba(102,205,131,.8), 0 0 4px rgba(255,255,255,.6) inset",
        "pill-glow": "0 8px 24px rgba(102,205,131,.4)",
      },
      letterSpacing: {
        eyebrow: "0.12em",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "pulse-mint": "pulseMint 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseMint: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(102, 205, 131, 0.6)" },
          "50%": { boxShadow: "0 0 0 16px rgba(102, 205, 131, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
