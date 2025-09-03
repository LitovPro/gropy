import React from 'react';
import styled from 'styled-components';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Shop from './components/Shop';
import Pet from './components/Pet';
import ThemeSelector from './components/ThemeSelector';
import StatsPanel from './components/StatsPanel';
import { ThemeProvider } from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import { useTodos } from './hooks/useTodos';
import { useGameState } from './hooks/useGameState';
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
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin: 1rem 0 2rem 0;
  position: relative;
  
  @media (min-width: 768px) {
    margin: 2rem 0 3rem 0;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0,0,0,0.1);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 400px;
    gap: 2rem;
    padding: 0;
  }
`;

const TodoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DangerZone = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface}dd;
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.error}33;
`;

const DangerButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error}33;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error}10;
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

const App: React.FC = () => {
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

  // Обработчик выполнения задачи
  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      addPoints(todo.points);
      
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

  // Покупка предметов
  const handleBuyItem = (item: ShopItem) => {
    if (spendPoints(item.price)) {
      if (item.type === 'theme') {
        // Тема будет активирована через ThemeSelector
        addAchievement('theme-buyer');
      } else {
        // Добавить предмет питомцу
        addAchievement('pet-lover');
      }
    }
  };

  // Безопасная очистка (с подтверждением)
  const handleClearMemory = () => {
    if (window.confirm('⚠️ Вы уверены? Это удалит ВСЕ данные безвозвратно!')) {
      resetAllTodos();
      resetGameState();
    }
  };

  const userStats = {
    totalTasks: stats.total,
    completedTasks: stats.completed,
    totalPoints: gameState.points,
    streak: gameState.streak,
    level: gameState.level,
    experience: gameState.experience,
  };

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Container>
        <ThemeSelector />
        <StatsPanel 
          stats={userStats} 
          expProgress={expProgress} 
          expForNextLevel={expForNextLevel} 
        />
        
        <Header className="fade-in">
          <Title>Gropy</Title>
          <Subtitle>Твой добрый помощник в делах ✨</Subtitle>
        </Header>

        <MainContent>
          <TodoSection>
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

        <DangerZone>
          <DangerButton onClick={handleClearMemory}>
            🗑️ Очистить всё
          </DangerButton>
        </DangerZone>
      </Container>
    </ThemeProvider>
  );
};

export default App;