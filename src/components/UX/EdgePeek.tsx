import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { tokens } from '../../design/tokens'
import { safeGet, safeSet } from '../../utils/ls'

const EdgePeekContainer = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  pointer-events: none;
`

const PeekIndicator = styled(motion.div)`
  width: 24px;
  height: 40px;
  background: ${({ theme }) => theme.color.accent};
  border-radius: 12px 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px 0 8px ${tokens.color.shadow};
`

const Chevron = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-left: 2px;
`

interface EdgePeekProps {
  onSwipeStart?: () => void
}

export const EdgePeek: React.FC<EdgePeekProps> = ({ onSwipeStart }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [cycleCount, setCycleCount] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const cycleTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Check if user has learned swipe gesture
    const hasLearned = safeGet<boolean>('gropy-learned-swipe', false)
    if (hasLearned) return

    // Check if shown today
    const today = new Date().toISOString().split('T')[0]
    const lastShown = safeGet<string>('gropy-peek-last-shown', '')
    if (lastShown === today) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    // Start idle timer
    const startIdleTimer = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
        setCycleCount(0)
        startCycle()
      }, 1400)
    }

    const startCycle = () => {
      if (cycleCount >= 2) {
        setIsVisible(false)
        safeSet('gropy-peek-last-shown', today)
        return
      }

      cycleTimeoutRef.current = setTimeout(() => {
        setCycleCount(prev => prev + 1)
        if (cycleCount < 1) {
          startCycle()
        } else {
          setIsVisible(false)
          safeSet('gropy-peek-last-shown', today)
        }
      }, 1200)
    }

    startIdleTimer()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current)
    }
  }, [cycleCount])

  useEffect(() => {
    const handleSwipeStart = () => {
      setIsVisible(false)
      safeSet('gropy-learned-swipe', true)
      onSwipeStart?.()
    }

    // Listen for touch start on the right edge
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch.clientX > window.innerWidth - 50) {
        handleSwipeStart()
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    return () => document.removeEventListener('touchstart', handleTouchStart)
  }, [onSwipeStart])

  return (
    <AnimatePresence>
      {isVisible && (
        <EdgePeekContainer
          initial={{ x: 0 }}
          animate={{ x: -12 }}
          exit={{ x: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
            repeat: cycleCount < 2 ? 1 : 0,
            repeatType: 'reverse',
          }}
        >
          <PeekIndicator>
            <Chevron
              animate={{ x: [-2, 0, -2] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </PeekIndicator>
        </EdgePeekContainer>
      )}
    </AnimatePresence>
  )
}





