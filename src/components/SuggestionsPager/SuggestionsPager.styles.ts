import styled from 'styled-components'
import { tokens } from '../../design/tokens'

export const SuggestionsContainer = styled.div`
  padding: 16px;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 8px;
  line-height: 1.4;
`

export const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  line-height: 1.6;
`

export const Counter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.chip};
  padding: 8px 16px;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`

export const SuggestionCard = styled.div<{ $energy: 'easy' | 'medium' | 'energetic' }>`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: 16px;
  min-height: ${tokens.size.cardMinH};
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ $energy, theme }) => theme.color.effort[$energy]};
  }
`

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CardEmoji = styled.div`
  font-size: 24px;
  line-height: 1;
`

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0;
  line-height: 1.4;
`

export const CardMotivation = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
  line-height: 1.4;
`

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  height: ${tokens.size.tap};
  border-radius: ${tokens.radius.button};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background: ${theme.color.accent};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
        
        &:active {
          transform: scale(0.98);
        }
      `
      : `
        background: ${theme.color.surface};
        color: ${theme.color.textMuted};
        border: 1px solid ${theme.color.border};
        
        &:hover {
          background: ${theme.color.bg};
        }
        
        &:active {
          transform: scale(0.98);
        }
      `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

export const CompletionBanner = styled.div`
  background: linear-gradient(135deg, #22C55E, #16A34A);
  color: white;
  border-radius: ${tokens.radius.card};
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
`

export const BannerTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
`

export const BannerSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 16px 0;
  opacity: 0.9;
  line-height: 1.4;
`

export const BannerButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${tokens.radius.button};
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`





