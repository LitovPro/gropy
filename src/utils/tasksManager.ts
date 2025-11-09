import { Ritual } from '../types/rituals'
import { RITUALS } from '../data/ritualsData'

export interface TaskWithMetadata {
  ritual: Ritual
  shownAt: number
  lastSeenAt: number
  replacedAt?: number
}

export interface TaskHistoryEntry {
  taskId: string
  shownAt: number
  replacedAt?: number
  completedAt?: number
}

// Constants
export const AUTO_REPLACE_HOURS = 6
export const MAX_TASKS_TO_SHOW = 3
export const MAX_HISTORY_SIZE = 20

// Get all available daily tasks (excluding breathing)
export const getAvailableDailyTasks = (): Ritual[] => {
  return RITUALS.filter(ritual =>
    ritual.type === 'daily' && ritual.id !== 'breath'
  )
}

// Check if a task needs auto-replacement
export const shouldAutoReplaceTask = (lastSeenAt: number): boolean => {
  const now = Date.now()
  const sixHoursAgo = now - (AUTO_REPLACE_HOURS * 60 * 60 * 1000)
  return lastSeenAt < sixHoursAgo
}

// Get tasks that need auto-replacement
export const getTasksNeedingReplacement = (tasks: TaskWithMetadata[]): TaskWithMetadata[] => {
  return tasks.filter(task =>
    shouldAutoReplaceTask(task.lastSeenAt) && !task.replacedAt
  )
}

// Select random tasks from available pool
export const selectRandomTasks = (
  availableTasks: Ritual[],
  count: number,
  excludeIds: string[] = []
): Ritual[] => {
  const filtered = availableTasks.filter(task => !excludeIds.includes(task.id))
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Get available tasks for selection (excluding current and history)
export const getAvailableTasksForSelection = (
  currentTaskIds: string[],
  historyTaskIds: string[]
): Ritual[] => {
  const allTasks = getAvailableDailyTasks()
  const excludedIds = [...currentTaskIds, ...historyTaskIds]

  return allTasks.filter(task => !excludedIds.includes(task.id))
}

// Create task metadata
export const createTaskMetadata = (_ritual: Ritual): Omit<TaskWithMetadata, 'ritual'> => {
  const now = Date.now()
  return {
    shownAt: now,
    lastSeenAt: now
  }
}

// Update task last seen timestamp
export const updateTaskLastSeen = (task: TaskWithMetadata): TaskWithMetadata => {
  return {
    ...task,
    lastSeenAt: Date.now()
  }
}

// Mark task as replaced
export const markTaskAsReplaced = (task: TaskWithMetadata): TaskWithMetadata => {
  return {
    ...task,
    replacedAt: Date.now()
  }
}

// Check if all tasks are completed
export const areAllTasksCompleted = (completedCount: number): boolean => {
  return completedCount >= MAX_TASKS_TO_SHOW
}

// Get completion percentage
export const getCompletionPercentage = (completedCount: number): number => {
  return Math.round((completedCount / MAX_TASKS_TO_SHOW) * 100)
}

// Generate motivational messages based on completion
export const getMotivationalMessage = (completedCount: number): string => {
  if (completedCount === 0) {
    const messages = [
      "Готов начать день? ✨",
      "Выбери свою первую задачу 🌱",
      "Время для заботы о себе 💚",
      "Начни с малого 🌿",
      "Твой день начинается здесь ☀️"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  if (completedCount === 1) {
    const messages = [
      "1 задача - отлично! ✨",
      "Выполнил 1 задачу - молодец! 🌟",
      "1 задача - это здорово! 💚",
      "Отлично! 1 задача выполнена 🎯"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  if (completedCount === 2) {
    const messages = [
      "2 задачи - отлично! ✨",
      "Выполнил 2 задачи - молодец! 🌟",
      "2 задачи - это здорово! 💚",
      "Отлично! 2 задачи выполнено 🎯"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  // All tasks completed
  return "Все задачи выполнены! 🎉"
}

// Generate encouraging quotes
export const getEncouragingQuote = (completedCount: number): string => {
  if (completedCount === 0) {
    const quotes = [
      "Начни с простой задачи 🌱",
      "Каждый день - новая возможность ☀️",
      "Маленькие шаги ведут к большим изменениям 🌿",
      "Забота о себе - это не роскошь 💚",
      "Начни с того, что нравится 🌸"
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  if (completedCount < MAX_TASKS_TO_SHOW) {
    const quotes = [
      "Ты заботишься о себе - это прекрасно 💚",
      "Отличный прогресс! Продолжай в том же духе ✨",
      "Маленькие шаги ведут к большим изменениям 🌿",
      "Каждая задача - это подарок себе 🎁",
      "Ты делаешь это для себя - это важно 💎"
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  // All tasks completed
  return "Ты большой молодец! Но не надо переусердствовать, делай по силам 💚"
}

// Check if it's a new day (for resetting progress)
export const isNewDay = (lastResetDate: string): boolean => {
  const today = new Date().toDateString()
  return lastResetDate !== today
}

// Get today's date string
export const getTodayDateString = (): string => {
  return new Date().toDateString()
}

// Format time remaining for auto-replacement
export const getTimeUntilAutoReplace = (lastSeenAt: number): string => {
  const now = Date.now()
  const sixHoursAgo = now - (AUTO_REPLACE_HOURS * 60 * 60 * 1000)
  const timeRemaining = lastSeenAt - sixHoursAgo

  if (timeRemaining <= 0) {
    return "Заменяется..."
  }

  const hours = Math.floor(timeRemaining / (60 * 60 * 1000))
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))

  if (hours > 0) {
    return `${hours}ч ${minutes}м`
  }

  return `${minutes}м`
}
