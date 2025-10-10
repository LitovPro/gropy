import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Todo } from '../types'
import { tokens } from '../design/tokens'
import { useToast } from './Toast/useToast'

const ListContainer = styled.div`
  padding: 16px;
`

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0;
  line-height: 1.4;
`

const ClearButton = styled.button`
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.textMuted};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.color.bg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const DoneItem = styled(motion.div)<{ $energy: 'easy' | 'medium' | 'energetic' }>`
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
  opacity: 0.7;

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

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.color.effort.easy};
  border-radius: 6px;
  background: ${({ theme }) => theme.color.effort.easy};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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

const TodoText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.4;
  text-decoration: line-through;
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

const CompletedDate = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
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

interface DoneListProps {
  todos: Todo[]
  onClearCompleted: () => void
}

const DoneListComponent: React.FC<DoneListProps> = ({
  todos,
  onClearCompleted,
}) => {
  const { showToast } = useToast()
  const completedTodos = todos.filter(todo => todo.completed)

  const handleClearCompleted = () => {
    onClearCompleted()
    
    showToast('Очищено. Вернуть?', {
      action: {
        label: 'Вернуть',
        onAction: () => {
          // This would need to be implemented in the parent component
          // to restore the cleared todos
        },
      },
    })
  }

  const formatCompletedDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Сегодня'
    if (diffDays === 1) return 'Вчера'
    return `${diffDays} дн. назад`
  }

  if (completedTodos.length === 0) {
    return (
      <ListContainer>
        <ListHeader>
          <ListTitle>Выполнено</ListTitle>
        </ListHeader>
        <EmptyState>
          <EmptyTitle>Пока ничего не выполнено</EmptyTitle>
          <EmptyText>Завершённые задачи появятся здесь</EmptyText>
        </EmptyState>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>Выполнено ({completedTodos.length})</ListTitle>
        <ClearButton onClick={handleClearCompleted}>
          Очистить завершённые
        </ClearButton>
      </ListHeader>
      
      <AnimatePresence>
        {completedTodos.map((todo, index) => (
          <DoneItem
            key={`${todo.id}-${index}`}
            $energy={todo.energy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Checkbox>
              <CheckIcon>✓</CheckIcon>
            </Checkbox>
            
            <TodoContent>
              <TodoText>{todo.text}</TodoText>
              <TodoMeta>
                <CategoryTag>{todo.category}</CategoryTag>
                <PointsBadge $energy={todo.energy}>
                  ⚡ {todo.points}
                </PointsBadge>
                {todo.completedAt && (
                  <CompletedDate>
                    {formatCompletedDate(todo.completedAt)}
                  </CompletedDate>
                )}
              </TodoMeta>
            </TodoContent>
          </DoneItem>
        ))}
      </AnimatePresence>
    </ListContainer>
  )
}

export const DoneList = React.memo(DoneListComponent)
