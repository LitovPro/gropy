/**
 * Application constants
 */

// Game constants
export const MAX_DAILY_RITUALS = 3
export const DEFAULT_SHOP_ITEM_PRICE = 10
export const RITUAL_COMPLETION_POINTS = 1

// UI constants
export const VICTORY_BUBBLE_DURATION = 3000 // milliseconds
export const RESET_RELOAD_DELAY = 250 // milliseconds

// Storage keys
export const STORAGE_KEYS = {
  TODOS: 'gropy-todos',
  GAME_STATE: 'gropy-game-state',
  OWNED_ITEMS: 'gropy-owned-items',
  COMPLETED_SUGGESTIONS: 'gropy-completed-suggestions',
  COMPLETED_RITUALS: 'gropy-completed-rituals',
  RITUAL_HISTORY: 'gropy-ritual-history',
  DAILY_STREAK: 'gropy-daily-streak',
  DIARY_ENTRIES: 'gropy-diary-entries',
  JOURNAL_STATE: 'gropy-journal-state',
  THEME: 'gropy-theme',
} as const

// Export data version
export const EXPORT_DATA_VERSION = '1.0'

