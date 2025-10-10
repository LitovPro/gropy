import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Todo } from '../types'
import { tokens } from '../design/tokens'

const ListContainer = styled.div`
  padding: 16px;
`

const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`

const TodoItem = styled(motion.div)<{ $energy: 'easy' | 'medium' | 'energetic' }>`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.card};
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
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

const Checkbox = styled.button<{ $completed: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ $completed, theme }) => 
    $completed ? theme.color.effort.easy : theme.color.border};
  border-radius: 6px;
  background: ${({ $completed, theme }) => 
    $completed ? theme.color.effort.easy : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.color.effort.easy};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const CheckIcon = styled.div`
  width: 12px;
  height: 12px;
  color: white;
  font-size: 12px;
  line-height: 1;
`

const TodoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const TodoText = styled.span<{ $completed: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ $completed, theme }) => 
    $completed ? theme.color.textMuted : theme.color.text};
  line-height: 1.4;
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
`

const TodoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
`

const CategoryTag = styled.span`
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.textMuted};
  padding: 2px 8px;
  border-radius: ${tokens.radius.chip};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const PointsBadge = styled.div<{ $energy: 'easy' | 'medium' | 'energetic' }>`
  background: ${({ $energy, theme }) => theme.color.effort[$energy]};
  color: white;
  padding: 2px 8px;
  border-radius: ${tokens.radius.chip};
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 2px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${({ theme }) => theme.color.textMuted};
`

const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
`

const EmptyText = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
`

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TodoListComponent: React.FC<TodoListProps> = ({
  todos,
  onToggle,
}) => {
  const pendingTodos = todos.filter(todo => !todo.completed)

  if (pendingTodos.length === 0) {
    return (
      <ListContainer>
        <ListTitle>Мои задачи</ListTitle>
        <EmptyState>
          <EmptyTitle>Пока нет задач</EmptyTitle>
          <EmptyText>Добавьте первую задачу выше</EmptyText>
        </EmptyState>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      <ListTitle>Мои задачи</ListTitle>
      <AnimatePresence>
        {pendingTodos.map((todo, index) => (
          <TodoItem
            key={`${todo.id}-${index}`}
            $energy={todo.energy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Checkbox
              $completed={todo.completed}
              onClick={() => onToggle(todo.id)}
              aria-label={todo.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
            >
              {todo.completed && (
                <CheckIcon>✓</CheckIcon>
              )}
            </Checkbox>
            
            <TodoContent>
              <TodoText $completed={todo.completed}>
                {todo.text}
              </TodoText>
              <TodoMeta>
                <CategoryTag>{todo.category}</CategoryTag>
                <PointsBadge $energy={todo.energy}>
                  ⚡ {todo.points}
                </PointsBadge>
              </TodoMeta>
            </TodoContent>
          </TodoItem>
        ))}
      </AnimatePresence>
    </ListContainer>
  )
}

export const TodoList = React.memo(TodoListComponent)
