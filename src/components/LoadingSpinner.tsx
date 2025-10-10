import React from 'react'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../design/tokens'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${tokens.space.xl};
  min-height: 200px;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.color.border};
  border-top: 3px solid ${({ theme }) => theme.color.accent};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${tokens.space.md};
`

const LoadingText = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  text-align: center;
`

export const LoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Загружаем...' 
}) => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </SpinnerContainer>
  )
}

