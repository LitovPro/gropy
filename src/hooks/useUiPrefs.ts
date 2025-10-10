import { useState, useEffect, useCallback } from 'react'

export interface UiPrefs {
  leftHanded: boolean
  reducedMotion: boolean
}

const STORAGE_KEY = 'gropy-ui-prefs'

const defaultPrefs: UiPrefs = {
  leftHanded: false,
  reducedMotion: false
}

export const useUiPrefs = () => {
  const [prefs, setPrefs] = useState<UiPrefs>(defaultPrefs)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedPrefs = JSON.parse(saved)
        setPrefs({ ...defaultPrefs, ...parsedPrefs })
      }
    } catch {
      // Failed to load UI preferences
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Sync with system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefs(prev => ({ ...prev, reducedMotion: e.matches }))
    }

    setPrefs(prev => ({ ...prev, reducedMotion: mediaQuery.matches }))
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply preferences to document
  useEffect(() => {
    if (!isLoaded) return

    const html = document.documentElement
    
    // Apply left-handed preference
    if (prefs.leftHanded) {
      html.setAttribute('data-left-handed', 'true')
    } else {
      html.removeAttribute('data-left-handed')
    }

    // Apply reduced motion preference
    if (prefs.reducedMotion) {
      html.setAttribute('data-reduced-motion', 'true')
    } else {
      html.removeAttribute('data-reduced-motion')
    }
  }, [prefs, isLoaded])

  // Save preferences to localStorage
  const updatePrefs = useCallback((newPrefs: Partial<UiPrefs>) => {
    const updatedPrefs = { ...prefs, ...newPrefs }
    setPrefs(updatedPrefs)
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrefs))
    } catch {
      // Failed to save UI preferences
    }
  }, [prefs])

  // Individual preference setters
  const setLeftHanded = useCallback((leftHanded: boolean) => {
    updatePrefs({ leftHanded })
  }, [updatePrefs])

  const setReducedMotion = useCallback((reducedMotion: boolean) => {
    updatePrefs({ reducedMotion })
  }, [updatePrefs])

  return {
    prefs,
    isLoaded,
    updatePrefs,
    setLeftHanded,
    setReducedMotion
  }
}
