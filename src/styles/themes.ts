import { tokens } from '../design/tokens'

export const lightTheme = {
  ...tokens,
  color: {
    ...tokens.color,
    // Calm light theme - warm and soft
    bg: '#F5F3EE',
    surface: '#FFFFFF',
    border: '#DDE7E1',
    text: '#556B6D',
    textMuted: '#748B83',
    accent: '#A7C7B7',
  },
}

export const darkTheme = {
  ...tokens,
  color: {
    ...tokens.color,
    // Calm dark theme - soft and warm
    bg: '#1C1F22',
    surface: '#2E3437',
    border: '#445156',
    text: '#C8D6D1',
    textMuted: '#7C8C87',
    accent: '#7C8C87',
    warm: {
      light: '#E4CFA3',
      medium: '#F7BFA0',
      dark: '#FFDFA4',
    },
    effort: { 
      easy: '#7C8C87', 
      medium: '#F7BFA0', 
      energetic: '#E4CFA3' 
    },
    pet: {
      primary: '#7C8C87',
      secondary: '#445156',
      accent: '#E4CFA3',
    },
  },
}

export const oceanTheme = {
  ...tokens,
  color: {
    ...tokens.color,
    // Ocean calm theme
    bg: '#F0F9FF',
    surface: '#FFFFFF',
    border: '#E0F2FE',
    text: '#0C4A6E',
    textMuted: '#0369A1',
    accent: '#0284C7',
    warm: {
      light: '#BAE6FD',
      medium: '#7DD3FC',
      dark: '#38BDF8',
    },
    effort: { 
      easy: '#0284C7', 
      medium: '#7DD3FC', 
      energetic: '#38BDF8' 
    },
    pet: {
      primary: '#0284C7',
      secondary: '#E0F2FE',
      accent: '#BAE6FD',
    },
  },
}

export const forestTheme = {
  ...tokens,
  color: {
    ...tokens.color,
    // Forest calm theme
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    border: '#DCFCE7',
    text: '#14532D',
    textMuted: '#166534',
    accent: '#16A34A',
    warm: {
      light: '#BBF7D0',
      medium: '#86EFAC',
      dark: '#4ADE80',
    },
    effort: { 
      easy: '#16A34A', 
      medium: '#86EFAC', 
      energetic: '#4ADE80' 
    },
    pet: {
      primary: '#16A34A',
      secondary: '#DCFCE7',
      accent: '#BBF7D0',
    },
  },
}

export type Theme = typeof lightTheme

