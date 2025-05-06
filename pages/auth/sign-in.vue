<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth"; // Adjust the import path as needed

const email = ref<string>("");
const password = ref<string>("");

const disabled = ref<boolean>(false);
const router = useRouter();
const auth = useAuth();

async function signIn() {
  disabled.value = true;
  const success = await auth.signIn(email.value, password.value);

  if (success) {
    router.push("/");
  }
  disabled.value = false;
}
</script>

<template>
  <div class="h-full flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow-md m-4">
      <form @submit.prevent="signIn" autocomplete="on" class="space-y-6">
        <h1 class="text-2xl font-semibold text-center">Sign In</h1>

        <div>
          <label
            for="email-input"
            class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email-input"
            name="email"
            v-model="email"
            autocomplete="email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            for="password-input"
            class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password-input"
            name="current-password"
            v-model="password"
            autocomplete="current-password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Button type="submit" :disabled="disabled" class="w-full">
          Sign In
        </Button>

        <p class="text-sm text-center">
          Don't have an account?
          <RouterLink class="text-blue-600" to="/auth/sign-up"
            >Sign Up</RouterLink
          >
        </p>
      </form>
    </div>
  </div>
</template>
