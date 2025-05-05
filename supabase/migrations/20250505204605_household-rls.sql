CREATE POLICY "Users can create their own households"
ON households
FOR INSERT
WITH CHECK (
  owner_id = auth.uid()
);
