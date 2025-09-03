import React, { useState } from 'react';
import styled from 'styled-components';

interface TodoFormProps {
  addTodo: (text: string, category?: 'daily' | 'work' | 'personal' | 'health' | 'learning', priority?: 'low' | 'medium' | 'high') => void;
  maxTodos: number;
  currentCount: number;
}

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Counter = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.error}10;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border-left: 3px solid ${({ theme }) => theme.colors.error};
`;

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, maxTodos, currentCount }) => {
  const [text, setText] = useState<string>('');
  const [category, setCategory] = useState<'daily' | 'work' | 'personal' | 'health' | 'learning'>('personal');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!text.trim()) {
      setError('Введите текст задачи');
      return;
    }
    
    if (currentCount >= maxTodos) {
      setError(`Максимум ${maxTodos} задач`);
      return;
    }

    try {
      addTodo(text.trim(), category, priority);
      setText('');
      setCategory('personal');
      setPriority('medium');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при добавлении задачи');
    }
  };

  const isAtLimit = currentCount >= maxTodos;

  return (
    <FormContainer className="fade-in">
      <h2>➕ Добавить задачу</h2>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Что нужно сделать?"
            disabled={isAtLimit}
            maxLength={200}
          />
        </InputContainer>
        
        <ControlsRow>
          <Select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={isAtLimit}
          >
            <option value="daily">🌅 Ежедневные</option>
            <option value="work">💼 Работа</option>
            <option value="personal">🏠 Личное</option>
            <option value="health">💪 Здоровье</option>
            <option value="learning">📚 Обучение</option>
          </Select>
          
          <Select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            disabled={isAtLimit}
          >
            <option value="low">🟢 Низкий (1 очко)</option>
            <option value="medium">🟡 Средний (2 очка)</option>
            <option value="high">🔴 Высокий (3 очка)</option>
          </Select>
          
          <SubmitButton type="submit" disabled={isAtLimit || !text.trim()}>
            Добавить
          </SubmitButton>
        </ControlsRow>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Counter>
          {currentCount} / {maxTodos} задач
        </Counter>
      </Form>
    </FormContainer>
  );
};

export default TodoForm;