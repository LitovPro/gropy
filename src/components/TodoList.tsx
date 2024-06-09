import React from 'react';
import styled from 'styled-components';
import { Todo } from '../App';
import { keyframes } from 'styled-components';
interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  resetTodo: (id: number) => void;
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  position: relative;

  &.completed span {
    text-decoration: line-through;
    color: #d9d9d9;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background-color: #ffcc00;
  }
`;



const pointsAnimation = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50px); opacity: 0; }
`;

const Points = styled.span`
  margin-left: auto;
  margin-right: 10px;
  color: #ffcc00;
  animation: ${pointsAnimation} 1s forwards;
`;


const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, resetTodo }) => {
  return (
    <List>
      {todos.map(todo => (
        <ListItem key={todo.id} className={todo.completed ? 'completed' : ''}>
          <Checkbox
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <Points>⚡ {todo.points}</Points>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;