<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");

const disabled = ref<boolean>(false);

async function signIn() {
  disabled.value = true;
  const res = await useAuth().signIn(email.value, password.value);
  disabled.value = false;
}
</script>

<template>
  <div id="sign-in-page-container">
    <form>
      <h1>Sign In</h1>

      <label for="email-input">Email: </label>
      <input type="email" id="email-input" v-model="email" />

      <label for="password-input">Password: </label>
      <input type="password" id="password-input" v-model="password" />

      <button @click="signIn()" :disabled="disabled">Sign In</button>
    </form>
  </div>
</template>
