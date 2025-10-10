import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { tokens } from '../../design/tokens'

const ToastContainer = styled.div`
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: calc(100vw - 32px);
`

const ToastItem = styled(motion.div)`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: 12px 16px;
  box-shadow: 0 4px 12px ${tokens.color.shadow};
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 400px;
`

const ToastMessage = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  line-height: 1.4;
`

const ToastAction = styled.button`
  background: ${({ theme }) => theme.color.accent};
  color: white;
  border: none;
  border-radius: ${tokens.radius.button};
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

interface ToastProps {
  toasts: Array<{
    id: string
    message: string
    options: {
      action?: { label: string; onAction: () => void }
      duration?: number
    }
  }>
  onHide: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({ toasts, onHide }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && toasts.length > 0) {
        onHide(toasts[toasts.length - 1].id)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toasts, onHide])

  if (typeof window === 'undefined') return null

  return createPortal(
    <ToastContainer>
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="alert"
            aria-live="polite"
          >
            <ToastMessage>{toast.message}</ToastMessage>
            {toast.options.action && (
              <ToastAction onClick={toast.options.action.onAction}>
                {toast.options.action.label}
              </ToastAction>
            )}
          </ToastItem>
        ))}
      </AnimatePresence>
    </ToastContainer>,
    document.body
  )
}





