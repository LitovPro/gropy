export type Energy = 'easy' | 'medium' | 'energetic'
export type Category = 'daily' | 'selfcare' | 'health' | 'work' | 'study'

export interface Todo {
  id: string
  text: string
  completed: boolean
  points: number
  category: Category
  energy: Energy
  createdAt: string
  completedAt?: string
  updatedAt: string
  deletedAt?: string
  mood?: string
}

export interface GameState {
  points: number
  level: number
  experience: number
  streak: number
  lastActivityDateUTC: string // YYYY-MM-DD
  achievements: string[]
}

export interface Suggestion {
  id: string
  title: string
  category: Category
  energy: Energy
  emoji: string
  motivationalText?: string
}

