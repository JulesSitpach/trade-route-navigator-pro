
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
          'navy': '#2C3E50',    // Dark navy blue for headers
          'blue': '#3498DB',    // Light blue for primary actions
          'red': '#E74C3C',     // Red/orange
          'green': '#27AE60',   // Green for success
          'amber': '#F39C12',   // Yellow/amber for warnings
          'gray': '#F5F7FA',    // Light gray background
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2C3E50",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#3498DB",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#E74C3C",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F5F7FA",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#F39C12",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#2C3E50",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2C3E50",
        },
        'custom-blue': {
          DEFAULT: '#3498DB',
          hover: '#2980B9'
        },
        success: {
          DEFAULT: '#27AE60',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#F39C12',
          foreground: '#ffffff',
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
