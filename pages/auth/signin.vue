<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");

const disabled = ref<boolean>(false);

async function signIn() {
  disabled.value = true;
  const success = await useAuth().signIn(email.value, password.value);

  if (success) {
    useRouter().push("/");
  }
  disabled.value = false;
}
</script>

<template>
  <div id="sign-in-page-container">
    <form @submit.prevent="signIn" autocomplete="on">
      <h1>Sign In</h1>

      <label for="email-input">Email:</label>
      <input
        type="email"
        id="email-input"
        name="email"
        v-model="email"
        autocomplete="email"
        required
      />

      <label for="password-input">Password:</label>
      <input
        type="password"
        id="password-input"
        name="current-password"
        v-model="password"
        autocomplete="current-password"
        required
      />

      <button type="submit" :disabled="disabled">Sign In</button>
    </form>
  </div>
</template>
