import { useState, useCallback, useEffect, useRef } from 'react'
import { RitualSession, RitualState, RitualReflection, RitualSettings } from '../types/rituals'
import { safeGet, safeSet } from '../utils/ls'

const STORAGE_KEY = 'gropy-ritual-session'
const SETTINGS_KEY = 'gropy-ritual-settings'

export const useRitualSession = () => {
  const [currentSession, setCurrentSession] = useState<RitualSession | null>(null)
  const [state, setState] = useState<RitualState>('idle')
  const [settings, setSettings] = useState<Record<string, RitualSettings>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)

  // Load settings on mount
  useEffect(() => {
    const savedSettings = safeGet<Record<string, RitualSettings>>(SETTINGS_KEY, {})
    setSettings(savedSettings)
  }, [])

  const completeSession = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    if (currentSession) {
      const completedSession: RitualSession = {
        ...currentSession,
        endTime: Date.now(),
        duration: Math.floor((Date.now() - currentSession.startTime - currentSession.totalPausedTime) / 1000),
        completed: true
      }
      
      setCurrentSession(completedSession)
      setState('reward')
      safeSet(STORAGE_KEY, completedSession)
    }
  }, [currentSession])

  const startTimer = useCallback((durationMs: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    startTimeRef.current = Date.now()
    setTimeLeft(Math.ceil(durationMs / 1000))
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          completeSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [completeSession])

  // Load active session on mount
  useEffect(() => {
    const savedSession = safeGet<RitualSession | null>(STORAGE_KEY, null)
    if (savedSession && !savedSession.completed) {
      setCurrentSession(savedSession)
      setState('active')
      // Resume timer if session was active
      if (savedSession.duration && savedSession.duration > 0) {
        const elapsed = Date.now() - savedSession.startTime - savedSession.totalPausedTime
        const remaining = Math.max(0, savedSession.duration * 1000 - elapsed)
        setTimeLeft(Math.ceil(remaining / 1000))
        // Use a ref to avoid dependency issues
        const timerId = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              // Call completeSession directly without dependency
              if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
              }
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        // Store timer ref for cleanup
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        timerRef.current = timerId
      }
    }
  }, []) // Empty dependency array - only run on mount

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsPaused(true)
    pausedTimeRef.current = Date.now()
    
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        pausedAt: Date.now()
      }
      setCurrentSession(updatedSession)
      safeSet(STORAGE_KEY, updatedSession)
    }
  }, [currentSession])

  const resumeTimer = useCallback(() => {
    if (pausedTimeRef.current && currentSession) {
      const pausedDuration = Date.now() - pausedTimeRef.current
      const updatedSession = {
        ...currentSession,
        totalPausedTime: currentSession.totalPausedTime + pausedDuration,
        pausedAt: undefined
      }
      setCurrentSession(updatedSession)
      safeSet(STORAGE_KEY, updatedSession)
    }
    
    setIsPaused(false)
    if (timeLeft > 0) {
      startTimer(timeLeft * 1000)
    }
  }, [currentSession, timeLeft, startTimer])

  const startSession = useCallback((ritualId: string, mode: 'guided' | 'quick', _duration: number) => {
    const session: RitualSession = {
      id: `session_${Date.now()}`,
      ritualId,
      startTime: Date.now(),
      mode,
      completed: false,
      totalPausedTime: 0
    }
    
    setCurrentSession(session)
    setState('active')
    safeSet(STORAGE_KEY, session)
    
    // Не запускаем таймер автоматически - только создаем сессию
  }, [])

  const startRitualTimer = useCallback((duration: number) => {
    if (duration > 0) {
      startTimer(duration * 1000)
    }
  }, [startTimer])

  const addReflection = useCallback((reflection: RitualReflection) => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        reflection
      }
      setCurrentSession(updatedSession)
      setState('reward')
      safeSet(STORAGE_KEY, updatedSession)
    }
  }, [currentSession])

  const finishSession = useCallback(() => {
    setState('log')
    // Clear session after logging
    setTimeout(() => {
      setCurrentSession(null)
      setState('idle')
      setTimeLeft(0)
      setIsPaused(false)
      safeSet(STORAGE_KEY, null)
    }, 1000)
  }, [])

  const cancelSession = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    setCurrentSession(null)
    setState('idle')
    setTimeLeft(0)
    setIsPaused(false)
    safeSet(STORAGE_KEY, null)
  }, [])

  const updateSettings = useCallback((ritualId: string, newSettings: Partial<RitualSettings>) => {
    const updatedSettings = {
      ...settings,
      [ritualId]: {
        ...settings[ritualId],
        ...newSettings
      }
    }
    setSettings(updatedSettings)
    safeSet(SETTINGS_KEY, updatedSettings)
  }, [settings])

  const getSettings = useCallback((ritualId: string): RitualSettings => {
    return settings[ritualId] || {
      mode: 'guided',
      duration: 30,
      sound: false,
      haptics: true,
      suggestions: true
    }
  }, [settings])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    currentSession,
    state,
    timeLeft,
    isPaused,
    startSession,
    startRitualTimer,
    pauseTimer,
    resumeTimer,
    completeSession,
    addReflection,
    finishSession,
    cancelSession,
    updateSettings,
    getSettings
  }
}
