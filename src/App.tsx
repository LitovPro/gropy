import React from 'react';
import styled from 'styled-components';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Shop from './components/Shop';
import Pet from './components/Pet';
import ThemeSelector from './components/ThemeSelector';
import StatsPanel from './components/StatsPanel';
import DailySuggestions from './components/DailySuggestions';
import WellbeingCenter from './components/WellbeingCenter';
import BottomNavigation, { NavTab } from './components/BottomNavigation';
import ProfileSection from './components/ProfileSection';
import { ThemeProvider } from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import { useTodos } from './hooks/useTodos';
import { useGameState } from './hooks/useGameState';
import { useDailyExperience } from './hooks/useDailyExperience';
import { ShopItem } from './types';

// Красивые магазинные предметы
const shopItems: ShopItem[] = [
  { 
    id: 'pillow-1', 
    name: 'Мягкая подушка', 
    price: 5, 
    type: 'petItem', 
    description: 'Уютная подушка для питомца',
    emoji: '🛏️',
    rarity: 'common'
  },
  { 
    id: 'toy-1', 
    name: 'Когтеточка', 
    price: 7, 
    type: 'petItem', 
    description: 'Классная когтеточка',
    emoji: '🐾',
    rarity: 'common'
  },
  { 
    id: 'ocean-theme', 
    name: 'Океанская тема', 
    price: 15, 
    type: 'theme', 
    description: 'Красивая морская тема',
    emoji: '🌊',
    rarity: 'rare'
  },
  { 
    id: 'forest-theme', 
    name: 'Лесная тема', 
    price: 15, 
    type: 'theme', 
    description: 'Природная зелёная тема',
    emoji: '🌲',
    rarity: 'rare'
  },
];

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  
  /* Мобильная версия */
  @media (max-width: 767px) {
    padding: 0.75rem 0.75rem 5rem 0.75rem; /* Отступ снизу для нижней навигации */
  }
  
  /* Десктопная версия */
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin: 0.5rem 0 1.5rem 0;
  position: relative;
  
  @media (min-width: 768px) {
    margin: 2rem 0 3rem 0;
  }
  
  /* Скрываем на мобильных в разделах кроме home */
  @media (max-width: 767px) {
    &.hidden-mobile {
      display: none;
    }
  }
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 5vw, 4rem);
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
  
  /* Fallback для плохой поддержки background-clip */
  @supports not (-webkit-background-clip: text) {
    background: none;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 767px) {
    font-size: 1.8rem;
    margin-bottom: 0.125rem;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  margin: 0;
  
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 380px;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const TodoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

// Удалили DangerZone - заменили на WellbeingCenter

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<NavTab>('home');
  
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    clearCompleted, 
    resetAllTodos, 
    stats 
  } = useTodos();
  
  const { 
    gameState, 
    addPoints, 
    spendPoints, 
    addAchievement, 
    resetGameState, 
    expProgress, 
    expForNextLevel 
  } = useGameState();

  const { 
    celebrateCompletion, 
    feedbackOnAction, 
    getWelcomeMessage,
    markVisitToday 
  } = useDailyExperience();

  // Отмечаем визит при загрузке
  React.useEffect(() => {
    markVisitToday();
  }, []);

  // Обновляем заголовок страницы
  React.useEffect(() => {
    document.title = `Gropy - ${stats.pending} дел осталось`;
  }, [stats.pending]);

  // Обработчик выполнения задачи с haptic feedback
  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      addPoints(todo.points);
      celebrateCompletion(); // Haptic feedback для Telegram
      
      // Проверка достижений
      if (stats.completed + 1 === 1) {
        addAchievement('first-task');
      }
      if (stats.completed + 1 === 10) {
        addAchievement('ten-tasks');
      }
    }
    toggleTodo(id);
  };

  // Покупка предметов с feedback
  const handleBuyItem = (item: ShopItem) => {
    if (spendPoints(item.price)) {
      feedbackOnAction(); // Haptic feedback
      
      if (item.type === 'theme') {
        addAchievement('theme-buyer');
      } else {
        addAchievement('pet-lover');
      }
    }
  };

  // Безопасная очистка (с подтверждением)
  const handleResetData = () => {
    resetAllTodos();
    resetGameState();
  };

  const userStats = {
    totalTasks: stats.total,
    completedTasks: stats.completed,
    totalPoints: gameState.points,
    streak: gameState.streak,
    level: gameState.level,
    experience: gameState.experience,
  };

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <TodoSection>
            <DailySuggestions onAddTask={addTodo} />
            
            <TodoForm 
              addTodo={addTodo} 
              maxTodos={50}
              currentCount={stats.total}
            />
            
            <div>
              <h2>🌸 Что хочешь сделать? ({stats.pending})</h2>
              <TodoList 
                todos={todos.filter(todo => !todo.completed)} 
                onToggle={handleToggleTodo}
                onDelete={deleteTodo}
              />
            </div>
            
            <div>
              <h2>✨ Уже сделано! ({stats.completed})</h2>
              <TodoList 
                todos={todos.filter(todo => todo.completed)} 
                onToggle={handleToggleTodo}
                onDelete={deleteTodo}
                showClearCompleted={stats.completed > 0}
                onClearCompleted={clearCompleted}
              />
            </div>
          </TodoSection>
        );
      
      case 'shop':
        return (
          <SidePanel>
            <Shop 
              items={shopItems} 
              onBuyItem={handleBuyItem}
              userPoints={gameState.points}
            />
          </SidePanel>
        );
      
      case 'pet':
        return (
          <SidePanel>
            <Pet level={gameState.level} />
          </SidePanel>
        );
      
      case 'profile':
        return (
          <ProfileSection
            stats={userStats}
            expProgress={expProgress}
            expForNextLevel={expForNextLevel}
            onResetData={handleResetData}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Container>
        {/* Десктопная навигация (только на больших экранах) */}
        <div className="desktop-only">
          <ThemeSelector />
          <StatsPanel 
            stats={userStats} 
            expProgress={expProgress} 
            expForNextLevel={expForNextLevel} 
          />
        </div>
        
        {/* Заголовок - показываем только на главной в мобильной версии */}
        <Header 
          className={`fade-in ${activeTab !== 'home' ? 'hidden-mobile' : ''}`}
        >
          <Title>Gropy</Title>
          <Subtitle>Твой добрый помощник в делах ✨</Subtitle>
        </Header>

        {/* Мобильный контент - только один раздел на экране */}
        <div className="mobile-content">
          {renderMobileContent()}
        </div>

        {/* Десктопный контент - классический layout */}
        <MainContent className="desktop-content">
          <TodoSection>
            <DailySuggestions onAddTask={addTodo} />
            
            <TodoForm 
              addTodo={addTodo} 
              maxTodos={50}
              currentCount={stats.total}
            />
            
            <div>
              <h2>🌸 Что хочешь сделать? ({stats.pending})</h2>
              <TodoList 
                todos={todos.filter(todo => !todo.completed)} 
                onToggle={handleToggleTodo}
                onDelete={deleteTodo}
              />
            </div>
            
            <div>
              <h2>✨ Уже сделано! ({stats.completed})</h2>
              <TodoList 
                todos={todos.filter(todo => todo.completed)} 
                onToggle={handleToggleTodo}
                onDelete={deleteTodo}
                showClearCompleted={stats.completed > 0}
                onClearCompleted={clearCompleted}
              />
            </div>
          </TodoSection>

          <SidePanel>
            <Shop 
              items={shopItems} 
              onBuyItem={handleBuyItem}
              userPoints={gameState.points}
            />
            <Pet level={gameState.level} />
          </SidePanel>
        </MainContent>

        {/* WellbeingCenter только на десктопе */}
        <div className="desktop-only">
          <WellbeingCenter 
            completedToday={stats.completed}
            totalPoints={gameState.points}
            streak={gameState.streak}
            onResetData={handleResetData}
          />
        </div>

        {/* Нижняя навигация - только на мобильных */}
        <div className="mobile-only">
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pendingTasks={stats.pending}
            userPoints={gameState.points}
            level={gameState.level}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;