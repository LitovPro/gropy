import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'

const FabContainer = styled(motion.button)<{ $hasActionBar?: boolean }>`
  position: fixed;
  right: clamp(16px, 6vw, 28px);
  bottom: ${({ $hasActionBar }) => 
    $hasActionBar 
      ? 'calc(140px + env(safe-area-inset-bottom, 0))' 
      : 'calc(72px + env(safe-area-inset-bottom, 0))'};
  min-width: ${tokens.size.tapMin};
  min-height: ${tokens.size.tapMin};
  border-radius: 999px;
  z-index: calc(${tokens.zones.layerBottomElev} + 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border: none;
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${({ theme }) => 
    `linear-gradient(135deg, ${theme.color.pet.primary}, ${theme.color.warm.medium})`};
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.pet.accent};
    outline-offset: 2px;
  }

  /* Left-handed support */
  :root[data-left-handed="true"] & {
    right: auto;
    left: clamp(16px, 6vw, 28px);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
`

interface FloatingActionButtonProps {
  icon: string
  onClick: () => void
  hasActionBar?: boolean
  'aria-label': string
  className?: string
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  hasActionBar = false,
  'aria-label': ariaLabel,
  className
}) => {
  const handleClick = () => {
    onClick()
    playButtonClick()
  }

  return (
    <FabContainer
      $hasActionBar={hasActionBar}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      {icon}
    </FabContainer>
  )
}
