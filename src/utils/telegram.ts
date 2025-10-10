// Telegram Mini App integration utilities

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    query_id?: string
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
    }
    auth_date: number
    hash: string
  }
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: {
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
    hint_color?: string
    bg_color?: string
    text_color?: string
  }
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  isClosingConfirmationEnabled: boolean
  BackButton: {
    isVisible: boolean
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    show: () => void
    hide: () => void
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
    setParams: (params: {
      text?: string
      color?: string
      text_color?: string
      is_active?: boolean
      is_visible?: boolean
    }) => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  CloudStorage: {
    setItem: (key: string, value: string, callback?: (error: string | null, result?: boolean) => void) => void
    getItem: (key: string, callback: (error: string | null, result?: string) => void) => void
    getItems: (keys: string[], callback: (error: string | null, result?: Record<string, string>) => void) => void
    removeItem: (key: string, callback?: (error: string | null, result?: boolean) => void) => void
    removeItems: (keys: string[], callback?: (error: string | null, result?: boolean) => void) => void
    getKeys: (callback: (error: string | null, result?: string[]) => void) => void
  }
  BiometricManager: {
    isInited: boolean
    isBiometricAvailable: boolean
    biometricType: 'finger' | 'face' | 'unknown'
    isAccessRequested: boolean
    isAccessGranted: boolean
    isBiometricTokenSaved: boolean
    deviceId: string
    init: () => Promise<void>
    requestAccess: (params?: { reason?: string }) => Promise<boolean>
    authenticate: (params?: { reason?: string }) => Promise<boolean>
    updateBiometricToken: (token: string) => Promise<boolean>
    openSettings: () => void
  }
  showPopup: (params: {
    title?: string
    message: string
    buttons?: Array<{
      id?: string
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
      text?: string
    }>
  }, callback?: (buttonId: string) => void) => void
  showAlert: (message: string, callback?: () => void) => void
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
  showScanQrPopup: (params: {
    text?: string
  }, callback?: (text: string) => void) => void
  closeScanQrPopup: () => void
  readTextFromClipboard: (callback?: (text: string) => void) => void
  requestWriteAccess: (callback?: (granted: boolean) => void) => void
  requestContact: (callback?: (granted: boolean) => void) => void
  ready: () => void
  expand: () => void
  close: () => void
  sendData: (data: string) => void
  switchInlineQuery: (query: string, choose_chat_types?: string[]) => void
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void
  openTelegramLink: (url: string) => void
  openInvoice: (url: string, callback?: (status: string) => void) => void
  shareMessage: (text: string, callback?: (shared: boolean) => void) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

class TelegramManager {
  private webApp: TelegramWebApp | null = null
  private isInitialized = false

  constructor() {
    this.initialize()
  }

  private initialize() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.webApp = window.Telegram.WebApp
      this.webApp.ready()
      this.isInitialized = true
      
      // Configure the app
      this.webApp.expand()
      this.webApp.enableClosingConfirmation = false
    }
  }

  isAvailable(): boolean {
    return this.isInitialized && this.webApp !== null
  }

  getUser() {
    if (!this.webApp) return null
    return this.webApp.initDataUnsafe.user
  }

  getTheme() {
    if (!this.webApp) return 'light'
    return this.webApp.colorScheme
  }

  getThemeParams() {
    if (!this.webApp) return {}
    return this.webApp.themeParams
  }

  // Haptic feedback
  impact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') {
    if (this.webApp?.HapticFeedback) {
      this.webApp.HapticFeedback.impactOccurred(style)
    }
  }

  notification(type: 'error' | 'success' | 'warning') {
    if (this.webApp?.HapticFeedback) {
      this.webApp.HapticFeedback.notificationOccurred(type)
    }
  }

  selectionChanged() {
    if (this.webApp?.HapticFeedback) {
      this.webApp.HapticFeedback.selectionChanged()
    }
  }

  // Main button
  showMainButton(text: string, onClick: () => void) {
    if (!this.webApp?.MainButton) return

    this.webApp.MainButton.setText(text)
    this.webApp.MainButton.onClick(onClick)
    this.webApp.MainButton.show()
  }

  hideMainButton() {
    if (this.webApp?.MainButton) {
      this.webApp.MainButton.hide()
    }
  }

  setMainButtonText(text: string) {
    if (this.webApp?.MainButton) {
      this.webApp.MainButton.setText(text)
    }
  }

  // Back button
  showBackButton(onClick: () => void) {
    if (!this.webApp?.BackButton) return

    this.webApp.BackButton.onClick(onClick)
    this.webApp.BackButton.show()
  }

  hideBackButton() {
    if (this.webApp?.BackButton) {
      this.webApp.BackButton.hide()
    }
  }

  // Popups
  showAlert(message: string) {
    if (this.webApp?.showAlert) {
      this.webApp.showAlert(message)
    } else {
      alert(message)
    }
  }

  showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.webApp?.showConfirm) {
        this.webApp.showConfirm(message, resolve)
      } else {
        resolve(confirm(message))
      }
    })
  }

  // Sharing
  shareMessage(text: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.webApp?.shareMessage) {
        this.webApp.shareMessage(text, resolve)
      } else {
        // Fallback to Web Share API
        if (navigator.share) {
          navigator.share({ text }).then(() => resolve(true)).catch(() => resolve(false))
        } else {
          // Fallback to clipboard
          navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => resolve(false))
        }
      }
    })
  }

  // Cloud storage
  setCloudItem(key: string, value: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.webApp?.CloudStorage) {
        this.webApp.CloudStorage.setItem(key, value, (error) => {
          resolve(!error)
        })
      } else {
        // Fallback to localStorage
        try {
          localStorage.setItem(key, value)
          resolve(true)
        } catch {
          resolve(false)
        }
      }
    })
  }

  getCloudItem(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      if (this.webApp?.CloudStorage) {
        this.webApp.CloudStorage.getItem(key, (error, result) => {
          resolve(error ? null : result || null)
        })
      } else {
        // Fallback to localStorage
        try {
          resolve(localStorage.getItem(key))
        } catch {
          resolve(null)
        }
      }
    })
  }

  // Stars (premium currency)
  openStarsPayment(amount: number, description: string): Promise<boolean> {
    return new Promise((resolve) => {
      // This would need to be implemented with actual Stars API
      // For now, we'll show a popup
      this.showAlert(`Поддержать Gropy: ${amount} ⭐\n\n${description}`)
      resolve(true)
    })
  }

  // Close app
  close() {
    if (this.webApp?.close) {
      this.webApp.close()
    }
  }
}

// Create singleton instance
export const telegramManager = new TelegramManager()

// Convenience functions
export const isTelegramAvailable = () => telegramManager.isAvailable()
export const getTelegramUser = () => telegramManager.getUser()
export const getTelegramTheme = () => telegramManager.getTheme()
export const telegramImpact = (style?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => telegramManager.impact(style)
export const telegramNotification = (type: 'error' | 'success' | 'warning') => telegramManager.notification(type)
export const telegramShare = (text: string) => telegramManager.shareMessage(text)
