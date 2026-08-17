-- Senior Barbershop — Supabase schema
-- Run once in Supabase Dashboard → SQL Editor → New query → Run.

create extension if not exists "pgcrypto";

-- ---------- Tables ----------

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  district text not null,
  address text not null,
  whatsapp text,
  is_active boolean not null default true,
  sort_order int not null default 0
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name_ru text not null,
  name_kk text not null,
  duration_min int not null,
  price int not null,
  is_active boolean not null default true,
  sort_order int not null default 0
);

create table if not exists barbers (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete cascade,
  full_name text not null,
  role text,
  is_active boolean not null default true
);

create table if not exists working_hours (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete cascade,
  weekday int not null check (weekday between 0 and 6), -- 0 = Monday
  opens_at time not null,
  closes_at time not null
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id),
  service_id uuid not null references services(id),
  barber_id uuid references barbers(id),
  customer_name text not null,
  customer_phone text not null,
  note text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  locale text not null default 'ru',
  created_at timestamptz not null default now()
);

create index if not exists bookings_location_time_idx on bookings (location_id, starts_at);
create index if not exists bookings_barber_time_idx on bookings (barber_id, starts_at);

-- Staff accounts: one row per Supabase Auth user who can see the admin panel.
-- location_id = null means access to every location (owner).
create table if not exists staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  location_id uuid references locations(id),
  full_name text
);

-- ---------- Row Level Security ----------

alter table locations enable row level security;
alter table services enable row level security;
alter table barbers enable row level security;
alter table working_hours enable row level security;
alter table bookings enable row level security;
alter table staff enable row level security;

-- Public (anon) can read the catalog so the website can render it.
create policy "public read locations" on locations for select using (true);
create policy "public read services" on services for select using (true);
create policy "public read barbers" on barbers for select using (true);
create policy "public read working_hours" on working_hours for select using (true);

-- Anyone can create a booking (the public booking form). No public read/update/delete.
create policy "public create bookings" on bookings for insert with check (true);

-- Staff can see their own row (to resolve their location access).
create policy "staff read self" on staff for select using (auth.uid() = user_id);

-- Staff can read/update bookings for their assigned location (or all, if location_id is null).
create policy "staff read bookings" on bookings for select using (
  exists (
    select 1 from staff
    where staff.user_id = auth.uid()
      and (staff.location_id is null or staff.location_id = bookings.location_id)
  )
);

create policy "staff update bookings" on bookings for update using (
  exists (
    select 1 from staff
    where staff.user_id = auth.uid()
      and (staff.location_id is null or staff.location_id = bookings.location_id)
  )
);

-- ---------- Seed data ----------

insert into locations (slug, district, address, whatsapp, sort_order) values
  ('mangilik-el', 'Астана', 'Мәңгілік Ел, 51/2', '77759090996', 1)
on conflict (slug) do nothing;

insert into working_hours (location_id, weekday, opens_at, closes_at)
select l.id, d.weekday, '10:00', '20:00'
from locations l
cross join (select generate_series(0, 6) as weekday) d
on conflict do nothing;

insert into services (name_ru, name_kk, duration_min, price, sort_order) values
  ('Мужская стрижка', 'Ерлер шаш алдыру', 40, 4000, 1),
  ('Детская стрижка', 'Балалар шаш алдыруы', 30, 2500, 2),
  ('Тонировка волос', 'Шашты тондау', 40, 3000, 3),
  ('Оформление бороды', 'Сақалды пішіндеу', 25, 2500, 4),
  ('Тонировка бороды', 'Сақалды тондау', 20, 2500, 5),
  ('Black Mask | Gold Mask', 'Black Mask | Gold Mask', 15, 1000, 6),
  ('Комбо стрижка от Senior', 'Senior-нан комбо стрижка', 75, 7000, 7)
on conflict do nothing;

-- To grant admin access after a staff member signs up in Supabase Auth:
-- insert into staff (user_id, location_id, full_name) values ('<auth-user-uuid>', null, 'Владелец');
