create index users_email_idx on users (email);
create index invites_creator_id_idx on invites (creator_id);
create index invites_recipient_email_idx on invites (recipient_email);
create index invites_household_id_idx on invites (household_id);

