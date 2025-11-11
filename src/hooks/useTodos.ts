import { useState, useEffect, useCallback } from 'react'
import { Todo, Category, Energy } from '../types'
import { safeGet, safeSet } from '../utils/ls'
import { validateTodoText } from '../utils/security'
import { STORAGE_KEYS } from '../constants'

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const savedTodos = safeGet<Todo[]>(STORAGE_KEYS.TODOS, [])
    setTodos(savedTodos)
  }, [])

  const saveTodos = useCallback((newTodos: Todo[]) => {
    setTodos(newTodos)
    safeSet(STORAGE_KEYS.TODOS, newTodos)
  }, [])

  const addTodo = useCallback(
    (text: string, category: Category, energy: Energy) => {
      const validation = validateTodoText(text)
      if (!validation.isValid) {
        throw new Error(validation.error)
      }

      const now = new Date().toISOString()
      const newTodo: Todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        points: energy === 'easy' ? 1 : energy === 'medium' ? 2 : 3,
        category,
        energy,
        createdAt: now,
        updatedAt: now,
      }

      const newTodos = [...todos, newTodo]
      saveTodos(newTodos)
      return newTodo
    },
    [todos, saveTodos]
  )

  const toggleTodo = useCallback(
    (id: string) => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          const now = new Date().toISOString()
          return {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? now : undefined,
            updatedAt: now,
          }
        }
        return todo
      })
      saveTodos(newTodos)
    },
    [todos, saveTodos]
  )

  const deleteTodo = useCallback(
    (id: string) => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            deletedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        }
        return todo
      })
      saveTodos(newTodos)
    },
    [todos, saveTodos]
  )

  const clearCompleted = useCallback(() => {
    const completedTodos = todos.filter(t => t.completed)
    const newTodos = todos.filter(t => !t.completed)
    saveTodos(newTodos)
    return completedTodos
  }, [todos, saveTodos])

  const restoreCompleted = useCallback(
    (completedTodos: Todo[]) => {
      const newTodos = [...todos, ...completedTodos]
      saveTodos(newTodos)
    },
    [todos, saveTodos]
  )

  const resetAllTodos = useCallback(() => {
    saveTodos([])
  }, [saveTodos])

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    totalPoints: todos
      .filter(t => t.completed)
      .reduce((sum, t) => sum + t.points, 0),
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    restoreCompleted,
    resetAllTodos,
    stats,
  }
}





