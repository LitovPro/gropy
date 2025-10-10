export const tokens = {
  radius: { 
    sm: '8px',
    card: '16px', 
    button: '20px', 
    chip: '24px',
    lg: '16px',
  },
  space: { 
    xs: '8px', 
    sm: '12px', 
    md: '16px', 
    lg: '24px', 
    xl: '32px' 
  },
  size: { 
    tap: '48px', 
    cardMinH: '100px',
    tapMin: '48px',
    fabSize: '56px',
    tabBarHeight: '56px',
  },
  motion: { 
    base: '280ms', 
    fast: '200ms', 
    slow: '300ms',
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    easingIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easingOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easingInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  // Attention & Reach Zones
  zones: {
    edgeSafe: '16px',
    gapXs: '8px',
    gapSm: '12px',
    gapMd: '16px',
    gapLg: '24px',
    layerBottomElev: 12,
    gripArea: '24px',
  },
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
  },
  color: {
    // Calm design palette - light theme
    bg: '#F5F3EE',
    surface: '#FFFFFF',
    border: '#DDE7E1',
    text: '#556B6D',
    textMuted: '#748B83',
    accent: '#A7C7B7',
    // Warm accent colors
    warm: {
      light: '#FFDFA4',
      medium: '#F7BFA0',
      dark: '#E4CFA3',
    },
    // Effort levels with softer colors
    effort: { 
      easy: '#A7C7B7', 
      medium: '#F7BFA0', 
      energetic: '#E4CFA3' 
    },
    shadow: 'rgba(85, 107, 109, 0.08)',
    // Pet and nature colors
    pet: {
      primary: '#A7C7B7',
      secondary: '#DDE7E1',
      accent: '#FFDFA4',
    },
  },
} as const

