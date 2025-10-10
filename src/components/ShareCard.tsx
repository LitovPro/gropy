import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'
import { telegramShare, telegramNotification } from '../utils/telegram'

const ShareContainer = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
  text-align: center;
`

const ShareTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`

const ShareDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 ${tokens.space.lg} 0;
  line-height: 1.5;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`

const ShareButton = styled(motion.button)`
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
  margin: 0 auto;

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
    transform: none;
  }
`

const ShareIcon = styled.span`
  font-size: 16px;
`

// Share card templates
const shareTemplates = {
  ritualComplete: {
    title: 'ритуал выполнен ✨',
    message: 'сегодня я сделал одно маленькое доброе дело для себя',
    emoji: '🌿',
  },
  diaryEntry: {
    title: 'размышления дня',
    message: 'поделился своими чувствами в gropy',
    emoji: '📖',
  },
  streak: {
    title: 'серия заботы',
    message: 'уже {days} дней подряд забочусь о себе',
    emoji: '💚',
  },
  general: {
    title: 'gropy moment',
    message: 'место, где можно просто быть',
    emoji: '🌿',
  },
}

interface ShareCardProps {
  type: keyof typeof shareTemplates
  customMessage?: string
  days?: number
  className?: string
}

export const ShareCard: React.FC<ShareCardProps> = ({
  type,
  customMessage,
  days,
  className,
}) => {
  const [isSharing, setIsSharing] = useState(false)

  const template = shareTemplates[type] || shareTemplates.general
  const message = customMessage || template.message.replace('{days}', days?.toString() || '0')

  const handleShare = useCallback(async () => {
    if (isSharing) return

    setIsSharing(true)

    try {
      const shareText = `${template.emoji} ${template.title}\n\n${message}\n\n#gropy #selfcare #mindfulness`
      
      // Use Telegram manager for sharing
      const success = await telegramShare(shareText)
      
      if (success) {
        telegramNotification('success')
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText)
        alert('текст скопирован в буфер обмена!')
      }
    } catch {
      // Share failed
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(
          `${template.emoji} ${template.title}\n\n${message}\n\n#gropy #selfcare #mindfulness`
        )
        alert('текст скопирован в буфер обмена!')
      } catch {
        // Clipboard failed
        alert('не удалось поделиться. попробуйте позже.')
      }
    } finally {
      setIsSharing(false)
    }
  }, [message, template, isSharing])

  return (
    <ShareContainer className={className}>
      <ShareTitle>{template.title}</ShareTitle>
      <ShareDescription>
        {message}
      </ShareDescription>
      <ShareButton
        onClick={handleShare}
        disabled={isSharing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      >
        <ShareIcon>📤</ShareIcon>
        {isSharing ? 'делюсь...' : 'поделиться'}
      </ShareButton>
    </ShareContainer>
  )
}

// Hook for sharing with different templates
export const useShare = () => {
  const shareRitualComplete = useCallback((ritualName: string) => {
    return {
      type: 'ritualComplete' as const,
      customMessage: `выполнил ритуал "${ritualName}" - маленький шаг к заботе о себе`,
    }
  }, [])

  const shareDiaryEntry = useCallback((emotion: string) => {
    return {
      type: 'diaryEntry' as const,
      customMessage: `сегодня в моей душе ${emotion}`,
    }
  }, [])

  const shareStreak = useCallback((days: number) => {
    return {
      type: 'streak' as const,
      days,
    }
  }, [])

  const shareGeneral = useCallback((message: string) => {
    return {
      type: 'general' as const,
      customMessage: message,
    }
  }, [])

  return {
    shareRitualComplete,
    shareDiaryEntry,
    shareStreak,
    shareGeneral,
  }
}
