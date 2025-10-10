import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react'
import styled from 'styled-components'
// import { Suggestion } from './types'
import { useTodos } from './hooks/useTodos'
import { useGameState } from './hooks/useGameState'
import { useDailyExperience } from './hooks/useDailyExperience'
import { useRituals } from './hooks/useRituals'
import { useJournal } from './hooks/useJournal'
import { useUiPrefs } from './hooks/useUiPrefs'
import { useToast } from './components/Toast/useToast'
// import { getAdaptedDailySuggestions } from './utils/suggestionsAdapter'
// import { rankSuggestions } from './utils/suggestionRanking'
import { safeGet, safeSet } from './utils/ls'
import { Toast } from './components/Toast/Toast'
import { EdgePeek } from './components/UX/EdgePeek'
// import { SuggestionsPager } from './components/SuggestionsPager/SuggestionsPager'
// Lazy load heavy components
const RitualsPager = lazy(() => import('./components/RitualsPager').then(m => ({ default: m.RitualsPager })))
const EmotionalDiary = lazy(() => import('./components/EmotionalDiary').then(m => ({ default: m.EmotionalDiary })))
const Shop = lazy(() => import('./components/Shop').then(m => ({ default: m.Shop })))
const ProfileSection = lazy(() => import('./components/ProfileSection').then(m => ({ default: m.ProfileSection })))
const SoundSettings = lazy(() => import('./components/SoundSettings').then(m => ({ default: m.SoundSettings })))
const SupportCard = lazy(() => import('./components/SupportCard').then(m => ({ default: m.SupportCard })))

// import { TodoForm } from './components/TodoForm'
// import { TodoList } from './components/TodoList'
// import { DoneList } from './components/DoneList'
// import { Pet } from './components/Pet' // Temporarily disabled
import { StatsPanel } from './components/StatsPanel'
import { UiSettings } from './components/UiSettings'
import { BottomNavigation, NavItem } from './components/BottomNavigation'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import './styles/attentionZones.css'

const AppContainer = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme['color']['bg']};
  display: grid;
  grid-template-rows: 1fr auto;
`

const MainContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  /* padding-bottom removed - handled by individual containers */
`

type ActiveTab = 'rituals' | 'diary' | 'stats' | 'profile'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('rituals')
  const [showVictoryBubble, setShowVictoryBubble] = useState(false)
  const [ownedItems, setOwnedItems] = useState<string[]>([])
  // const [petMood, setPetMood] = useState<'happy' | 'sleepy' | 'excited' | 'calm'>('happy') // Temporarily disabled
  
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
    const saved = safeGet<string[]>('gropy-owned-items', [])
    setOwnedItems(saved)
  }, [])

  // Generate and rank suggestions
  // const allSuggestions = getAdaptedDailySuggestions()
  const completedSuggestionIds = safeGet<string[]>('gropy-completed-suggestions', [])
  // const rankedSuggestions = rankSuggestions(allSuggestions, completedSuggestionIds)

  // Navigation items - simplified to 4 main sections
  const navItems: NavItem[] = [
    { id: 'rituals', label: 'Ритуалы', icon: '🌿' },
    { id: 'diary', label: 'Дневник', icon: '📖' },
    { id: 'stats', label: 'Прогресс', icon: '📊' },
    { id: 'profile', label: 'Профиль', icon: '👤' },
  ]

  // Handle suggestion completion
  // const handleCompleteSuggestion = useCallback((suggestion: Suggestion) => {
  //   // Add as completed suggestion
  //   const newCompleted = [...completedSuggestionIds, suggestion.id]
  //   safeSet('gropy-completed-suggestions', newCompleted)

  //   // Add points
  //   const points = suggestion.energy === 'easy' ? 1 : suggestion.energy === 'medium' ? 2 : 3
  //   addPoints(points)

  //   // Celebrate
  //   celebrateCompletion()
  //   setShowVictoryBubble(true)

  //   // Show toast with undo
  //   showToast(`готово! +${points}⚡`, {
  //     action: {
  //       label: 'отменить',
  //       onAction: () => {
  //         // Undo: remove from completed, subtract points
  //         const updatedCompleted = newCompleted.filter(id => id !== suggestion.id)
  //         safeSet('gropy-completed-suggestions', updatedCompleted)
  //         // Note: In a real app, you'd need to track and undo the points too
  //       },
  //     },
  //   })
  // }, [completedSuggestionIds, addPoints, celebrateCompletion, showToast])

  // Handle suggestion skip
  // const handleSkipSuggestion = useCallback((_suggestion: Suggestion) => {
  //   // Just skip, no action needed
  // }, [])

  // Handle ritual completion
  const handleCompleteRitual = useCallback((ritualId: string) => {
    const success = completeRitual(ritualId)
    if (success) {
      addPoints(1) // Give points for ritual completion
      celebrateCompletion()
      setShowVictoryBubble(true)
      // setPetMood('excited') // Temporarily disabled
      
      showToast('ритуал выполнен! ✨', {
        action: {
          label: 'отменить',
          onAction: () => {
            // Undo logic would go here
          },
        },
      })

      // Reset pet mood after celebration - temporarily disabled
      // setTimeout(() => {
      //   setPetMood('happy')
      // }, 3000)
    }
  }, [completeRitual, addPoints, celebrateCompletion, showToast])

  // Handle diary entry save
  const handleSaveDiaryEntry = useCallback(async (entry: { mood: string }) => {
    showToast('запись сохранена 💚')
    
    // Update pet mood based on emotion - temporarily disabled
    // if (entry.mood === 'sun' || entry.mood === 'rainbow' || entry.mood === 'stars') {
    //   setPetMood('happy')
    // } else if (entry.mood === 'rain' || entry.mood === 'storm' || entry.mood === 'clouds') {
    //   setPetMood('calm')
    // } else if (entry.mood === 'wind' || entry.mood === 'moon') {
    //   setPetMood('sleepy')
    // } else {
    //   setPetMood('happy')
    // }
    
    return entry
  }, [showToast])

  // Handle todo completion
  // const handleToggleTodo = useCallback((id: string) => {
  //   const todo = todos.find(t => t.id === id)
  //   if (todo) {
  //     toggleTodo(id)
  //     if (!todo.completed) {
  //       addPoints(todo.points)
  //       celebrateCompletion()
  //     }
  //   }
  // }, [todos, toggleTodo, addPoints, celebrateCompletion])

  // Handle clear completed todos
  // const handleClearCompleted = useCallback(() => {
  //   const clearedTodos = clearCompleted()
  //   
  //   showToast('Очищено. Вернуть?', {
  //     action: {
  //       label: 'Вернуть',
  //       onAction: () => {
  //         restoreCompleted(clearedTodos)
  //       },
  //     },
  //   })
  //   
  //   return clearedTodos
  // }, [clearCompleted, restoreCompleted, showToast])

  // Handle shop purchase
  const handlePurchase = useCallback((itemId: string) => {
    // This would need proper item pricing logic
    const success = spendPoints(10) // Example price
    if (success) {
      const newOwned = [...ownedItems, itemId]
      setOwnedItems(newOwned)
      safeSet('gropy-owned-items', newOwned)
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
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gropy-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    showToast('данные экспортированы! 📤')
  }, [todos, gameState, ownedItems, completedSuggestionIds, showToast])

  // Handle data import
  const handleImportData = useCallback((dataString: string) => {
    try {
      JSON.parse(dataString)
      // This would need proper validation and import logic
      showToast('данные импортированы! 📥')
    } catch {
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
    }, 250)
  }, [resetAllTodos, resetGameState, showToast])

  // Hide victory bubble after showing
  useEffect(() => {
    if (showVictoryBubble) {
      const timer = setTimeout(() => {
        setShowVictoryBubble(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [showVictoryBubble])

  const renderContent = () => {
    switch (activeTab) {
      case 'rituals':
        return (
          <Suspense fallback={<LoadingSpinner message="Загружаем ритуалы..." />}>
            <RitualsPager
              completedRituals={completedRituals}
              onCompleteRitual={handleCompleteRitual}
              maxDailyRituals={3}
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

        {/* Pet component temporarily disabled
        <Pet
          showVictoryBubble={showVictoryBubble}
          onVictoryBubbleShown={() => setShowVictoryBubble(false)}
          petMood={petMood}
        />
        */}

        <EdgePeek />

        <Toast toasts={toasts} onHide={hideToast} />

        <BottomNavigation
          items={navItems}
          activeItem={activeTab}
          onItemClick={(itemId) => setActiveTab(itemId as ActiveTab)}
        />
      </AppContainer>
    </ErrorBoundary>
  )
}

export default App
