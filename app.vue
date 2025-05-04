<script setup lang="ts">
import { getUser, signIn, signOut, signUp, verifyOTP } from "./utils/auth";

const email = ref<string>("");
const name = ref<string>("");
const password = ref<string>("");
const token = ref<string>("");

const user = ref();

async function updateuser() {
  user.value = await getUser();
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <p>{{ user }}</p>

    <div class="auth">
      <input type="email" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <input type="text" placeholder="name" v-model="name" />
      <button @click="signUp(email, password, name)">Sign Up</button>
      <button @click="signIn(email, password)">Sign In</button>

      <input type="number" placeholder="Code" v-model="token" />
      <button @click="verifyOTP(email, token, 'signup')">Verify</button>

      <button @click="updateuser()">get user</button>

      <button @click="signOut()">Sign Out</button>
    </div>
  </div>
</template>
