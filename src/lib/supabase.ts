import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Only create client if env vars are present
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitEarlyAccess(email: string, source: string = 'landing') {
  if (!supabase) {
    // Dev mode — no Supabase configured yet. Simulate success.
    await new Promise(r => setTimeout(r, 900));
    return { success: true, duplicate: false };
  }

  const { error } = await supabase
    .from('early_access')
    .insert({ email: email.toLowerCase().trim(), source });

  if (error) {
    // 23505 = unique_violation (duplicate email) — treat as success
    if (error.code === '23505') return { success: true, duplicate: true };
    throw error;
  }

  return { success: true, duplicate: false };
}

// ── Page visit tracking ──

export async function trackVisit() {
  if (!supabase) return;
  try {
    await supabase.from('page_visits').insert({});
  } catch {
    // silent — never block the page for analytics
  }
}

export async function getVisitCount(): Promise<number> {
  if (!supabase) return 0;

  try {
    const { count } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true });
    return count ?? 0;
  } catch {
    return 2400;
  }
}
