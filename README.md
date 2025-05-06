# To-Do Fam

A household to-do tracker

# REST API ( All routes are prefixed with /api )

**All errors are thrown, so use a try/catch when preforming requests**

## Auth Routes

POST /auth/sign-up
body: { name, email, password }
returns: { success: true }
Begins the sign-up process

POST /auth/verify
body: { email, token, type }
returns: { success: true }
Verifies an OTP. Type is signup for verifying a sign-up

POST /auth/sign-in
body: { email, password }
returns: { success: true }
Signs the user in

POST /auth/sign-out
returns { success: true }
Signs the user out

GET /auth/me
returns: { user: User }
Gets the user object.

## Household Routes

GET /households
returns: { households: HouseholdSummary[] }
Gets an array of the households the user belongs to

POST /households
body: { name }
returns: { success: true, household: HouseholdSummary }
Creates a household with a name. The user joins it automatically

GET /households/:householdId
returns: { household: Household }
Gets the household data

PATCH /households/:householdId
body: { name }
returns: { success: true }
Modifies the household

DELETE /housholds/:householdId
returns: { success: true }
Deletes a household

### Task Routes

POST /households/:householdId/tasks
body: { title, description? }
returns: { success: true }
Creates a new task

GET /households/:householdId/tasks
returns: { tasks: Task[] }
Gets the tasks in the household

PATCH /households/:householdId/tasks/:taskId
body: { title?, description?, isCompleted? }
returns: { success: true }
Updates a task

DELETE /households/:householdId/tasks/:taskId
returns: { success: true }
Deletes a task

## Invites Routes

GET /invites
returns: { invites }
Gets the user's pending invites

POST /invites
body: { houseId, recipientEmail?, recipientId? }
returns: { success: true, inviteId }
Creates an invite

POST /invites/:inviteId/accept
returns { success: true, householdId }
Accepts an invite and joins the household

POST /invites/:inviteId/decline
returns { success: true }
Declines an invite

DELETE /invites/:inviteId
returns { success: true }
Deletes a pending invite

# Developer notes:

## Generating Supabase Types

npx supabase gen types typescript --project-id "rileakeebkisjoccyqee" --schema public > types/database.types.ts

## Counting lines of code

cloc components composables pages server utils app.vue assets middleware plugins
