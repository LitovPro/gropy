import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types';
import { safeLocalStorage } from '../utils/security';

const STORAGE_KEY = 'gropy-game-state';

const initialGameState: GameState = {
  points: 0,
  level: 1,
  experience: 0,
  streak: 0,
  lastActivityDate: new Date().toDateString(),
  achievements: [],
};

// Опыт необходимый для следующего уровня
const getExpForLevel = (level: number): number => {
  return level * 100 + (level - 1) * 50;
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = safeLocalStorage.get(STORAGE_KEY);
    return saved || initialGameState;
  });

  // Автосохранение
  useEffect(() => {
    safeLocalStorage.set(STORAGE_KEY, gameState);
  }, [gameState]);

  const addPoints = useCallback((points: number) => {
    setGameState(prev => {
      const newExp = prev.experience + points;
      const expForNextLevel = getExpForLevel(prev.level);
      
      let newLevel = prev.level;
      let remainingExp = newExp;
      
      // Проверяем повышение уровня
      while (remainingExp >= expForNextLevel && newLevel < 100) {
        remainingExp -= expForNextLevel;
        newLevel++;
      }

      // Обновляем стрик
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let newStreak = prev.streak;
      
      if (prev.lastActivityDate === yesterday) {
        newStreak++;
      } else if (prev.lastActivityDate !== today) {
        newStreak = 1;
      }

      return {
        ...prev,
        points: prev.points + points,
        level: newLevel,
        experience: remainingExp,
        streak: newStreak,
        lastActivityDate: today,
      };
    });
  }, []);

  const spendPoints = useCallback((amount: number): boolean => {
    if (gameState.points >= amount) {
      setGameState(prev => ({
        ...prev,
        points: prev.points - amount,
      }));
      return true;
    }
    return false;
  }, [gameState.points]);

  const addAchievement = useCallback((achievement: string) => {
    setGameState(prev => ({
      ...prev,
      achievements: prev.achievements.includes(achievement) 
        ? prev.achievements 
        : [...prev.achievements, achievement],
    }));
  }, []);

  const resetGameState = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  // Вычисляемые значения
  const expForNextLevel = getExpForLevel(gameState.level);
  const expProgress = gameState.level < 100 ? (gameState.experience / expForNextLevel) * 100 : 100;

  return {
    gameState,
    addPoints,
    spendPoints,
    addAchievement,
    resetGameState,
    expForNextLevel,
    expProgress,
  };
};
