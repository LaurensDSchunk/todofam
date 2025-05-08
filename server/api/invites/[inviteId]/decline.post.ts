import { ApiSuccessResponse } from "~/types/api/api.types";

export default defineEventHandler(
  async (event): Promise<ApiSuccessResponse> => {
    const inviteId = event.context.params?.inviteId;
    const supabase = event.context.supabase;

    const userId = await getUserId(event);

    if (!inviteId) {
      throw createError({
        statusCode: 400,
        message: "No invite id defined",
      });
    }

    const { error } = await supabase
      .from("invites")
      .update({ status: "declined" })
      .eq("id", inviteId)
      .eq("recipient_id", userId);

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return { success: true };
  },
);
