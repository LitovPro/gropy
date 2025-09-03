import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface PetProps {
  level: number;
}

const PetContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
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

const PetHeader = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 700;
`;

const floatAnimation = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  25% { 
    transform: translateY(-8px) rotate(1deg); 
  }
  50% { 
    transform: translateY(-4px) rotate(0deg); 
  }
  75% { 
    transform: translateY(-12px) rotate(-1deg); 
  }
`;

const PetAvatar = styled.div<{ level: number }>`
  font-size: ${({ level }) => Math.min(60 + level * 2, 100)}px;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  margin: 1rem 0;
  filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.1));
  transition: font-size 0.5s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
    animation-duration: 1s;
  }
`;

const PetStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const StatValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const LevelBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.gradients.secondary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const MoodIndicator = styled.div<{ mood: string }>`
  margin: 1rem 0;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.primary}10;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const InteractionButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const Pet: React.FC<PetProps> = ({ level }) => {
  const [mood, setMood] = useState('happy');
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now());

  // Эволюция питомца по уровням
  const getPetEmoji = (level: number): string => {
    if (level < 5) return '🐱'; // Котёнок
    if (level < 10) return '🐈'; // Кот
    if (level < 20) return '🦁'; // Лев
    if (level < 30) return '🐯'; // Тигр
    return '🐲'; // Дракон!
  };

  const getPetName = (level: number): string => {
    if (level < 5) return 'Котёнок';
    if (level < 10) return 'Кот';
    if (level < 20) return 'Лев';
    if (level < 30) return 'Тигр';
    return 'Дракон';
  };

  const getMoodEmoji = (mood: string): string => {
    const moods: { [key: string]: string } = {
      happy: '😊 Довольный',
      excited: '🤩 Воодушевлён', 
      sleepy: '😴 Отдыхает',
      hungry: '😋 Хочет вкусненького',
      playful: '😸 Игривый'
    };
    return moods[mood] || '😊 Довольный';
  };

  // Смена настроения каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      const moods = ['happy', 'excited', 'sleepy', 'hungry', 'playful'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(randomMood);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    setLastInteraction(Date.now());
    setMood('excited');
    
    // Через 3 секунды вернуться к случайному настроению
    setTimeout(() => {
      const moods = ['happy', 'playful'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(randomMood);
    }, 3000);
  };

  const getHappiness = (): number => {
    const timeSinceLastInteraction = Date.now() - lastInteraction;
    const hoursWithoutInteraction = timeSinceLastInteraction / (1000 * 60 * 60);
    return Math.max(0, 100 - hoursWithoutInteraction * 10);
  };

  return (
    <PetContainer className="fade-in">
      <LevelBadge>LVL {level}</LevelBadge>
      
      <PetHeader>🏠 Ваш питомец</PetHeader>
      
      <PetAvatar 
        level={level}
        onClick={handleInteraction}
        title="Кликните, чтобы погладить питомца!"
      >
        {getPetEmoji(level)}
      </PetAvatar>
      
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>
        {getPetName(level)}
      </h3>
      
      <MoodIndicator mood={mood}>
        {getMoodEmoji(mood)}
      </MoodIndicator>
      
      <PetStats>
        <StatRow>
          <StatLabel>Уровень</StatLabel>
          <StatValue>{level}</StatValue>
        </StatRow>
        
        <StatRow>
          <StatLabel>Счастье</StatLabel>
          <StatValue>{Math.round(getHappiness())}%</StatValue>
        </StatRow>
        
        <StatRow>
          <StatLabel>Эволюция</StatLabel>
          <StatValue>
            {level < 5 ? 'Котёнок' : 
             level < 10 ? 'Кот' : 
             level < 20 ? 'Лев' : 
             level < 30 ? 'Тигр' : 'Дракон'}
          </StatValue>
        </StatRow>
      </PetStats>
      
      <InteractionButton onClick={handleInteraction}>
        💖 Погладить питомца
      </InteractionButton>
    </PetContainer>
  );
};

export default Pet;