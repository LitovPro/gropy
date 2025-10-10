// Types for the emotional journal system

export type Mood = 'sun' | 'clouds' | 'rain' | 'wind' | 'storm' | 'rainbow' | 'moon' | 'stars' | 'leaves'
export type Intensity = 1 | 2 | 3 // 1 — слабо, 3 — сильно

// Journal entry
export interface JournalEntry {
  id: string
  ts: number // Date.now()
  mood: Mood
  intensity?: Intensity
  note?: string // до ~280 символов
  chips?: string[] // выбранные чип-ответы
  ritualId?: string // если выполнялся микро-ритуал
  tags?: string[] // 'gratitude','breath','water'...
  petReactionSeed?: number
  shared?: boolean // делился ли открыткой
}

// Prompts and rituals
export interface Prompt {
  id: string
  moods: Mood[] // для каких «погод»
  text: string // короткий вопрос
  chips?: string[] // 2–4 готовых ответа
}

export interface Ritual {
  id: string // 'breath_30','water','stretch'
  duration: number // сек
  label: string // «подышим 30 сек»
  moodBias?: Mood[] // приоритет для некоторых «погод»
}

// Storage state
export interface JournalState {
  entries: JournalEntry[]
  lastPromptIds: string[] // чтобы не повторять
  lastRitualIds: string[]
}

// Mood mapping to Russian labels
export const MOOD_LABELS: Record<Mood, string> = {
  sun: 'солнце',
  clouds: 'облака', 
  rain: 'дождь',
  wind: 'ветер',
  storm: 'гроза',
  rainbow: 'радуга',
  moon: 'луна',
  stars: 'звёзды',
  leaves: 'листья'
}

// Mood icons
export const MOOD_ICONS: Record<Mood, string> = {
  sun: '☀️',
  clouds: '☁️',
  rain: '🌧️',
  wind: '🌬️',
  storm: '⛈️',
  rainbow: '🌈',
  moon: '🌙',
  stars: '⭐',
  leaves: '🍃'
}

// Intensity labels
export const INTENSITY_LABELS: Record<Intensity, string> = {
  1: 'слабо',
  2: 'средне', 
  3: 'сильно'
}
