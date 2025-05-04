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
  } catch (e) {
    console.error(e);
  }
}
