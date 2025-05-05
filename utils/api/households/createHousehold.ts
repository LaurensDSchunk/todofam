export async function createHousehold(name: string) {
  try {
    const res = await $fetch("/api/households", {
      method: "POST",
      body: {
        name: name,
      },
      credentials: "include",
    });

    return { success: true, data: res };
  } catch (e: any) {
    const errorMessage = e?.data?.message || e?.message || "Unknown error";
    console.error("Create Household Error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
