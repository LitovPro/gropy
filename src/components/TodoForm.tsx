import React, { useState } from 'react';
import styled from 'styled-components';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
    </Form>
  );
};

export default TodoForm;