import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'
import { useRitualSession } from '../hooks/useRitualSession'
// import { useTasksSelection } from '../hooks/useTasksSelection' // Temporarily unused
import { RitualCard } from './RitualCard'
import { RitualPreview } from './RitualPreview'
import { BottomSheet } from './BottomSheet'
import { RitualActive } from './RitualActive'
import { RitualReward } from './RitualReward'
import { ShareCard } from './ShareCard'
// import { MotivationMessage } from './MotivationMessage' // Temporarily unused
import { Ritual, BreathingMode } from '../types/rituals'
import { getMotivationalMessage, getEncouragingQuote } from '../utils/tasksManager'
import { RITUALS } from '../data/ritualsData'

const TasksContainer = styled.div`
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

const TasksGrid = styled.div`
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

interface TasksPagerProps {
  completedRituals: string[]
  onCompleteRitual: (ritualId: string) => void
  maxDailyRituals: number
}

const TasksPagerComponent: React.FC<TasksPagerProps> = React.memo(({
  completedRituals,
  onCompleteRitual,
  _maxDailyRituals
}) => {
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [lastCompletedRitual, setLastCompletedRitual] = useState<string | null>(null)

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
    getSettings,
    hideRitual
  } = useRitualSession()

  // Показываем все daily задачи для настройки
  const allDailyTasks = useMemo(() => {
    return RITUALS.filter(ritual => ritual.type === 'daily' && ritual.id !== 'breath')
  }, [])

  const currentTasks = allDailyTasks
  const completedCount = completedRituals.filter(id =>
    allDailyTasks.some(task => task.id === id)
  ).length
  // const allTasksCompleted = false // Всегда false для настройки - temporarily unused

  const handleRitualStart = useCallback((ritualId: string, mode: 'guided' | 'quick') => {
    const ritual = currentTasks.find(r => r.id === ritualId)
    if (!ritual) return

    const settings = getSettings(ritualId)
    const duration = settings.duration || ritual.defaultDuration

    setSelectedRitual(ritual)
    setShowPreview(false)
    startSession(ritualId, mode, duration)
    playButtonClick()
  }, [currentTasks, getSettings, startSession])

  const handleRitualResume = useCallback(() => {
    if (currentSession && timeLeft === 0) {
      if (!currentSession.ritualId) {
        return
      }

      const settings = getSettings(currentSession.ritualId)
      const ritual = currentTasks.find(r => r.id === currentSession.ritualId)

      // For stretch and walk - don't use timer
      if (currentSession.ritualId === 'stretch' || currentSession.ritualId === 'walk') {
        // Don't start timer for these rituals - they are user-controlled
      } else {
        const duration = settings.duration ?? ritual?.defaultDuration ?? 30
        startRitualTimer(duration)
      }
    }
  }, [currentSession, timeLeft, startRitualTimer, getSettings, currentTasks])

  const handleRitualRemove = useCallback((ritualId: string) => {
    hideRitual(ritualId)
    playButtonClick()
  }, [hideRitual])

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

  // Use the new motivational messages
  const progressMessage = useMemo(() => {
    return getMotivationalMessage(completedCount)
  }, [completedCount])

  const encouragingQuote = useMemo(() => {
    return getEncouragingQuote(completedCount)
  }, [completedCount])

  return (
    <TasksContainer>
      <ContentArea>
        <ProgressCard>
          <ProgressText>
            {completedCount === 0 ? encouragingQuote : `${progressMessage}. ${encouragingQuote}`}
          </ProgressText>
        </ProgressCard>

        <TasksGrid>
          <AnimatePresence mode="popLayout">
            {currentTasks.map((ritual) => {
              const isCompleted = completedRituals.includes(ritual.id)
              const settings = getSettings(ritual.id)

              return (
                <RitualCard
                  key={ritual.id}
                  ritual={ritual}
                  settings={settings}
                  onStart={(ritualId, mode) => {
                    handleRitualStart(ritualId, mode)
                  }}
                  onRemove={handleRitualRemove}
                  isSelected={isCompleted}
                  isTask={true}
                />
              )
            })}
          </AnimatePresence>
        </TasksGrid>
      </ContentArea>

      {/* Preview Modal */}
      <BottomSheet
        open={showPreview}
        onClose={handlePreviewClose}
        ariaLabel={selectedRitual?.title ?? "Предпросмотр задачи"}
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
              ritualTitle: currentTasks.find(r => r.id === lastCompletedRitual)?.title ?? '',
              completedCount: completedCount
            }}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </TasksContainer>
  )
})

TasksPagerComponent.displayName = 'TasksPager'

export const TasksPager = React.memo(TasksPagerComponent)
