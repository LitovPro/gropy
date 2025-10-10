import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Telegram WebApp
Object.defineProperty(window, 'Telegram', {
  value: {
    WebApp: {
      HapticFeedback: {
        notificationOccurred: vi.fn(),
        impactOccurred: vi.fn(),
      },
    },
  },
})
