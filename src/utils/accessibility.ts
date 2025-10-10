// Accessibility utilities

export const a11y = {
  // Focus management
  focus: {
    trap: (element: HTMLElement) => {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      element.addEventListener('keydown', handleTabKey)
      firstElement?.focus()

      return () => {
        element.removeEventListener('keydown', handleTabKey)
      }
    },

    restore: (previousElement?: HTMLElement) => {
      if (previousElement && document.contains(previousElement)) {
        previousElement.focus()
      }
    }
  },

  // Screen reader announcements
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    
    document.body.appendChild(announcement)
    announcement.textContent = message
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  // Keyboard navigation helpers
  keyboard: {
    isActivationKey: (event: KeyboardEvent) => {
      return event.key === 'Enter' || event.key === ' '
    },

    isEscapeKey: (event: KeyboardEvent) => {
      return event.key === 'Escape'
    },

    isArrowKey: (event: KeyboardEvent) => {
      return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    }
  },

  // Color contrast utilities
  contrast: {
    getLuminance: (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    },

    getContrastRatio: (color1: [number, number, number], color2: [number, number, number]) => {
      const lum1 = a11y.contrast.getLuminance(...color1)
      const lum2 = a11y.contrast.getLuminance(...color2)
      const brightest = Math.max(lum1, lum2)
      const darkest = Math.min(lum1, lum2)
      return (brightest + 0.05) / (darkest + 0.05)
    },

    isAccessible: (color1: [number, number, number], color2: [number, number, number], level: 'AA' | 'AAA' = 'AA') => {
      const ratio = a11y.contrast.getContrastRatio(color1, color2)
      return level === 'AA' ? ratio >= 4.5 : ratio >= 7
    }
  },

  // Motion preferences
  motion: {
    prefersReducedMotion: () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },

    respectMotionPreference: (animation: string, fallback = 'none') => {
      return a11y.motion.prefersReducedMotion() ? fallback : animation
    }
  },

  // ARIA helpers
  aria: {
    setExpanded: (element: HTMLElement, expanded: boolean) => {
      element.setAttribute('aria-expanded', expanded.toString())
    },

    setPressed: (element: HTMLElement, pressed: boolean) => {
      element.setAttribute('aria-pressed', pressed.toString())
    },

    setSelected: (element: HTMLElement, selected: boolean) => {
      element.setAttribute('aria-selected', selected.toString())
    },

    setHidden: (element: HTMLElement, hidden: boolean) => {
      element.setAttribute('aria-hidden', hidden.toString())
    },

    setLabel: (element: HTMLElement, label: string) => {
      element.setAttribute('aria-label', label)
    },

    setDescribedBy: (element: HTMLElement, id: string) => {
      element.setAttribute('aria-describedby', id)
    }
  }
}

// Hook for managing focus
export const useFocusManagement = () => {
  const [focusedElement, setFocusedElement] = React.useState<HTMLElement | null>(null)

  const captureFocus = React.useCallback(() => {
    setFocusedElement(document.activeElement as HTMLElement)
  }, [])

  const restoreFocus = React.useCallback(() => {
    if (focusedElement && document.contains(focusedElement)) {
      focusedElement.focus()
    }
  }, [focusedElement])

  return { captureFocus, restoreFocus }
}

// Hook for screen reader announcements
export const useAnnouncer = () => {
  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    a11y.announce(message, priority)
  }, [])

  return { announce }
}
