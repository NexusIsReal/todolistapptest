import React, { useState } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      
      <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1 }}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          onClick={addTodo}
          className="add-button"
        >
          Add Task
        </button>
      </div>

      <div>
        {todos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            padding: '2rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '2px dashed #e2e8f0'
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your to-do list is empty</p>
            <p>Add a new task to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
                onEdit={editTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList; 