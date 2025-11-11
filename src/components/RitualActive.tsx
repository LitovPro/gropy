import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Ritual, RitualSession, BreathingMode } from '../types/rituals'
import { tokens } from '../design/tokens'
// import { playButtonClick } from '../utils/sounds'
import { ActionBar } from './ActionBar'
import { WindowIcon } from './WindowIcon'
import { getBreathingSteps, getBreathingPhases, BREATHING_MODES } from '../data/ritualsData'
import { RITUAL_SVG } from '../design/ritualSvg'

const ActiveContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.color.bg};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${tokens.space.xl};
`

const BackButton = styled(motion.button)`
  position: absolute;
  top: ${tokens.space.lg};
  left: ${tokens.space.lg};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: none;
  background: #A7C7B7;
  box-shadow: 0 4px 16px rgba(167, 199, 183, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(167, 199, 183, 0.4);
    background: #9BB5A5;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    width: 22px;
    height: 22px;
    color: white;
  }
`

const ProgressCircle = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $progress: number }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme, $progress }) =>
      `${theme.color.pet.primary} ${$progress * 3.6}deg, ${theme.color.border} ${$progress * 3.6}deg`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${tokens.space.xl};
  position: relative;
  border: 3px solid ${({ theme }) => theme.color.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    width: 160px;
    height: 160px;
    background: ${({ theme }) => theme.color.bg};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.color.border};
  }

  &::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.pet.primary};
    opacity: 0.2;
    z-index: 2;
  }
`

// Temporarily unused styled component
// const TimeDisplay = styled.div`
//   position: relative;
//   z-index: 1;
//   font-size: ${tokens.typography.fontSize['3xl']};
//   font-weight: ${tokens.typography.fontWeight.bold};
//   font-family: ${tokens.typography.fontFamily.primary};
//   color: ${({ theme }) => theme.color.text};
//   text-align: center;
// `

const StepContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  text-align: center;
  margin-bottom: ${tokens.space.xl};
  max-width: 400px;
`

const StepTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.sm} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const StepDescription = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 ${tokens.space.lg} 0;
  line-height: ${tokens.typography.lineHeight.relaxed};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const StepInstruction = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  line-height: ${tokens.typography.lineHeight.normal};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: ${tokens.space.xl};
  opacity: 0.8;
`

const BreathingPhases = styled.div`
  display: flex;
  gap: ${tokens.space.sm};
  margin-bottom: ${tokens.space.lg};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  /* Adjust gap for different number of phases */
  &[data-phase-count="2"] {
    gap: ${tokens.space.xl};
  }

  &[data-phase-count="3"] {
    gap: ${tokens.space.lg};
  }

  &[data-phase-count="4"] {
    gap: ${tokens.space.md};
  }
`

const PhaseIndicator = styled.div<{ $isActive: boolean; $phase: 'inhale' | 'hold' | 'exhale' | 'pause' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $isActive, $phase, theme }) => {
    if (!$isActive) return theme.color.border;
    switch ($phase) {
      case 'inhale': return '#4CAF50'; // Зеленый для вдоха
      case 'hold': return '#FF9800';   // Оранжевый для задержки
      case 'exhale': return '#2196F3'; // Синий для выдоха
      case 'pause': return '#9C27B0';  // Фиолетовый для паузы
      default: return theme.color.pet.primary;
    }
  }};
  transition: all 0.3s ease;
  transform: ${({ $isActive }) => $isActive ? 'scale(1.2)' : 'scale(1)'};
  box-shadow: ${({ $isActive }) => $isActive ? '0 0 8px rgba(0,0,0,0.3)' : 'none'};
`

const PhaseLabel = styled.div<{ $isActive: boolean }>`
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${({ $isActive, theme }) => $isActive ? theme.color.text : theme.color.textMuted};
  text-align: center;
  margin-top: ${tokens.space.xs};
  transition: color 0.3s ease;
`


const WaterGlass = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  width: 120px;
  height: 160px;
  border: 4px solid ${({ theme }) => theme.color.pet.primary};
  border-radius: 0 0 60px 60px;
  position: relative;
  margin: 0 auto ${tokens.space.lg} auto;
  background: ${({ theme }) => theme.color.bg};
  overflow: hidden;
`

const WaterFill = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $level: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ $level }) => $level}%;
  background: linear-gradient(to top,
    ${({ theme }) => theme.color.pet.primary}80,
    ${({ theme }) => theme.color.pet.primary}40
  );
  border-radius: 0 0 56px 56px;
  transition: height 0.5s ease;
`

// Unused legacy styled helpers removed for clarity


interface RitualActiveProps {
  ritual: Ritual
  session: RitualSession
  timeLeft: number
  isPaused: boolean
  breathingMode?: BreathingMode
  onPause: () => void
  onResume: () => void
  onStart?: () => void
  onComplete: () => void
  onCancel: () => void
}

export const RitualActive: React.FC<RitualActiveProps> = ({
  ritual,
  session,
  timeLeft,
  isPaused,
  breathingMode = 'calming',
  onPause,
  onResume,
  onStart,
  onComplete,
  onCancel
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [waterLevel, setWaterLevel] = useState(0)
  // gratitude text input removed (not used)
  // const [selectedKindness] = useState<string | null>(null)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [headRotated, setHeadRotated] = useState(false)
  const [isWalking, setIsWalking] = useState(false)
  const [animTriggered, setAnimTriggered] = useState<Record<string, boolean>>({})
  const isAnimating = !!animTriggered[ritual.id]
  const triggerAnimAndComplete = (delayMs: number) => {
    setAnimTriggered(prev => prev[ritual.id] ? prev : { ...prev, [ritual.id]: true })
    setTimeout(() => { onComplete() }, delayMs)
  }

  // Debug info removed for production

  const currentStep = ritual.guidedSteps?.[currentStepIndex]
  const progress = session.duration ? (session.duration - timeLeft) / session.duration : 0

  // State for breathing cycles
  const [breathingStartTime, setBreathingStartTime] = useState<number | null>(null)
  const [forceUpdate, setForceUpdate] = useState(0)

  // Initialize breathing start time when component mounts for breathing exercises
  useEffect(() => {
    if ((ritual.id === 'breath' || ritual.id === 'breathe') && !breathingStartTime) {
      // Don't auto-start, wait for user to click "Начать"
    }
  }, [ritual.id, breathingStartTime])

  // Memoized calculations for breathing ritual
  const breathingCalculations = useMemo(() => {
    if (ritual.id !== 'breath' && ritual.id !== 'breathe') return null

    if (!breathingStartTime) {
      return {
        duration: 0,
        elapsed: 0,
        completedCycles: 0,
        cycleProgress: 0,
        isActive: false
      }
    }

    const breathingSteps = getBreathingSteps(breathingMode)
    const cycleDuration = breathingSteps.reduce((total, step) => total + step.duration, 0) * 1000
    const maxCycles = BREATHING_MODES[breathingMode]?.cycles || 5

    const elapsed = Date.now() - breathingStartTime
    const currentCycle = Math.floor(elapsed / cycleDuration)
    const cycleProgress = (elapsed % cycleDuration) / cycleDuration

    // Debug: log breathing calculations (removed for production)

    return {
      duration: 0, // No fixed duration for breathing
      elapsed,
      completedCycles: currentCycle,
      cycleProgress,
      isActive: true,
      maxCycles
    }
  }, [ritual.id, breathingStartTime, breathingMode, forceUpdate])

  // Handle guided steps progression
  useEffect(() => {
    if (session.mode === 'guided' && ritual.guidedSteps && timeLeft > 0) {
      // const stepDuration = currentStep?.duration || 0
      const totalSteps = ritual.guidedSteps.length
      const totalDurationSec = session.duration ?? 1
      const stepProgress = (totalDurationSec - timeLeft) / totalDurationSec
      const newStepIndex = Math.min(Math.floor(stepProgress * totalSteps), totalSteps - 1)

      if (newStepIndex !== currentStepIndex) {
        setCurrentStepIndex(newStepIndex)
      }
    }
  }, [timeLeft, session, ritual.guidedSteps, currentStepIndex])

  // Handle breathing phases for breathe ritual
  useEffect(() => {
    if (!breathingCalculations) {
      setBreathingPhase('inhale')
      return
    }

    const { cycleProgress, completedCycles, isActive, maxCycles } = breathingCalculations

    // Debug: log breathing calculations (removed for production)

    if (isActive) {
      const breathingSteps = getBreathingSteps(breathingMode)
      let currentPhaseIndex = 0
      let accumulatedProgress = 0
      const totalDuration = breathingSteps.reduce((total, step) => total + step.duration, 0)

      for (let i = 0; i < breathingSteps.length; i++) {
        const step = breathingSteps[i]!
        const stepDuration = step.duration
        const stepProgress = totalDuration > 0 ? stepDuration / totalDuration : 0

        if (cycleProgress < accumulatedProgress + stepProgress) {
          currentPhaseIndex = i
          break
        }
        accumulatedProgress += stepProgress
      }

      // Map step index to phase based on breathing mode
      const phases = getBreathingPhases(breathingMode)
      const newPhase = phases[currentPhaseIndex] || 'inhale'

      // Debug: log phase change (removed for production)

      setBreathingPhase(newPhase)

      // Auto-complete only after max cycles
      if (completedCycles >= (maxCycles ?? 0)) {
        // Auto-completing after max cycles
        setTimeout(() => {
          onComplete()
        }, 100) // Small delay to ensure state is updated
      }
    } else {
      // Always start with inhale when ritual is not active or just started
      setBreathingPhase('inhale')
    }
  }, [breathingCalculations, onComplete, breathingMode])

  // Force re-render for breathing calculations
  useEffect(() => {
    if (!breathingStartTime || (ritual.id !== 'breath' && ritual.id !== 'breathe')) {
      return
    }

    const interval = setInterval(() => {
      // Force re-render by updating a dummy state
      setForceUpdate(prev => prev + 1)
    }, 100)

    return () => clearInterval(interval)
  }, [breathingStartTime, ritual.id])

  // formatTime removed (unused)

  const handleWaterFill = () => {
    setWaterLevel(100)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const handleStretchComplete = () => {
    setHeadRotated(true)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const handleGratitudeSave = () => {
    setTimeout(() => {
      onComplete()
    }, 800)
  }


  const handleWalkComplete = () => {
    setIsWalking(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  const renderRitualContent = () => {
    // renderRitualContent debug removed
    switch (ritual.id) {
      case 'breathe':
      case 'breath':
        // Rendering breathe content
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
        <ProgressCircle
          $progress={progress}
          animate={breathingStartTime ? {
            scale: breathingPhase === 'inhale' ? [0.8, 1.3] :
                   breathingPhase === 'hold' ? 1.3 :
                   breathingPhase === 'exhale' ? [1.3, 0.8] : 0.8,
            opacity: breathingPhase === 'inhale' ? [0.6, 1] :
                    breathingPhase === 'hold' ? 1 :
                    breathingPhase === 'exhale' ? [1, 0.6] : 0.6
          } : {
            scale: 1,
            opacity: 0.7
          }}
          transition={breathingStartTime ? {
            duration: breathingPhase === 'inhale' ? 4 :
                     breathingPhase === 'hold' ? 4 :
                     breathingPhase === 'exhale' ? 6 : 2,
            ease: breathingPhase === 'hold' || breathingPhase === 'pause' ? "linear" : "easeInOut"
          } : {
            duration: 0.3,
            ease: "easeOut"
          }}
        />

            <BreathingPhases data-phase-count={getBreathingPhases(breathingMode).length}>
              {getBreathingPhases(breathingMode).map((phase) => {
                const phaseLabels = {
                  inhale: 'Вдох',
                  hold: 'Задержка',
                  exhale: 'Выдох',
                  pause: 'Пауза'
                }

                return (
                  <div key={phase}>
                    <PhaseIndicator $isActive={breathingPhase === phase} $phase={phase} />
                    <PhaseLabel $isActive={breathingPhase === phase}>
                      {phaseLabels[phase]}
                    </PhaseLabel>
                  </div>
                )
              })}
            </BreathingPhases>

            <StepDescription>
              {!breathingStartTime ? 'Нажмите "Начать" чтобы начать дыхательное упражнение' :
               breathingCalculations ?
                 `Цикл ${breathingCalculations.completedCycles + 1} из ${breathingCalculations.maxCycles}` :
                 'Следуй за ритмом дыхания'}
            </StepDescription>
            {!breathingStartTime ? (
              <StepInstruction>
                Готовы начать? Следуйте за визуальными подсказками
              </StepInstruction>
            ) : session.mode === 'guided' && currentStep ? (
              <StepInstruction>
                {currentStep.instruction}
              </StepInstruction>
            ) : session.mode === 'quick' ? (
              <StepInstruction>
                Вдох 4 сек → Задержка 4 сек → Выдох 6 сек → Пауза 2 сек
              </StepInstruction>
            ) : null}
          </motion.div>
        )

      case 'brush-teeth':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* дуга зубов (минимально) */}
              <path d="M15 55 Q60 65 105 55" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>

              {/* группа щётки */}
              <motion.g
                animate={isAnimating ? { x: [0, 10, 0], y: [0, -2, 0], rotate: [0, -2, 0] } : {}}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              >
                {/* ручка */}
                <path d="M20 45 H75" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} strokeLinecap="round"/>
                {/* щетинки — тонкие линии с лёгкой вибрацией */}
                {[0, 5, 10, 15, 20].map((dx) => (
                  <motion.line
                    key={dx}
                    x1={55 + dx} y1={40}
                    x2={55 + dx} y2={34}
                    stroke={RITUAL_SVG.stroke}
                    strokeWidth={RITUAL_SVG.strokeWidthThin}
                    animate={isAnimating ? { y2: [34, 33, 34] } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut", repeat: 0 }}
                  />
                ))}
              </motion.g>

              {/* пена — точки с лёгкой пульсацией после клика */}
              {[30, 36, 42].map((x, i) => (
                <motion.circle
                  key={x}
                  cx={x} cy={48} r={2}
                  fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={isAnimating ? { scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 1 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </motion.svg>
            <StepDescription>Почисти зубы медленно и осознанно</StepDescription>
            <StepInstruction>Нажми на рисунок, когда закончил</StepInstruction>
          </motion.div>
        )

      case 'massage-temples':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* контур головы */}
              <circle cx="50" cy="35" r="22" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} />
              {/* виски - пульсация тонкими линиями */}
              <motion.circle cx="35" cy="35" r={4} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}
                             animate={isAnimating ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : {}}
                             transition={{ duration: 1.2, ease: "easeInOut" }}/>
              <motion.circle cx="65" cy="35" r={4} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}
                             animate={isAnimating ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : {}}
                             transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}/>
            </motion.svg>
            <StepDescription>Помассируй виски, чтобы снять напряжение</StepDescription>
            <StepInstruction>Нажми на рисунок, когда закончишь</StepInstruction>
          </motion.div>
        )

      case 'massage-shoulders':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* плечи дугой */}
              <motion.path
                d="M15 55 Q60 35 105 55"
                fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* точки массажа тонкими кружками */}
              <circle cx="35" cy="50" r={3} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}/>
              <circle cx="85" cy="50" r={3} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}/>
            </motion.svg>
            <StepDescription>Помассируй плечи, чтобы снять зажимы</StepDescription>
            <StepInstruction>Нажми на рисунок, когда закончишь</StepInstruction>
          </motion.div>
        )

      case 'water':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <WaterGlass
              onClick={handleWaterFill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WaterFill $level={waterLevel} />
            </WaterGlass>
            <StepDescription>
              Выпей стакан воды для поддержания здоровья и энергии
            </StepDescription>
            <StepInstruction>
              Нажми на стакан, чтобы &quot;выпить&quot; воду
            </StepInstruction>
          </motion.div>
        )

      case 'gratitude':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={handleGratitudeSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <path
                d="M30 50 C30 50, 10 35, 10 22 C10 15, 16 10, 23 10 C27 10, 30 13, 30 13 C30 13, 33 10, 37 10 C44 10, 50 15, 50 22 C50 35, 30 50, 30 50 Z"
                fill="none"
                stroke="#A7C7B7"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <StepDescription>
              Подумай о том, за что ты благодарен сегодня
            </StepDescription>
            <StepInstruction>
              Произнеси вслух или запиши на бумаге, затем нажми на сердце
            </StepInstruction>
          </motion.div>
        )

      case 'stretch':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.div
              style={{
                width: '240px',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={handleStretchComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  rotate: headRotated ? 90 : 0
                }}
                transition={{
                  duration: headRotated ? 0.5 : 0,
                  ease: "easeInOut"
                }}
              >
                <circle cx="100" cy="100" r="95" fill="#F5F3EE" stroke="#A7C7B7" strokeWidth="4"/>
                <ellipse cx="85" cy="85" rx="12" ry="8" fill="#F5F3EE" stroke="#A7C7B7" strokeWidth="3"/>
                <ellipse cx="115" cy="85" rx="12" ry="8" fill="#F5F3EE" stroke="#A7C7B7" strokeWidth="3"/>
                <circle cx="85" cy="85" r="4" fill="#A7C7B7"/>
                <circle cx="115" cy="85" r="4" fill="#A7C7B7"/>
                <circle cx="87" cy="83" r="1.5" fill="#DDE7E1"/>
                <circle cx="117" cy="83" r="1.5" fill="#DDE7E1"/>
                <path d="M 75 120 Q 100 140 125 120" fill="none" stroke="#A7C7B7" strokeWidth="3" strokeLinecap="round"/>
              </motion.svg>
            </motion.div>
            <StepDescription>
              Медленно поворачивай голову влево и вправо
            </StepDescription>
            <StepInstruction>
              Нажми на голову, чтобы завершить упражнение
            </StepInstruction>
          </motion.div>
        )

      case 'walk':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.div
              style={{
                width: '360px',
                height: '360px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onClick={handleWalkComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                width="360"
                height="360"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                animate={isWalking ? {
                  x: [0, 200, 400],
                  opacity: [1, 1, 0],
                  transition: {
                    duration: 3,
                    ease: "easeInOut"
                  }
                } : {}}
              >
                <circle
                  cx="50"
                  cy="15"
                  r="8"
                  fill="none"
                  stroke="#A7C7B7"
                  strokeWidth="1"
                />
                <path
                  d="M 50 23 L 50 50 M 50 28 Q 38 32 35 42 M 50 28 Q 62 32 65 42 M 50 50 Q 42 60 38 75 M 50 50 Q 58 60 62 75"
                  fill="none"
                  stroke="#A7C7B7"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
            <StepDescription>
              {session.mode === 'guided' && currentStep ? currentStep.description : 'Иди спокойным шагом в своём темпе'}
            </StepDescription>
            <StepInstruction>
              Нажми на фигурку, когда закончишь прогулку
            </StepInstruction>
          </motion.div>
        )

      case 'wash-face':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1000)}
            >
              {/* лицо */}
              <circle cx="60" cy="40" r="22" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} />
              {/* капли воды (тонкие) */}
              <motion.circle
                cx={50} cy={18} r={2.5} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}
                initial={{ cy: 18, opacity: 1 }}
                animate={isAnimating ? { cy: [18, 30, 42], opacity: [1, 1, 0] } : { cy: 18, opacity: 1 }}
                transition={{ duration: 1, ease: RITUAL_SVG.ease }}
              />
              <motion.circle
                cx={70} cy={18} r={2.5} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}
                initial={{ cy: 18, opacity: 1 }}
                animate={isAnimating ? { cy: [18, 30, 42], opacity: [1, 1, 0] } : { cy: 18, opacity: 1 }}
                transition={{ duration: 1, ease: RITUAL_SVG.ease, delay: 0.15 }}
              />
              {/* закрытые глаза */}
              <line x1="52" y1="40" x2="56" y2="40" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} strokeLinecap="round" />
              <line x1="64" y1="40" x2="68" y2="40" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} strokeLinecap="round" />
            </motion.svg>
            <StepDescription>Умойся прохладной водой для бодрости</StepDescription>
            <StepInstruction>Нажми на рисунок, когда умоешься</StepInstruction>
          </motion.div>
        )

      case 'play-music':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1500)}
            >
              {/* нота */}
              <motion.path
                d="M30 60 q10 -10 20 0 v-30 h10 v40"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { pathLength: [0, 1] } : {}}
                transition={{ duration: 1, ease: RITUAL_SVG.ease }}
              />
              <motion.circle
                cx={28} cy={62} r={6} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.svg>
            <StepDescription>Включи любимую песню</StepDescription>
            <StepInstruction>Нажми на ноту, когда послушаешь</StepInstruction>
          </motion.div>
        )

      case 'water-plants':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* горшок — крупнее и по центру */}
              <rect x="38" y="46" width="44" height="24" rx="4" ry="4" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              <line x1="38" y1="46" x2="82" y2="46" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              {/* лист — тонкий контур */}
              <motion.path
                d="M60 46 Q62 36 72 34 Q68 42 62 46"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidthThin}
                animate={isAnimating ? { pathLength: [0, 1] } : {}}
                transition={{ duration: 1, ease: RITUAL_SVG.ease }}
              />
              {/* капля воды — падает в горшок */}
              <motion.circle
                cx={52} cy={28} r={2} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidthThin}
                initial={{ cy: 28, opacity: 1 }}
                animate={isAnimating ? { cy: [28, 40, 46], opacity: [1, 1, 0] } : { cy: 28, opacity: 1 }}
                transition={{ duration: 1, ease: RITUAL_SVG.ease }}
              />
            </motion.svg>
            <StepDescription>Полей растения</StepDescription>
            <StepInstruction>Нажми на рисунок, когда польёшь</StepInstruction>
          </motion.div>
        )

      case 'close-tabs':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1000)}
            >
              {/* вкладки */}
              <motion.rect x="15" y="20" width="90" height="12" rx="2" ry="2" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { x: [15, 10, 15] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.rect x="20" y="36" width="85" height="12" rx="2" ry="2" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [1, 0.7, 1] } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.rect x="25" y="52" width="80" height="12" rx="2" ry="2" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { x: [25, 30, 25] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
              {/* крестик закрытия */}
              <motion.line x1="95" y1="24" x2="101" y2="30" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 1 }}
              />
              <motion.line x1="101" y1="24" x2="95" y2="30" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 1 }}
              />
            </motion.svg>
            <StepDescription>Закрой лишние вкладки</StepDescription>
            <StepInstruction>Нажми на рисунок, когда закроешь</StepInstruction>
          </motion.div>
        )

      case 'look-sky':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1000)}
            >
              {/* облака */}
              <motion.path
                d="M20 40 Q30 35 40 40 Q50 35 60 40"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.circle cx={85} cy={28} r={6} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 2 }}
              />
            </motion.svg>
            <StepDescription>Посмотри на небо</StepDescription>
            <StepInstruction>Нажми на рисунок, когда посмотришь</StepInstruction>
          </motion.div>
        )

      case 'ventilate':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <div
              style={{
                userSelect: 'none',
                color: 'rgb(167, 199, 183)'
              }}
            >
              <WindowIcon size={440} onOpen={onComplete} />
            </div>
            <StepDescription>
              Открой окно на 5 минут
            </StepDescription>
            <StepInstruction>
              Нажми на окно, когда откроешь его
            </StepInstruction>
          </motion.div>
        )

      case 'look-window':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1000)}
            >
              {/* окно */}
              <rect x="20" y="20" width="80" height="40" rx="3" ry="3" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              <line x1="60" y1="20" x2="60" y2="60" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              <line x1="20" y1="40" x2="100" y2="40" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              {/* вид за окном */}
              <motion.path
                d="M22 48 Q40 42 60 48 Q80 42 98 48"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { x: [0, 2, 0] } : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.circle
                cx="88" cy="28" r="4" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 2 }}
              />
            </motion.svg>
            <StepDescription>Посмотри в окно и дай глазам отдохнуть</StepDescription>
            <StepInstruction>Нажми на окно, когда закончишь</StepInstruction>
          </motion.div>
        )

      case 'find-beauty':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* три минималистичные звезды */}
              <motion.path
                d="M20 30 L24 34 L20 38 L16 34 Z"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M60 20 L63 23 L60 26 L57 23 Z"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.path
                d="M95 40 L99 44 L95 48 L91 44 Z"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] } : {}}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              />
            </motion.svg>
            <StepDescription>Найди три красивых предмета вокруг</StepDescription>
            <StepInstruction>Нажми на рисунок, когда отметишь их</StepInstruction>
          </motion.div>
        )

      case 'close-eyes':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1000)}
            >
              {/* контур глаза */}
              <path d="M10 30 Q60 5 110 30 Q60 55 10 30" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              {/* веки (закрытие/открытие) */}
              <motion.line
                x1="20" y1="30" x2="100" y2="30"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                strokeLinecap="round"
                animate={isAnimating ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 1.2 }}
              />
            </motion.svg>
            <StepDescription>Закрой глаза на минуту</StepDescription>
            <StepInstruction>Нажми на глаз, когда закончишь</StepInstruction>
          </motion.div>
        )

      case 'listen-silence':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1500)}
            >
              {/* затухающие волны */}
              <motion.path
                d="M20 35 Q40 20 60 35 Q80 50 100 35"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [1, 0.6, 0.3] } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M25 45 Q45 30 60 45 Q75 60 95 45"
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { opacity: [0.8, 0.4, 0.2] } : {}}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </motion.svg>
            <StepDescription>Послушай тишину</StepDescription>
            <StepInstruction>Нажми на рисунок, когда послушаешь</StepInstruction>
          </motion.div>
        )

      case 'hear-sounds':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1500)}
            >
              {/* пять «звуковых» точек */}
              {[20, 45, 70, 95, 110].map((x, i) => (
                <motion.circle
                  key={x}
                  cx={x} cy={30} r="3"
                  fill="none"
                  stroke={RITUAL_SVG.stroke}
                  strokeWidth={RITUAL_SVG.strokeWidth}
                  animate={isAnimating ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 1 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </motion.svg>
            <StepDescription>Услышь пять звуков вокруг</StepDescription>
            <StepInstruction>Нажми на рисунок, когда отметишь их</StepInstruction>
          </motion.div>
        )

      case 'touch-soft':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* контур ладони (упрощённый) */}
              <path d="M20 60 Q25 40 30 38 Q35 36 40 42 Q42 35 48 36 Q54 37 55 44 Q60 44 62 48 Q64 52 62 58 Q50 70 35 70"
                    fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth} />
              {/* мягкая пульсация */}
              <motion.circle cx={40} cy={55} r={10} fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                             animate={isAnimating ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } : {}}
                             transition={{ duration: 1.5, ease: "easeInOut" }}/>
            </motion.svg>
            <StepDescription>Потрогай что-то мягкое</StepDescription>
            <StepInstruction>Нажми на рисунок, когда почувствуешь мягкость</StepInstruction>
          </motion.div>
        )

      case 'hug-self':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1500)}
            >
              {/* корпус */}
              <circle cx="60" cy="30" r="18" fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}/>
              {/* руки-дуги */}
              <motion.path
                d="M20 60 Q40 45 60 50 Q80 45 100 60"
                fill="none" stroke={RITUAL_SVG.stroke} strokeWidth={RITUAL_SVG.strokeWidth}
                animate={isAnimating ? { scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] } : {}}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </motion.svg>
            <StepDescription>Обними себя — мягко и бережно</StepDescription>
            <StepInstruction>Нажми на рисунок, когда завершишь</StepInstruction>
          </motion.div>
        )

      /* duplicate 'look-window' removed */

      case 'tidy':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: RITUAL_SVG.duration.enter }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.svg
              width="320"
              height="200"
              viewBox="0 0 120 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}
              onClick={() => triggerAnimAndComplete(1200)}
            >
              {/* Столешница (шире) */}
              <line
                x1="10"
                y1="48"
                x2="110"
                y2="48"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                strokeLinecap="round"
              />
              {/* Ножки (расставлены шире и длиннее) */}
              <line
                x1="25"
                y1="48"
                x2="25"
                y2="70"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                strokeLinecap="round"
              />
              <line
                x1="95"
                y1="48"
                x2="95"
                y2="70"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                strokeLinecap="round"
              />
              {/* Беспорядок (волна шире и выше) */}
              <motion.path
                d="
                  M 18 47
                  Q 28 35 40 41
                  Q 50 32 60 42
                  Q 70 33 80 43
                  Q 92 36 102 47
                "
                fill="none"
                stroke={RITUAL_SVG.stroke}
                strokeWidth={RITUAL_SVG.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                initial={{ pathLength: 1, opacity: 1, strokeDasharray: '1px 1px', strokeDashoffset: 0 }}
                animate={isAnimating ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            </motion.svg>
            <StepDescription>Наведи порядок на рабочем месте</StepDescription>
            <StepInstruction>Нажми на стол: беспорядок исчезнет</StepInstruction>
          </motion.div>
        )

      default:
        // Rendering default content
        return (
          <StepContainer>
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepTitle>{currentStep.title}</StepTitle>
                  <StepDescription>{currentStep.description}</StepDescription>
                  {currentStep.instruction && (
                    <StepInstruction>{currentStep.instruction}</StepInstruction>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </StepContainer>
        )
    }
  }

  return (
    <ActiveContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
      <BackButton
        onClick={onCancel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BackButton>

      {/* Timer removed for stretch and walk - they are now user-controlled */}

      {renderRitualContent()}

      {/* Hide ActionBar completely for daily (one-time) tasks */}
      {ritual.type !== 'daily' && (
        <ActionBar
          primaryAction={{
            label: (!breathingStartTime && (ritual.id === 'breath' || ritual.id === 'breathe')) ? 'Начать' : 'Готово',
            onClick: (!breathingStartTime && (ritual.id === 'breath' || ritual.id === 'breathe')) ?
              () => {
                // Start button clicked for breathing exercise
                setBreathingStartTime(Date.now())
                if (onStart) {
                  onStart()
                }
              } :
              onComplete
          }}
        secondaryActions={[
          {
            label: isPaused ? 'Продолжить' : 'Пауза',
            onClick: isPaused ? onResume : onPause
          },
          {
            label: 'Отмена',
            onClick: onCancel
          }
        ]}
      />
      )}
    </ActiveContainer>
  )
}
