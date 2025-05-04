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

export async function verifyOTP(email: string, token: string, type: string) {
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
  } catch (e) {
    console.error(e);
  }
}
