<script setup lang="ts">
import { sanitizeName } from "~/utils/sanitization/name";

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const passwordRepeat = ref<string>("");

const disabled = ref<boolean>(false);

const router = useRouter();
const auth = useAuth();

async function signUp() {
  if (password.value != passwordRepeat.value) {
    alert("Passwords do not match");
    return;
  }

  disabled.value = true;

  const success = await auth.signUp(
    email.value,
    password.value,
    sanitizeName(name.value),
  );

  if (success) {
    router.replace(`/auth/verify?email=${email.value}`);
  }
  disabled.value = false;
}
</script>

<template>
  <div class="h-full flex items-center justify-center bg-gray-100">
    <div
      class="w-full max-w-sm bg-white p-8 rounded-lg shadow-md m-4 space-y-4"
    >
      <form @submit.prevent="signUp()" autocomplete="on" class="space-y-6">
        <h1 class="text-2xl font-semibold text-center">Sign Up</h1>

        <Input
          id="name"
          name="name"
          label="Name"
          v-model="name"
          autocomplete="name"
          required
        />

        <Input
          id="email"
          name="username"
          type="email"
          label="Email"
          v-model="email"
          autocomplete="email"
          required
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          v-model="password"
          autocomplete="new-password"
          required
        />

        <Input
          id="passwordRepeat"
          name="passwordRepeat"
          type="password"
          label="Re-Type Password"
          v-model="passwordRepeat"
          autocomplete="new-password"
          required
        />

        <Button :disabled="disabled" type="submit" class="w-full">
          Sign Up
        </Button>
      </form>
      <p class="text-sm text-center">
        Already have an account?
        <RouterLink class="text-blue-600" to="/auth/sign-in"
          >Sign In</RouterLink
        >
      </p>
    </div>
  </div>
</template>
