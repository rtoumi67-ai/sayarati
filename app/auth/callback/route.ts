import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const nextParam = url.searchParams.get("next");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  const origin = url.origin;
  const safeNext =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : null;

  if (error || errorDescription) {
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(errorDescription ?? error ?? "auth")}`, origin),
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/auth/login?error=missing_supabase_env", origin));
  }

  const cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }> = [];

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookies) {
        for (const c of cookies) {
          cookiesToSet.push({ name: c.name, value: c.value, options: c.options });
        }
      },
    },
  });

  try {
    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent(exchangeError.message)}`, origin),
        );
      }
    } else if (tokenHash && type) {
      const { error: otpError } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as "signup" | "invite" | "magiclink" | "recovery" | "email_change",
      });
      if (otpError) {
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent(otpError.message)}`, origin),
        );
      }
    } else {
      return NextResponse.redirect(new URL("/auth/login?error=missing_token", origin));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth/login?error=callback_failed", origin));
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionRole = session?.user.user_metadata?.role;
  const fallbackPath =
    sessionRole === "mechanic" ? "/mechanic" : session ? "/customer/onboarding/car" : "/auth/login?confirmed=1";
  const redirectPath = session ? safeNext ?? fallbackPath : "/auth/login?confirmed=1";
  const response = NextResponse.redirect(new URL(redirectPath, origin));

  for (const c of cookiesToSet) {
    response.cookies.set(c.name, c.value, c.options);
  }

  return response;
}
