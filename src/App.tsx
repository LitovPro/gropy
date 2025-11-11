import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react'
import styled from 'styled-components'
import { useTodos } from './hooks/useTodos'
import { useGameState } from './hooks/useGameState'
import { useDailyExperience } from './hooks/useDailyExperience'
import { useRituals } from './hooks/useRituals'
import { useJournal } from './hooks/useJournal'
import { useUiPrefs } from './hooks/useUiPrefs'
import { useToast } from './components/Toast/useToast'
import { safeGet, safeSet } from './utils/ls'
import { validateImportData, sanitizeImportData } from './utils/dataValidation'
import { Toast } from './components/Toast/Toast'
import { EdgePeek } from './components/UX/EdgePeek'
import { preloadOnHover } from './utils/lazyImports'
import {
  MAX_DAILY_RITUALS,
  DEFAULT_SHOP_ITEM_PRICE,
  RITUAL_COMPLETION_POINTS,
  VICTORY_BUBBLE_DURATION,
  RESET_RELOAD_DELAY,
  STORAGE_KEYS,
  EXPORT_DATA_VERSION,
} from './constants'
// Lazy load heavy components
const TasksPager = lazy(() => import('./components/TasksPager').then(m => ({ default: m.TasksPager })))
const ExercisesPager = lazy(() => import('./components/ExercisesPager').then(m => ({ default: m.ExercisesPager })))
const EmotionalDiary = lazy(() => import('./components/EmotionalDiary').then(m => ({ default: m.EmotionalDiary })))
const Shop = lazy(() => import('./components/Shop').then(m => ({ default: m.Shop })))
const ProfileSection = lazy(() => import('./components/ProfileSection').then(m => ({ default: m.ProfileSection })))
const SoundSettings = lazy(() => import('./components/SoundSettings').then(m => ({ default: m.SoundSettings })))
const SupportCard = lazy(() => import('./components/SupportCard').then(m => ({ default: m.SupportCard })))

import { StatsPanel } from './components/StatsPanel'
import { UiSettings } from './components/UiSettings'
import { BottomNavigation, NavItem } from './components/BottomNavigation'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import './styles/attentionZones.css'

const AppContainer = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.color.bg};
  display: grid;
  grid-template-rows: 1fr auto;
`

const MainContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  /* padding-bottom removed - handled by individual containers */
`

type ActiveTab = 'tasks' | 'exercises' | 'diary' | 'stats' | 'profile'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tasks')
  const [showVictoryBubble, setShowVictoryBubble] = useState(false)
  const [ownedItems, setOwnedItems] = useState<string[]>([])

  const { toasts, showToast, hideToast } = useToast()
  const { todos, resetAllTodos, stats } = useTodos()
  const { gameState, addPoints, spendPoints, resetGameState, expForNextLevel } = useGameState()
  const { celebrateCompletion } = useDailyExperience()
  const {
    completedRituals,
    dailyStreak,
    completeRitual
  } = useRituals()
  useUiPrefs()
  useJournal()

  // Load owned items
  useEffect(() => {
    const saved = safeGet<string[]>(STORAGE_KEYS.OWNED_ITEMS, [])
    setOwnedItems(saved)
  }, [])

  const completedSuggestionIds = safeGet<string[]>(STORAGE_KEYS.COMPLETED_SUGGESTIONS, [])

  // Navigation items - updated structure
  const navItems: NavItem[] = [
    { id: 'tasks', label: 'Задачи', icon: '🎯' },
    { id: 'exercises', label: 'Упражнения', icon: '🌿' },
    { id: 'diary', label: 'Дневник', icon: '📖' },
    { id: 'stats', label: 'Прогресс', icon: '🌟' },
    { id: 'profile', label: 'Профиль', icon: '👤' },
  ]

  // Handle ritual completion
  const handleCompleteRitual = useCallback((ritualId: string) => {
    const success = completeRitual(ritualId)
    if (success) {
      addPoints(RITUAL_COMPLETION_POINTS)
      celebrateCompletion()
      setShowVictoryBubble(true)
    }
  }, [completeRitual, addPoints, celebrateCompletion])

  // Handle diary entry save
  const handleSaveDiaryEntry = useCallback(async (entry: { mood: string }) => {
    showToast('запись сохранена 💚')
    return entry
  }, [showToast])

  // Handle shop purchase
  const handlePurchase = useCallback((itemId: string) => {
    const success = spendPoints(DEFAULT_SHOP_ITEM_PRICE)
    if (success) {
      const newOwned = [...ownedItems, itemId]
      setOwnedItems(newOwned)
      safeSet(STORAGE_KEYS.OWNED_ITEMS, newOwned)
      showToast('покупка совершена! 🎉')
    } else {
      showToast('недостаточно очков')
    }
  }, [ownedItems, spendPoints, showToast])

  // Handle data export
  const handleExportData = useCallback(() => {
    const data = {
      todos,
      gameState,
      ownedItems,
      completedSuggestions: completedSuggestionIds,
      exportDate: new Date().toISOString(),
      version: EXPORT_DATA_VERSION,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gropy-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showToast('данные экспортированы! 📤')
  }, [todos, gameState, ownedItems, completedSuggestionIds, showToast])

  // Handle data import
  const handleImportData = useCallback((dataString: string) => {
    try {
      const parsed = JSON.parse(dataString)
      
      // Validate imported data
      const validation = validateImportData(parsed)
      if (!validation.isValid) {
        showToast(`ошибка валидации: ${validation.error}`)
        return
      }

      // Sanitize and import data
      const sanitized = sanitizeImportData(parsed)
      
      // Import todos if present
      if (sanitized.todos && Array.isArray(sanitized.todos)) {
        safeSet(STORAGE_KEYS.TODOS, sanitized.todos)
      }

      // Import game state if present
      if (sanitized.gameState) {
        safeSet(STORAGE_KEYS.GAME_STATE, sanitized.gameState)
      }

      // Import owned items if present
      if (sanitized.ownedItems && Array.isArray(sanitized.ownedItems)) {
        setOwnedItems(sanitized.ownedItems)
        safeSet(STORAGE_KEYS.OWNED_ITEMS, sanitized.ownedItems)
      }

      // Import completed suggestions if present
      if (sanitized.completedSuggestions && Array.isArray(sanitized.completedSuggestions)) {
        safeSet(STORAGE_KEYS.COMPLETED_SUGGESTIONS, sanitized.completedSuggestions)
      }

      showToast('данные импортированы! 📥')
      
      // Reload to apply changes
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error('Import error:', error)
      showToast('ошибка при импорте данных')
    }
  }, [showToast])

  // Handle reset all
  const handleResetAll = useCallback(() => {
    // Reset in-hook storages
    resetAllTodos()
    resetGameState()
    setOwnedItems([])

    // Remove all localStorage keys for this app
    try {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('gropy-')) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k))
    } catch {
      // Ignore errors
    }

    // Best-effort: clear app caches (PWA)
    try {
      if ('caches' in window) {
        caches.keys().then(names => {
          names.filter(name => name.startsWith('gropy')).forEach(name => caches.delete(name))
        })
      }
    } catch {
      // Ignore errors
    }

    showToast('все данные сброшены')

    // Hard refresh to ensure all hooks reinitialize from clean storage
    setTimeout(() => {
      window.location.reload()
    }, RESET_RELOAD_DELAY)
  }, [resetAllTodos, resetGameState, showToast])

  // Hide victory bubble after showing
  useEffect(() => {
    if (showVictoryBubble) {
      const timer = setTimeout(() => {
        setShowVictoryBubble(false)
      }, VICTORY_BUBBLE_DURATION)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [showVictoryBubble])

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <Suspense fallback={<LoadingSpinner message="Загружаем задачи..." />}>
            <TasksPager
              completedRituals={completedRituals}
              onCompleteRitual={handleCompleteRitual}
              maxDailyRituals={MAX_DAILY_RITUALS}
            />
          </Suspense>
        )
      case 'exercises':
        return (
          <Suspense fallback={<LoadingSpinner message="Загружаем упражнения..." />}>
            <ExercisesPager
              completedRituals={completedRituals}
              onCompleteRitual={handleCompleteRitual}
              maxDailyRituals={MAX_DAILY_RITUALS}
            />
          </Suspense>
        )
      case 'diary':
        return (
          <Suspense fallback={<LoadingSpinner message="Загружаем дневник..." />}>
            <EmotionalDiary
              onSaveEntry={handleSaveDiaryEntry}
            />
          </Suspense>
        )
      case 'stats':
        return (
          <>
            <StatsPanel
              level={gameState.level}
              experience={gameState.experience}
              expForNextLevel={expForNextLevel}
              points={gameState.points}
              streak={dailyStreak}
              totalCompleted={stats.completed}
              totalPoints={stats.totalPoints}
            />
            <Suspense fallback={<LoadingSpinner message="Загружаем магазин..." />}>
              <Shop
                points={gameState.points}
                ownedItems={ownedItems}
                onPurchase={handlePurchase}
              />
            </Suspense>
          </>
        )
      case 'profile':
        return (
          <>
            <UiSettings />
            <Suspense fallback={<LoadingSpinner message="Загружаем поддержку..." />}>
              <SupportCard />
            </Suspense>
            <Suspense fallback={<LoadingSpinner message="Загружаем настройки звука..." />}>
              <SoundSettings />
            </Suspense>
            <Suspense fallback={<LoadingSpinner message="Загружаем профиль..." />}>
              <ProfileSection
                onExportData={handleExportData}
                onImportData={handleImportData}
                onResetAll={handleResetAll}
              />
            </Suspense>
          </>
        )
      default:
        return null
    }
  }

  return (
    <ErrorBoundary>
      <AppContainer>
        <MainContent>
          {renderContent()}
        </MainContent>

        <EdgePeek />

        <Toast toasts={toasts} onHide={hideToast} />

        <BottomNavigation
          items={navItems}
          activeItem={activeTab}
          onItemClick={(itemId: string) => setActiveTab(itemId as ActiveTab)}
          {...preloadOnHover(() => import('./components/TasksPager'))}
          {...preloadOnHover(() => import('./components/ExercisesPager'))}
          {...preloadOnHover(() => import('./components/EmotionalDiary'))}
          {...preloadOnHover(() => import('./components/Shop'))}
          {...preloadOnHover(() => import('./components/ProfileSection'))}
        />
      </AppContainer>
    </ErrorBoundary>
  )
}

export default App
