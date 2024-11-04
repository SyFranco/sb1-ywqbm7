import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://oedzearspduhyqkryadx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZHplYXJzcGR1aHlxa3J5YWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0OTc0MzQsImV4cCI6MjA0NjA3MzQzNH0.SKYHmsAVd2JObWt9DnLxyStriuJpl_zBwFbCzKEWH8E';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);