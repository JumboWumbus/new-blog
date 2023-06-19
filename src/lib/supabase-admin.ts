import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseApi = process.env.SUPABASE_SERVICE || "";

const SupabaseAdmin = createClient(supabaseUrl, supabaseApi);

export { SupabaseAdmin };
