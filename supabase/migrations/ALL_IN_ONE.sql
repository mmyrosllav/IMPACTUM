-- ═══════════════════════════════════════════════════════════════
--  IMPACTUM — ПОВНА МІГРАЦІЯ (запустити одним блоком)
--  Supabase Dashboard → SQL Editor → вставити все → Run
--  Безпечно запускати повторно (idempotent).
-- ═══════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────
-- 1. ENUM статусів замовлення
-- ───────────────────────────────────────────────────────────────
do $$ begin
  create type order_status as enum ('Pending', 'Active', 'Completed');
exception
  when duplicate_object then null;
end $$;

-- ───────────────────────────────────────────────────────────────
-- 2. Таблиця orders: статус-enum, телефон, побажання
-- ───────────────────────────────────────────────────────────────
alter table if exists public.orders alter column status drop default;

alter table if exists public.orders
  alter column status type order_status using status::order_status;

alter table if exists public.orders alter column status set default 'Pending';

alter table if exists public.orders
  add column if not exists phone text,
  add column if not exists note  text;

-- service_name не може бути порожнім
do $$ begin
  alter table public.orders
    add constraint orders_service_name_not_blank
    check (length(trim(service_name)) > 0);
exception
  when duplicate_object then null;
end $$;

-- ───────────────────────────────────────────────────────────────
-- 3. RLS для orders — кожен бачить лише свої замовлення
-- ───────────────────────────────────────────────────────────────
alter table public.orders enable row level security;

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

drop policy if exists "orders_delete_own" on public.orders;
create policy "orders_delete_own" on public.orders
  for delete using (auth.uid() = user_id);

-- Дозволяємо доповнювати власні замовлення (телефон, побажання) з кабінету
drop policy if exists "orders_update_own" on public.orders;
create policy "orders_update_own" on public.orders
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────
-- 4. Відповіді анкети підбору грантів
-- ───────────────────────────────────────────────────────────────
create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null,
  answers     jsonb not null,
  created_at  timestamptz not null default now()
);

alter table public.survey_responses enable row level security;

drop policy if exists "survey_insert_any" on public.survey_responses;
create policy "survey_insert_any" on public.survey_responses
  for insert with check (user_id is null or auth.uid() = user_id);

drop policy if exists "survey_select_own" on public.survey_responses;
create policy "survey_select_own" on public.survey_responses
  for select using (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────
-- 5. Контакт-заявки (форма "Запит")
-- ───────────────────────────────────────────────────────────────
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  message     text,
  created_at  timestamptz not null default now()
);

alter table public.contacts enable row level security;

-- Будь-хто (зокрема гість) може залишити заявку
drop policy if exists "contacts_insert_any" on public.contacts;
create policy "contacts_insert_any" on public.contacts
  for insert with check (true);

-- ───────────────────────────────────────────────────────────────
-- 6. Треди форуму (News)
-- ───────────────────────────────────────────────────────────────
create table if not exists public.threads (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete cascade,
  author      text not null,
  title       text not null check (length(trim(title)) > 0),
  content     text not null check (length(trim(content)) > 0),
  tags        text[] not null default '{community}',
  likes       int not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.threads enable row level security;

drop policy if exists "threads_select_all" on public.threads;
create policy "threads_select_all" on public.threads
  for select using (true);

drop policy if exists "threads_insert_own" on public.threads;
create policy "threads_insert_own" on public.threads
  for insert with check (auth.uid() = user_id);

drop policy if exists "threads_delete_own" on public.threads;
create policy "threads_delete_own" on public.threads
  for delete using (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────
-- 7. Індекси
-- ───────────────────────────────────────────────────────────────
create index if not exists orders_user_id_idx          on public.orders (user_id);
create index if not exists survey_responses_user_id_idx on public.survey_responses (user_id);
create index if not exists threads_created_at_idx       on public.threads (created_at desc);

-- ✅ Готово
