import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';
import { UserStats } from '../types';
import { getMotivationalMessage } from '../utils/taskSuggestions';

interface ProfileSectionProps {
  stats: UserStats;
  expProgress: number;
  expForNextLevel: number;
  onResetData: () => void;
}

const ProfileContainer = styled.div`
  padding: 1rem 0 5rem 0; /* Отступ снизу для навигации */
  max-width: 100%;
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.gradients.primary};
  }
`;

const Avatar = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.1));
`;

const UserName = styled.h2`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 700;
`;

const UserLevel = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.gradients.secondary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MotivationalQuote = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary}08;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.secondary};
  border-radius: 6px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ThemeSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

const ThemeCard = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary + '15' : theme.colors.background
  };
  border: 2px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}08;
  }
`;

const ThemePreview = styled.div<{ themeColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.themeColor};
  flex-shrink: 0;
`;

const ThemeName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const DangerZone = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.error}08;
  border: 1px solid ${({ theme }) => theme.colors.error}20;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const DangerButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error}40;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error}15;
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

const themeColors = {
  light: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  ocean: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  forest: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
};

const themeNames = {
  light: 'Светлая',
  dark: 'Тёмная', 
  ocean: 'Океан',
  forest: 'Лес',
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  stats, 
  expProgress, 
  expForNextLevel,
  onResetData 
}) => {
  const { themeName, setTheme, availableThemes } = useTheme();
  const [motivationalText] = useState(() => getMotivationalMessage('evening'));

  const handleResetWithConfirmation = () => {
    if (window.confirm('⚠️ Это удалит все данные навсегда. Вы точно уверены?')) {
      if (window.confirm('🤔 Последний шанс передумать! Данные восстановить будет невозможно.')) {
        onResetData();
      }
    }
  };

  const getUserAvatar = (level: number): string => {
    if (level < 5) return '🌱';
    if (level < 10) return '🌸'; 
    if (level < 20) return '🌟';
    if (level < 30) return '💫';
    return '✨';
  };

  const getUserTitle = (level: number): string => {
    if (level < 5) return 'Новичок';
    if (level < 10) return 'Организатор';
    if (level < 20) return 'Мастер дел';
    if (level < 30) return 'Гуру продуктивности';
    return 'Легенда Gropy';
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Avatar>{getUserAvatar(stats.level)}</Avatar>
        <UserName>{getUserTitle(stats.level)}</UserName>
        <UserLevel>Уровень {stats.level}</UserLevel>
        
        <MotivationalQuote>
          "{motivationalText}"
        </MotivationalQuote>
        
        <ProgressSection>
          <ProgressLabel>
            <span>Прогресс до следующего уровня</span>
            <span>{stats.experience} / {expForNextLevel}</span>
          </ProgressLabel>
          <ProgressBar>
            <ProgressFill progress={expProgress} />
          </ProgressBar>
        </ProgressSection>
        
        <StatsGrid>
          <StatCard>
            <StatValue>{stats.totalPoints}</StatValue>
            <StatLabel>Очков заработано</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{stats.completedTasks}</StatValue>
            <StatLabel>Задач выполнено</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{stats.streak}</StatValue>
            <StatLabel>Дней подряд</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{Math.round((stats.completedTasks / Math.max(stats.totalTasks, 1)) * 100)}%</StatValue>
            <StatLabel>Процент выполнения</StatLabel>
          </StatCard>
        </StatsGrid>
      </ProfileCard>
      
      <ProfileCard>
        <SectionTitle>🎨 Темы оформления</SectionTitle>
        <ThemeGrid>
          {availableThemes.map(theme => (
            <ThemeCard
              key={theme}
              isActive={themeName === theme}
              onClick={() => setTheme(theme)}
            >
              <ThemePreview themeColor={themeColors[theme as keyof typeof themeColors]} />
              <ThemeName>{themeNames[theme as keyof typeof themeNames]}</ThemeName>
            </ThemeCard>
          ))}
        </ThemeGrid>
      </ProfileCard>
      
      <ProfileCard>
        <DangerZone>
          <SectionTitle style={{ color: 'inherit', marginBottom: '0.5rem' }}>
            ⚠️ Опасная зона
          </SectionTitle>
          <p style={{ 
            fontSize: '0.8rem', 
            color: 'inherit', 
            margin: '0 0 1rem 0',
            opacity: 0.8 
          }}>
            Это действие удалит все ваши данные навсегда
          </p>
          <DangerButton onClick={handleResetWithConfirmation}>
            🗑️ Сбросить все данные
          </DangerButton>
        </DangerZone>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfileSection;
