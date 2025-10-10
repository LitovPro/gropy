import React, { Component, ErrorInfo, ReactNode } from 'react'
import styled from 'styled-components'
import { tokens } from '../design/tokens'

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: ${tokens.space.lg};
  text-align: center;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  margin: ${tokens.space.md};
`

const ErrorTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 ${tokens.space.md} 0;
`

const ErrorMessage = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 ${tokens.space.lg} 0;
  line-height: ${tokens.typography.lineHeight.normal};
`

const RetryButton = styled.button`
  background: ${({ theme }) => theme.color.accent};
  color: white;
  border: none;
  border-radius: ${tokens.radius.button};
  padding: ${tokens.space.md} ${tokens.space.lg};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${tokens.motion.fast} ${tokens.motion.easing};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Что-то пошло не так 😔</ErrorTitle>
          <ErrorMessage>
            Произошла неожиданная ошибка. Не волнуйся, это не твоя вина.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Попробовать снова
          </RetryButton>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

