import { supabase, Todo } from '../lib/supabase';

// Export the Todo interface for use in other components
export type { Todo };

// Fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Add a new todo
export const addTodo = async (text: string): Promise<Todo> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text, completed: false }])
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('Failed to add todo');
    
    return data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// Toggle todo completion status
export const toggleTodo = async (id: number): Promise<Todo> => {
  try {
    // First get the current status
    const { data: todo, error: fetchError } = await supabase
      .from('todos')
      .select('completed')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    if (!todo) throw new Error('Todo not found');
    
    // Toggle the status
    const { data, error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('Failed to toggle todo');
    
    return data;
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

// Update todo text
export const updateTodo = async (id: number, text: string): Promise<Todo> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .update({ text })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('Todo not found');
    
    return data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}; 