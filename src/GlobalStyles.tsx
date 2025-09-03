import { createGlobalStyle } from 'styled-components';
import { Theme } from './styles/themes';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    line-height: 1.6;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    background: ${({ theme }) => theme.gradients.primary};
    position: relative;
  }

  /* Красивые скроллбары */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  /* Красивые фокусы */
  button:focus,
  input:focus,
  textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }

  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -10px, 0); }
    70% { transform: translate3d(0, -5px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  /* Утилитарные классы */
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .bounce {
    animation: bounce 0.6s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Responsive typography */
  h1 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }

  /* Красивые кнопки */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  .btn-primary {
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  .btn-secondary {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  .btn-secondary:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .btn-danger:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-1px);
  }

  /* Responsive visibility */
  .mobile-content {
    display: block;
  }
  
  .desktop-content {
    display: none;
  }
  
  .desktop-only {
    display: none !important;
  }
  
  @media (min-width: 768px) {
    .mobile-content {
      display: none;
    }
    
    .desktop-content {
      display: grid;
    }
    
    .desktop-only {
      display: block !important;
    }
  }

  /* Улучшенная читаемость текста */
  h1, h2, h3, h4, h5, h6 {
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  
  /* Темная тема - белый текст с тенью */
  @media (prefers-color-scheme: dark) {
    h1, h2, h3, h4, h5, h6 {
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
  }
`;

export default GlobalStyles;