import { useState, useEffect, useCallback } from 'react'
import { safeGet, safeSet } from '../utils/ls'

interface RitualEntry {
  id: string
  date: string
  ritualId: string
  timestamp: number
}

interface DiaryEntry {
  id: string
  date: string
  emotion: string
  emotionIcon: string
  reflection: string
  timestamp: number
}

export const useRituals = () => {
  const [completedRituals, setCompletedRituals] = useState<string[]>([])
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [dailyStreak, setDailyStreak] = useState(0)

  // Load data from localStorage
  useEffect(() => {
    const savedRituals = safeGet<string[]>('gropy-completed-rituals', [])
    const savedDiary = safeGet<DiaryEntry[]>('gropy-diary-entries', [])
    const savedStreak = safeGet<number>('gropy-daily-streak', 0)

    setCompletedRituals(savedRituals)
    setDiaryEntries(savedDiary)
    setDailyStreak(savedStreak)
  }, [])

  // Check if user has completed rituals today
  const hasCompletedToday = useCallback(() => {
    const today = new Date().toDateString()
    const todayRituals = safeGet<RitualEntry[]>('gropy-ritual-history', [])
      .filter(entry => new Date(entry.date).toDateString() === today)
    
    return todayRituals.length > 0
  }, [])

  // Complete a ritual
  const completeRitual = useCallback((ritualId: string) => {
    const today = new Date().toDateString()
    const newCompleted = [...completedRituals, ritualId]
    
    // Save to daily completed rituals
    setCompletedRituals(newCompleted)
    safeSet('gropy-completed-rituals', newCompleted)

    // Add to ritual history
    const ritualHistory = safeGet<RitualEntry[]>('gropy-ritual-history', [])
    const newEntry: RitualEntry = {
      id: `${ritualId}-${Date.now()}`,
      date: today,
      ritualId,
      timestamp: Date.now(),
    }
    
    const updatedHistory = [...ritualHistory, newEntry]
    safeSet('gropy-ritual-history', updatedHistory)

    // Update streak
    if (!hasCompletedToday()) {
      const newStreak = dailyStreak + 1
      setDailyStreak(newStreak)
      safeSet('gropy-daily-streak', newStreak)
    }

    return true
  }, [completedRituals, dailyStreak, hasCompletedToday])

  // Save diary entry
  const saveDiaryEntry = useCallback((emotion: string, emotionIcon: string, reflection: string) => {
    const newEntry: DiaryEntry = {
      id: `diary-${Date.now()}`,
      date: new Date().toISOString(),
      emotion,
      emotionIcon,
      reflection,
      timestamp: Date.now(),
    }

    const updatedEntries = [newEntry, ...diaryEntries]
    setDiaryEntries(updatedEntries)
    safeSet('gropy-diary-entries', updatedEntries)

    return newEntry
  }, [diaryEntries])

  // Reset daily rituals (called at midnight or new day)
  const resetDailyRituals = useCallback(() => {
    setCompletedRituals([])
    safeSet('gropy-completed-rituals', [])
  }, [])

  // Get today's progress
  const getTodayProgress = useCallback(() => {
    const today = new Date().toDateString()
    const todayRituals = safeGet<RitualEntry[]>('gropy-ritual-history', [])
      .filter(entry => new Date(entry.date).toDateString() === today)
    
    return {
      completed: todayRituals.length,
      maxDaily: 3,
      remaining: Math.max(0, 3 - todayRituals.length),
    }
  }, [])

  // Get weekly stats
  const getWeeklyStats = useCallback(() => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    const weekRituals = safeGet<RitualEntry[]>('gropy-ritual-history', [])
      .filter(entry => new Date(entry.date) >= weekAgo)
    
    const weekDiary = diaryEntries.filter(entry => 
      new Date(entry.date) >= weekAgo
    )

    return {
      ritualsCompleted: weekRituals.length,
      diaryEntries: weekDiary.length,
      activeDays: new Set(weekRituals.map(r => new Date(r.date).toDateString())).size,
    }
  }, [diaryEntries])

  // Get motivational message based on progress
  const getMotivationalMessage = useCallback(() => {
    const progress = getTodayProgress()
    
    if (progress.completed === 0) {
      return "добро пожаловать! выбери одно простое действие 🌿"
    } else if (progress.completed < progress.maxDaily) {
      return "отлично! ты на правильном пути ✨"
    } else {
      return "сегодня ты сделал достаточно. отдохни 💚"
    }
  }, [getTodayProgress])

  return {
    completedRituals,
    diaryEntries,
    dailyStreak,
    completeRitual,
    saveDiaryEntry,
    resetDailyRituals,
    getTodayProgress,
    getWeeklyStats,
    getMotivationalMessage,
    hasCompletedToday,
  }
}
