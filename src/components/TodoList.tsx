import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  showClearCompleted?: boolean;
  onClearCompleted?: () => void;
}

const ListContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  transition: all 0.3s ease;
  
  @media (max-width: 767px) {
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ListItem = styled.li<{ completed: boolean; energy: 'low' | 'medium' | 'high' }>`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  background: ${({ theme, completed }) => 
    completed ? theme.colors.success + '10' : 'transparent'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideIn} 0.3s ease-out;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}08;
    transform: translateX(2px);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  ${({ energy, theme }) => {
    const colors = {
      low: theme.colors.success,
      medium: theme.colors.warning, 
      high: theme.colors.secondary
    };
    return `
      border-left: 4px solid ${colors[energy]};
    `;
  }}
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-left-width: 3px;
    
    &:hover {
      transform: none;
      background: ${({ theme }) => theme.colors.primary}05;
    }
  }
`;

const CheckboxContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  
  &:checked {
    background: ${({ theme }) => theme.gradients.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1);
  }
  
  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const TodoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TodoText = styled.span<{ completed: boolean }>`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme, completed }) => 
    completed ? theme.colors.textSecondary : theme.colors.text
  };
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  transition: all 0.3s ease;
`;

const TodoMeta = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

const CategoryBadge = styled.span<{ category: string }>`
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const EnergyBadge = styled.span<{ energy: 'low' | 'medium' | 'high' }>`
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  
  ${({ energy, theme }) => {
    const styles = {
      low: `background: ${theme.colors.success}15; color: ${theme.colors.success};`,
      medium: `background: ${theme.colors.warning}15; color: ${theme.colors.warning};`,
      high: `background: ${theme.colors.secondary}15; color: ${theme.colors.secondary};`
    };
    return styles[energy];
  }}
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.1rem 0.4rem;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PointsBadge = styled.span<{ completed: boolean }>`
  padding: 0.375rem 0.75rem;
  background: ${({ theme, completed }) => 
    completed ? theme.colors.success : theme.gradients.secondary
  };
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error}15;
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    font-size: 1rem;
  }
`;

const ClearButton = styled.button`
  margin: 1rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.warning};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error};
    transform: translateY(-1px);
  }
`;

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  showClearCompleted, 
  onClearCompleted 
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 200);
  };

  if (todos.length === 0) {
    const completedSection = showClearCompleted;
    return (
      <ListContainer>
        <EmptyState>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {completedSection ? '🌟' : '🌸'}
          </div>
          <div>
            {completedSection 
              ? 'Отлично! Все дела выполнены ✨' 
              : 'Пока здесь пусто. Добавь первое дело! 😊'
            }
          </div>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <List>
        {todos.map(todo => (
          <ListItem 
            key={todo.id} 
            completed={todo.completed}
            energy={todo.energy}
            style={{ 
              opacity: deletingId === todo.id ? 0 : 1,
              transform: deletingId === todo.id ? 'translateX(-100%)' : 'translateX(0)'
            }}
          >
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
            </CheckboxContainer>
            
            <TodoContent>
              <TodoText completed={todo.completed}>
                {todo.text}
              </TodoText>
              <TodoMeta>
                <CategoryBadge category={todo.category}>
                  {todo.category === 'selfcare' ? 'забота о себе' : 
                   todo.category === 'daily' ? 'каждый день' :
                   todo.category === 'health' ? 'здоровье' :
                   todo.category === 'learning' ? 'изучение' :
                   todo.category}
                </CategoryBadge>
                <EnergyBadge energy={todo.energy}>
                  {todo.energy === 'low' ? 'легко' : 
                   todo.energy === 'medium' ? 'средне' : 'энергично'}
                </EnergyBadge>
              </TodoMeta>
            </TodoContent>
            
            <ActionsContainer>
              <PointsBadge completed={todo.completed}>
                ⚡ {todo.points}
              </PointsBadge>
              <ActionButton 
                onClick={() => handleDelete(todo.id)}
                title="Удалить задачу"
              >
                🗑️
              </ActionButton>
            </ActionsContainer>
          </ListItem>
        ))}
      </List>
      
      {showClearCompleted && onClearCompleted && (
        <ClearButton onClick={onClearCompleted}>
          🧹 Очистить выполненные
        </ClearButton>
      )}
    </ListContainer>
  );
};

export default TodoList;