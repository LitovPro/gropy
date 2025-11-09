// Cache for frequently accessed data
const cache = new Map<string, { value: unknown; timestamp: number }>()
const CACHE_TTL = 1000 // 1 second cache

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

export const safeSet = <T>(key: string, value: T): boolean => {
  try {
    // Clear existing timeout
    const existingTimeout = setTimeouts.get(key)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
    }

    // Set new timeout for debounced write
    const timeout = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value))
      cache.set(key, { value, timestamp: Date.now() })
      setTimeouts.delete(key)
    }, 100) // 100ms debounce

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





