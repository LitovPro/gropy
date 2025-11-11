import { useState, useCallback, useEffect } from 'react'
import { JournalEntry, JournalState, Mood, Intensity, Prompt, Ritual } from '../types/journal'
import { PROMPTS, RITUALS, PET_REACTIONS } from '../data/journalData'
import { STORAGE_KEYS } from '../constants'

// Initialize default state
const defaultState: JournalState = {
  entries: [],
  lastPromptIds: [],
  lastRitualIds: []
}

export const useJournal = () => {
  const [state, setState] = useState<JournalState>(defaultState)
  const [isLoading, setIsLoading] = useState(true)

  // Load state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL_STATE)
      if (saved) {
        const parsed = JSON.parse(saved)
        setState(parsed)
      }
    } catch {
      // Failed to load journal state
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save state to localStorage
  const saveState = useCallback((newState: JournalState) => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL_STATE, JSON.stringify(newState))
      setState(newState)
    } catch {
      // Failed to save journal state
    }
  }, [])

  // Add new journal entry - optimized for instant response
  const addEntry = useCallback((
    mood: Mood,
    intensity?: Intensity,
    note?: string,
    chips?: string[],
    ritualId?: string,
    tags?: string[]
  ) => {
    const entry: JournalEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ts: Date.now(),
      mood,
      intensity,
      note,
      chips,
      ritualId,
      tags,
      petReactionSeed: Math.random()
    }

    // Immediate state update for instant UI response
    setState(prevState => ({
      ...prevState,
      entries: [entry, ...prevState.entries]
    }))

    // Async save to localStorage (non-blocking)
    requestAnimationFrame(() => {
      try {
        const newState = {
          ...state,
          entries: [entry, ...state.entries]
        }
        localStorage.setItem(STORAGE_KEYS.JOURNAL_STATE, JSON.stringify(newState))
      } catch {
        // Failed to save journal state
      }
    })

    return entry
  }, [state])

  // Get prompt for mood
  const getPrompt = useCallback((mood: Mood): Prompt | null => {
    // Filter prompts that match the mood and haven't been used recently
    const availablePrompts = PROMPTS.filter(prompt =>
      prompt.moods.includes(mood) &&
      !state.lastPromptIds.includes(prompt.id)
    )

    // If no available prompts, use any prompt for this mood
    const fallbackPrompts = PROMPTS.filter(prompt => prompt.moods.includes(mood))

    const promptsToChoose = availablePrompts.length > 0 ? availablePrompts : fallbackPrompts

    if (promptsToChoose.length === 0) return null

    // Random selection
    const randomIndex = Math.floor(Math.random() * promptsToChoose.length)
    const selectedPrompt = promptsToChoose[randomIndex]

    // Update last used prompts (keep only last 5)
    const newLastPromptIds = [selectedPrompt.id, ...state.lastPromptIds].slice(0, 5)

    const newState = {
      ...state,
      lastPromptIds: newLastPromptIds
    }

    saveState(newState)
    return selectedPrompt
  }, [state, saveState])

  // Get ritual for mood
  const getRitual = useCallback((mood: Mood): Ritual | null => {
    // Filter rituals that haven't been used recently
    const availableRituals = RITUALS.filter(ritual =>
      !state.lastRitualIds.includes(ritual.id)
    )

    // If no available rituals, use any ritual
    const ritualsToChoose = availableRituals.length > 0 ? availableRituals : RITUALS

    if (ritualsToChoose.length === 0) return null

    // Prioritize rituals with mood bias
    const prioritizedRituals = ritualsToChoose.sort((a, b) => {
      const aHasBias = a.moodBias?.includes(mood) ? 1 : 0
      const bHasBias = b.moodBias?.includes(mood) ? 1 : 0
      return bHasBias - aHasBias
    })

    const selectedRitual = prioritizedRituals[0]

    // Update last used rituals (keep only last 3)
    const newLastRitualIds = [selectedRitual.id, ...state.lastRitualIds].slice(0, 3)

    const newState = {
      ...state,
      lastRitualIds: newLastRitualIds
    }

    saveState(newState)
    return selectedRitual
  }, [state, saveState])

  // Get pet reaction for mood
  const getPetReaction = useCallback((mood: Mood, seed?: number): string => {
    const reactions = PET_REACTIONS[mood]
    if (!reactions || reactions.length === 0) return 'спасибо, что поделился(ась) со мной 💚'

    const index = Math.floor((seed ?? Math.random()) * reactions.length)
    return reactions[index]
  }, [])

  // Get today's entries
  const getTodayEntries = useCallback((): JournalEntry[] => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStart = today.getTime()

    return state.entries.filter(entry => entry.ts >= todayStart)
  }, [state.entries])

  // Get recent entries (last 7 days)
  const getRecentEntries = useCallback((): JournalEntry[] => {
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    return state.entries.filter(entry => entry.ts >= weekAgo)
  }, [state.entries])

  // Get mood statistics
  const getMoodStats = useCallback(() => {
    const recent = getRecentEntries()
    const moodCounts: Record<Mood, number> = {
      sun: 0, clouds: 0, rain: 0, wind: 0, storm: 0,
      rainbow: 0, moon: 0, stars: 0, leaves: 0
    }

    recent.forEach(entry => {
      moodCounts[entry.mood]++
    })

    return moodCounts
  }, [getRecentEntries])

  // Check if user has been in difficult mood for 3+ days
  const isInDifficultMood = useCallback((): boolean => {
    const recent = getRecentEntries().slice(0, 3)
    if (recent.length < 3) return false

    const difficultMoods: Mood[] = ['rain', 'storm']
    return recent.every(entry => difficultMoods.includes(entry.mood))
  }, [getRecentEntries])

  // Export data
  const exportData = useCallback(() => {
    const data = {
      entries: state.entries,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gropy-journal-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [state.entries])

  // Clear all data
  const clearData = useCallback(() => {
    const newState = defaultState
    saveState(newState)
  }, [saveState])

  return {
    // State
    entries: state.entries,
    isLoading,

    // Actions
    addEntry,
    getPrompt,
    getRitual,
    getPetReaction,

    // Getters
    getTodayEntries,
    getRecentEntries,
    getMoodStats,
    isInDifficultMood,

    // Utils
    exportData,
    clearData
  }
}
