import { Todo, GameState } from '../types'

/**
 * Validation schemas for data import/export
 */

export interface ImportData {
  todos?: Todo[]
  gameState?: GameState
  ownedItems?: string[]
  completedSuggestions?: string[]
  exportDate?: string
  version?: string
}

/**
 * Validate Todo object
 */
const validateTodo = (todo: unknown): todo is Todo => {
  if (typeof todo !== 'object' || todo === null) return false
  
  const t = todo as Record<string, unknown>
  
  return (
    typeof t.id === 'string' &&
    typeof t.text === 'string' &&
    typeof t.completed === 'boolean' &&
    typeof t.points === 'number' &&
    typeof t.category === 'string' &&
    typeof t.energy === 'string' &&
    typeof t.createdAt === 'string' &&
    typeof t.updatedAt === 'string' &&
    (t.completedAt === undefined || typeof t.completedAt === 'string') &&
    (t.deletedAt === undefined || typeof t.deletedAt === 'string') &&
    (t.mood === undefined || typeof t.mood === 'string')
  )
}

/**
 * Validate GameState object
 */
const validateGameState = (state: unknown): state is GameState => {
  if (typeof state !== 'object' || state === null) return false
  
  const s = state as Record<string, unknown>
  
  return (
    typeof s.points === 'number' &&
    typeof s.level === 'number' &&
    typeof s.experience === 'number' &&
    typeof s.streak === 'number' &&
    typeof s.lastActivityDateUTC === 'string' &&
    Array.isArray(s.achievements) &&
    s.achievements.every((a: unknown) => typeof a === 'string')
  )
}

/**
 * Validate imported data structure
 * @param data - Data to validate
 * @returns Validation result with error message if invalid
 */
export const validateImportData = (data: unknown): { isValid: boolean; error?: string } => {
  if (typeof data !== 'object' || data === null) {
    return { isValid: false, error: 'Invalid data format: expected object' }
  }

  const importData = data as Record<string, unknown>

  // Validate todos array if present
  if (importData.todos !== undefined) {
    if (!Array.isArray(importData.todos)) {
      return { isValid: false, error: 'Invalid todos: expected array' }
    }
    if (!importData.todos.every(validateTodo)) {
      return { isValid: false, error: 'Invalid todos: invalid todo structure' }
    }
  }

  // Validate gameState if present
  if (importData.gameState !== undefined) {
    if (!validateGameState(importData.gameState)) {
      return { isValid: false, error: 'Invalid gameState: invalid structure' }
    }
  }

  // Validate ownedItems if present
  if (importData.ownedItems !== undefined) {
    if (!Array.isArray(importData.ownedItems)) {
      return { isValid: false, error: 'Invalid ownedItems: expected array' }
    }
    if (!importData.ownedItems.every((item: unknown) => typeof item === 'string')) {
      return { isValid: false, error: 'Invalid ownedItems: all items must be strings' }
    }
  }

  // Validate completedSuggestions if present
  if (importData.completedSuggestions !== undefined) {
    if (!Array.isArray(importData.completedSuggestions)) {
      return { isValid: false, error: 'Invalid completedSuggestions: expected array' }
    }
    if (!importData.completedSuggestions.every((id: unknown) => typeof id === 'string')) {
      return { isValid: false, error: 'Invalid completedSuggestions: all items must be strings' }
    }
  }

  return { isValid: true }
}

/**
 * Sanitize imported data to ensure type safety
 * @param data - Raw imported data
 * @returns Sanitized data with proper types
 */
export const sanitizeImportData = (data: unknown): ImportData => {
  if (typeof data !== 'object' || data === null) {
    return {}
  }

  const raw = data as Record<string, unknown>
  const sanitized: ImportData = {}

  if (Array.isArray(raw.todos)) {
    sanitized.todos = raw.todos.filter(validateTodo)
  }

  if (validateGameState(raw.gameState)) {
    sanitized.gameState = raw.gameState
  }

  if (Array.isArray(raw.ownedItems)) {
    sanitized.ownedItems = raw.ownedItems.filter((item): item is string => typeof item === 'string')
  }

  if (Array.isArray(raw.completedSuggestions)) {
    sanitized.completedSuggestions = raw.completedSuggestions.filter((id): id is string => typeof id === 'string')
  }

  if (typeof raw.exportDate === 'string') {
    sanitized.exportDate = raw.exportDate
  }

  if (typeof raw.version === 'string') {
    sanitized.version = raw.version
  }

  return sanitized
}

