drop policy "Users can create their own households" on public.households;

CREATE POLICY "Users can create their own households"
ON households
FOR INSERT
to authenticated
WITH CHECK (
  owner_id = (select auth.uid())
);
