export async function signIn(email: string, password: string) {
  try {
    const res = await $fetch("/api/auth/sign-in", {
      method: "POST",
      body: {
        email: email,
        password: password,
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
