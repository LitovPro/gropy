import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { tokens } from '../design/tokens'
import { useTheme } from '../ThemeContext'

const ProfileContainer = styled.div`
  padding: 16px;
  padding-bottom: calc(16px + 56px + env(safe-area-inset-bottom, 0));
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${tokens.radius.card};
  margin: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
`

const ProfileTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`

const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 12px 0;
  line-height: 1.4;
`

const ThemesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
`

const ThemePreview = styled.button<{ $isActive: boolean }>`
  aspect-ratio: 3/2;
  border-radius: ${tokens.radius.card};
  border: 2px solid ${({ $isActive, theme }) => 
    $isActive ? theme.color.accent : theme.color.border};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const ThemeColors = styled.div<{ $theme: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ $theme }) => {
    switch ($theme) {
      case 'light':
        return `
          background: linear-gradient(135deg, #F7F7FB 0%, #FFFFFF 100%);
        `
      case 'dark':
        return `
          background: linear-gradient(135deg, #0F1419 0%, #1A2230 100%);
        `
      case 'ocean':
        return `
          background: linear-gradient(135deg, #F0F9FF 0%, #0284C7 100%);
        `
      case 'forest':
        return `
          background: linear-gradient(135deg, #F0FDF4 0%, #16A34A 100%);
        `
      default:
        return `
          background: linear-gradient(135deg, #F7F7FB 0%, #FFFFFF 100%);
        `
    }
  }}
`

const ThemeName = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 2px 4px;
  border-radius: 4px;
`

const CheckIcon = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.color.accent : 'transparent'};
  border: 2px solid ${({ $isActive, theme }) => 
    $isActive ? theme.color.accent : theme.color.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  opacity: ${({ $isActive }) => $isActive ? 1 : 0};
  transition: all 0.2s ease;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Button = styled.button<{ $variant: 'primary' | 'secondary' | 'danger' }>`
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
  gap: 8px;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.color.accent};
          color: white;
          
          &:hover {
            opacity: 0.9;
          }
          
          &:active {
            transform: scale(0.98);
          }
        `
      case 'secondary':
        return `
          background: ${theme.color.surface};
          color: ${theme.color.textMuted};
          border: 1px solid ${theme.color.border};
          
          &:hover {
            background: ${theme.color.bg};
          }
          
          &:active {
            transform: scale(0.98);
          }
        `
      case 'danger':
        return `
          background: #DC2626;
          color: white;
          border: 2px solid #B91C1C;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          &:hover {
            background: #B91C1C;
            border-color: #991B1B;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
            
            &::before {
              left: 100%;
            }
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
          }
          
          &:disabled {
            background: #9CA3AF;
            border-color: #6B7280;
            color: #D1D5DB;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
            
            &:hover {
              background: #9CA3AF;
              border-color: #6B7280;
              transform: none;
              box-shadow: none;
            }
          }
        `
    }
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const DangerZone = styled.div`
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid #EF4444;
  border-radius: ${tokens.radius.card};
  padding: 16px;
  margin-top: 16px;
`

const DangerTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #EF4444;
  margin: 0 0 8px 0;
  line-height: 1.4;
`

const DangerText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 12px 0;
  line-height: 1.4;
`

const ConfirmInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #EF4444;
  border-radius: ${tokens.radius.button};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.surface};
  margin-bottom: 12px;

  &:focus {
    border-color: #EF4444;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #EF4444;
    outline-offset: 2px;
  }
`

const themes = [
  { id: 'light', name: 'Светлая' },
  { id: 'dark', name: 'Тёмная' },
  { id: 'ocean', name: 'Океан' },
  { id: 'forest', name: 'Лес' },
]

interface ProfileSectionProps {
  onExportData: () => void
  onImportData: (data: string) => void
  onResetAll: () => void
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  onExportData,
  onImportData,
  onResetAll,
}) => {
  const { themeName, setTheme } = useTheme()
  const [showDangerZone, setShowDangerZone] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [importData, setImportData] = useState('')
  const [resetAttempts, setResetAttempts] = useState(0)
  const [blockUntil, setBlockUntil] = useState<number | null>(null)

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId as 'light' | 'dark' | 'auto')
  }

  const handleExport = () => {
    onExportData()
  }

  const handleImport = () => {
    if (importData.trim()) {
      onImportData(importData)
      setImportData('')
    }
  }

  const handleReset = () => {
    if (confirmText === 'СБРОС') {
      onResetAll()
      setConfirmText('')
      setShowDangerZone(false)
      setResetAttempts(0)
      setBlockUntil(null)
    } else {
      const newAttempts = resetAttempts + 1
      setResetAttempts(newAttempts)
      
      if (newAttempts >= 3) {
        // Block for 5 minutes
        setBlockUntil(Date.now() + 5 * 60 * 1000)
      }
    }
  }

  const canReset = confirmText === 'СБРОС'
  const isBlocked = blockUntil ? Date.now() < blockUntil : resetAttempts >= 3
  const timeLeft = blockUntil ? Math.max(0, Math.ceil((blockUntil - Date.now()) / 1000)) : 0

  // Update timer every second when blocked
  useEffect(() => {
    if (blockUntil && timeLeft > 0) {
      const timer = setInterval(() => {
        if (Date.now() >= blockUntil) {
          setBlockUntil(null)
          setResetAttempts(0)
        }
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [blockUntil, timeLeft])

  return (
    <ProfileContainer>
      <ProfileTitle>Профиль</ProfileTitle>

      <Section>
        <SectionTitle>Тема оформления</SectionTitle>
        <ThemesGrid>
          {themes.map(theme => (
            <ThemePreview
              key={theme.id}
              $isActive={themeName === theme.id}
              onClick={() => handleThemeChange(theme.id)}
            >
              <ThemeColors $theme={theme.id} />
              <ThemeName>{theme.name}</ThemeName>
              <CheckIcon $isActive={themeName === theme.id}>✓</CheckIcon>
            </ThemePreview>
          ))}
        </ThemesGrid>
      </Section>

      <Section>
        <SectionTitle>Данные</SectionTitle>
        <ButtonGroup>
          <Button $variant="primary" onClick={handleExport}>
            📤 Экспорт данных
          </Button>
          <Button $variant="secondary" onClick={handleImport}>
            📥 Импорт данных
          </Button>
        </ButtonGroup>
      </Section>

      <DangerZone>
        <DangerTitle>Опасная зона</DangerTitle>
        <DangerText>
          Сброс всех данных. Это действие нельзя отменить.
        </DangerText>
        
        <AnimatePresence>
          {showDangerZone ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ConfirmInput
                type="text"
                placeholder="Введите СБРОС для подтверждения"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={isBlocked}
              />
              {resetAttempts > 0 && resetAttempts < 3 && (
                <DangerText style={{ fontSize: '12px', marginTop: '8px' }}>
                  Неверный ввод. Попыток: {resetAttempts}/3
                </DangerText>
              )}
              {isBlocked && (
                <DangerText style={{ fontSize: '12px', marginTop: '8px' }}>
                  {timeLeft > 0 
                    ? `Слишком много попыток. Попробуйте через ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
                    : 'Слишком много попыток. Попробуйте позже.'
                  }
                </DangerText>
              )}
              <Button
                $variant="danger"
                onClick={handleReset}
                disabled={!canReset || isBlocked}
              >
                {isBlocked ? 'Заблокировано' : 'Сбросить всё'}
              </Button>
            </motion.div>
          ) : (
            <Button
              $variant="danger"
              onClick={() => setShowDangerZone(true)}
              disabled={isBlocked}
            >
              {isBlocked ? 'Заблокировано' : 'Сбросить всё'}
            </Button>
          )}
        </AnimatePresence>
      </DangerZone>
    </ProfileContainer>
  )
}
