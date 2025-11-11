// Cache for frequently accessed data
const cache = new Map<string, { value: unknown; timestamp: number }>()
const CACHE_TTL = 1000 // 1 second cache
const DEBOUNCE_DELAY = 100 // 100ms debounce

/**
 * Check if localStorage has available quota
 * @returns true if storage is available, false otherwise
 */
export const checkStorageQuota = (): boolean => {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    // QuotaExceededError or other storage errors
    return false
  }
}

/**
 * Get estimated storage usage
 * @returns object with used and available bytes (approximate)
 */
export const getStorageUsage = (): { used: number; available: boolean } => {
  try {
    let used = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key)
        if (value) {
          used += key.length + value.length
        }
      }
    }
    return { used, available: checkStorageQuota() }
  } catch {
    return { used: 0, available: false }
  }
}

/**
 * Safely get value from localStorage with caching
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Stored value or default
 */
export const safeGet = <T>(key: string, defaultValue: T): T => {
  try {
    // Check cache first
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.value as T
    }

    const item = localStorage.getItem(key)
    const value = item ? JSON.parse(item) : defaultValue

    // Cache the result
    cache.set(key, { value, timestamp: Date.now() })

    return value
  } catch {
    return defaultValue
  }
}

// Debounced set operations
const setTimeouts = new Map<string, NodeJS.Timeout>()

/**
 * Safely set value to localStorage with debouncing and quota checking
 * @param key - Storage key
 * @param value - Value to store
 * @returns true if successful, false otherwise
 */
export const safeSet = <T>(key: string, value: T): boolean => {
  try {
    // Check quota before attempting to write
    if (!checkStorageQuota()) {
      console.warn('localStorage quota exceeded, cannot save data')
      return false
    }

    // Clear existing timeout
    const existingTimeout = setTimeouts.get(key)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
    }

    // Set new timeout for debounced write
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
        cache.set(key, { value, timestamp: Date.now() })
        setTimeouts.delete(key)
      } catch (error) {
        console.error('Failed to write to localStorage:', error)
        setTimeouts.delete(key)
      }
    }, DEBOUNCE_DELAY)

    setTimeouts.set(key, timeout)
    return true
  } catch {
    return false
  }
}

export const safeRemove = (key: string): boolean => {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}





