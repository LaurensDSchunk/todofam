export async function getHousehold(id: string) {
  try {
    const res = await $fetch(`/api/households/${id}`, {
      method: "GET",
      credentials: "include",
    });

    return { success: true, data: res };
  } catch (e: any) {
    const errorMessage = e?.data?.message || e?.message || "Unknown error";
    console.error("Get Household Error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
