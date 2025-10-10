import React, { useState, useCallback, useMemo } from 'react'
// Updated: handleRitualSettings -> handleRitualRemove
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'
import { useRitualSession } from '../hooks/useRitualSession'
import { RITUALS } from '../data/ritualsData'
import { RitualCard } from './RitualCard'
import { RitualPreview } from './RitualPreview'
import { RitualActive } from './RitualActive'
// import { RitualReflection } from './RitualReflection' // Removed
import { RitualReward } from './RitualReward'
import { ShareCard } from './ShareCard'
import { Ritual, BreathingMode } from '../types/rituals'

const RitualsContainer = styled.div`
  min-height: calc(100dvh - 56px - env(safe-area-inset-bottom, 0));
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: calc(56px + env(safe-area-inset-bottom, 0));
`

const Header = styled.div`
  padding: ${tokens.space.lg} ${tokens.space.lg} 0;
  text-align: center;
`

const HeaderTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.sm} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const HeaderSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  line-height: ${tokens.typography.lineHeight.normal};
`

const ContentArea = styled.div`
  padding: ${tokens.space.lg};
  overflow-y: auto;
`

const ProgressCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
  text-align: center;
`

const ProgressTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.sm} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const ProgressText = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  line-height: ${tokens.typography.lineHeight.normal};
`

const RitualsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${tokens.space.md};
`

interface RitualsPagerProps {
  completedRituals: string[]
  onCompleteRitual: (ritualId: string) => void
  maxDailyRituals: number
}

export const RitualsPager: React.FC<RitualsPagerProps> = ({
  completedRituals,
  onCompleteRitual,
  maxDailyRituals
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
    // addReflection, // Removed - no reflection step
    finishSession,
    cancelSession,
    updateSettings,
    getSettings
  } = useRitualSession()

  const handleRitualStart = useCallback((ritualId: string, mode: 'guided' | 'quick') => {
    const ritual = RITUALS.find(r => r.id === ritualId)
    if (!ritual) return

    const settings = getSettings(ritualId)
    const duration = settings.duration || ritual.defaultDuration
    
    setSelectedRitual(ritual)
    setShowPreview(false)
    startSession(ritualId, mode, duration)
    playButtonClick()
  }, [getSettings, startSession])

  const handleRitualResume = useCallback(() => {
    // handleRitualResume debug removed
    
    if (currentSession && timeLeft === 0) {
      // Check if we have the ritual ID
      if (!currentSession.ritualId) {
        // currentSession.ritualId is undefined
        return
      }
      
      // Start the timer for the current session
      // Starting timer for session
      const settings = getSettings(currentSession.ritualId)
      const ritual = RITUALS.find(r => r.id === currentSession.ritualId)
      
      // For breathing exercise, stretch, and walk - don't use timer
      if (currentSession.ritualId === 'breath' || currentSession.ritualId === 'breathe' || 
          currentSession.ritualId === 'stretch' || currentSession.ritualId === 'walk') {
        // Don't start timer for these rituals - they are user-controlled
      } else {
        const duration = settings.duration || ritual?.defaultDuration || 30
        startRitualTimer(duration)
      }
    } else {
      // Cannot start - conditions not met
    }
  }, [currentSession, timeLeft, startRitualTimer, getSettings])

  const handleRitualRemove = useCallback((ritualId: string) => {
    // Remove/hide ritual from the list (temporary, until page refresh)
    const ritual = RITUALS.find(r => r.id === ritualId)
    
    if (ritual) {
      // Add to hidden rituals (temporary) - no confirmation needed
      setHiddenRituals(prev => new Set([...prev, ritualId]))
      console.log(`Ritual ${ritualId} hidden (temporary)`)
    }
  }, [])

  // handleReflectionComplete removed - no reflection step

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

  const completedCount = completedRituals.length
  // const remainingCount = maxDailyRituals - completedCount

  // Rich collection of progress messages and quotes
  const getProgressMessage = (count: number) => {
    if (count === 0) {
      const messages = [
        "Готов начать день? ✨",
        "Выбери свой первый ритуал 🌱",
        "Время для заботы о себе 💚",
        "Начни с малого 🌿",
        "Твой день начинается здесь ☀️",
        "Что выберешь первым? 🤔",
        "Готов к ритуалам? 🧘",
        "Время для себя 💫",
        "Начни с простого 🌸",
        "Выбери что-то приятное 🌺"
      ]
      return messages[Math.floor(Math.random() * messages.length)]
    }

    // For 1+ rituals, create dynamic messages with the actual count
    const getCountWord = (num: number) => {
      if (num === 1) return "ритуал"
      if (num >= 2 && num <= 4) return "ритуала"
      return "ритуалов"
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
  }

  // Memoized encouraging quote to prevent changing on every render
  const encouragingQuote = useMemo(() => {
    if (completedCount === 0) {
      const quotes = [
        "Начни с простого ритуала 🌱",
        "Каждый день - новая возможность ☀️",
        "Маленькие шаги ведут к большим изменениям 🌿",
        "Забота о себе - это не роскошь 💚",
        "Начни с того, что нравится 🌸",
        "Каждый ритуал - это подарок себе 🎁",
        "Начни с малого, думай о большом 🌟",
        "Забота о себе - это инвестиция 💎",
        "Начни с простого, продолжай с любовью 💫",
        "Каждый день - шанс стать лучше ✨"
      ]
      return quotes[Math.floor(Math.random() * quotes.length)]
    }

    // For 1+ rituals, create dynamic quotes with the actual count
    const getCountWord = (num: number) => {
      if (num === 1) return "ритуал"
      if (num >= 2 && num <= 4) return "ритуала"
      return "ритуалов"
    }

    const countWord = getCountWord(completedCount)
    const quotes = [
      `Ты заботишься о себе - это прекрасно 💚`,
      `Отличный прогресс! Продолжай в том же духе ✨`,
      `Маленькие шаги ведут к большим изменениям 🌿`,
      `Каждый ритуал - это подарок себе 🎁`,
      `Ты делаешь это для себя - это важно 💎`,
      `Отличная забота о себе! 🌸`,
      `Ты находишь свой ритм дня 🎵`,
      `Каждый ритуал приближает к гармонии 🌈`,
      `Ты заботишься о себе с особой внимательностью 💫`,
      `Отличный баланс дня! ⚖️`
    ]

    return quotes[Math.floor(Math.random() * quotes.length)]
  }, [completedCount])

  return (
    <RitualsContainer>
      <ContentArea>
        <ProgressCard>
          <ProgressText>
            {completedCount === 0 ? encouragingQuote : `${getProgressMessage(completedCount)}. ${encouragingQuote}`}
          </ProgressText>
        </ProgressCard>

        <RitualsGrid>
          {RITUALS.map((ritual) => {
            const isCompleted = completedRituals.includes(ritual.id)
            const settings = getSettings(ritual.id)
            
            // Hide if ritual is manually hidden
            if (hiddenRituals.has(ritual.id)) {
              return null
            }
            
            // For daily rituals, hide if completed
            if (ritual.type === 'daily' && isCompleted) {
              return null
            }
            
            return (
              <RitualCard
                key={ritual.id}
                ritual={ritual}
                settings={settings}
                onStart={(_ritualId, _mode) => {
                  if (ritual.id === 'breath') {
                    // For breathing exercise, show preview to select breathing mode
                    setSelectedRitual(ritual)
                    setShowPreview(true)
                  } else {
                    // For other rituals, start immediately
                    handleRitualStart(ritual.id, settings.mode)
                  }
                }}
                onRemove={handleRitualRemove}
                isSelected={isCompleted}
              />
            )
          })}
        </RitualsGrid>
      </ContentArea>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedRitual && (
          <RitualPreview
            ritual={selectedRitual}
            settings={getSettings(selectedRitual.id)}
            onStart={() => handleRitualStart(selectedRitual.id, getSettings(selectedRitual.id).mode)}
            onClose={handlePreviewClose}
            onModeChange={handleModeChange}
            onBreathingModeChange={handleBreathingModeChange}
          />
        )}
      </AnimatePresence>

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

      {/* Reflection - removed */}

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
              ritualTitle: RITUALS.find(r => r.id === lastCompletedRitual)?.title || '',
              completedCount: completedCount
            }}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </RitualsContainer>
  )
}