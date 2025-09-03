import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';
import { UserStats } from '../types';

interface MobileNavigationProps {
  stats: UserStats;
  expProgress: number;
  expForNextLevel: number;
  onResetData: () => void;
}

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.surface}f5;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 1rem;
  
  @media (min-width: 768px) {
    display: none; /* Скрываем на десктопе */
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatsCompact = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: ${({ theme }) => theme.colors.primary}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}25;
    transform: scale(1.05);
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  min-width: 200px;
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
`;

const ThemeButton = styled.button<{ isActive: boolean; themeColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  background: ${props => props.themeColor};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MenuSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 0.85rem;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.secondary};
  transition: width 0.5s ease;
`;

const DangerButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error}33;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error}10;
  }
`;

const themeColors = {
  light: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  ocean: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  forest: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  stats, 
  expProgress, 
  expForNextLevel,
  onResetData 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { themeName, setTheme, availableThemes } = useTheme();

  const handleResetWithConfirmation = () => {
    if (window.confirm('⚠️ Это удалит все данные навсегда. Вы точно уверены?')) {
      if (window.confirm('🤔 Последний шанс передумать! Данные восстановить будет невозможно.')) {
        onResetData();
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <>
      <NavContainer>
        <NavContent>
          <Logo>Gropy</Logo>
          
          <StatsCompact>
            <StatItem>
              <span>⚡</span>
              <span>{stats.totalPoints}</span>
            </StatItem>
            <StatItem>
              <span>LVL</span>
              <span>{stats.level}</span>
            </StatItem>
          </StatsCompact>
          
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ⚙️
          </MenuButton>
        </NavContent>
        
        <DropdownMenu isOpen={isMenuOpen}>
          <MenuSection>
            <SectionTitle>Темы</SectionTitle>
            <ThemeSelector>
              {availableThemes.map((theme) => (
                <ThemeButton
                  key={theme}
                  isActive={themeName === theme}
                  themeColor={themeColors[theme as keyof typeof themeColors]}
                  onClick={() => setTheme(theme)}
                />
              ))}
            </ThemeSelector>
          </MenuSection>
          
          <MenuSection>
            <SectionTitle>Прогресс</SectionTitle>
            <StatRow>
              <StatLabel>Уровень {stats.level}</StatLabel>
              <StatValue>{stats.experience} / {expForNextLevel}</StatValue>
            </StatRow>
            <ProgressBar>
              <ProgressFill progress={expProgress} />
            </ProgressBar>
            
            <StatRow>
              <StatLabel>Очки</StatLabel>
              <StatValue>{stats.totalPoints}</StatValue>
            </StatRow>
            
            <StatRow>
              <StatLabel>Стрик</StatLabel>
              <StatValue>{stats.streak} дней</StatValue>
            </StatRow>
            
            <StatRow>
              <StatLabel>Выполнено</StatLabel>
              <StatValue>{stats.completedTasks} / {stats.totalTasks}</StatValue>
            </StatRow>
          </MenuSection>
          
          <MenuSection>
            <DangerButton onClick={handleResetWithConfirmation}>
              🗑️ Сбросить данные
            </DangerButton>
          </MenuSection>
        </DropdownMenu>
      </NavContainer>
      
      {/* Overlay для закрытия меню */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default MobileNavigation;
