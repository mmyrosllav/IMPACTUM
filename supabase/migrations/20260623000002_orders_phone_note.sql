-- ═══════════════════════════════════════════════════════════════
-- Розширення замовлень: телефон для зв'язку + побажання клієнта
-- Запуск: Supabase Dashboard → SQL Editor, або `supabase db push`
-- ═══════════════════════════════════════════════════════════════

alter table if exists public.orders
  add column if not exists phone text,
  add column if not exists note  text;
