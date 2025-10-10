export const safeGet = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export const safeSet = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
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





