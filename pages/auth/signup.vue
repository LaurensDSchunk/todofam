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
  disabled.value = true;
  await useAuth().signUp(email.value, password.value, sanitizeName(name.value));
  disabled.value = false;

  state.value = "verify";
}

async function verify() {
  disabled.value = true;
  await useAuth().verifyOtp(email.value, token.value, "signup");
  disabled.value = false;
}
</script>

<template>
  <div id="sign-un-page-container">
    <div id="sign-up-container" v-if="state == 'sign-up'">
      <form>
        <h1>Sign Up</h1>

        <label for="name-input">Name: </label>
        <input type="text" id="name-input" v-model="name" />

        <label for="email-input">Email: </label>
        <input type="email" id="email-input" v-model="email" />

        <label for="password-input">Password: </label>
        <input type="password" id="password-input" v-model="password" />

        <label for="password-repeat-input">Re-Type Password: </label>
        <input
          type="password"
          id="password-repeat-input"
          v-model="passwordRepeat"
        />

        <button @click="signUp()" :disabled="disabled">Sign Up</button>
      </form>
    </div>

    <div id="verify-container" v-else>
      <form>
        <h1>Welcome, {{ name }}!</h1>
        <p>A code has been sent to {{ email }}. Enter the code below:</p>

        <label for="token-input">Code: </label>
        <input type="number" id="token-input" v-model="token" />

        <button @click="verify()" :disabled="disabled">Confirm</button>
      </form>
    </div>
  </div>
</template>
