export const hapticSuccess = () => {
  try {
    (window as { Telegram?: { WebApp?: { HapticFeedback?: { notificationOccurred?: (type: string) => void } } } }).Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.(
      'success'
    )
  } catch {
    // Ignore haptic errors
  }
}

export const hapticLight = () => {
  try {
    (window as { Telegram?: { WebApp?: { HapticFeedback?: { impactOccurred?: (type: string) => void } } } }).Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light')
  } catch {
    // Ignore haptic errors
  }
}

export const hapticMedium = () => {
  try {
    (window as { Telegram?: { WebApp?: { HapticFeedback?: { impactOccurred?: (type: string) => void } } } }).Telegram?.WebApp?.HapticFeedback?.impactOccurred?.(
      'medium'
    )
  } catch {
    // Ignore haptic errors
  }
}

export const hapticHeavy = () => {
  try {
    (window as { Telegram?: { WebApp?: { HapticFeedback?: { impactOccurred?: (type: string) => void } } } }).Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('heavy')
  } catch {
    // Ignore haptic errors
  }
}



