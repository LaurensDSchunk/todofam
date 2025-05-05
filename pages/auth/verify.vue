<script setup lang="ts">
const route = useRoute();

const email = ref<string>("");
const token = ref<string>("");

const disabled = ref<boolean>(false);

async function verify() {
  disabled.value = true;
  const success = await useAuth().verifyOtp(email.value, token.value, "signup");

  if (success) {
    useRouter().push("/");
  }
  disabled.value = false;
}

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email as string;
  } else {
    useRouter().replace("/auth/signup");
  }
});
</script>

<template>
  <div class="verify-page-container">
    <form @submit.prevent="verify">
      <h1>Verify Your Account</h1>

      <p>A verification code has been sent to {{ email }}.</p>

      <label for="token-input">Code:</label>
      <input
        type="text"
        id="token-input"
        v-model="token"
        inputmode="numeric"
        autocomplete="one-time-code"
      />

      <button type="submit" :disabled="disabled">Verify</button>
    </form>
  </div>
</template>
