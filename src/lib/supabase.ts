import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the Todo type
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at?: string;
}

// Initialize the database by ensuring the todos table exists
export async function initializeDatabase() {
  // With Supabase, tables are created in the dashboard, not programmatically
  // This function is kept for API compatibility with the previous code
  console.log('Supabase is ready to use');
}

export default supabase; 