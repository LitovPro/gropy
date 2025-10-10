import { useState, useEffect, useCallback } from 'react'
import { GameState } from '../types'
import { safeGet, safeSet } from '../utils/ls'

const STORAGE_KEY = 'gropy-game-state'

const getTodayUTC = (): string => {
  return new Date().toISOString().split('T')[0]
}

const calculateExpForNextLevel = (level: number): number => {
  return level * 100 + (level - 1) * 50
}

const defaultGameState: GameState = {
  points: 0,
  level: 1,
  experience: 0,
  streak: 0,
  lastActivityDateUTC: getTodayUTC(),
  achievements: [],
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState)

  useEffect(() => {
    const saved = safeGet<GameState>(STORAGE_KEY, defaultGameState)
    setGameState(saved)
  }, [])

  const saveGameState = useCallback((newState: GameState) => {
    setGameState(newState)
    safeSet(STORAGE_KEY, newState)
  }, [])

  const addPoints = useCallback(
    (points: number) => {
      const newState = { ...gameState }
      newState.points += points
      newState.experience += points

      // Check for level up
      const expForNext = calculateExpForNextLevel(newState.level)
      if (newState.experience >= expForNext) {
        newState.level += 1
        newState.experience -= expForNext
      }

      // Update streak
      const today = getTodayUTC()
      if (newState.lastActivityDateUTC !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayUTC = yesterday.toISOString().split('T')[0]

        if (newState.lastActivityDateUTC === yesterdayUTC) {
          newState.streak += 1
        } else {
          newState.streak = 1
        }
        newState.lastActivityDateUTC = today
      }

      saveGameState(newState)
      return newState
    },
    [gameState, saveGameState]
  )

  const spendPoints = useCallback(
    (points: number) => {
      if (gameState.points >= points) {
        const newState = { ...gameState, points: gameState.points - points }
        saveGameState(newState)
        return true
      }
      return false
    },
    [gameState, saveGameState]
  )

  const addAchievement = useCallback(
    (key: string) => {
      if (!gameState.achievements.includes(key)) {
        const newState = {
          ...gameState,
          achievements: [...gameState.achievements, key],
        }
        saveGameState(newState)
      }
    },
    [gameState, saveGameState]
  )

  const resetGameState = useCallback(() => {
    saveGameState(defaultGameState)
  }, [saveGameState])

  const expForNextLevel = calculateExpForNextLevel(gameState.level)
  const progressToNextLevel = gameState.experience / expForNextLevel

  return {
    gameState,
    addPoints,
    spendPoints,
    addAchievement,
    resetGameState,
    expForNextLevel,
    progressToNextLevel,
  }
}





