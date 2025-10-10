import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'

const ActionBarContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  position: sticky;
  bottom: 0;
  z-index: ${tokens.zones.layerBottomElev};
  padding: ${tokens.space.lg};
  padding-bottom: calc(${tokens.space.lg} + env(safe-area-inset-bottom, 0));
  background: color-mix(in oklab, var(--surface, #ffffff), transparent 10%);
  backdrop-filter: blur(6px);
  border-top-left-radius: ${tokens.radius.lg};
  border-top-right-radius: ${tokens.radius.lg};
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${tokens.space.md};
  align-items: center;
`

const PrimaryButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  flex: 1;
  min-height: ${tokens.size.tapMin};
  border-radius: calc(${tokens.radius.lg} + 4px);
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-size: ${tokens.typography.fontSize.base};
  font-family: ${tokens.typography.fontFamily.primary};
  padding: ${tokens.space.md} ${tokens.space.lg};
  border: none;
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  background: ${({ theme }) => 
    `linear-gradient(135deg, ${theme.color.pet.primary}, ${theme.color.warm.medium})`};
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const SecondaryButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  min-height: ${tokens.size.tapMin};
  min-width: ${tokens.size.tapMin};
  border-radius: ${tokens.radius.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  font-size: ${tokens.typography.fontSize.sm};
  font-family: ${tokens.typography.fontFamily.primary};
  padding: ${tokens.space.md};
  border: 2px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &:hover {
    border-color: ${({ theme }) => theme.color.pet.primary};
    background: ${({ theme }) => theme.color.pet.primary}10;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }
`

interface ActionBarProps {
  primaryAction?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  secondaryActions?: Array<{
    label: string
    onClick: () => void
    icon?: string
  }>
  className?: string
}

export const ActionBar: React.FC<ActionBarProps> = ({
  primaryAction,
  secondaryActions = [],
  className
}) => {
  const handlePrimaryClick = () => {
    if (primaryAction && !primaryAction.disabled) {
      primaryAction.onClick()
      playButtonClick()
    }
  }

  const handleSecondaryClick = (action: { onClick: () => void }) => {
    action.onClick()
    playButtonClick()
  }

  return (
    <ActionBarContainer
      className={className}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <ActionButtons>
        {secondaryActions.map((action, index) => (
          <SecondaryButton
            key={index}
            onClick={() => handleSecondaryClick(action)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            {action.icon && <span style={{ marginRight: tokens.space.xs }}>{action.icon}</span>}
            {action.label}
          </SecondaryButton>
        ))}
        
        {primaryAction && (
          <PrimaryButton
            onClick={handlePrimaryClick}
            disabled={primaryAction.disabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            {primaryAction.label}
          </PrimaryButton>
        )}
      </ActionButtons>
    </ActionBarContainer>
  )
}
