export async function deleteHousehold(id: string) {
  try {
    const res = await $fetch(`/api/households/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return { success: true, data: res };
  } catch (e: any) {
    const errorMessage = e?.data?.message || e?.message || "Unknown error";
    console.error("List Households Error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
