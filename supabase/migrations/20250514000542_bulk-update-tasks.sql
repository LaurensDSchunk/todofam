create or replace function bulk_update_tasks(input_tasks jsonb)
returns void as $$
begin
  update tasks
  set
    sort_order = (elem->>'sort_order')::int
  from jsonb_array_elements(input_tasks) as elem
  where tasks.id = (elem->>'id')::uuid;
end;
$$ language plpgsql;
