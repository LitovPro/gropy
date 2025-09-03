import React, { useState } from 'react';
import styled from 'styled-components';
import { getMotivationalMessage } from '../utils/taskSuggestions';

interface WellbeingCenterProps {
  completedToday: number;
  totalPoints: number;
  streak: number;
  onResetData?: () => void;
}

const WellbeingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface}dd;
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: calc(100vw - 2rem);
  
  @media (max-width: 480px) {
    bottom: 15px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

const WellbeingContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const MotivationalText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const StatsButton = styled.button`
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

const AdvancedPanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  z-index: 2000;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 95vw;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

const PanelHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${({ variant, theme }) => variant === 'danger' ? `
    background: ${theme.colors.error};
    color: white;
    
    &:hover {
      background: ${theme.colors.error}dd;
      transform: translateY(-1px);
    }
  ` : `
    background: ${theme.colors.border};
    color: ${theme.colors.text};
    
    &:hover {
      background: ${theme.colors.primary}20;
      color: ${theme.colors.primary};
    }
  `}
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.25rem;
    font-size: 0.85rem;
  }
`;

const WellbeingCenter: React.FC<WellbeingCenterProps> = ({ 
  completedToday, 
  totalPoints, 
  streak, 
  onResetData 
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [motivationalText] = useState(() => {
    if (completedToday > 0) {
      return getMotivationalMessage('evening');
    }
    return 'Каждый маленький шаг важен! 💚';
  });

  const handleResetWithConfirmation = () => {
    if (window.confirm('⚠️ Это удалит все данные навсегда. Вы точно уверены?')) {
      if (window.confirm('🤔 Последний шанс передумать! Данные восстановить будет невозможно.')) {
        onResetData?.();
        setIsAdvancedOpen(false);
      }
    }
  };

  return (
    <>
      <WellbeingContainer className="fade-in">
        <WellbeingContent>
          <MotivationalText>{motivationalText}</MotivationalText>
          <StatsButton onClick={() => setIsAdvancedOpen(true)}>
            📊 Статистика
          </StatsButton>
        </WellbeingContent>
      </WellbeingContainer>

      <Overlay isOpen={isAdvancedOpen} onClick={() => setIsAdvancedOpen(false)} />
      
      <AdvancedPanel isOpen={isAdvancedOpen}>
        <PanelHeader>
          <h2>📊 Ваша статистика</h2>
          <p>Отслеживайте свой прогресс и заботьтесь о себе</p>
        </PanelHeader>
        
        <StatsGrid>
          <StatCard>
            <StatValue>{completedToday}</StatValue>
            <StatLabel>Сегодня выполнено</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{totalPoints}</StatValue>
            <StatLabel>Всего очков</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{streak}</StatValue>
            <StatLabel>Дней подряд</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{Math.floor(totalPoints / Math.max(1, completedToday || 1))}</StatValue>
            <StatLabel>Среднее за задачу</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <ActionButtons>
          <ActionButton onClick={() => setIsAdvancedOpen(false)}>
            Закрыть
          </ActionButton>
          
          {onResetData && (
            <ActionButton variant="danger" onClick={handleResetWithConfirmation}>
              ⚠️ Сбросить данные
            </ActionButton>
          )}
        </ActionButtons>
      </AdvancedPanel>
    </>
  );
};

export default WellbeingCenter;
