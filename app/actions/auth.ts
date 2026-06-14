"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createSupabaseServerClient } from "../lib/supabase/server";
import { createSupabaseAdminClient } from "../lib/supabase/admin";

const AppRoleSchema = z.enum(["owner", "mechanic", "garage", "seller"]);

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().trim().min(2).max(80).optional(),
  phone: z.string().trim().min(6).max(30).optional(),
  role: AppRoleSchema.default("owner"),
  locale: z.string().trim().min(2).max(10).default("en"),
});

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function roleHome(role: string | null | undefined) {
  if (role === "admin") return "/admin";
  if (role === "mechanic") return "/mechanic";
  if (role === "garage") return "/garage";
  if (role === "seller") return "/seller";
  return "/dashboard";
}

export type AuthActionState = {
  ok: boolean;
  message?: string;
};

export async function signIn(_prev: AuthActionState, formData: FormData) {
  const parsed = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Invalid credentials." };
  }

  const supabase = await createSupabaseServerClient({ mutableCookies: true });
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { ok: false, message: error.message };
  }

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  if (!userId) {
    return { ok: false, message: "Unable to load session." };
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  redirect(roleHome(profileData?.role));
}

export async function signUp(_prev: AuthActionState, formData: FormData) {
  const parsed = SignUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName") || undefined,
    phone: formData.get("phone") || undefined,
    role: formData.get("role") || undefined,
    locale: formData.get("locale") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, message: "Invalid signup data." };
  }

  const supabase = await createSupabaseServerClient({ mutableCookies: true });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (await headers()).get("origin") ?? undefined;
  const nextPath = roleHome(parsed.data.role);

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        role: parsed.data.role,
        full_name: parsed.data.fullName ?? null,
        phone: parsed.data.phone ?? null,
        locale: parsed.data.locale,
      },
      ...(siteUrl ? { emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}` } : {}),
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const userId = data.user?.id;
  if (userId && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createSupabaseAdminClient();
    await admin
      .from("profiles")
      .upsert({
        id: userId,
        role: parsed.data.role,
        full_name: parsed.data.fullName ?? null,
        phone: parsed.data.phone ?? null,
        locale: parsed.data.locale,
      })
      .select("id")
      .maybeSingle();
  }

  if (data.session) {
    redirect(nextPath);
  }

  redirect("/auth/login?check_email=1");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient({ mutableCookies: true });
  await supabase.auth.signOut();
  redirect("/");
}
