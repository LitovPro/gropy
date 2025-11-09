export type RitualMode = 'guided' | 'quick'
export type BreathingMode = 'calming' | 'box' | 'coherent' | 'triangle'
export type RitualState = 'idle' | 'preview' | 'active' | 'reflect' | 'reward' | 'log'

export interface RitualSettings {
  mode: RitualMode
  duration: number // seconds
  sound: boolean
  haptics: boolean
  suggestions: boolean
  breathingMode?: BreathingMode // для дыхательных упражнений
}

export interface Ritual {
  id: string
  title: string
  description: string
  icon: string
  category: 'breath' | 'body' | 'mind' | 'movement' | 'home' | 'sensory' | 'digital'
  type: 'daily' | 'repeatable' // daily = once per day, repeatable = can do multiple times
  defaultDuration: number
  guidedSteps?: GuidedStep[]
  quickDescription?: string
  reflectionPrompt?: string
  reflectionOptions?: string[]
}

export interface GuidedStep {
  id: string
  title: string
  description: string
  duration: number
  animation?: string
  instruction?: string
}

export interface RitualSession {
  id: string
  ritualId: string
  startTime: number
  endTime?: number
  duration?: number
  mode: RitualMode
  completed: boolean
  reflection?: RitualReflection
  pausedAt?: number
  totalPausedTime: number
}

export interface RitualReflection {
  feeling: 'good' | 'neutral' | 'difficult'
  text?: string
  emoji?: string
  customResponse?: string
}

export interface RitualProgress {
  totalCompleted: number
  streak: number
  lastCompleted?: number
  todayCompleted: string[]
  weeklyStats: {
    [key: string]: number // ritualId -> count
  }
}

export interface RitualRecommendation {
  ritualId: string
  reason: 'time' | 'stress' | 'energy' | 'streak' | 'random'
  priority: number
  message?: string
}

// Time-based recommendations
export const TIME_RECOMMENDATIONS = {
  morning: ['breath', 'water', 'gratitude', 'ventilate', 'wash-face'],
  afternoon: ['water', 'stretch', 'walk', 'look-window', 'massage-shoulders'],
  evening: ['breath', 'gratitude', 'stretch', 'close-eyes', 'listen-silence']
}

// Stress/energy based recommendations
export const CONTEXT_RECOMMENDATIONS = {
  highStress: ['breath', 'walk', 'stretch', 'massage-temples', 'close-tabs', 'listen-silence'],
  lowEnergy: ['water', 'gratitude', 'breath', 'wash-face', 'play-music', 'hug-self'],
  normal: ['breath', 'water', 'stretch', 'gratitude', 'walk', 'find-beauty', 'touch-soft']
}
