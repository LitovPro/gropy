import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Ritual, RitualSession, BreathingMode } from '../types/rituals'
import { tokens } from '../design/tokens'
// import { playButtonClick } from '../utils/sounds'
import { ActionBar } from './ActionBar'
import { WindowIcon } from './WindowIcon'
import { getBreathingSteps, getBreathingPhases, BREATHING_MODES } from '../data/ritualsData'

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

const StretchHead = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto ${tokens.space.lg} auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeadIcon = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isRotated: boolean }>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F7F3E9, #E8F4F8);
  border: 2px solid ${({ theme }) => theme.color.pet.primary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;

  /* Волосы */
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 25px;
    border-radius: 35px 35px 0 0;
    background: linear-gradient(135deg, #8B7355, #A68B5B);
    z-index: -1;
  }
`

const LeftEye = styled.div`
  position: absolute;
  top: 28px;
  left: 22px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  border: 2px solid ${({ theme }) => theme.color.pet.primary};
  z-index: 3;

  /* Зрачок */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.pet.primary};
  }

  /* Блик */
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: white;
    z-index: 4;
  }
`

const RightEye = styled.div`
  position: absolute;
  top: 28px;
  right: 22px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  border: 2px solid ${({ theme }) => theme.color.pet.primary};
  z-index: 3;

  /* Зрачок */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.pet.primary};
  }

  /* Блик */
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: white;
    z-index: 4;
  }
`

const Nose = styled.div`
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(135deg, #E8D5C4, #D4C4B0);
  z-index: 3;
`

const Mouth = styled.div`
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 6px;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(135deg, #E8A87C, #D4956B);
  z-index: 3;

  /* Верхняя губа */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background: linear-gradient(135deg, #E8A87C, #D4956B);
  }
`

const Cheeks = styled.div`
  position: absolute;
  top: 45px;
  left: 12px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F7BFA0, #E8A87C);
  opacity: 0.6;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -56px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F7BFA0, #E8A87C);
    opacity: 0.6;
  }
`

const GratitudeInput = styled(motion.input).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  width: 100%;
  padding: ${tokens.space.md};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  background: ${({ theme }) => theme.color.bg};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  margin-bottom: ${tokens.space.lg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.pet.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.pet.primary}20;
  }
`


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
  const [gratitudeText, setGratitudeText] = useState('')
  // const [selectedKindness] = useState<string | null>(null)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [headRotated, setHeadRotated] = useState(false)
  const [heartFilled, setHeartFilled] = useState(false)
  const [isWalking, setIsWalking] = useState(false)

  // Debug info removed for production

  const currentStep = ritual.guidedSteps?.[currentStepIndex]
  const progress = session.duration ? (session.duration - timeLeft) / session.duration : 0

  // State for breathing cycles
  const [breathingStartTime, setBreathingStartTime] = useState<number | null>(null)
  const [completedCycles, setCompletedCycles] = useState(0)
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
      const stepProgress = (session.duration - timeLeft) / session.duration
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

      for (let i = 0; i < breathingSteps.length; i++) {
        const stepDuration = breathingSteps[i].duration
        const totalDuration = breathingSteps.reduce((total, step) => total + step.duration, 0)
        const stepProgress = stepDuration / totalDuration

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
      if (completedCycles >= maxCycles) {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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
    setHeartFilled(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
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
              {getBreathingPhases(breathingMode).map((phase, index) => {
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
            <motion.div
              style={{
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: '#F5F3EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={handleGratitudeSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={heartFilled ? {
                scale: [1, 1.1, 1, 1.1, 1],
                transition: {
                  duration: 1.5,
                  times: [0, 0.2, 0.4, 0.6, 1],
                  ease: "easeInOut"
                }
              } : {}}
            >
              <svg width="267" height="267" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M30 50 C30 50, 10 35, 10 22 C10 15, 16 10, 23 10 C27 10, 30 13, 30 13 C30 13, 33 10, 37 10 C44 10, 50 15, 50 22 C50 35, 30 50, 30 50 Z"
                  fill={heartFilled ? "#A7C7B7" : "none"}
                  stroke="#A7C7B7"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={heartFilled ? {
                    fill: ["none", "#A7C7B7"],
                    transition: {
                      duration: 0.8,
                      ease: "easeInOut"
                    }
                  } : {}}
                />
              </svg>
            </motion.div>
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
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.div
              style={{
                fontSize: '120px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={onComplete}
            >
              👁️
            </motion.div>
            <StepDescription>
              Посмотри в окно и дай глазам отдохнуть
            </StepDescription>
            <StepInstruction>
              Нажми на глаз, когда посмотришь в окно
            </StepInstruction>
          </motion.div>
        )

      case 'tidy':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
          >
            <motion.div
              style={{
                width: '320px',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Рабочий стол */}
              <motion.svg
                width="320"
                height="240"
                viewBox="0 0 320 240"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute' }}
              >
                {/* Столешница */}
                <rect x="20" y="120" width="280" height="8" fill="#8B4513" rx="4"/>

                {/* Ножки стола */}
                <rect x="30" y="128" width="6" height="80" fill="#654321"/>
                <rect x="284" y="128" width="6" height="80" fill="#654321"/>
                <rect x="20" y="128" width="6" height="80" fill="#654321"/>
                <rect x="294" y="128" width="6" height="80" fill="#654321"/>

                {/* Предметы на столе (хаотично разбросанные) */}
                <rect x="40" y="100" width="20" height="15" fill="#FF6B6B" rx="2"/>
                <rect x="80" y="90" width="25" height="20" fill="#4ECDC4" rx="3"/>
                <circle cx="150" cy="105" r="12" fill="#FFE66D"/>
                <rect x="180" y="95" width="30" height="25" fill="#A8E6CF" rx="4"/>
                <rect x="220" y="85" width="15" height="20" fill="#FFB3BA" rx="2"/>
                <rect x="250" y="100" width="20" height="12" fill="#B19CD9" rx="2"/>

                {/* Бумаги */}
                <rect x="60" y="110" width="12" height="8" fill="white" rx="1"/>
                <rect x="65" y="108" width="12" height="8" fill="white" rx="1"/>
                <rect x="70" y="106" width="12" height="8" fill="white" rx="1"/>

                {/* Чашка */}
                <ellipse cx="200" cy="110" rx="8" ry="6" fill="#8B4513"/>
                <rect x="192" y="110" width="16" height="12" fill="#D2691E" rx="2"/>

                {/* Книги */}
                <rect x="120" y="95" width="8" height="20" fill="#2C3E50"/>
                <rect x="130" y="90" width="8" height="25" fill="#34495E"/>
                <rect x="140" y="85" width="8" height="30" fill="#2C3E50"/>
              </motion.svg>

              {/* Анимированная метла */}
              <motion.div
                style={{
                  position: 'absolute',
                  fontSize: '60px',
                  zIndex: 10
                }}
                animate={{
                  x: [0, 20, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🧹
              </motion.div>
            </motion.div>
            <StepDescription>
              Наведи порядок на рабочем месте
            </StepDescription>
            <StepInstruction>
              Убери лишние предметы, разложи всё по местам, затем нажми на стол
            </StepInstruction>
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
