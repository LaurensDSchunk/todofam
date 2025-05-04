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

    return res;
  } catch (e) {
    console.error(e);
  }
}
