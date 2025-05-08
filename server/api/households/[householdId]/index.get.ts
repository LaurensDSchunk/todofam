import { type HouseholdGetRouteInterface } from "~/types/api/household.types";
import { getTasks } from "~/server/utils/households/getTasks";
import { readParam } from "~/server/utils/readParam";

export default defineEventHandler(
  async (event): Promise<HouseholdGetRouteInterface["response"]> => {
    const id = readParam(event, "householdId");

    const supabase = event.context.supabase;

    const [
      { data: household, error: householdError },
      tasks,
      { data: houseMembers, error: houseMembersError },
    ] = await Promise.all([
      supabase.from("households").select().eq("id", id).single(),
      getTasks(event, id),
      supabaseAdmin.from("household_members").select().eq("household_id", id),
    ]);

    if (householdError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error getting household: " + householdError.message,
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

    return { household: { ...household, tasks: tasks, members: members } };
  },
);
