import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"]
      },
      colors: {
        void: "#03040b",
        orbit: "#0a1028",
        plasma: "#8b5cf6",
        ion: "#3b82f6",
        cyan: "#22d3ee",
        stellar: "#f4f7ff"
      },
      boxShadow: {
        glow: "0 0 42px rgba(59,130,246,.28), 0 0 90px rgba(139,92,246,.18)",
        card: "0 24px 80px rgba(0,0,0,.42)"
      },
      backgroundImage: {
        "cosmic-radial":
          "radial-gradient(circle at 20% 10%, rgba(59,130,246,.26), transparent 34%), radial-gradient(circle at 80% 12%, rgba(139,92,246,.22), transparent 32%), radial-gradient(circle at 50% 90%, rgba(34,211,238,.16), transparent 34%)",
        "glass-line":
          "linear-gradient(135deg, rgba(255,255,255,.34), rgba(255,255,255,.06) 35%, rgba(139,92,246,.34) 72%, rgba(34,211,238,.28))"
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 4.8s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -16px, 0)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
