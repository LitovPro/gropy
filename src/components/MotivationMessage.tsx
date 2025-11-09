import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'

const MessageContainer = styled(motion.div)`
  background: linear-gradient(135deg, #E8F5E8 0%, #F0F8F0 100%);
  border: 2px solid #DDE7E1;
  border-radius: 20px;
  padding: 32px 24px;
  margin: 24px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #81C784, #A5D6A7);
  }
`

const MessageTitle = styled(motion.h2)`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 16px 0;
  line-height: ${tokens.typography.lineHeight.tight};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const MessageText = styled(motion.p)`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 24px 0;
  line-height: ${tokens.typography.lineHeight.relaxed};
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`

const SuggestionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`

const SuggestionItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${({ theme }) => theme.color.text};
  border: 1px solid rgba(221, 231, 225, 0.5);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
  }
`

const CelebrationIcon = styled(motion.div)`
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
`

interface MotivationMessageProps {
  onClose?: () => void
}

export const MotivationMessage: React.FC<MotivationMessageProps> = React.memo(({
  _onClose
}) => {
  return (
    <MessageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
    >
      <CelebrationIcon
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.2,
          ease: 'easeOut'
        }}
      >
        🎉
      </CelebrationIcon>

      <MessageTitle
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Молодец! 🌟
      </MessageTitle>

      <MessageText
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Дорогой пользователь, ты большой молодец! Но не надо переусердствовать,
        делай по силам. Новые задачи появятся чуть позже, а сейчас можешь
        выполнять повторяемые упражнения и заполнить дневник.
      </MessageText>

      <SuggestionsContainer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <SuggestionItem
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>🌿</span>
          <span>Попробуй дыхательные упражнения</span>
        </SuggestionItem>

        <SuggestionItem
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>📖</span>
          <span>Заполни дневник эмоций</span>
        </SuggestionItem>

        <SuggestionItem
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>🌟</span>
          <span>Посмотри свой прогресс</span>
        </SuggestionItem>
      </SuggestionsContainer>
    </MessageContainer>
  )
})

MotivationMessage.displayName = 'MotivationMessage'
