import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Ritual, RitualReflection as RitualReflectionType } from '../types/rituals'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'
import { ActionBar } from './ActionBar'

const ReflectionContainer = styled(motion.div).withConfig({
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

const ReflectionContent = styled.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
`

const ReflectionTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.lg} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const FeelingOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${tokens.space.md};
  margin-bottom: ${tokens.space.xl};
`

const FeelingOption = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isSelected: boolean }>`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme, $isSelected }) => 
    $isSelected ? theme.color.pet.primary : theme.color.border};
  border-radius: 50%;
  background: ${({ theme, $isSelected }) => 
    $isSelected 
      ? `linear-gradient(135deg, ${theme.color.pet.primary}20, ${theme.color.warm.medium}20)`
      : theme.color.bg};
  font-size: 24px;
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.color.pet.primary};
  }
`

const FeelingLabel = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin-top: ${tokens.space.sm};
`

const TextInput = styled(motion.textarea).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  width: 100%;
  min-height: 80px;
  padding: ${tokens.space.md};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  background: ${({ theme }) => theme.color.bg};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  resize: vertical;
  margin-bottom: ${tokens.space.lg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.pet.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.pet.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }
`


const SkipButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  cursor: pointer;
  text-decoration: underline;
  margin-top: ${tokens.space.lg};
  transition: color ${tokens.motion.fast} ${tokens.motion.easing};

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`

interface RitualReflectionProps {
  ritual: Ritual
  onComplete: (reflection: RitualReflectionType) => void
  onSkip: () => void
}

export const RitualReflection: React.FC<RitualReflectionProps> = ({
  ritual,
  onComplete,
  onSkip
}) => {
  const [feeling, setFeeling] = useState<'good' | 'neutral' | 'difficult' | null>(null)
  const [text, setText] = useState('')
  const [emoji, setEmoji] = useState('')

  const feelingOptions = [
    { value: 'good' as const, emoji: '😊', label: 'Получилось' },
    { value: 'neutral' as const, emoji: '😐', label: 'Нейтрально' },
    { value: 'difficult' as const, emoji: '😣', label: 'Сложно' }
  ]

  const handleComplete = () => {
    if (feeling) {
      const reflection: RitualReflectionType = {
        feeling,
        text: text.trim() || undefined,
        emoji: emoji || undefined
      }
      onComplete(reflection)
      playButtonClick()
    }
  }

  const handleSkip = () => {
    onSkip()
    playButtonClick()
  }

  return (
    <ReflectionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ReflectionContent>
        <ReflectionTitle>
          {ritual.reflectionPrompt || 'Как прошло?'}
        </ReflectionTitle>

        <FeelingOptions>
          {feelingOptions.map((option) => (
            <div key={option.value}>
              <FeelingOption
                $isSelected={feeling === option.value}
                onClick={() => {
                  setFeeling(option.value)
                  setEmoji(option.emoji)
                  playButtonClick()
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                {option.emoji}
              </FeelingOption>
              <FeelingLabel>{option.label}</FeelingLabel>
            </div>
          ))}
        </FeelingOptions>

        <TextInput
          placeholder="Хочешь добавить что-то ещё? (необязательно)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        <ActionBar
          primaryAction={{
            label: 'Готово',
            onClick: handleComplete,
            disabled: !feeling
          }}
          secondaryActions={[
            {
              label: 'Пропустить',
              onClick: handleSkip
            }
          ]}
        />

        <SkipButton
          onClick={handleSkip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          Можно и пропустить — я рядом
        </SkipButton>
      </ReflectionContent>
    </ReflectionContainer>
  )
}
