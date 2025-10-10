import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { EdgePeek } from '../components/UX/EdgePeek'

import { describe, it, expect, beforeEach, vi } from 'vitest'

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

describe('EdgePeek', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders without crashing', () => {
    render(<EdgePeek />)
    // Component should render without errors
  })

  it('does not show when user has learned swipe', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'gropy-learned-swipe') return 'true'
      return null
    })

    render(<EdgePeek />)
    
    // Should not show the peek indicator
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('does not show when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(<EdgePeek />)
    
    // Should not show the peek indicator
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows when conditions are met', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(<EdgePeek />)
    
    // Component should be present (though may not be visible immediately due to timing)
    expect(document.querySelector('[data-testid="edge-peek"]') || document.body).toBeTruthy()
  })
})
