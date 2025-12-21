export const theme = {
  name: 'indigo-slate',

  colors: {
    primary: {
      DEFAULT: '#6366f1',
      foreground: '#fafafa',
      oklch: 'oklch(0.585 0.233 264.052)',
    },

    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },

    destructive: {
      DEFAULT: '#ef4444',
      foreground: '#fafafa',
    },

    chart: {
      1: '#6366f1',
      2: '#8b5cf6',
      3: '#06b6d4',
      4: '#f59e0b',
      5: '#ef4444',
    },
  },

  radius: '0.625rem',

  tailwindClasses: {
    primary: 'indigo-500',
    primaryHover: 'indigo-600',
    neutral: 'slate',
  },
} as const

export type Theme = typeof theme
