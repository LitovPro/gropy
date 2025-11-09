import { useState, useEffect, useCallback, useMemo } from 'react'
import { RITUALS } from '../data/ritualsData'
import { Ritual } from '../types/rituals'
import { safeGet, safeSet } from '../utils/ls'

const STORAGE_KEY = 'gropy-selected-tasks'
const COMPLETED_TASKS_KEY = 'gropy-completed-tasks-count'
const TASK_HISTORY_KEY = 'gropy-task-history'

interface TaskSelection {
  id: string
  shownAt: number // timestamp when task was first shown
  lastSeenAt: number // timestamp when user last saw this task
  replacedAt?: number // timestamp when task was replaced
}

interface TasksSelectionState {
  selectedTasks: TaskSelection[]
  completedCount: number
  taskHistory: string[] // IDs of tasks that were shown recently
}

const AUTO_REPLACE_HOURS = 4
const MAX_TASKS_TO_SHOW = 3

// Global state to prevent re-initialization
let globalState: TasksSelectionState | null = null
let isGlobalInitialized = false

export const useTasksSelection = () => {
  // Initialize state synchronously from localStorage
  if (!globalState) {
    const savedState = safeGet<TasksSelectionState>(STORAGE_KEY, {
      selectedTasks: [],
      completedCount: 0,
      taskHistory: []
    })

    const completedCount = safeGet<number>(COMPLETED_TASKS_KEY, 0)
    const taskHistory = safeGet<string[]>(TASK_HISTORY_KEY, [])

    globalState = {
      ...savedState,
      completedCount,
      taskHistory
    }
  }

  const [state, setState] = useState<TasksSelectionState>(globalState!)

  // Get all available daily tasks (excluding breathing)
  const availableTasks = useMemo(() => {
    return RITUALS.filter(ritual =>
      ritual.type === 'daily' && ritual.id !== 'breath'
    )
  }, [])

  // Check for daily reset
  useEffect(() => {
    const today = new Date().toDateString()
    const lastResetDate = safeGet<string>('gropy-last-reset-date', '')

    if (lastResetDate !== today) {
      // New day - reset progress and clear task history
      safeSet(COMPLETED_TASKS_KEY, 0)
      safeSet('gropy-last-reset-date', today)
      safeSet(TASK_HISTORY_KEY, [])

      const resetState = {
        selectedTasks: [],
        completedCount: 0,
        taskHistory: []
      }

      globalState = resetState
      setState(resetState)
      // Reset global initialization flag for new day
      isGlobalInitialized = false
    }
  }, [])

  // Save state to localStorage
  const saveState = useCallback((newState: Partial<TasksSelectionState>) => {
    setState(prevState => {
      const updatedState = { ...prevState, ...newState }
      // Update global state
      globalState = updatedState
      // Always save to localStorage
      safeSet(STORAGE_KEY, updatedState)
      return updatedState
    })
  }, [])

  // Get tasks that need auto-replacement (shown > 4 hours ago)
  const getTasksNeedingReplacement = useCallback(() => {
    const now = Date.now()
    const fourHoursAgo = now - (AUTO_REPLACE_HOURS * 60 * 60 * 1000)

    return state.selectedTasks.filter(task =>
      task.lastSeenAt < fourHoursAgo && !task.replacedAt
    )
  }, [state.selectedTasks])

  // Get available tasks for selection (excluding history)
  const getAvailableTasksForSelection = useCallback(() => {
    const currentTaskIds = state.selectedTasks.map(t => t.id)
    const excludedIds = [...currentTaskIds, ...state.taskHistory]

    return availableTasks.filter(task => !excludedIds.includes(task.id))
  }, [availableTasks, state.selectedTasks, state.taskHistory])

  // Select random tasks
  const selectRandomTasks = useCallback((count: number, excludeIds: string[] = []) => {
    const available = availableTasks.filter(task => !excludeIds.includes(task.id))
    const shuffled = [...available].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }, [availableTasks])

  // Initialize or refresh task selection
  const initializeTasks = useCallback(() => {
    const now = Date.now()

    // Check if we need to auto-replace any tasks
    const tasksToReplace = getTasksNeedingReplacement()
    const remainingTasks = state.selectedTasks.filter(task =>
      !tasksToReplace.some(t => t.id === task.id)
    )

    // Calculate how many new tasks we need
    const neededCount = MAX_TASKS_TO_SHOW - remainingTasks.length

    if (neededCount > 0) {
      const currentIds = remainingTasks.map(t => t.id)
      const newTasks = selectRandomTasks(neededCount, currentIds)

      const newTaskSelections: TaskSelection[] = newTasks.map(task => ({
        id: task.id,
        shownAt: now,
        lastSeenAt: now
      }))

      const updatedTasks = [...remainingTasks, ...newTaskSelections]

      // Update task history
      const newTaskHistory = [
        ...state.taskHistory,
        ...tasksToReplace.map(t => t.id),
        ...newTasks.map(t => t.id)
      ].slice(-20) // Keep only last 20 tasks in history

      saveState({
        selectedTasks: updatedTasks,
        taskHistory: newTaskHistory
      })
    } else if (tasksToReplace.length > 0) {
      // If we have tasks to replace but no new tasks needed, just update history
      const newTaskHistory = [
        ...state.taskHistory,
        ...tasksToReplace.map(t => t.id)
      ].slice(-20)

      saveState({
        taskHistory: newTaskHistory
      })
    }
  }, [state.selectedTasks, state.taskHistory, getTasksNeedingReplacement, selectRandomTasks, saveState])

  // Replace a specific task
  const replaceTask = useCallback((taskId: string) => {
    const now = Date.now()
    const availableTasks = getAvailableTasksForSelection()

    if (availableTasks.length === 0) {
      // If no available tasks, just remove this one
      const updatedTasks = state.selectedTasks.filter(t => t.id !== taskId)
      saveState({ selectedTasks: updatedTasks })
      return
    }

    // Select a random replacement
    const replacement = availableTasks[Math.floor(Math.random() * availableTasks.length)]

    const updatedTasks = state.selectedTasks.map(task => {
      if (task.id === taskId) {
        return {
          id: replacement.id,
          shownAt: now,
          lastSeenAt: now
        }
      }
      return task
    })

    // Update history
    const newTaskHistory = [...state.taskHistory, taskId, replacement.id].slice(-20)

    saveState({
      selectedTasks: updatedTasks,
      taskHistory: newTaskHistory
    })
  }, [state.selectedTasks, state.taskHistory, getAvailableTasksForSelection, saveState])

  // Mark task as seen (update lastSeenAt)
  const markTaskAsSeen = useCallback((taskId: string) => {
    const now = Date.now()
    const updatedTasks = state.selectedTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, lastSeenAt: now }
      }
      return task
    })

    saveState({ selectedTasks: updatedTasks })
  }, [state.selectedTasks, saveState])

  // Mark task as completed
  const markTaskCompleted = useCallback((_taskId: string) => {
    const newCompletedCount = state.completedCount + 1
    safeSet(COMPLETED_TASKS_KEY, newCompletedCount)

    setState(prevState => ({
      ...prevState,
      completedCount: newCompletedCount
    }))
  }, [state.completedCount])

  // Reset daily progress
  const resetDailyProgress = useCallback(() => {
    safeSet(COMPLETED_TASKS_KEY, 0)
    setState(prevState => ({
      ...prevState,
      completedCount: 0
    }))
  }, [])

  // Get current tasks as Ritual objects
  const currentTasks = useMemo(() => {
    return state.selectedTasks
      .map(taskSelection => availableTasks.find(task => task.id === taskSelection.id))
      .filter((task): task is Ritual => task !== undefined)
  }, [state.selectedTasks, availableTasks])

  // Check if all tasks are completed
  const allTasksCompleted = useMemo(() => {
    return state.completedCount >= MAX_TASKS_TO_SHOW
  }, [state.completedCount])

  // Initialize tasks only once globally
  useEffect(() => {
    if (!isGlobalInitialized) {
      // Initializing tasks selection

      // Only initialize if we have no tasks at all
      if (state.selectedTasks.length === 0) {
        // No tasks found, creating new ones
        initializeTasks()
      } else {
        // Check for auto-replacements only
        const tasksToReplace = getTasksNeedingReplacement()
        if (tasksToReplace.length > 0) {
          // Auto-replacing tasks
          initializeTasks()
        } else {
          // Tasks are up to date, no replacement needed
        }
      }
      isGlobalInitialized = true
    }
  }, []) // Empty dependency array - run only once

  return {
    currentTasks,
    completedCount: state.completedCount,
    allTasksCompleted,
    replaceTask,
    markTaskAsSeen,
    markTaskCompleted,
    resetDailyProgress,
    initializeTasks
  }
}
