export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once real Supabase credentials are configured; until then the site runs on local demo data. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
