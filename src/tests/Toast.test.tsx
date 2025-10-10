import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { render } from './test-utils'
import { Toast } from '../components/Toast/Toast'

const mockToasts = [
  {
    id: 'toast-1',
    message: 'Test message',
    options: {
      action: {
        label: 'Undo',
        onAction: vi.fn(),
      },
    },
  },
]

import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Toast', () => {
  const mockOnHide = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders toast message', () => {
    render(<Toast toasts={mockToasts} onHide={mockOnHide} />)

    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByText('Undo')).toBeInTheDocument()
  })

  it('calls action when action button is clicked', () => {
    render(<Toast toasts={mockToasts} onHide={mockOnHide} />)

    const actionButton = screen.getByText('Undo')
    fireEvent.click(actionButton)

    expect(mockToasts[0].options.action?.onAction).toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(<Toast toasts={mockToasts} onHide={mockOnHide} />)

    const toast = screen.getByRole('alert')
    expect(toast).toHaveAttribute('aria-live', 'polite')
  })

  it('handles escape key', () => {
    render(<Toast toasts={mockToasts} onHide={mockOnHide} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(mockOnHide).toHaveBeenCalledWith('toast-1')
  })
})
