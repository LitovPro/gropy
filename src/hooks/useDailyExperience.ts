import { useState, useEffect } from 'react';
import { useTelegramWebApp } from '../utils/telegram';
import { safeLocalStorage } from '../utils/security';

interface DailyExperience {
  lastVisit: string;
  isFirstVisitToday: boolean;
  consecutiveDays: number;
  quickActions: string[];
}

const STORAGE_KEY = 'gropy-daily-experience';

export const useDailyExperience = () => {
  const { hapticFeedback, isAvailable: isTelegram } = useTelegramWebApp();
  const [dailyExp, setDailyExp] = useState<DailyExperience>(() => {
    const saved = safeLocalStorage.get(STORAGE_KEY);
    const today = new Date().toDateString();
    
    if (saved) {
      const isFirstToday = saved.lastVisit !== today;
      return {
        ...saved,
        isFirstVisitToday: isFirstToday,
        consecutiveDays: isFirstToday ? saved.consecutiveDays + 1 : saved.consecutiveDays
      };
    }
    
    return {
      lastVisit: today,
      isFirstVisitToday: true,
      consecutiveDays: 1,
      quickActions: []
    };
  });

  // Сохраняем при изменениях
  useEffect(() => {
    safeLocalStorage.set(STORAGE_KEY, dailyExp);
  }, [dailyExp]);

  // Обновляем дату посещения
  const markVisitToday = () => {
    const today = new Date().toDateString();
    setDailyExp(prev => ({
      ...prev,
      lastVisit: today,
      isFirstVisitToday: false
    }));
  };

  // Добавляем быстрое действие в историю
  const addQuickAction = (action: string) => {
    setDailyExp(prev => ({
      ...prev,
      quickActions: [action, ...prev.quickActions.slice(0, 4)] // Храним последние 5
    }));
  };

  // Haptic feedback для действий
  const celebrateCompletion = () => {
    if (isTelegram) {
      hapticFeedback('success');
    }
  };

  const feedbackOnAction = () => {
    if (isTelegram) {
      hapticFeedback('light');
    }
  };

  const feedbackOnError = () => {
    if (isTelegram) {
      hapticFeedback('error');
    }
  };

  // Получаем приветствие в зависимости от времени
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    
    if (hour < 6) return 'Доброй ночи! 🌙';
    if (hour < 12) return 'Доброе утро! ☀️';
    if (hour < 18) return 'Добрый день! 🌤️';
    return 'Добрый вечер! 🌅';
  };

  // Получаем мотивационное сообщение для первого визита
  const getWelcomeMessage = (): string => {
    if (dailyExp.isFirstVisitToday) {
      if (dailyExp.consecutiveDays === 1) {
        return 'Добро пожаловать в Gropy! Давайте начнём с малого 🌱';
      }
      if (dailyExp.consecutiveDays > 7) {
        return `Невероятно! Уже ${dailyExp.consecutiveDays} дней с нами! 🔥`;
      }
      return `День ${dailyExp.consecutiveDays} с Gropy! Продолжаем расти вместе 💪`;
    }
    return 'С возвращением! Что сделаем сегодня? ✨';
  };

  return {
    dailyExp,
    markVisitToday,
    addQuickAction,
    celebrateCompletion,
    feedbackOnAction,
    feedbackOnError,
    getGreeting,
    getWelcomeMessage,
    isTelegram,
  };
};
