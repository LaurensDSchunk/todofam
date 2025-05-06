<script setup lang="ts">
import { listHouseholds } from "~/utils/api/households/listHouseholds";

const households = ref();
const isOpen = ref<boolean>(false);

onMounted(async () => {
  households.value = (await listHouseholds()).data;
});
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger as="button" class="btn btn-primary"
      >Create Household</DialogTrigger
    >
    <DialogPortal>
      <DialogContent class="fixed inset-0 flex items-center justify-center p-4">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <DialogTitle class="text-xl font-semibold mb-4"
            >Create a New Household</DialogTitle
          >
          <DialogDescription class="mb-4"
            >Fill in the details below to create a new
            household.</DialogDescription
          >
          <form @submit.prevent="">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Household Name</label
              >
              <input
                id="name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="flex justify-end space-x-8">
              <DialogClose as="button" type="button" class="btn btn-secondary"
                >Cancel</DialogClose
              >
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
  <h1 class="mt-1">Dashboard</h1>

  {{ households }}

  <button v-if="households && households.length === 0">
    Create a Household
  </button>
</template>
