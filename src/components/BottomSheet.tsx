import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { tokens } from '../design/tokens'
import { playButtonClick } from '../utils/sounds'

const Overlay = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $isDragging: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $isDragging }) => 
    $isDragging ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)'};
  z-index: 1000;
  transition: background-color 0.2s ease;
`

const SheetContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.color.surface};
  border-radius: 20px 20px 0 0;
  max-height: min(88dvh, 720px);
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  
  @media (max-height: 640px) {
    max-height: 92dvh;
  }
`

const GripArea = styled.div<{ $isDragging: boolean }>`
  height: ${tokens.zones.gripArea};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  padding: ${tokens.space.sm} 0;
  transition: all 0.2s ease;
  
  &::before {
    content: '';
    width: ${({ $isDragging }) => $isDragging ? '50px' : '40px'};
    height: 4px;
    background: ${({ theme, $isDragging }) => 
      $isDragging ? theme.color.textMuted : theme.color.border};
    border-radius: 2px;
    transition: all 0.2s ease;
  }
  
  &:active {
    cursor: grabbing;
  }
`

const SheetContent = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  padding: 12px 20px 20px;
  overscroll-behavior: contain;
  min-width: 0;
`

const SheetHeader = styled.div`
  padding: 12px 20px;
  flex: 0 0 auto;
  text-align: center;
`

const SheetTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.sm} 0;
  line-height: ${tokens.typography.lineHeight.tight};
`

const SheetSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.normal};
  font-family: ${tokens.typography.fontFamily.primary};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 4px 0 12px;
  line-height: 1.3;
  white-space: normal;
  overflow-wrap: anywhere;
`

const ActionBar = styled.div`
  flex: 0 0 auto;
  position: sticky;
  bottom: 0;
  padding: 12px 20px calc(16px + env(safe-area-inset-bottom, 0));
  background: color-mix(in oklab, ${({ theme }) => theme.color.surface}, transparent 8%);
  backdrop-filter: blur(6px);
  border-top: 1px solid ${({ theme }) => theme.color.border};
`

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  actionBar?: React.ReactNode
  showGrip?: boolean
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  actionBar,
  showGrip = true
}) => {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Handle drag gestures
  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDrag = (_: unknown, info: PanInfo) => {
    // Allow dragging down only
    if (info.offset.y > 0) {
      setDragY(info.offset.y)
    }
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false)
    
    // Close if dragged down more than 80px or with sufficient velocity
    const shouldClose = info.offset.y > 80 || info.velocity.y > 300
    
    if (shouldClose) {
      onClose()
      playButtonClick()
    } else {
      // Smooth return to original position
      setDragY(0)
    }
  }

  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
        playButtonClick()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.body.style.touchAction = 'auto'
    }
  }, [isOpen, onClose])

  // Reset drag state when opening
  useEffect(() => {
    if (isOpen) {
      setDragY(0)
      setIsDragging(false)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            $isDragging={isDragging}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />
          <SheetContainer
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ 
              y: isDragging ? dragY : 0,
              transition: isDragging 
                ? { type: 'tween', duration: 0 }
                : { type: 'spring', damping: 30, stiffness: 400, mass: 0.8 }
            }}
            exit={{ 
              y: '100%',
              transition: { type: 'spring', damping: 25, stiffness: 300 }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.1 }}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              willChange: isDragging ? 'transform' : 'auto'
            }}
          >
            {showGrip && <GripArea $isDragging={isDragging} />}
            
            {(title || subtitle) && (
              <SheetHeader>
                {title && <SheetTitle>{title}</SheetTitle>}
                {subtitle && <SheetSubtitle>{subtitle}</SheetSubtitle>}
              </SheetHeader>
            )}
            
            <SheetContent>
              {children}
            </SheetContent>
            
            {actionBar && <ActionBar>{actionBar}</ActionBar>}
          </SheetContainer>
        </>
      )}
    </AnimatePresence>
  )
}
