import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Suggestion } from '../../types'
import { hapticSuccess } from '../../utils/haptics'
import { useToast } from '../Toast/useToast'
import {
  SuggestionsContainer,
  Header,
  Title,
  Subtitle,
  Counter,
  Grid,
  SuggestionCard,
  CardContent,
  CardEmoji,
  CardTitle,
  CardMotivation,
  CardActions,
  ActionButton,
  CompletionBanner,
  BannerTitle,
  BannerSubtitle,
  BannerButton,
} from './SuggestionsPager.styles'

interface SuggestionsPagerProps {
  suggestions: Suggestion[]
  onComplete: (suggestion: Suggestion) => void
  onSkip: (suggestion: Suggestion) => void
  completedCount: number
  maxCompletions?: number
}

export const SuggestionsPager: React.FC<SuggestionsPagerProps> = ({
  suggestions,
  onComplete,
  onSkip,
  completedCount,
  maxCompletions = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedSuggestions, setCompletedSuggestions] = useState<string[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { showToast } = useToast()

  const currentSuggestion = suggestions[currentIndex]
  const isCompleted = currentSuggestion && completedSuggestions.includes(currentSuggestion.id)
  const showCompletionBanner = completedCount >= maxCompletions

  const handleComplete = useCallback(
    (suggestion: Suggestion) => {
      if (isTransitioning || completedSuggestions.includes(suggestion.id)) return

      setIsTransitioning(true)
      hapticSuccess()

      // Add to completed list
      setCompletedSuggestions(prev => [...prev, suggestion.id])

      // Show toast with undo
      showToast(`Готово! +1⚡`, {
        action: {
          label: 'Отменить',
          onAction: () => {
            setCompletedSuggestions(prev => prev.filter(id => id !== suggestion.id))
            onComplete(suggestion) // This should be the undo action
          },
        },
      })

      // Call the completion handler
      onComplete(suggestion)

      // Auto-advance after delay
      setTimeout(() => {
        if (currentIndex < suggestions.length - 1) {
          setCurrentIndex(prev => prev + 1)
        }
        setIsTransitioning(false)
      }, 300)
    },
    [currentIndex, suggestions.length, completedSuggestions, isTransitioning, onComplete, showToast]
  )

  const handleSkip = useCallback(
    (suggestion: Suggestion) => {
      if (isTransitioning) return

      onSkip(suggestion)

      // Auto-advance
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(prev => prev + 1)
      }
    },
    [currentIndex, suggestions.length, isTransitioning, onSkip]
  )

  const handleGoToTodos = useCallback(() => {
    // Scroll to todo section or trigger navigation
    const todoSection = document.getElementById('todo-section')
    if (todoSection) {
      todoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  if (showCompletionBanner) {
    return (
      <SuggestionsContainer>
        <CompletionBanner>
          <BannerTitle>Достаточно на сейчас — супер! ✨</BannerTitle>
          <BannerSubtitle>
            Ты выполнил {completedCount} задач. Отличная работа!
          </BannerSubtitle>
          <BannerButton onClick={handleGoToTodos}>
            К делам
          </BannerButton>
        </CompletionBanner>
      </SuggestionsContainer>
    )
  }

  if (!currentSuggestion) {
    return (
      <SuggestionsContainer>
        <Header>
          <Title>Маленькие шаги — тоже суперсилы ✨</Title>
          <Subtitle>Все идеи просмотрены</Subtitle>
        </Header>
      </SuggestionsContainer>
    )
  }

  return (
    <SuggestionsContainer>
      <Header>
        <Title>Маленькие шаги — тоже суперсилы ✨</Title>
        <Subtitle>Выбери до трёх лёгких идей</Subtitle>
        <Counter>
          {completedCount}/{maxCompletions}
        </Counter>
      </Header>

      <Grid>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSuggestion.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ gridColumn: '1 / -1' }}
          >
            <SuggestionCard $energy={currentSuggestion.energy}>
              <CardContent>
                <CardEmoji>{currentSuggestion.emoji}</CardEmoji>
                <CardTitle>{currentSuggestion.title}</CardTitle>
                {currentSuggestion.motivationalText && (
                  <CardMotivation>{currentSuggestion.motivationalText}</CardMotivation>
                )}
              </CardContent>
              <CardActions>
                <ActionButton
                  $variant="primary"
                  onClick={() => handleComplete(currentSuggestion)}
                  disabled={isTransitioning || isCompleted}
                >
                  Выполнить ✨
                </ActionButton>
                <ActionButton
                  $variant="secondary"
                  onClick={() => handleSkip(currentSuggestion)}
                  disabled={isTransitioning}
                >
                  Пропустить
                </ActionButton>
              </CardActions>
            </SuggestionCard>
          </motion.div>
        </AnimatePresence>
      </Grid>

      {/* Screen reader hint */}
      <div className="sr-only">
        Листайте вправо, чтобы увидеть другие идеи
      </div>
    </SuggestionsContainer>
  )
}



