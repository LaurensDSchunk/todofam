<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

import { z } from "zod";

const token = ref<string>("");
const email = ref<string>("");
const disabled = ref<boolean>(false);

async function verify() {
  if (!z.string().length(6).safeParse(token.value).success) {
    alert("Invalid Code");
    return;
  }

  const { success } = await useAuth().verifyOtp(
    email.value,
    token.value,
    "signup",
  );

  if (success) {
    useRouter().push("/");
  }
}

async function resend() {
  useAuth().resendOtp(email.value, "signup");
}

onMounted(() => {
  email.value = useRoute().query.email as string;

  if (!email.value || !z.string().email().safeParse(email.value).success) {
    useRouter().replace("/");
  }
});
</script>

<template>
  <form
    @submit.prevent="verify"
    class="flex flex-col justify-center items-center gap-3 max-w-3xs py-3 px-2"
  >
    <h1 class="text-center text-xl font-bold">Verify Email</h1>

    <p class="text-center text-md max-w-[215px]">
      A code has been sent to {{ email }}
    </p>

    <Input
      label="Code"
      type="one-time-passcode"
      v-model="token"
      required
      :disabled="disabled"
    />

    <button
      type="submit"
      class="btn btn-primary mt-3 w-full"
      :disabled="disabled"
    >
      Verify
    </button>
  </form>
  <p class="text-sm text-center">
    Don't see the code?
    <button type="button" class="link" @click="resend">Resend It.</button>
  </p>
</template>
