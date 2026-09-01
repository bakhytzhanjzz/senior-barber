import { redirect } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signIn } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
    if (user) redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo className="text-3xl" />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold text-ivory">
          Панель персонала
        </h1>

        {!isSupabaseConfigured ? (
          <div className="mt-8 rounded-2xl border border-steel/25 bg-steel/5 p-6 text-sm leading-relaxed text-ivory/70">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-steel">Supabase не подключён</p>
            <p className="mt-3">
              Выполните <code className="text-steel">supabase/schema.sql</code> в SQL Editor вашего проекта Supabase,
              затем добавьте <code className="text-steel">NEXT_PUBLIC_SUPABASE_URL</code> и{" "}
              <code className="text-steel">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> в <code className="text-steel">.env.local</code>.
            </p>
          </div>
        ) : (
          <form action={signIn} className="mt-8 space-y-4">
            {error && (
              <p className="rounded-xl border border-oxblood-bright/40 bg-oxblood/10 px-4 py-3 text-sm text-oxblood-bright">
                Неверный email или пароль
              </p>
            )}
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-ivory/50">Email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/15 bg-ink-raised px-4 py-3 text-ivory outline-none focus:border-steel"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-ivory/50">Пароль</span>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-white/15 bg-ink-raised px-4 py-3 text-ivory outline-none focus:border-steel"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-steel px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.02] hover:bg-steel-bright"
            >
              Войти
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
