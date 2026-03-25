import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

/**
 * Public Supabase client (uses anon key, respects RLS)
 * Use for read-only operations from the client side
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service Supabase client (uses service key, bypasses RLS)
 * Use ONLY in API routes (server-side) for write operations
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
