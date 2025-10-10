import { Suggestion } from '../types'

export type DayPhase = 'morning' | 'day' | 'evening'

export const getDayPhase = (): DayPhase => {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'day'
  return 'evening'
}

export const rankSuggestions = (
  suggestions: Suggestion[],
  completedIds: string[] = []
): Suggestion[] => {
  const phase = getDayPhase()
  
  return suggestions
    .filter(s => !completedIds.includes(s.id))
    .sort((a, b) => {
      // Phase-based ranking
      const phaseScore = (s: Suggestion) => {
        if (phase === 'morning' && s.energy === 'easy') return 3
        if (phase === 'day' && s.energy === 'medium') return 3
        if (phase === 'evening' && s.energy === 'easy') return 3
        if (s.energy === 'easy') return 2
        if (s.energy === 'medium') return 1
        return 0
      }
      
      const scoreA = phaseScore(a)
      const scoreB = phaseScore(b)
      
      if (scoreA !== scoreB) return scoreB - scoreA
      
      // Randomize within same score
      return Math.random() - 0.5
    })
}





