import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'
import { useRitualSession } from '../hooks/useRitualSession'
import { RITUALS } from '../data/ritualsData'
import { RitualCard } from './RitualCard'
import { RitualPreview } from './RitualPreview'
import { BottomSheet } from './BottomSheet'
import { RitualActive } from './RitualActive'
import { RitualReward } from './RitualReward'
import { ShareCard } from './ShareCard'
import { Ritual, BreathingMode } from '../types/rituals'

const ExercisesContainer = styled.div`
  min-height: calc(100dvh - 56px - env(safe-area-inset-bottom, 0));
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: calc(56px + env(safe-area-inset-bottom, 0));
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
`

const ContentArea = styled.div`
  padding: ${tokens.space.lg};
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: ${tokens.space.md};
  }

  @media (max-width: 360px) {
    padding: ${tokens.space.sm};
  }
`

const ProgressCard = styled.div`
  background: #FFFFFF;
  border: 2px solid #DDE7E1;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 6px;
  text-align: center;

  @media (max-width: 480px) {
    padding: 16px;
  }

  @media (max-width: 360px) {
    padding: 12px;
  }
`

const ProgressText = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  line-height: ${tokens.typography.lineHeight.normal};
`

const ExercisesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${tokens.space.md};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${tokens.space.sm};
  }

  @media (max-width: 360px) {
    gap: ${tokens.space.xs};
  }
`

interface ExercisesPagerProps {
  completedRituals: string[]
  onCompleteRitual: (ritualId: string) => void
  maxDailyRituals: number
}

const ExercisesPagerComponent: React.FC<ExercisesPagerProps> = React.memo(({
  completedRituals,
  onCompleteRitual,
  _maxDailyRituals
}) => {
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [lastCompletedRitual, setLastCompletedRitual] = useState<string | null>(null)
  const [hiddenRituals, setHiddenRituals] = useState<Set<string>>(new Set())

  const {
    currentSession,
    state,
    timeLeft,
    isPaused,
    startSession,
    startRitualTimer,
    pauseTimer,
    resumeTimer,
    completeSession,
    finishSession,
    cancelSession,
    updateSettings,
    getSettings
  } = useRitualSession()

  // Filter exercises - only breathing
  const exerciseRituals = useMemo(() => {
    return RITUALS.filter(ritual => ritual.id === 'breath')
  }, [])

  const handleRitualStart = useCallback((ritualId: string, mode: 'guided' | 'quick') => {
    const ritual = exerciseRituals.find(r => r.id === ritualId)
    if (!ritual) return

    const settings = getSettings(ritualId)
    const duration = settings.duration || ritual.defaultDuration

    setSelectedRitual(ritual)
    setShowPreview(false)
    startSession(ritualId, mode, duration)
    playButtonClick()
  }, [exerciseRituals, getSettings, startSession])

  const handleRitualResume = useCallback(() => {
    if (currentSession && timeLeft === 0) {
      if (!currentSession.ritualId) {
        return
      }

      const settings = getSettings(currentSession.ritualId)
      const ritual = exerciseRituals.find(r => r.id === currentSession.ritualId)

      // For breathing exercise - don't use timer
      if (currentSession.ritualId === 'breath') {
        // Don't start timer for breathing - it's cycle-based
      } else {
        const duration = settings.duration ?? ritual?.defaultDuration ?? 30
        startRitualTimer(duration)
      }
    }
  }, [currentSession, timeLeft, startRitualTimer, getSettings, exerciseRituals])

  const handleRitualRemove = useCallback((ritualId: string) => {
    const ritual = exerciseRituals.find(r => r.id === ritualId)

    if (ritual) {
      setHiddenRituals(prev => new Set([...prev, ritualId]))
      // Exercise hidden temporarily
    }
  }, [exerciseRituals])

  const handleSessionFinish = useCallback(() => {
    if (currentSession) {
      onCompleteRitual(currentSession.ritualId)
      setLastCompletedRitual(currentSession.ritualId)
      setShowShare(true)
    }
    finishSession()
    setSelectedRitual(null)
  }, [currentSession, onCompleteRitual, finishSession])

  const handleSessionCancel = useCallback(() => {
    cancelSession()
    setSelectedRitual(null)
    setShowPreview(false)
  }, [cancelSession])

  const handlePreviewClose = useCallback(() => {
    setShowPreview(false)
    setSelectedRitual(null)
  }, [])

  const handleModeChange = useCallback((mode: 'guided' | 'quick') => {
    if (selectedRitual) {
      updateSettings(selectedRitual.id, { mode })
    }
  }, [selectedRitual, updateSettings])

  const handleBreathingModeChange = useCallback((breathingMode: BreathingMode) => {
    if (selectedRitual) {
      updateSettings(selectedRitual.id, { breathingMode })
    }
  }, [selectedRitual, updateSettings])

  const completedCount = completedRituals.filter(id =>
    exerciseRituals.some(ritual => ritual.id === id)
  ).length

  // Progress messages for exercises - memoized to prevent re-rendering
  const progressMessage = useMemo(() => {
    const count = completedCount

    if (count === 0) {
      const messages = [
        "Готов к дыхательным упражнениям? 🌬️",
        "Время для дыхательной практики 🧘",
        "Начни с дыхания ✨",
        "Дыхание - основа спокойствия 🌿",
        "Время для осознанного дыхания 💚",
        "Готов дышать осознанно? 🌱",
        "Дыхание успокаивает ум 🌸",
        "Начни с глубокого вдоха 💫",
        "Дыхание - твой якорь ⚓",
        "Время для дыхательной медитации 🕯️"
      ]
      return messages[Math.floor(Math.random() * messages.length)]
    }

    const getCountWord = (num: number) => {
      if (num === 1) return "упражнение"
      if (num >= 2 && num <= 4) return "упражнения"
      return "упражнений"
    }

    const countWord = getCountWord(count)
    const messages = [
      `${count} ${countWord} - отлично! ✨`,
      `Выполнил ${count} ${countWord} - молодец! 🌟`,
      `${count} ${countWord} - это здорово! 💚`,
      `Отлично! ${count} ${countWord} выполнено 🎯`,
      `${count} ${countWord} - отличный прогресс! 🌿`,
      `Выполнил ${count} ${countWord} - это сила! 💪`,
      `${count} ${countWord} - впечатляет! 🌈`,
      `Отлично! ${count} ${countWord} - это мощно! ⚡`,
      `${count} ${countWord} - это здорово! 🌸`,
      `Выполнил ${count} ${countWord} - молодец! 🎉`
    ]

    return messages[Math.floor(Math.random() * messages.length)]
  }, [completedCount])

  const encouragingQuote = useMemo(() => {
    if (completedCount === 0) {
      const quotes = [
        "Дыхание - это жизнь 🌬️",
        "Каждый вдох - новая возможность ☀️",
        "Дыхание успокаивает ум 🌿",
        "Осознанное дыхание - это медитация 💚",
        "Начни с глубокого вдоха 🌸",
        "Дыхание - твой якорь в моменте 🎁",
        "Каждый вдох наполняет энергией 🌟",
        "Дыхание - это подарок себе 💎",
        "Начни с дыхания, продолжай с осознанностью 💫",
        "Каждый вдох - шанс стать спокойнее ✨"
      ]
      return quotes[Math.floor(Math.random() * quotes.length)]
    }

    // Temporarily unused function
    // const getCountWord = (num: number) => {
    //   if (num === 1) return "упражнение"
    //   if (num >= 2 && num <= 4) return "упражнения"
    //   return "упражнений"
    // }

    // const countWord = getCountWord(completedCount) // Temporarily unused
    const quotes = [
      `Ты заботишься о своём дыхании - это прекрасно 💚`,
      `Отличная дыхательная практика! Продолжай ✨`,
      `Дыхание ведёт к спокойствию 🌿`,
      `Каждое упражнение - это подарок себе 🎁`,
      `Ты делаешь это для своего спокойствия - это важно 💎`,
      `Отличная забота о дыхании! 🌸`,
      `Ты находишь свой ритм дыхания 🎵`,
      `Каждое упражнение приближает к гармонии 🌈`,
      `Ты дышишь с особой внимательностью 💫`,
      `Отличный баланс дыхания! ⚖️`
    ]

    return quotes[Math.floor(Math.random() * quotes.length)]
  }, [completedCount])

  return (
    <ExercisesContainer>
      <ContentArea>
        <ProgressCard>
          <ProgressText>
            {completedCount === 0 ? encouragingQuote : `${progressMessage}. ${encouragingQuote}`}
          </ProgressText>
        </ProgressCard>

        <ExercisesGrid>
          {exerciseRituals.map((ritual) => {
            const isCompleted = completedRituals.includes(ritual.id)
            const settings = getSettings(ritual.id)

            // Hide if ritual is manually hidden
            if (hiddenRituals.has(ritual.id)) {
              return null
            }

            // For repeatable rituals, don't hide when completed
            if (ritual.type === 'repeatable') {
              return (
                <RitualCard
                  key={ritual.id}
                  ritual={ritual}
                  settings={settings}
                  onStart={(ritualId, _mode) => {
                    if (ritualId === 'breath') {
                      // For breathing exercise, show preview to select breathing mode
                      setSelectedRitual(ritual)
                      setShowPreview(true)
                    } else {
                      // For other rituals, start immediately
                      handleRitualStart(ritualId, settings.mode)
                    }
                  }}
                  onRemove={handleRitualRemove}
                  isSelected={isCompleted}
                />
              )
            }

            return null
          })}
        </ExercisesGrid>
      </ContentArea>

      {/* Preview Modal */}
      <BottomSheet
        open={showPreview}
        onClose={handlePreviewClose}
        ariaLabel={selectedRitual?.title ?? "Предпросмотр упражнения"}
      >
        {selectedRitual && (
          <RitualPreview
            ritual={selectedRitual}
            settings={getSettings(selectedRitual.id)}
            onStart={() => handleRitualStart(selectedRitual.id, getSettings(selectedRitual.id).mode)}
            onClose={handlePreviewClose}
            onModeChange={handleModeChange}
            onBreathingModeChange={handleBreathingModeChange}
          />
        )}
      </BottomSheet>

      {/* Active Ritual */}
      <AnimatePresence>
        {state === 'active' && currentSession && selectedRitual && (
          <RitualActive
            ritual={selectedRitual}
            session={currentSession}
            timeLeft={timeLeft}
            isPaused={isPaused}
            breathingMode={getSettings(selectedRitual.id).breathingMode}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onStart={handleRitualResume}
            onComplete={completeSession}
            onCancel={handleSessionCancel}
          />
        )}
      </AnimatePresence>

      {/* Reward */}
      <AnimatePresence>
        {state === 'reward' && selectedRitual && currentSession && (
          <RitualReward
            ritual={selectedRitual}
            onComplete={handleSessionFinish}
          />
        )}
      </AnimatePresence>

      {/* Share Card */}
      <AnimatePresence>
        {showShare && lastCompletedRitual && (
          <ShareCard
            type="ritual"
            data={{
              ritualId: lastCompletedRitual,
              ritualTitle: exerciseRituals.find(r => r.id === lastCompletedRitual)?.title ?? '',
              completedCount: completedCount
            }}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </ExercisesContainer>
  )
})

ExercisesPagerComponent.displayName = 'ExercisesPager'

export const ExercisesPager = React.memo(ExercisesPagerComponent)
