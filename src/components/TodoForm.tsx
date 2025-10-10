import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Category, Energy } from '../types'
import { tokens } from '../design/tokens'
import { validateTodoText } from '../utils/security'

const FormContainer = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${tokens.radius.card};
  margin: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
`

const FormTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TextInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.surface};
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.accent};
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const SelectGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${tokens.radius.button};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.surface};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.color.accent};
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`

const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  height: ${tokens.size.tap};
  border-radius: ${tokens.radius.button};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background: ${theme.color.accent};
        color: white;
        
        &:hover:not(:disabled) {
          opacity: 0.9;
        }
        
        &:active:not(:disabled) {
          transform: scale(0.98);
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `
      : `
        background: ${theme.color.surface};
        color: ${theme.color.textMuted};
        border: 1px solid ${theme.color.border};
        
        &:hover:not(:disabled) {
          background: ${theme.color.bg};
        }
        
        &:active:not(:disabled) {
          transform: scale(0.98);
        }
      `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`

const Counter = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.textMuted};
  text-align: right;
  margin-top: 4px;
`

const ErrorMessage = styled(motion.div)`
  font-size: 12px;
  font-weight: 500;
  color: #EF4444;
  margin-top: 4px;
`

interface TodoFormProps {
  onSubmit: (text: string, category: Category, energy: Energy) => void
  maxLength?: number
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  maxLength = 50,
}) => {
  const [text, setText] = useState('')
  const [category, setCategory] = useState<Category>('daily')
  const [energy, setEnergy] = useState<Energy>('easy')
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateTodoText(text)
    if (!validation.isValid) {
      setError(validation.error || 'Ошибка валидации')
      return
    }

    try {
      onSubmit(text, category, energy)
      setText('')
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при добавлении')
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    if (newText.length <= maxLength) {
      setText(newText)
      setError('')
    }
  }

  return (
    <FormContainer id="todo-section">
      <FormTitle>Добавить задачу</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <TextInput
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Например: стакан воды 😊"
            maxLength={maxLength}
            required
          />
          <Counter>
            {text.length}/{maxLength}
          </Counter>
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </ErrorMessage>
          )}
          
          <SelectGroup>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="daily">Повседневное</option>
              <option value="selfcare">Забота о себе</option>
              <option value="health">Здоровье</option>
              <option value="work">Работа</option>
              <option value="study">Учёба</option>
            </Select>
            
            <Select
              value={energy}
              onChange={(e) => setEnergy(e.target.value as Energy)}
            >
              <option value="easy">Легко</option>
              <option value="medium">Средне</option>
              <option value="energetic">Энергично</option>
            </Select>
          </SelectGroup>
        </InputGroup>
        
        <ButtonGroup>
          <Button type="submit" $variant="primary" disabled={!text.trim()}>
            Добавить
          </Button>
          <Button
            type="button"
            $variant="secondary"
            onClick={() => {
              setText('')
              setError('')
            }}
          >
            Очистить
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  )
}





