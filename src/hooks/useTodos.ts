import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types';
import { safeLocalStorage, generateSecureId, sanitizeText, validateTodoText } from '../utils/security';

const STORAGE_KEY = 'gropy-todos';
const MAX_TODOS = 50; // Увеличили лимит

const initialTodos: Todo[] = [
  { id: generateSecureId(), text: '🛏️ Заправить кровать', completed: false, points: 1, category: 'daily', priority: 'medium', createdAt: new Date().toISOString() },
  { id: generateSecureId(), text: '🦷 Почистить зубы', completed: false, points: 1, category: 'daily', priority: 'high', createdAt: new Date().toISOString() },
  { id: generateSecureId(), text: '🚿 Принять душ', completed: false, points: 1, category: 'daily', priority: 'medium', createdAt: new Date().toISOString() },
  { id: generateSecureId(), text: '🌞 Прожить день с улыбкой', completed: false, points: 5, category: 'personal', priority: 'high', createdAt: new Date().toISOString() },
];

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = safeLocalStorage.get(STORAGE_KEY);
    return saved && Array.isArray(saved) ? saved : initialTodos;
  });

  // Автосохранение
  useEffect(() => {
    safeLocalStorage.set(STORAGE_KEY, todos);
  }, [todos]);

  const addTodo = useCallback((text: string, category: 'daily' | 'work' | 'personal' | 'health' | 'learning' = 'personal', priority: 'low' | 'medium' | 'high' = 'medium') => {
    if (todos.length >= MAX_TODOS) {
      throw new Error(`Максимум ${MAX_TODOS} задач`);
    }

    const validation = validateTodoText(text);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const sanitizedText = sanitizeText(text);
    const emojiSet = ['🎯', '⭐', '🚀', '💎', '🔥', '⚡', '🌟', '🎪', '🎨', '🎵'];
    const randomEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    
    const newTodo: Todo = {
      id: generateSecureId(),
      text: `${randomEmoji} ${sanitizedText}`,
      completed: false,
      points: priority === 'high' ? 3 : priority === 'medium' ? 2 : 1,
      category,
      priority,
      createdAt: new Date().toISOString(),
    };

    setTodos(prev => [...prev, newTodo]);
    return newTodo;
  }, [todos.length]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { 
          ...todo, 
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : undefined
        } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const resetAllTodos = useCallback(() => {
    setTodos(initialTodos);
  }, []);

  // Статистика
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    totalPoints: todos.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0),
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    resetAllTodos,
    stats,
    maxTodos: MAX_TODOS,
  };
};
