import { Suggestion } from '../types'
import { RITUALS } from '../data/ritualsData'

// Convert rituals to suggestions format
const ritualSuggestions: Suggestion[] = RITUALS.map(ritual => ({
  id: ritual.id,
  title: ritual.title,
  category: ritual.category,
  energy: 'easy', // All our rituals are designed to be easy
  emoji: ritual.icon,
  motivationalText: ritual.quickDescription || ritual.description,
}))

export const getAdaptedDailySuggestions = (): Suggestion[] => {
  return [...ritualSuggestions]
}





