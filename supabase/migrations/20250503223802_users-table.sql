create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now()
);


-- Enable RLS
alter table public.users enable row level security;

-- SELECT: Users can read their own profile
create policy "User can read own name"
  on users
  for select
  using (auth.uid() = id);

-- UPDATE: Users can update their own name
create policy "User can update own name"
  on users
  for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and name is not null
  );



-- Adding user data to user table on sign up
create function public.handle_new_user()
returns trigger as $$
declare
  user_name text;
begin
  -- Extract the name from user_metadata JSON
  user_name := new.raw_user_meta_data ->> 'name';

  -- Fallback if name wasn't provided
  if user_name is null or user_name = '' then
    raise exception 'Name is required in user_metadata';
  end if;

  insert into public.users (id, name)
  values (new.id, user_name);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
