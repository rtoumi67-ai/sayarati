create extension if not exists pgcrypto;

create table if not exists public.assistant_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mode text not null check (mode in ('customer', 'mechanic')),
  title text not null,
  preview text,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.assistant_conversations enable row level security;

grant select, insert, update on public.assistant_conversations to authenticated;

drop policy if exists assistant_conversations_select_own on public.assistant_conversations;
create policy assistant_conversations_select_own
on public.assistant_conversations
for select
using (auth.uid() = user_id);

drop policy if exists assistant_conversations_insert_own on public.assistant_conversations;
create policy assistant_conversations_insert_own
on public.assistant_conversations
for insert
with check (auth.uid() = user_id);

drop policy if exists assistant_conversations_update_own on public.assistant_conversations;
create policy assistant_conversations_update_own
on public.assistant_conversations
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.set_assistant_conversation_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_assistant_conversation_updated_at on public.assistant_conversations;
create trigger set_assistant_conversation_updated_at
before update on public.assistant_conversations
for each row
execute function public.set_assistant_conversation_updated_at();
