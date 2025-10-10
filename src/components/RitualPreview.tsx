import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Ritual, RitualSettings, BreathingMode } from '../types/rituals'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'
import { BottomSheet } from './BottomSheet'
import { ActionBar } from './ActionBar'
import { BREATHING_MODES } from '../data/ritualsData'

const PreviewContent = styled.div`
  padding: ${tokens.space.md};
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: ${tokens.space.sm};
  }
  
  @media (max-width: 360px) {
    padding: ${tokens.space.xs};
  }
  
  @media (max-width: 320px) {
    padding: 8px;
  }
`

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${tokens.space.md};
  
  @media (max-width: 480px) {
    margin-bottom: ${tokens.space.sm};
  }
  
  @media (max-width: 360px) {
    margin-bottom: ${tokens.space.xs};
  }
`

const PreviewIcon = styled.div`
  font-size: 32px;
  margin-right: ${tokens.space.sm};
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin-right: ${tokens.space.xs};
  }
  
  @media (max-width: 360px) {
    font-size: 24px;
  }
`

const PreviewTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0;
  line-height: ${tokens.typography.lineHeight.tight};
  
  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.base};
  }
  
  @media (max-width: 360px) {
    font-size: ${tokens.typography.fontSize.sm};
  }
`

const PreviewDescription = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: ${tokens.space.xs} 0 ${tokens.space.md} 0;
  line-height: ${tokens.typography.lineHeight.relaxed};
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.xs};
    margin: ${tokens.space.xs} 0 ${tokens.space.sm} 0;
  }
  
  @media (max-width: 360px) {
    font-size: ${tokens.typography.fontSize.xs};
    margin: 4px 0 ${tokens.space.xs} 0;
  }
`



const BreathingModeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
  padding: 0;
  justify-content: center;
  box-sizing: border-box;
  min-width: 0;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 6px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 4px;
    margin-bottom: 10px;
  }
`

const BreathingModeButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isSelected: boolean }>`
  min-width: 0;
  border-radius: 14px;
  padding: 12px;
  background: ${({ $isSelected, theme }) => 
    $isSelected ? theme.color.pet.primary : '#f7f7f7'};
  color: ${({ $isSelected, theme }) => 
    $isSelected ? '#ffffff' : theme.color.text};
  font-size: 15px;
  font-weight: 500;
  font-family: ${tokens.typography.fontFamily.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  height: 75px;
  display: grid;
  gap: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-shadow: 0 1px 0 rgba(0,0,0,.06) inset;
  box-sizing: border-box;
  overflow: hidden;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    height: 70px;
    font-size: 14px;
    border-radius: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 8px;
    height: 65px;
    font-size: 13px;
    border-radius: 10px;
  }
  
  @media (max-width: 320px) {
    padding: 6px;
    height: 60px;
    font-size: 12px;
    border-radius: 8px;
  }
  
  @media (max-height: 640px) {
    padding: 10px;
    height: 65px;
  }
`

const BreathingModeName = styled.div`
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
  font-size: 16px;
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
  
  @media (max-width: 360px) {
    font-size: 14px;
  }
  
  @media (max-width: 320px) {
    font-size: 13px;
  }
`

const BreathingModeDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`



interface RitualPreviewProps {
  ritual: Ritual
  settings: RitualSettings
  onStart: () => void
  onClose: () => void
  onModeChange: (mode: 'guided' | 'quick') => void
  onBreathingModeChange?: (mode: BreathingMode) => void
}

export const RitualPreview: React.FC<RitualPreviewProps> = ({
  ritual,
  settings,
  onStart,
  onClose,
  onModeChange,
  onBreathingModeChange
}) => {

  const canStart = ritual.id !== 'breath' || settings.breathingMode

  const actionBar = (
    <ActionBar
      primaryAction={{
        label: 'Начать',
        onClick: onStart,
        disabled: !canStart
      }}
      secondaryActions={[
        {
          label: 'Отмена',
          onClick: onClose
        }
      ]}
    />
  )

  return (
    <BottomSheet
      isOpen={true}
      onClose={onClose}
      title={ritual.title}
      subtitle={settings.mode === 'guided' ? ritual.description : ritual.quickDescription}
      actionBar={actionBar}
    >
      <PreviewContent>
        <PreviewHeader>
          <PreviewIcon>{ritual.icon}</PreviewIcon>
          <PreviewTitle>{ritual.title}</PreviewTitle>
        </PreviewHeader>


        {ritual.id === 'breath' && (
          <>
            <PreviewDescription>
              Выберите технику дыхания для начала упражнения
            </PreviewDescription>
            <BreathingModeSelector>
              {Object.entries(BREATHING_MODES).map(([mode, info]) => (
                <BreathingModeButton
                  key={mode}
                  $isSelected={settings.breathingMode === mode}
                  onClick={() => {
                    onBreathingModeChange?.(mode as BreathingMode)
                    playButtonClick()
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <BreathingModeName>{info.name}</BreathingModeName>
                  <BreathingModeDescription>{info.description}</BreathingModeDescription>
                </BreathingModeButton>
              ))}
            </BreathingModeSelector>
          </>
        )}
      </PreviewContent>
    </BottomSheet>
  )
}
