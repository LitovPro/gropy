import { useState, useEffect, useCallback } from 'react'
import { safeGet, safeSet } from '../utils/ls'
import { hapticSuccess } from '../utils/haptics'

const VISIT_KEY = 'gropy-daily-visit'
const CELEBRATION_KEY = 'gropy-celebration-count'

export const useDailyExperience = () => {
  const [isFirstVisitToday, setIsFirstVisitToday] = useState(false)
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    // Check if Telegram WebApp
    const tg = (window as { Telegram?: { WebApp?: unknown } }).Telegram?.WebApp
    setIsTelegram(!!tg)

    // Check first visit today
    const today = new Date().toISOString().split('T')[0]
    const lastVisit = safeGet<string>(VISIT_KEY, '')
    const isFirst = lastVisit !== today

    setIsFirstVisitToday(isFirst)
    if (isFirst) {
      safeSet(VISIT_KEY, today)
    }
  }, [])

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Доброе утро! ☀️'
    if (hour < 18) return 'Добрый день! 🌤️'
    return 'Добрый вечер! 🌙'
  }, [])

  const celebrateCompletion = useCallback(() => {
    hapticSuccess()
    
    // Track celebrations to avoid spam
    const count = safeGet<number>(CELEBRATION_KEY, 0)
    safeSet(CELEBRATION_KEY, count + 1)
  }, [])

  const getMotivationalMessage = useCallback(() => {
    const messages = [
      'Ты молодец! 💚',
      'Отличная работа! ✨',
      'Продолжай в том же духе! 🌟',
      'Каждый шаг важен! 🎯',
      'Ты на правильном пути! 🚀',
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }, [])

  return {
    isFirstVisitToday,
    isTelegram,
    getGreeting,
    celebrateCompletion,
    getMotivationalMessage,
  }
}




