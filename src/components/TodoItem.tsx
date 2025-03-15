import React, { useState, useEffect } from 'react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  // Update editText when text prop changes
  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <div className="action-buttons">
            <button onClick={handleEdit} className="save-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-item-content">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggle(id)}
              style={{ width: '20px', height: '20px', accentColor: '#4f46e5', flexShrink: 0 }}
            />
            <span className="todo-text" style={{ 
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? '#6b7280' : '#1f2937',
              fontWeight: completed ? 'normal' : '500'
            }}>
              {text}
            </span>
          </div>
          <div className="action-buttons">
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(id)} 
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem; 