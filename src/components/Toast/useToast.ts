import { useState, useCallback } from 'react'

export interface ToastAction {
  label: string
  onAction: () => void
}

export interface ToastOptions {
  action?: ToastAction
  duration?: number
}

export interface Toast {
  id: string
  message: string
  options: ToastOptions
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
      const toast: Toast = {
        id,
        message,
        options: {
          duration: 3000,
          ...options,
        },
      }

      setToasts(prev => [...prev, toast])

      // Auto remove
      if (toast.options.duration && toast.options.duration > 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, toast.options.duration)
      }

      return id
    },
    []
  )

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const hideAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    hideToast,
    hideAllToasts,
  }
}





