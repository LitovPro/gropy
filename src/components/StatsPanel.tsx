import React from 'react';
import styled from 'styled-components';
import { UserStats } from '../types';

interface StatsPanelProps {
  stats: UserStats;
  expProgress: number;
  expForNextLevel: number;
}

const StatsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface}dd;
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 200px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.gradients.card};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const StatIcon = styled.span`
  font-size: 1.5rem;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LevelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LevelBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.gradients.secondary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 0.875rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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

const ExpText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, expProgress, expForNextLevel }) => {
  return (
    <StatsContainer className="fade-in">
      <LevelContainer>
        <LevelInfo>
          <StatLabel>Уровень</StatLabel>
          <LevelBadge>LVL {stats.level}</LevelBadge>
        </LevelInfo>
        <ProgressBarContainer>
          <ProgressBar progress={expProgress} />
        </ProgressBarContainer>
        <ExpText>{stats.experience} / {expForNextLevel} опыта</ExpText>
      </LevelContainer>

      <StatItem>
        <StatIcon>⚡</StatIcon>
        <StatContent>
          <StatLabel>Очки</StatLabel>
          <StatValue>{stats.totalPoints.toLocaleString()}</StatValue>
        </StatContent>
      </StatItem>

      <StatItem>
        <StatIcon>🔥</StatIcon>
        <StatContent>
          <StatLabel>Стрик</StatLabel>
          <StatValue>{stats.streak} дней</StatValue>
        </StatContent>
      </StatItem>

      <StatItem>
        <StatIcon>✅</StatIcon>
        <StatContent>
          <StatLabel>Выполнено</StatLabel>
          <StatValue>{stats.completedTasks} / {stats.totalTasks}</StatValue>
        </StatContent>
      </StatItem>
    </StatsContainer>
  );
};

export default StatsPanel;
