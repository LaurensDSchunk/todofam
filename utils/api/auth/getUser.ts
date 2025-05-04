export async function getUser() {
  try {
    const res = await $fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (e) {
    console.error(e);
  }
}
