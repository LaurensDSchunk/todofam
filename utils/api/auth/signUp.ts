export async function signUp(email: string, password: string, name: string) {
  try {
    const res = await $fetch("/api/auth/sign-up", {
      method: "POST",
      body: {
        email: email,
        password: password,
        name: name,
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
