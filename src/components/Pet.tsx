import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'
import { hapticLight } from '../utils/haptics'
import { playPetInteraction } from '../utils/sounds'

const PetContainer = styled.div`
  position: fixed;
  bottom: 150px;
  right: 24px;
  z-index: 40;
  pointer-events: none;

  /* Left-handed support */
  :root[data-left-handed="true"] & {
    right: auto;
    left: 24px;
  }

  /* Ensure pet doesn't overlap with navigation */
  @media (max-width: 480px) {
    bottom: 120px;
  }

  /* For very small screens, move pet higher */
  @media (max-width: 360px) {
    bottom: 150px;
    right: 16px;
  }

  /* Left-handed support for small screens */
  :root[data-left-handed="true"] & {
    @media (max-width: 360px) {
      right: auto;
      left: 16px;
    }
  }
`

const PetButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.color.pet.primary}, ${({ theme }) => theme.color.pet.secondary});
  border: 4px solid ${({ theme }) => theme.color.pet.accent};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 8px 25px ${tokens.color.shadow}, 0 0 0 1px ${({ theme }) => theme.color.pet.accent}40;
  pointer-events: auto;
  transition: all ${tokens.motion.base} ${tokens.motion.easing};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${({ theme }) => theme.color.pet.accent}20 0%, transparent 70%);
    opacity: 0;
    transition: opacity ${tokens.motion.base} ${tokens.motion.easing};
  }

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.color.pet.accent}30;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.3;
    }
  }

  &:hover {
    transform: scale(1.12);
    box-shadow: 0 12px 35px ${tokens.color.shadow}, 0 0 0 2px ${({ theme }) => theme.color.pet.accent}60;
    
    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }
`

const Bubble = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  position: absolute;
  bottom: 85px;
  right: -10px;
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.pet.accent};
  border-radius: ${tokens.radius.card};
  padding: 12px 16px;
  max-width: 200px;
  min-width: 120px;
  box-shadow: 0 8px 25px ${tokens.color.shadow};
  pointer-events: none;
  backdrop-filter: blur(10px);

  /* Ensure bubble doesn't go off screen */
  @media (max-width: 480px) {
    max-width: 160px;
    padding: 10px 14px;
    right: -15px;
    bottom: 80px;
  }

  /* Left-handed adaptation */
  :root[data-left-handed="true"] & {
    right: auto;
    left: -10px;

    &::after {
      right: auto;
      left: 25px;
    }

    &::before {
      right: auto;
      left: 25px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 25px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.color.surface};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    right: 25px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.color.pet.accent};
  }
`

const BubbleText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  line-height: 1.4;
  text-align: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  /* Mobile adaptation */
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.3;
  }
`


// Warm messages system
const warmMessages = {
  greeting: [
    "привет, друг! 🌿",
    "как дела? я здесь",
    "ты не один, я рядом",
    "всё хорошо, просто дыши",
  ],
  encouragement: [
    "ты делаешь достаточно",
    "маленькие шаги — это тоже победа",
    "мне хорошо рядом с тобой",
    "ты заботишься о себе — это важно",
  ],
  celebration: [
    "мне приятно за тебя! 💚",
    "ты молодец!",
    "как же я рад! ✨",
    "это было прекрасно",
  ],
  comfort: [
    "всё в порядке, просто будь здесь",
    "не нужно быть идеальным",
    "я рядом, когда тебе нужно",
    "сегодня не нужно быть продуктивным",
  ],
}

interface PetProps {
  showVictoryBubble?: boolean
  onVictoryBubbleShown?: () => void
  petMood?: 'happy' | 'sleepy' | 'excited' | 'calm'
}

const PetComponent: React.FC<PetProps> = ({
  showVictoryBubble = false,
  onVictoryBubbleShown,
  petMood = 'happy',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState('')
  const [petEmoji, setPetEmoji] = useState('🐾')

  // Pet emoji based on mood
  const petEmojis = React.useMemo(() => ({
    happy: '🐾',
    sleepy: '😴',
    excited: '✨',
    calm: '🌿',
  }), [])

  useEffect(() => {
    setPetEmoji(petEmojis[petMood])
  }, [petMood, petEmojis])

  useEffect(() => {
    if (showVictoryBubble) {
      const celebrationMessage = warmMessages.celebration[
        Math.floor(Math.random() * warmMessages.celebration.length)
      ]
      setBubbleText(celebrationMessage)
      setShowBubble(true)
      onVictoryBubbleShown?.()

      // Hide bubble after 4 seconds
      const timer = setTimeout(() => {
        setShowBubble(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [showVictoryBubble, onVictoryBubbleShown])

  const handlePetClick = () => {
    hapticLight()
    playPetInteraction()
    
    // Random warm message
    const messages = [
      ...warmMessages.greeting,
      ...warmMessages.encouragement,
      ...warmMessages.comfort,
    ]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    
    setBubbleText(randomMessage)
    setShowBubble(true)

    // Hide bubble after 3 seconds
    setTimeout(() => {
      setShowBubble(false)
    }, 3000)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <PetContainer>
      <PetButton
        onClick={handlePetClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: isHovered ? [-3, 3, -3] : [-2, 2, -2],
          rotate: isHovered ? [-2, 2, -2] : 0,
        }}
        whileHover={{ 
          scale: 1.12,
          rotate: [0, -8, 8, 0],
        }}
        whileTap={{ 
          scale: 0.92,
          rotate: [0, -15, 15, 0],
        }}
        transition={{ 
          duration: 0.1, 
          ease: 'easeOut',
          // For floating animation
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }
        }}
        aria-label="Погладить питомца"
      >
        <motion.span
          animate={{
            scale: showVictoryBubble ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        >
          {petEmoji}
        </motion.span>
      </PetButton>
      

      <AnimatePresence>
        {showBubble && (
          <Bubble
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: 'easeOut',
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            role="alert"
            aria-live="polite"
          >
            <BubbleText>{bubbleText}</BubbleText>
          </Bubble>
        )}
      </AnimatePresence>
    </PetContainer>
  )
}

export const Pet = React.memo(PetComponent)


