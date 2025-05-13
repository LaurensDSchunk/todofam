<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { user } = useAuth();
const { households, household } = useHouseholds();
const { householdCreateDialogOpen, householdSwitchDialogOpen } = useDialogs();

const householdId = ref<string>();

watch(householdId, (value) => {
  if (!value) return;
  if (!user.value) return;
  if (!householdId.value) return;

  useHouseholds().getHousehold(householdId.value);
});

watch(households, (value) => {
  if (!value) return;
  if (!user.value) return;
  if (householdId.value) return;
  if (!households.value || households.value.length == 0) return;

  householdId.value = households.value[0].id;
});
</script>

<template>
  <div
    class="bg-card text-card-foreground shadow-md m-2 rounded-lg border border-secondary p-2 flex flex-row justify-between items-center px-3"
  >
    <NuxtLink class="text-xl font-bold text-primary" to="/">To-Do Fam</NuxtLink>
    <!-- Navbar for unauth users -->
    <ul class="flex flex-row gap-3 items-center" v-if="!user">
      <li>
        <NuxtLink to="/auth/sign-in" class="btn btn-outline">Sign In</NuxtLink>
      </li>
      <li class="hidden sm:block">
        <NuxtLink to="/auth/sign-up" class="btn btn-primary">Sign Up</NuxtLink>
      </li>
    </ul>

    <!-- Navbar for auth users -->
    <ul v-else class="flex flex-row gap-3 items-center">
      <button
        v-if="household != null"
        @click="householdSwitchDialogOpen = true"
        class="flex flex-row gap-0.5 items-center p-1 pl-2 rounded transition-colors hover:bg-muted"
      >
        {{ household.name }}
        <Icon icon="lucide:chevrons-up-down" />
      </button>

      <button
        v-else
        class="btn btn-primary"
        @click="householdCreateDialogOpen = true"
      >
        Create
      </button>

      <!-- Avatar -->
      <div
        class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium select-none cursor-pointer"
      >
        <button @click="useAuth().signOut()">{{ user.name[0] }}</button>
      </div>
    </ul>
  </div>
</template>
