import React, { useState, useRef, useEffect } from 'react'
// Updated: onSettings -> onRemove
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Ritual, RitualSettings } from '../types/rituals'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'

const CardContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isSelected?: boolean }>`
  background: ${({ theme, $isSelected }) => 
    $isSelected 
      ? `linear-gradient(135deg, ${theme['color']['pet']['accent']}20, ${theme['color']['warm']['medium']}20)`
      : theme['color']['surface']};
  border: 2px solid ${({ theme, $isSelected }) => 
    $isSelected ? theme['color']['pet']['accent'] : theme['color']['border']};
  border-radius: ${tokens.radius.lg};
  padding: ${tokens.space.md};
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  position: relative;
  overflow: hidden;
  min-height: 92px;
  display: grid;
  align-content: center;
  box-shadow: ${({ theme, $isSelected }) => 
    $isSelected 
      ? `0 4px 16px ${theme['color']['pet']['accent']}30`
      : `0 2px 8px ${theme['color']['border']}20`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, $isSelected }) => 
      $isSelected 
        ? `0 6px 20px ${theme['color']['pet']['accent']}40`
        : `0 4px 12px ${theme['color']['border']}30`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`

const CardIcon = styled.div`
  font-size: 28px;
  margin-bottom: ${tokens.space.xs};
  transition: transform ${tokens.motion.fast} ${tokens.motion.easing};
  text-align: center;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`

const CardTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme['color']['text']};
  margin: 0 0 ${tokens.space.xs} 0;
  text-align: center;
  line-height: ${tokens.typography.lineHeight.tight};

  /* Mobile adaptation */
  @media (max-width: 480px) {
    font-size: ${tokens.typography.fontSize.sm};
    line-height: 1.2;
  }
`

const CardDescription = styled.p`
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme['color']['textMuted']};
  margin: 0 0 ${tokens.space.sm} 0;
  text-align: center;
  line-height: ${tokens.typography.lineHeight.normal};

  /* Mobile adaptation */
  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 1.3;
  }
`

const TileCta = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  margin-top: ${tokens.space.sm};
  align-self: end;
  min-height: ${tokens.size.tapMin};
  border-radius: ${tokens.radius.lg};
  border: none;
  cursor: pointer;
  font-weight: ${tokens.typography.fontWeight.medium};
  font-size: ${tokens.typography.fontSize.sm};
  font-family: ${tokens.typography.fontFamily.primary};
  padding: ${tokens.space.sm} ${tokens.space.md};
  background: ${({ theme }) => 
    `linear-gradient(135deg, ${theme['color']['pet']['primary']}20, ${theme['color']['warm']['medium']}20)`};
  color: ${({ theme }) => theme['color']['text']};
  border: 1px solid ${({ theme }) => theme['color']['pet']['primary']}40;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  width: 100%;

  &:hover {
    background: ${({ theme }) => 
      `linear-gradient(135deg, ${theme['color']['pet']['primary']}30, ${theme['color']['warm']['medium']}30)`};
    border-color: ${({ theme }) => theme['color']['pet']['primary']};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme['color']['pet']['accent']};
    outline-offset: 2px;
  }
`

const SettingsButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  position: absolute;
  top: ${tokens.space.sm};
  right: ${tokens.space.sm};
  background: ${({ theme }) => theme['color']['surface']};
  border: 1px solid ${({ theme }) => theme['color']['border']};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};
  z-index: 10;
  pointer-events: auto;

  &:hover {
    background: ${({ theme }) => theme['color']['pet']['accent']}20;
    border-color: ${({ theme }) => theme['color']['pet']['accent']};
    transform: scale(1.1);
  }
`

const PinnedIndicator = styled(motion.div)`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme['color']['surface']};
  border: 1px solid ${({ theme }) => theme['color']['border']};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme['color']['textMuted']};
  z-index: 1;
  opacity: 0.7;
`

interface RitualCardProps {
  ritual: Ritual
  settings: RitualSettings
  onStart: (ritualId: string, mode: 'guided' | 'quick') => void
  onRemove: (ritualId: string) => void
  isSelected?: boolean
}

export const RitualCard: React.FC<RitualCardProps> = ({
  ritual,
  settings,
  onStart,
  onRemove,
  isSelected = false
}) => {
  const [isLongPressing, setIsLongPressing] = useState(false)
  const longPressTimer = useRef<number | null>(null)
  const startPos = useRef<{ x: number; y: number } | null>(null)
  const removeButtonRef = useRef<HTMLButtonElement>(null)

  // Add direct event listener to prevent event bubbling
  useEffect(() => {
    const button = removeButtonRef.current
    if (!button) return

    const handleDirectClick = (e: Event) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
      onRemove(ritual.id)
      playButtonClick()
    }

    button.addEventListener('click', handleDirectClick, true)
    
    return () => {
      button.removeEventListener('click', handleDirectClick, true)
    }
  }, [ritual.id, onRemove])

  const handleMouseDown = (e: React.MouseEvent) => {
    startPos.current = { x: e.clientX, y: e.clientY }
    setIsLongPressing(true)
    
    longPressTimer.current = window.setTimeout(() => {
      if (startPos.current) {
        onRemove(ritual.id)
        playButtonClick()
      }
    }, 500)
  }

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    setIsLongPressing(false)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        window.clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  const handleMouseLeave = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    setIsLongPressing(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Check if click was on the remove button or its children
    const target = e.target as HTMLElement
    if (target.closest('button[title="Скрыть ритуал"]') || 
        target.closest('button[style*="z-index: 10"]') ||
        target.textContent === '✕') {
      return // Don't start ritual if clicking remove button
    }
    
    if (!isLongPressing) {
      onStart(ritual.id, settings.mode)
      playButtonClick()
    }
  }

  const handleTileCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onStart(ritual.id, settings.mode)
    playButtonClick()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      startPos.current = { x: touch.clientX, y: touch.clientY }
    }
    setIsLongPressing(true)
    
    longPressTimer.current = window.setTimeout(() => {
      if (startPos.current) {
        onRemove(ritual.id)
        playButtonClick()
      }
    }, 500)
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    setIsLongPressing(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startPos.current) {
      const touch = e.touches[0]
      if (touch) {
        const deltaX = Math.abs(touch.clientX - startPos.current.x)
        const deltaY = Math.abs(touch.clientY - startPos.current.y)
      
        // If moved too much, cancel long press
        if (deltaX > 10 || deltaY > 10) {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
            longPressTimer.current = null
          }
          setIsLongPressing(false)
        }
      }
    }
  }

  return (
    <CardContainer
      $isSelected={isSelected}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {settings.mode === 'quick' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: tokens.space.sm,
              left: tokens.space.sm,
              background: 'var(--warm-medium)',
              color: 'white',
              borderRadius: tokens.radius.chip,
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: tokens.typography.fontWeight.medium
            }}
          >
            Быстро
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsButton
        ref={removeButtonRef}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onRemove(ritual.id)
          playButtonClick()
          return false
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        onMouseUp={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        onPointerDown={(e) => {
          e.stopPropagation()
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        title="Скрыть ритуал"
        style={{ pointerEvents: 'auto', zIndex: 10 }}
      >
        ✕
      </SettingsButton>

      {/* Pinned indicator for repeatable rituals */}
      {ritual.type === 'repeatable' && (
        <PinnedIndicator
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          ♻️
        </PinnedIndicator>
      )}

      <CardIcon>{ritual.icon}</CardIcon>
      <CardTitle>{ritual.title}</CardTitle>
      <CardDescription>
        {settings.mode === 'guided' ? ritual.description : ritual.quickDescription}
      </CardDescription>
      
      <TileCta
        onClick={handleTileCtaClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        Начать
      </TileCta>
    </CardContainer>
  )
}
