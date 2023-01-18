import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL || '';
const supabaseApi: string = process.env.SUPABASE_API || '';

const SupabaseAdmin = createClient(supabaseUrl, supabaseApi);

export { SupabaseAdmin };
