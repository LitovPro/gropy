import React, { useState, useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'
import { telegramManager, telegramNotification } from '../utils/telegram'

// Keyframes
const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-10px, -10px) rotate(180deg); }
`

const heartbeat = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`

const SupportContainer = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.color.warm.light}20, ${({ theme }) => theme.color.pet.accent}20);
  border: 2px solid ${({ theme }) => theme.color.pet.accent};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${({ theme }) => theme.color.pet.accent}10 0%, transparent 70%);
    animation: ${float} 6s ease-in-out infinite;
  }
`

const SupportTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.sm} 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  z-index: 1;
`

const SupportDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 ${tokens.space.lg} 0;
  line-height: 1.5;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  z-index: 1;
`

const SupportOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${tokens.space.sm};
  margin-bottom: ${tokens.space.lg};
  position: relative;
  z-index: 1;
`

const SupportButton = styled(motion.button)<{ $isSelected?: boolean }>`
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.pet.primary : theme.color.surface};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? 'white' : theme.color.text};
  border: 2px solid ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.pet.primary : theme.color.border};
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.sm} ${tokens.space.md};
  font-size: 12px;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all ${tokens.motion.base} ${tokens.motion.easing};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.space.xs};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${tokens.color.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`

const SupportAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
`

const SupportLabel = styled.div`
  font-size: 10px;
  opacity: 0.8;
`

const SupportMessage = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.md};
  margin-bottom: ${tokens.space.lg};
  position: relative;
  z-index: 1;
`

const MessageText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;
  text-align: center;
`

const SupportActionButton = styled(motion.button)`
  background: linear-gradient(135deg, ${({ theme }) => theme.color.pet.primary}, ${({ theme }) => theme.color.pet.accent});
  color: white;
  border: none;
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.md} ${tokens.space.lg};
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all ${tokens.motion.base} ${tokens.motion.easing};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.space.sm};
  width: 100%;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px ${tokens.color.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(0);
  }
`

const HeartIcon = styled.span`
  font-size: 16px;
  animation: ${heartbeat} 2s ease-in-out infinite;
`

interface SupportCardProps {
  className?: string
}

const supportOptions = [
  { amount: 5, label: 'кофе', emoji: '☕' },
  { amount: 10, label: 'обед', emoji: '🍽️' },
  { amount: 25, label: 'ужин', emoji: '🌙' },
]

const supportMessages = [
  'спасибо за поддержку! твоя забота помогает развивать gropy 💚',
  'ты делаешь мир добрее, поддерживая заботу о ментальном здоровье ✨',
  'каждая поддержка — это шаг к более тёплому и понимающему миру 🌿',
  'твоя поддержка помогает другим найти место, где можно просто быть 💫',
]

export const SupportCard: React.FC<SupportCardProps> = React.memo(({ className }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // Memoize the support message to prevent re-rendering
  const supportMessage = useMemo(() => {
    return supportMessages[Math.floor(Math.random() * supportMessages.length)]
  }, [selectedAmount]) // Only change when selectedAmount changes

  const handleAmountSelect = useCallback((amount: number) => {
    setSelectedAmount(amount)
    telegramNotification('success')
  }, [])

  const handleSupport = useCallback(async () => {
    if (!selectedAmount || isProcessing) return

    setIsProcessing(true)

    try {
      // const message = supportMessages[Math.floor(Math.random() * supportMessages.length)]
      const success = await telegramManager.openStarsPayment(
        selectedAmount,
        `Поддержка Gropy - ${selectedAmount} ⭐`
      )

      if (success) {
        setShowThankYou(true)
        telegramNotification('success')

        // Hide thank you message after 3 seconds
        setTimeout(() => {
          setShowThankYou(false)
          setSelectedAmount(null)
        }, 3000)
      }
    } catch {
      // Support payment failed
      telegramNotification('error')
    } finally {
      setIsProcessing(false)
    }
  }, [selectedAmount, isProcessing])

  if (showThankYou) {
    return (
      <SupportContainer className={className}>
        <SupportTitle>спасибо! 💚</SupportTitle>
        <SupportDescription>
          твоя поддержка помогает развивать gropy и делать мир добрее
        </SupportDescription>
        <HeartIcon>💚</HeartIcon>
      </SupportContainer>
    )
  }

  return (
    <SupportContainer className={className}>
      <SupportTitle>поддержать gropy</SupportTitle>
      <SupportDescription>
        если gropy приносит тебе тепло и поддержку, можешь поддержать развитие проекта
      </SupportDescription>

      <SupportOptions>
        {supportOptions.map((option) => (
          <SupportButton
            key={option.amount}
            $isSelected={selectedAmount === option.amount}
            onClick={() => handleAmountSelect(option.amount)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            <SupportAmount>{option.emoji} {option.amount}</SupportAmount>
            <SupportLabel>{option.label}</SupportLabel>
          </SupportButton>
        ))}
      </SupportOptions>

      {selectedAmount && (
        <SupportMessage>
          <MessageText>
            {supportMessage}
          </MessageText>
        </SupportMessage>
      )}

      <SupportActionButton
        onClick={handleSupport}
        disabled={!selectedAmount || isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <HeartIcon>💚</HeartIcon>
        {isProcessing ? 'обрабатываю...' : `поддержать ${selectedAmount ?? ''} ⭐`}
      </SupportActionButton>
    </SupportContainer>
  )
})

SupportCard.displayName = 'SupportCard'
