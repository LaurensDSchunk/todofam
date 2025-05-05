export async function verifyOtp(email: string, token: string, type: string) {
  try {
    const res = await $fetch("/api/auth/verify", {
      method: "POST",
      body: {
        email: email,
        token: token,
        type: type,
      },
      credentials: "include",
    });

    return { success: true };
  } catch (e: any) {
    const errorMessage = e?.data?.message || e?.message || "Unknown error";
    console.error("Sign-up error:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
