drop policy "Enable insert for authenticated users only" on public.households;

CREATE POLICY "Users can create their own households"
ON households
FOR INSERT
to authenticated
with check ( (select auth.uid()) = owner_id );
