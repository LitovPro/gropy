import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Shop from './components/Shop';
import Pet from './components/Pet';
import { ThemeProvider} from './ThemeContext';
import GlobalStyles from './GlobalStyles';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  points: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  type: 'theme' | 'petItem';
}

const initialTodos: Todo[] = [
  { id: 1, text: '🛏️ Make the bed', completed: false, points: 1 },
  { id: 2, text: '🦷 Brush teeth', completed: false, points: 1 },
  { id: 3, text: '🚿 Take a shower', completed: false, points: 1 },
  { id: 4, text: '🚶 Get out of bed', completed: false, points: 1 },
  { id: 5, text: '🌞 Survive the day', completed: false, points: 5 },
];

const emojiSet = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'];

const shopItems: Item[] = [
  { id: 3, name: 'Pet Pillow 🛏️', price: 5, type: 'petItem' },
  { id: 4, name: 'Scratching Post 🐾', price: 7, type: 'petItem' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  top: 0;
  background-color: ${({ theme }) => theme.background};
  width: 60%;
  text-align: center;
  padding: 10px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PointsCounter = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 20px;
  color: #ffcc00;
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? JSON.parse(savedPoints) : 0;
  });
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });
  const [petItems, setPetItems] = useState<Item[]>(() => {
    const savedPetItems = localStorage.getItem('petItems');
    return savedPetItems ? JSON.parse(savedPetItems) : [];
  });
  const [shopItemsState, setShopItemsState] = useState<Item[]>(shopItems);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('petItems', JSON.stringify(petItems));
  }, [petItems]);

  useEffect(() => {
    const updatedShopItems = shopItems.filter(item => !petItems.some(petItem => petItem.id === item.id));
    setShopItemsState(updatedShopItems);
  }, [petItems]);

  const addTodo = (text: string) => {
    if (todos.length >= 10) return;
    const randomEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    const newTodo: Todo = {
      id: Date.now(),
      text: `${randomEmoji} ${text}`,
      completed: false,
      points: 1,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id && !todo.completed ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const todo = todos.find(todo => todo.id === id);
    if (todo && !todo.completed) {
      setPoints(points + todo.points);
    }
  };

  const resetTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: false } : todo
      )
    );
  };

  const buyItem = (item: Item) => {
    if (points >= item.price) {
      setPoints(points - item.price);
      if (item.type === 'theme') {
        setTheme(item.name.toLowerCase());
      } else {
        setPetItems([...petItems, item]);
      }
    }
  };

  const clearMemory = () => {
    localStorage.clear();
    setTodos(initialTodos);
    setPoints(0);
    setTheme('light');
    setPetItems([]);
  };

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Container>
        <Header>Todos</Header>
        <PointsCounter>⚡ {points}</PointsCounter>
        <MainContent>
          <Section>
            <h2>Daily</h2>
            <TodoForm addTodo={addTodo} />
            <h2>Active</h2>
            <TodoList todos={todos.filter(todo => !todo.completed)} toggleTodo={toggleTodo} resetTodo={resetTodo} />
            <h2>Completed</h2>
            <TodoList todos={todos.filter(todo => todo.completed)} toggleTodo={toggleTodo} resetTodo={resetTodo} />
          </Section>
          <Section>
            <Shop items={shopItemsState} buyItem={buyItem} />
          </Section>
        </MainContent>
        <Pet items={petItems} />
        <button onClick={clearMemory}>Clear Memory</button>
      </Container>
    </ThemeProvider>
  );
};

export default App;