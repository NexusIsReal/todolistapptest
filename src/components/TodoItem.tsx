import React, { useState } from 'react';

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

  const handleEdit = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`} style={{ display: 'flex', alignItems: 'center', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        style={{ marginRight: '15px', width: '20px', height: '20px', accentColor: '#4f46e5' }}
      />
      
      {isEditing ? (
        <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ flex: 1 }}
            autoFocus
          />
          <button onClick={handleEdit} className="save-button" style={{ padding: '8px 16px', color: 'white', border: 'none', borderRadius: '6px' }}>Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-button" style={{ padding: '8px 16px', color: 'white', border: 'none', borderRadius: '6px' }}>Cancel</button>
        </div>
      ) : (
        <>
          <span style={{ 
            flex: 1, 
            textDecoration: completed ? 'line-through' : 'none',
            fontSize: '1.1rem',
            color: completed ? '#6b7280' : '#1f2937',
            fontWeight: completed ? 'normal' : '500'
          }}>
            {text}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
              style={{ padding: '8px 16px', color: 'white', border: 'none', borderRadius: '6px' }}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(id)} 
              className="delete-button"
              style={{ padding: '8px 16px', color: 'white', border: 'none', borderRadius: '6px' }}
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