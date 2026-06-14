import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../supabase/server";

export type AppRole = "owner" | "mechanic" | "garage" | "seller" | "admin";

export type Profile = {
  id: string;
  role: AppRole;
  full_name: string | null;
  phone: string | null;
  locale: string;
};

export const getAuthSession = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
});

export const getProfile = cache(async () => {
  const session = await getAuthSession();
  if (!session?.user?.id) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name, phone, locale")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error) return null;
  return (data as Profile | null) ?? null;
});

export async function requireProfile() {
  const profile = await getProfile();
  if (!profile) redirect("/auth/login");
  return profile;
}

export async function requireRole(roles: AppRole[]) {
  const profile = await requireProfile();
  if (!roles.includes(profile.role)) redirect("/dashboard");
  return profile;
}
