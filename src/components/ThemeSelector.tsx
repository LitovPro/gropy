import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';
// ThemeName импортируется через useTheme

const ThemeSelectorContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.surface}dd;
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ThemeButton = styled.button<{ isActive: boolean; themeColor: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  background: ${props => props.themeColor};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  &:active {
    transform: scale(0.95);
  }

  ${props => props.isActive && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
  `}
`;

const themeColors = {
  light: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  ocean: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  forest: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
};

const ThemeSelector: React.FC = () => {
  const { themeName, setTheme, availableThemes } = useTheme();

  return (
    <ThemeSelectorContainer className="fade-in">
      {availableThemes.map((theme) => (
        <ThemeButton
          key={theme}
          isActive={themeName === theme}
          themeColor={themeColors[theme as keyof typeof themeColors]}
          onClick={() => setTheme(theme)}
          title={`Тема: ${theme}`}
          aria-label={`Переключить на тему ${theme}`}
        />
      ))}
    </ThemeSelectorContainer>
  );
};

export default ThemeSelector;
