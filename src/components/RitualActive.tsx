import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Ritual, RitualSession, BreathingMode } from '../types/rituals'
import { tokens } from '../design/tokens'
// import { playButtonClick } from '../utils/sounds'
import { ActionBar } from './ActionBar'
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

const TimeDisplay = styled.div`
  position: relative;
  z-index: 1;
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  text-align: center;
`

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
  margin: 0 0 ${tokens.space.md} 0;
  line-height: ${tokens.typography.lineHeight.relaxed};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const StepInstruction = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text.primary};
  font-style: italic;
  line-height: ${tokens.typography.lineHeight.normal};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
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

const KindnessIdeas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${tokens.space.sm};
  margin-bottom: ${tokens.space.lg};
`

const KindnessIdea = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  padding: ${tokens.space.md};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  background: ${({ theme }) => theme.color.bg};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &:hover {
    border-color: ${({ theme }) => theme.color.pet.primary};
    background: ${({ theme }) => theme.color.pet.primary}10;
    transform: translateY(-1px);
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

  const handleGratitudeSave = () => {
    if (gratitudeText.trim()) {
      onComplete()
    }
  }

  const handleKindnessSelect = (idea: string) => {
    setSelectedKindness(idea)
    setTimeout(() => {
      onComplete()
    }, 1000)
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
          >
            <WaterGlass
              onClick={handleWaterFill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WaterFill $level={waterLevel} />
            </WaterGlass>
            <StepDescription>
              Нажми на стакан, чтобы &quot;выпить&quot; воду
            </StepDescription>
          </motion.div>
        )

      case 'gratitude':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GratitudeInput
              type="text"
              placeholder="За что ты благодарен сегодня?"
              value={gratitudeText}
              onChange={(e) => setGratitudeText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGratitudeSave()}
            />
            <motion.button
              onClick={handleGratitudeSave}
              disabled={!gratitudeText.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #A7C7B7, #F7BFA0)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Сохранить
            </motion.button>
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
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A7C7B7, #F7BFA0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                marginBottom: '24px'
              }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🤸
            </motion.div>
            <StepDescription>
              {session.mode === 'guided' && currentStep ? currentStep.description : 'Выполняй лёгкую растяжку в своём темпе'}
            </StepDescription>
            {session.mode === 'guided' && currentStep && (
              <StepInstruction>
                {currentStep.instruction}
              </StepInstruction>
            )}
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
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A7C7B7, #F7BFA0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                marginBottom: '24px'
              }}
              animate={{ 
                x: [-10, 10, -10],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🚶
            </motion.div>
            <StepDescription>
              {session.mode === 'guided' && currentStep ? currentStep.description : 'Иди спокойным шагом в своём темпе'}
            </StepDescription>
            {session.mode === 'guided' && currentStep && (
              <StepInstruction>
                {currentStep.instruction}
              </StepInstruction>
            )}
          </motion.div>
        )

      case 'kindness':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StepDescription>
              Выбери одно доброе дело:
            </StepDescription>
            <KindnessIdeas>
              {['Улыбнись незнакомцу', 'Поблагодари кого-то', 'Сделай комплимент', 'Помоги с мелочью'].map((idea) => (
                <KindnessIdea
                  key={idea}
                  onClick={() => handleKindnessSelect(idea)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {idea}
                </KindnessIdea>
              ))}
            </KindnessIdeas>
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
      {/* Timer removed for stretch and walk - they are now user-controlled */}

      {renderRitualContent()}

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
    </ActiveContainer>
  )
}
