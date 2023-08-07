import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL || '';
const supabaseApi: string = process.env.SUPABASE_API || '';

const isValidSupabaseUrl = supabaseUrl.trim().length > 0;
const isValidSupabaseApiKey = supabaseApi.trim().length > 0;

if (!isValidSupabaseUrl || !isValidSupabaseApiKey) {
  throw new Error('Please provide valid Supabase URL and API key.');
}

const SupabaseAdmin = createClient(supabaseUrl, supabaseApi);

export { SupabaseAdmin };