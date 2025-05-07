export default defineEventHandler(async (event) => {
  const inviteId = event.context.params?.inviteId;
  const supabase = event.context.supabase;

  const userId = await getUserId(event);

  if (!inviteId) {
    throw createError({
      statusCode: 400,
      message: "No invite id defined",
    });
  }

  const { data: invite, error: inviteError } = await supabase
    .from("invites")
    .update({ status: "accepted" })
    .eq("id", inviteId)
    .eq("recipient_id", userId)
    .select()
    .single();

  if (inviteError) {
    throw createError({
      statusCode: 500,
      message: inviteError.message,
    });
  }

  supabaseAdmin.from("household_members").insert({
    household_id: invite.household_id,
    user_id: invite.recipient_id!,
  });

  return { success: true };
});
