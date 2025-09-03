/**
 * Красивые темы для Gropy
 */

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
    border: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    card: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#fefefe',
    surface: '#ffffff',
    text: '#1a202c',
    textSecondary: '#718096',
    success: '#38a169',
    warning: '#ed8936',
    error: '#e53e3e',
    border: '#e2e8f0',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    secondary: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
  },
  shadows: {
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.5rem',
    large: '0.75rem',
  },
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#818cf8',
    secondary: '#a78bfa',
    accent: '#fbbf24',
    background: '#0d1117',
    surface: '#161b22',
    text: '#f0f6fc',
    textSecondary: '#8b949e',
    success: '#3fb950',
    warning: '#d29922',
    error: '#f85149',
    border: '#30363d',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
    secondary: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    card: 'linear-gradient(135deg, #161b22 0%, #21262d 100%)',
  },
  shadows: {
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    large: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.5rem',
    large: '0.75rem',
  },
};

export const oceanTheme: Theme = {
  name: 'ocean',
  colors: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#f97316',
    background: '#f0f9ff',
    surface: '#ffffff',
    text: '#0c4a6e',
    textSecondary: '#075985',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    border: '#bae6fd',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    secondary: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
  },
  shadows: {
    small: '0 1px 3px 0 rgba(14, 165, 233, 0.1), 0 1px 2px 0 rgba(14, 165, 233, 0.06)',
    medium: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
    large: '0 25px 50px -12px rgba(14, 165, 233, 0.25)',
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.5rem',
    large: '0.75rem',
  },
};

export const forestTheme: Theme = {
  name: 'forest',
  colors: {
    primary: '#059669',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#f0fdf4',
    surface: '#ffffff',
    text: '#064e3b',
    textSecondary: '#065f46',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#dc2626',
    border: '#bbf7d0',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    secondary: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
  },
  shadows: {
    small: '0 1px 3px 0 rgba(5, 150, 105, 0.1), 0 1px 2px 0 rgba(5, 150, 105, 0.06)',
    medium: '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)',
    large: '0 25px 50px -12px rgba(5, 150, 105, 0.25)',
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.5rem',
    large: '0.75rem',
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  ocean: oceanTheme,
  forest: forestTheme,
};

export type ThemeName = keyof typeof themes;
