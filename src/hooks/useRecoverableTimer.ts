import { useState, useEffect, useRef, useCallback } from 'react'

interface RecoverableTimerOptions {
  endAt?: number
  onComplete?: () => void
  onTick?: (timeLeft: number) => void
}

export const useRecoverableTimer = ({ endAt, onComplete, onTick }: RecoverableTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)
  const totalPausedTimeRef = useRef<number>(0)

  // Calculate time left from endAt timestamp
  const calculateTimeLeft = useCallback((endTimestamp: number) => {
    const now = Date.now()
    const remaining = Math.max(0, Math.ceil((endTimestamp - now) / 1000))
    return remaining
  }, [])

  // Start timer with endAt timestamp
  const startTimer = useCallback((endTimestamp: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const remaining = calculateTimeLeft(endTimestamp)
    if (remaining <= 0) {
      onComplete?.()
      return
    }

    setTimeLeft(remaining)
    setIsActive(true)
    setIsPaused(false)
    startTimeRef.current = Date.now()
    totalPausedTimeRef.current = 0

    timerRef.current = window.setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTimestamp)
      setTimeLeft(newTimeLeft)
      onTick?.(newTimeLeft)

      if (newTimeLeft <= 0) {
        setIsActive(false)
        onComplete?.()
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }
    }, 1000)
  }, [calculateTimeLeft, onComplete, onTick])

  // Start timer with duration
  const startWithDuration = useCallback((durationSeconds: number) => {
    const endTimestamp = Date.now() + (durationSeconds * 1000)
    startTimer(endTimestamp)
    return endTimestamp
  }, [startTimer])

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsPaused(true)
    pausedTimeRef.current = Date.now()
  }, [])

  // Resume timer
  const resumeTimer = useCallback(() => {
    if (pausedTimeRef.current) {
      const pausedDuration = Date.now() - pausedTimeRef.current
      totalPausedTimeRef.current += pausedDuration
    }
    setIsPaused(false)
    
    // Restart timer with adjusted end time
    if (endAt) {
      const adjustedEndAt = endAt + totalPausedTimeRef.current
      startTimer(adjustedEndAt)
    }
  }, [endAt, startTimer])

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsActive(false)
    setIsPaused(false)
    setTimeLeft(0)
  }, [])

  // Initialize from endAt prop
  useEffect(() => {
    if (endAt && endAt > Date.now()) {
      const remaining = calculateTimeLeft(endAt)
      if (remaining > 0) {
        setTimeLeft(remaining)
        setIsActive(true)
        startTimer(endAt)
      } else {
        onComplete?.()
      }
    }
  }, [endAt, calculateTimeLeft, startTimer, onComplete])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Format time for display
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    timeLeft,
    isActive,
    isPaused,
    startTimer,
    startWithDuration,
    pauseTimer,
    resumeTimer,
    stopTimer,
    formatTime
  }
}
