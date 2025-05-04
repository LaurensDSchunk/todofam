export async function signOut() {
  try {
    const res = await $fetch("/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });
  } catch (e) {
    console.error(e);
  }
}
