create extension if not exists pgcrypto;

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('oil', 'part')),
  make text,
  model text,
  year_from int,
  year_to int,
  km_from int,
  km_to int,
  title text not null,
  details text,
  url text,
  priority int default 0,
  created_at timestamptz default now()
);

alter table public.recommendations enable row level security;

drop policy if exists recommendations_select_all on public.recommendations;
create policy recommendations_select_all
on public.recommendations
for select
using (true);

