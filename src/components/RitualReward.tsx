import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Ritual, RitualReflection } from '../types/rituals'
import { tokens } from '../design/tokens'
import { playRitualComplete } from '../utils/sounds'

const RewardContainer = styled(motion.div)`
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

const RewardContent = styled.div`
  text-align: center;
  max-width: 400px;
`

const RewardIcon = styled(motion.div)`
  font-size: 80px;
  margin-bottom: ${tokens.space.lg};
`

const RewardTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const RewardMessage = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 ${tokens.space.xl} 0;
  line-height: ${tokens.typography.lineHeight.relaxed};
`

const LeafAnimation = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.color.pet.primary};
  border-radius: 50% 0;
  transform: rotate(45deg);
`

const PetReaction = styled(motion.div)`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.pet.accent};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-top: ${tokens.space.lg};
  position: relative;
  overflow: hidden;
`

const PetMessage = styled.div`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  line-height: ${tokens.typography.lineHeight.relaxed};
`

const ProgressUpdate = styled(motion.div)`
  background: ${({ theme }) => theme.color.pet.primary}20;
  border: 1px solid ${({ theme }) => theme.color.pet.primary}40;
  border-radius: ${tokens.radius.sm};
  padding: ${tokens.space.md};
  margin-top: ${tokens.space.lg};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.pet.primary};
`

interface RitualRewardProps {
  ritual: Ritual
  onComplete: () => void
}

export const RitualReward: React.FC<RitualRewardProps> = ({
  ritual,
  onComplete
}) => {
  useEffect(() => {
    playRitualComplete()
    
    // Auto-advance after 3 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  const getRewardMessage = () => {
    return 'Отлично! Ты молодец! ✨'
  }

  const getPetMessage = () => {
    const messages = {
      breath: 'Дыхание — это основа спокойствия. Ты делаешь правильно.',
      water: 'Вода — это жизнь. Твоё тело благодарно.',
      stretch: 'Растяжка помогает телу расслабиться. Продолжай!',
      gratitude: 'Благодарность делает сердце теплее. Это прекрасно.',
      walk: 'Прогулка — это подарок себе. Ты заслуживаешь это.',
      kindness: 'Доброта возвращается. Ты делаешь мир лучше.'
    }
    return messages[ritual.id as keyof typeof messages] || 'Ты молодец!'
  }

  const getRewardIcon = () => {
    return '🌱'
  }

  return (
    <RewardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <RewardContent>
        <RewardIcon
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            damping: 15, 
            stiffness: 200,
            delay: 0.2 
          }}
        >
          {getRewardIcon()}
        </RewardIcon>

        <RewardTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {getRewardMessage()}
        </RewardTitle>

        <RewardMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          Ритуал &quot;{ritual.title}&quot; завершён
        </RewardMessage>

        {/* Pet reaction temporarily disabled
        <PetReaction
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <PetMessage>{getPetMessage()}</PetMessage>
        </PetReaction>
        */}

        <ProgressUpdate
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.0 }}
        >
          +1 к дневному прогрессу
        </ProgressUpdate>

        {/* Floating leaves animation */}
        {[...Array(5)].map((_, i) => (
          <LeafAnimation
            key={i}
            initial={{ 
              x: Math.random() * 400 - 200, 
              y: 100, 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: Math.random() * 400 - 200, 
              y: -100, 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 3,
              delay: i * 0.2,
              ease: 'easeOut'
            }}
          />
        ))}
      </RewardContent>
    </RewardContainer>
  )
}
