-- Households 
create table public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);


-- Join table to join users and households
create table public.household_members (
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  added_at timestamp with time zone default now(),
  primary key (household_id, user_id)
);


-- Table for the tasks in the household
create table public.household_tasks (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  title text not null,
  description text,
  is_completed boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.household_tasks enable row level security;

-- RLS policies for households
-- Members can read households they belong to
create policy "Members can read their households"
on public.households
for select
using (
  exists (
    select 1 from public.household_members
    where household_members.household_id = households.id
    and household_members.user_id = auth.uid()
  )
);

-- Only the owner can update the household
create policy "Owner can update household"
on public.households
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

-- Only the owner can delete the household
create policy "Owner can delete household"
on public.households
for delete
using (owner_id = auth.uid());



-- RLS policies for household_members
-- Members can read their household memberships
create policy "User can see their memberships"
on public.household_members
for select
using (user_id = auth.uid());

-- Members can insert themselves into a household (if allowed)
create policy "User can join household"
on public.household_members
for insert
with check (user_id = auth.uid());

-- Members can leave their own household
create policy "User can leave household"
on public.household_members
for delete
using (user_id = auth.uid());



-- RLS policies for household_tasks
create policy "Members can read household tasks"
on public.household_tasks
for select
using (
  exists (
    select 1 from public.household_members
    where household_members.household_id = household_tasks.household_id
    and household_members.user_id = auth.uid()
  )
);

create policy "Members can create tasks"
on public.household_tasks
for insert
with check (
  exists (
    select 1 from public.household_members
    where household_members.household_id = household_tasks.household_id
    and household_members.user_id = auth.uid()
  )
);

create policy "Members can update tasks"
on public.household_tasks
for update
using (
  exists (
    select 1 from public.household_members
    where household_members.household_id = household_tasks.household_id
    and household_members.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.household_members
    where household_members.household_id = household_tasks.household_id
    and household_members.user_id = auth.uid()
  )
);

create policy "Members can delete tasks"
on public.household_tasks
for delete
using (
  exists (
    select 1 from public.household_members
    where household_members.household_id = household_tasks.household_id
    and household_members.user_id = auth.uid()
  )
);

create function prevent_task_metadata_changes()
returns trigger as $$
begin
  if old.household_id is distinct from new.household_id
     or old.created_by is distinct from new.created_by
     or old.created_at is distinct from new.created_at then
    raise exception 'Cannot modify immutable task metadata';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger protect_task_metadata
before update on household_tasks
for each row execute procedure prevent_task_metadata_changes();


