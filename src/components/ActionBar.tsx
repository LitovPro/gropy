import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'

const ActionBarContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  position: sticky;
  bottom: 12px;
  z-index: 12;
  padding: 24px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom, 0));
  /* background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 191, 160, 0.1) 50%, rgba(167, 199, 183, 0.1) 100%); */
  backdrop-filter: blur(12px);
  /* border-top: 1px solid rgba(167, 199, 183, 0.2); */
  border-radius: 16px;
  /* box-shadow: 0 -4px 20px rgba(167, 199, 183, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.05); */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(167, 199, 183, 0.3) 50%,
      transparent 100%
    );
  }
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
  background: linear-gradient(135deg,
    rgba(167, 199, 183, 0.9) 0%,
    rgba(247, 191, 160, 0.9) 100%
  );
  color: white;
  backdrop-filter: blur(8px);
  box-shadow:
    0 4px 16px rgba(167, 199, 183, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 6px 20px rgba(167, 199, 183, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg,
      rgba(167, 199, 183, 1) 0%,
      rgba(247, 191, 160, 1) 100%
    );
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 2px 8px rgba(167, 199, 183, 0.3),
      0 1px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(0);
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
  border: 1px solid rgba(167, 199, 183, 0.3);
  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(167, 199, 183, 0.1);

  &:hover {
    border-color: rgba(167, 199, 183, 0.5);
    background: rgba(167, 199, 183, 0.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(167, 199, 183, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(167, 199, 183, 0.1);
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

export const ActionBar: React.FC<ActionBarProps> = React.memo(({
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
      transition={{ duration: 0.2, ease: 'easeOut' }}
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
})

ActionBar.displayName = 'ActionBar'
