-- ═══════════════════════════════════════════════════════════════
-- Impactum: схема + захист
-- Запуск: Supabase Dashboard → SQL Editor, або `supabase db push`
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Enum статусів замовлення ────────────────────────────────
-- Клієнт більше не зможе вставити довільний рядок у status
do $$ begin
  create type order_status as enum ('Pending', 'Active', 'Completed');
exception
  when duplicate_object then null;
end $$;

-- Конвертуємо колонку (якщо таблиця orders вже існує з text-колонкою)
alter table if exists public.orders
  alter column status drop default;

alter table if exists public.orders
  alter column status type order_status using status::order_status;

alter table if exists public.orders
  alter column status set default 'Pending';

-- service_name не може бути порожнім
alter table if exists public.orders
  add constraint orders_service_name_not_blank
  check (length(trim(service_name)) > 0);

-- ─── 2. RLS для orders ──────────────────────────────────────────
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

-- Update дозволяємо лише власнику, і лише не-статусних полів немає —
-- статус міняє менеджер через service_role (адмінка/SQL)
drop policy if exists "orders_update_own" on public.orders;

-- ─── 3. Відповіді анкети підбору грантів ────────────────────────
create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null,
  answers     jsonb not null,
  created_at  timestamptz not null default now()
);

alter table public.survey_responses enable row level security;

-- Анкету може заповнити і гість (user_id = null), і авторизований
drop policy if exists "survey_insert_any" on public.survey_responses;
create policy "survey_insert_any" on public.survey_responses
  for insert with check (user_id is null or auth.uid() = user_id);

-- Читати свої відповіді може лише власник (менеджер — через service_role)
drop policy if exists "survey_select_own" on public.survey_responses;
create policy "survey_select_own" on public.survey_responses
  for select using (auth.uid() = user_id);

-- ─── 4. Треди форуму (News) ─────────────────────────────────────
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

-- Читати може будь-хто (публічний форум)
drop policy if exists "threads_select_all" on public.threads;
create policy "threads_select_all" on public.threads
  for select using (true);

-- Створювати — лише авторизовані, від свого імені
drop policy if exists "threads_insert_own" on public.threads;
create policy "threads_insert_own" on public.threads
  for insert with check (auth.uid() = user_id);

-- Видаляти — лише свої
drop policy if exists "threads_delete_own" on public.threads;
create policy "threads_delete_own" on public.threads
  for delete using (auth.uid() = user_id);

-- ─── 5. Індекси ─────────────────────────────────────────────────
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists survey_responses_user_id_idx on public.survey_responses (user_id);
create index if not exists threads_created_at_idx on public.threads (created_at desc);
