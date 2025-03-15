import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { fetchTodos, addTodo as apiAddTodo, deleteTodo as apiDeleteTodo, toggleTodo as apiToggleTodo, updateTodo as apiUpdateTodo, Todo } from '../services/api';
import { supabase } from '../lib/supabase';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount and set up real-time subscription
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('Failed to load todos. Please try again later.');
        console.error('Error loading todos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();

    // Set up real-time subscription
    const subscription = supabase
      .channel('todos-channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'todos' 
      }, (payload) => {
        console.log('Change received!', payload);
        loadTodos(); // Reload todos when changes occur
      })
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addTodo = async () => {
    if (inputText.trim() !== '') {
      try {
        const newTodo = await apiAddTodo(inputText);
        setTodos([...todos, newTodo]);
        setInputText('');
      } catch (err) {
        setError('Failed to add todo. Please try again.');
        console.error('Error adding todo:', err);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await apiDeleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const updatedTodo = await apiToggleTodo(id);
      setTodos(
        todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const editTodo = async (id: number, newText: string) => {
    try {
      const updatedTodo = await apiUpdateTodo(id, newText);
      setTodos(
        todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error editing todo:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee2e2', 
          color: '#b91c1c', 
          borderRadius: '6px',
          marginBottom: '15px'
        }}>
          {error}
        </div>
      )}
      
      <div className="add-task-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={addTodo}
          className="add-button"
        >
          Add Task
        </button>
      </div>

      <div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading todos...
          </div>
        ) : todos.length === 0 ? (
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
          <div>
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