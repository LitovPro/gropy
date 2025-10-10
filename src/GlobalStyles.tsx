import { createGlobalStyle } from 'styled-components'
import { tokens } from './design/tokens'

export const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    font-family: ${tokens.typography.fontFamily.primary};
    font-size: ${tokens.typography.fontSize.base};
    font-weight: ${tokens.typography.fontWeight.normal};
    line-height: ${tokens.typography.lineHeight.relaxed};
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
    letter-spacing: -0.01em;
    min-height: 100vh;
    padding-bottom: env(safe-area-inset-bottom);
  }

  #root {
    min-height: 100vh;
  }

  /* Typography improvements */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${tokens.typography.fontFamily.display};
    font-weight: ${tokens.typography.fontWeight.semibold};
    line-height: ${tokens.typography.lineHeight.tight};
    margin: 0;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: ${tokens.typography.fontSize['3xl']};
  }

  h2 {
    font-size: ${tokens.typography.fontSize['2xl']};
  }

  h3 {
    font-size: ${tokens.typography.fontSize.xl};
  }

  h4 {
    font-size: ${tokens.typography.fontSize.lg};
  }

  p {
    margin: 0;
    line-height: ${tokens.typography.lineHeight.relaxed};
    font-size: ${tokens.typography.fontSize.base};
  }

  small {
    font-size: ${tokens.typography.fontSize.sm};
    line-height: ${tokens.typography.lineHeight.normal};
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }

  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Performance optimizations */
  * {
    will-change: auto;
  }

  /* GPU acceleration for animations */
  [data-framer-component-type] {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  /* Input reset */
  input, textarea {
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    outline: none;
  }

  /* List reset */
  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`


