import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";

// Not parameterized with the hand-written Database type: postgrest-js's generics
// need a full generated schema (Relationships, Views, Functions) to resolve cleanly.
// Call sites type their own query results explicitly instead (see lib/supabase/types.ts).
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
