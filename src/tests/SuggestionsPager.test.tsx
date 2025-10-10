import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from './test-utils'
import { SuggestionsPager } from '../components/SuggestionsPager/SuggestionsPager'
import { Suggestion } from '../types'

const mockSuggestions: Suggestion[] = [
  {
    id: 'test-1',
    title: 'Test suggestion 1',
    category: 'daily',
    energy: 'easy',
    emoji: '💧',
    motivationalText: 'Test motivation 1',
  },
  {
    id: 'test-2',
    title: 'Test suggestion 2',
    category: 'health',
    energy: 'medium',
    emoji: '🏃',
    motivationalText: 'Test motivation 2',
  },
]

import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('SuggestionsPager', () => {
  const mockOnComplete = vi.fn()
  const mockOnSkip = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders suggestions correctly', () => {
    render(
      <SuggestionsPager
        suggestions={mockSuggestions}
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        completedCount={0}
        maxCompletions={3}
      />
    )

    expect(screen.getByText('Маленькие шаги — тоже суперсилы ✨')).toBeInTheDocument()
    expect(screen.getByText('Выбери до трёх лёгких идей')).toBeInTheDocument()
    expect(screen.getByText('Test suggestion 1')).toBeInTheDocument()
    expect(screen.getByText('Test motivation 1')).toBeInTheDocument()
  })

  it('shows completion counter', () => {
    render(
      <SuggestionsPager
        suggestions={mockSuggestions}
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        completedCount={1}
        maxCompletions={3}
      />
    )

    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('calls onComplete when complete button is clicked', async () => {
    render(
      <SuggestionsPager
        suggestions={mockSuggestions}
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        completedCount={0}
        maxCompletions={3}
      />
    )

    const completeButton = screen.getByText('Выполнить ✨')
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith(mockSuggestions[0])
    })
  })

  it('calls onSkip when skip button is clicked', () => {
    render(
      <SuggestionsPager
        suggestions={mockSuggestions}
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        completedCount={0}
        maxCompletions={3}
      />
    )

    const skipButton = screen.getByText('Пропустить')
    fireEvent.click(skipButton)

    expect(mockOnSkip).toHaveBeenCalledWith(mockSuggestions[0])
  })

  it('shows completion banner when max completions reached', () => {
    render(
      <SuggestionsPager
        suggestions={mockSuggestions}
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        completedCount={3}
        maxCompletions={3}
      />
    )

    expect(screen.getByText('Достаточно на сейчас — супер! ✨')).toBeInTheDocument()
    expect(screen.getByText('К делам')).toBeInTheDocument()
  })
})
