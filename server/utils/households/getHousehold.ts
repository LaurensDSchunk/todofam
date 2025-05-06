import { H3Event } from "h3";
import { supabaseAdmin } from "../supabase/supabaseAdmin";

export async function getHousehold(event: H3Event, id: string) {
  const supabase = event.context.supabase;

  const [
    { data: household, error: householdError },
    { data: tasks, error: tasksError },
    { data: houseMembers, error: houseMembersError },
  ] = await Promise.all([
    supabase.from("households").select().eq("id", id).single(),
    supabase.from("household_tasks").select().eq("household_id", id),
    supabaseAdmin.from("household_members").select().eq("household_id", id),
  ]);

  if (householdError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error getting household: " + householdError.message,
    });
  }

  if (tasksError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error getting tasks: " + tasksError.message,
    });
  }

  if (houseMembersError) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Error getting house members: " + houseMembersError.message,
    });
  }

  const { data: members, error: membersError } = await supabase
    .from("users")
    .select("name, id")
    .in(
      "id",
      houseMembers.map((m) => m.user_id),
    );

  if (membersError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error getting member data: " + membersError.message,
    });
  }

  return { ...household, tasks: tasks, members: members };
}
