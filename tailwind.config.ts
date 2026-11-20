import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
			padding: {
				DEFAULT: "1.5rem",
				md: "2rem",
				lg: "3rem",
			},
			screens: {
				"2xl": "1320px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				// Paleta de marca ORMONIA
				ivory: "hsl(var(--color-ivory))",
				sand: "hsl(var(--color-sand))",
				beige: "hsl(var(--color-beige))",
				terracotta: "hsl(var(--color-terracotta))",
				olive: "hsl(var(--color-olive))",
				amber: "hsl(var(--color-amber))",
				warmBrown: "hsl(var(--color-warm-brown))",
				deepBrown: "hsl(var(--color-deep-brown))",
				ink: "hsl(var(--color-ink))",
			},
			fontFamily: {
				// Tokens tipográficos: ver `src/index.css` (@font-face y roles).
				display: ["var(--font-display)", "serif"],
				editorial: ["var(--font-editorial)", "serif"],
				sans: ["var(--font-sans)", "sans-serif"],
				accent: ["var(--font-accent)", "serif"],
			},
			/*
			 * Pasos intermedios de opacidad usados como modificador de color
			 * (`text-ink/62`, `text-ivory/82`…). Tailwind solo genera los valores
			 * de su escala (de 5 en 5): sin estas entradas esas clases no existían
			 * y el elemento heredaba el color del padre.
			 */
			opacity: {
				8: "0.08",
				12: "0.12",
				14: "0.14",
				16: "0.16",
				18: "0.18",
				38: "0.38",
				42: "0.42",
				58: "0.58",
				62: "0.62",
				64: "0.64",
				66: "0.66",
				68: "0.68",
				72: "0.72",
				82: "0.82",
			},
			/*
			 * Duraciones propias del motion ORMONIA. Como valor arbitrario
			 * (`duration-[650ms]`) eran ambiguas con `tailwindcss-animate`, que
			 * también define `duration-*`, y Tailwind no las generaba: las
			 * transiciones corrían con el default de 150ms.
			 */
			transitionDuration: {
				380: "380ms",
				420: "420ms",
				520: "520ms",
				650: "650ms",
				900: "900ms",
			},
			letterSpacing: {
				editorial: "0.14em",
				wide: "0.08em",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
