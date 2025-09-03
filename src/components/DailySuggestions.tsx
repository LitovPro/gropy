import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDailySuggestions, getMotivationalMessage, shouldShowSuggestions, markSuggestionsShown, TaskSuggestion } from '../utils/taskSuggestions';

interface DailySuggestionsProps {
  onAddTask: (text: string, category: 'daily' | 'work' | 'personal' | 'health' | 'learning' | 'selfcare', energy: 'low' | 'medium' | 'high') => void;
}

const SuggestionsContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
  }
`;

const SuggestionsHeader = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.gradients.secondary};
  color: white;
  text-align: center;
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const MotivationalText = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.4;
`;

const SuggestionsList = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.75rem;
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }
`;

const SuggestionCard = styled.div<{ energy: 'low' | 'medium' | 'high' }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border-left: 4px solid ${({ energy, theme }) => {
    const colors = {
      low: theme.colors.success,
      medium: theme.colors.warning,
      high: theme.colors.secondary
    };
    return colors[energy];
  }};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.75rem;
    border-left-width: 3px;
  }
`;

const SuggestionEmoji = styled.span`
  font-size: 1.75rem;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SuggestionContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SuggestionText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  margin-bottom: 0.25rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const SuggestionMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    gap: 0.4rem;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    top: 0.75rem;
    right: 0.75rem;
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
`;

const DailySuggestions: React.FC<DailySuggestionsProps> = ({ onAddTask }) => {
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [motivationalMessage, setMotivationalMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (shouldShowSuggestions()) {
      const todaySuggestions = getDailySuggestions();
      const message = getMotivationalMessage('morning');
      
      setSuggestions(todaySuggestions);
      setMotivationalMessage(message);
      setIsVisible(true);
    }
  }, []);

  const handleAddSuggestion = (suggestion: TaskSuggestion) => {
    onAddTask(suggestion.text, suggestion.category, suggestion.energy);
    // Убираем добавленное предложение из списка
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const handleClose = () => {
    setIsVisible(false);
    markSuggestionsShown();
  };

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  const getCategoryName = (category: string) => {
    const names = {
      daily: 'каждый день',
      selfcare: 'забота о себе',
      personal: 'личное',
      health: 'здоровье',
      work: 'работа',
      learning: 'изучение'
    };
    return names[category as keyof typeof names] || category;
  };

  const getEnergyName = (energy: string) => {
    const names = {
      low: 'легко',
      medium: 'средне',
      high: 'энергично'
    };
    return names[energy as keyof typeof names] || energy;
  };

  return (
    <SuggestionsContainer className="fade-in">
      <SuggestionsHeader style={{ position: 'relative' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
          🌟 Предложения на сегодня
        </h2>
        <MotivationalText>{motivationalMessage}</MotivationalText>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </SuggestionsHeader>
      
      <SuggestionsList>
        {suggestions.map(suggestion => (
          <SuggestionCard 
            key={suggestion.id} 
            energy={suggestion.energy}
            onClick={() => handleAddSuggestion(suggestion)}
          >
            <SuggestionEmoji>{suggestion.emoji}</SuggestionEmoji>
            <SuggestionContent>
              <SuggestionText>{suggestion.text}</SuggestionText>
              <SuggestionMeta>
                <span>{getCategoryName(suggestion.category)}</span>
                <span>•</span>
                <span>{getEnergyName(suggestion.energy)}</span>
              </SuggestionMeta>
            </SuggestionContent>
            <AddButton>+</AddButton>
          </SuggestionCard>
        ))}
      </SuggestionsList>
    </SuggestionsContainer>
  );
};

export default DailySuggestions;
