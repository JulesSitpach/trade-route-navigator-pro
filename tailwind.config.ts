import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'pro': {
          'navy': '#2c3e50',    // Dark blue/navy
          'blue': '#3498db',    // Light blue
          'red': '#e74c3c',     // Red/orange
          'green': '#2ecc71',   // Green
          'amber': '#f39c12',   // Yellow/amber
          'gray': '#f5f7fa',    // Light gray background
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2c3e50",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#3498db",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#e74c3c",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f7fa",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f39c12",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#2c3e50",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2c3e50",
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
