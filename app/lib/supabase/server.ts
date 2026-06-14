import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieOptions = Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2];
type CreateSupabaseServerClientOptions = {
  mutableCookies?: boolean;
};

export async function createSupabaseServerClient(
  options: CreateSupabaseServerClientOptions = {},
) {
  const cookieStore = await cookies();
  const mutableCookies = options.mutableCookies ?? false;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase env is missing");
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        if (!mutableCookies) {
          return;
        }

        for (const c of cookiesToSet) {
          cookieStore.set(c.name, c.value, c.options as CookieOptions);
        }
      },
    },
  });
}
