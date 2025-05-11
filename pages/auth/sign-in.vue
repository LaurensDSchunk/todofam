<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

const email = ref<string>("");
const password = ref<string>("");
const disabled = ref<boolean>(false);

async function signIn() {
  disabled.value = true;
  const { success } = await useAuth().signIn(email.value, password.value);
  if (success) {
    useRouter().push("/");
  }

  disabled.value = false;
}
</script>

<template>
  <form
    @submit.prevent="signIn"
    class="flex flex-col justify-center items-center gap-3 max-w-2xs py-3 px-2"
  >
    <h1 class="text-center text-xl font-bold">Sign In</h1>
    <Input
      label="Email"
      v-model="email"
      type="email"
      required
      :disabled="disabled"
    />
    <Input
      label="Password"
      v-model="password"
      type="password"
      :disabled="disabled"
      required
    />

    <button
      class="btn btn-primary mt-3 w-full"
      type="submit"
      :disabled="disabled"
    >
      Sign In
    </button>
    <p class="text-sm">
      Don't have an account?
      <NuxtLink to="/auth/sign-up" class="link">Sign Up</NuxtLink>
    </p>
  </form>
</template>
