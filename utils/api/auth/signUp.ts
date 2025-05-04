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
  } catch (e) {
    console.error(e);
  }
}
