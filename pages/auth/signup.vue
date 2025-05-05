<script setup lang="ts">
import { sanitizeName } from "~/utils/sanitization/name";

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const passwordRepeat = ref<string>("");
const token = ref<string>("");

const state = ref<"sign-up" | "verify">("sign-up");
const disabled = ref<boolean>(false);

async function signUp() {
  if (password.value != passwordRepeat.value) {
    alert("Passwords do not match");
    return;
  }

  disabled.value = true;

  const success = await useAuth().signUp(
    email.value,
    password.value,
    sanitizeName(name.value),
  );

  if (success) {
    state.value = "verify";
  }
  disabled.value = false;
}

async function verify() {
  disabled.value = true;
  const success = await useAuth().verifyOtp(email.value, token.value, "signup");

  if (success) {
    useRouter().push("/");
  }
  disabled.value = false;
}
</script>

<template>
  <div id="sign-un-page-container">
    <div id="sign-up-container" v-if="state == 'sign-up'">
      <form @submit.prevent="signUp()" autocomplete="on">
        <h1>Sign Up</h1>

        <label for="name-input">Name: </label>
        <input
          type="text"
          name="name"
          id="name-input"
          v-model="name"
          autocomplete="name"
          required
        />

        <label for="email-input">Email:</label>
        <input
          id="email-input"
          name="email"
          type="email"
          autocomplete="email"
          v-model="email"
          required
        />

        <label for="password-input">Password:</label>
        <input
          id="password-input"
          name="new-password"
          type="password"
          autocomplete="new-password"
          v-model="password"
          required
        />

        <label for="password-repeat-input">Re-Type Password:</label>
        <input
          id="password-repeat-input"
          name="new-password-repeat"
          type="password"
          autocomplete="new-password"
          v-model="passwordRepeat"
          required
        />

        <button :disabled="disabled" type="submit">Sign Up</button>
      </form>
    </div>

    <div id="verify-container" v-else>
      <form @submit.prevent="verify()">
        <h1>Welcome, {{ name }}!</h1>
        <p>A code has been sent to {{ email }}. Enter the code below:</p>

        <label for="token-input">Code:</label>
        <input
          type="text"
          id="token-input"
          v-model="token"
          inputmode="numeric"
          autocomplete="one-time-code"
        />

        <button :disabled="disabled">Confirm</button>
      </form>
    </div>
  </div>
</template>
