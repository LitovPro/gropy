import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'
import { useUiPrefs } from '../hooks/useUiPrefs'
import { playButtonClick } from '../utils/sounds'

const SettingsContainer = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: ${tokens.space.lg};
  margin-bottom: ${tokens.space.lg};
`

const SettingsTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.lg} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${tokens.space.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  &:last-child {
    border-bottom: none;
  }
`

const SettingLabel = styled.div`
  flex: 1;
`

const SettingTitle = styled.div`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin-bottom: ${tokens.space.xs};
  line-height: ${tokens.typography.lineHeight.normal};
`

const SettingDescription = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  line-height: ${tokens.typography.lineHeight.normal};
`

const ToggleSwitch = styled(motion.button)<{ $isOn: boolean }>`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  position: relative;
  background: ${({ $isOn, theme }) =>
    $isOn
      ? `linear-gradient(135deg, ${theme.color.pet.primary}, ${theme.color.warm.medium})`
      : theme.color.border};
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $isOn }) => $isOn ? '24px' : '2px'};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: left ${tokens.motion.fast} ${tokens.motion.easing};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }
`

export const UiSettings: React.FC = React.memo(() => {
  const { prefs, setLeftHanded, setReducedMotion } = useUiPrefs()

  const handleLeftHandedToggle = () => {
    setLeftHanded(!prefs.leftHanded)
    playButtonClick()
  }

  const handleReducedMotionToggle = () => {
    setReducedMotion(!prefs.reducedMotion)
    playButtonClick()
  }

  return (
    <SettingsContainer>
      <SettingsTitle>Настройки интерфейса</SettingsTitle>

      <SettingItem>
        <SettingLabel>
          <SettingTitle>Левша</SettingTitle>
          <SettingDescription>
            Перемещает плавающие кнопки в левую часть экрана
          </SettingDescription>
        </SettingLabel>
        <ToggleSwitch
          $isOn={prefs.leftHanded}
          onClick={handleLeftHandedToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          aria-label={prefs.leftHanded ? 'Отключить режим левши' : 'Включить режим левши'}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>
          <SettingTitle>Уменьшить анимации</SettingTitle>
          <SettingDescription>
            Отключает анимации для лучшей производительности
          </SettingDescription>
        </SettingLabel>
        <ToggleSwitch
          $isOn={prefs.reducedMotion}
          onClick={handleReducedMotionToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          aria-label={prefs.reducedMotion ? 'Включить анимации' : 'Отключить анимации'}
        />
      </SettingItem>
    </SettingsContainer>
  )
})

UiSettings.displayName = 'UiSettings'
