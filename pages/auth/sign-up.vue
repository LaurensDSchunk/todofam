<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const disabled = ref<boolean>(false);

async function signUp() {
  disabled.value = true;

  const { success } = await useAuth().signUp(
    email.value,
    password.value,
    name.value,
  );

  if (success) {
    useRouter().push(`/auth/verify?email=${email.value}`);
  }

  disabled.value = false;
}
</script>

<template>
  <form
    @submit.prevent="signUp"
    class="flex flex-col justify-center items-center gap-3 max-w-2xs py-3 px-2"
  >
    <h1 class="text-center text-xl font-bold">Sign Up</h1>

    <Input
      label="Name"
      type="text"
      required
      v-model="name"
      :disabled="disabled"
    />
    <Input
      label="Email"
      type="email"
      required
      v-model="email"
      :disabled="disabled"
    />
    <Input
      label="Password"
      type="password"
      required
      v-model="password"
      :disabled="disabled"
    />

    <button
      type="submit"
      class="btn btn-primary mt-3 w-full"
      :disabled="disabled"
    >
      Sign Up
    </button>
    <p class="text-sm">
      Already have an account?
      <NuxtLink to="/auth/sign-in" class="link">Sign In</NuxtLink>
    </p>
  </form>
</template>
