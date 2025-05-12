<script setup lang="ts">
const name = ref<string>("");

const { householdCreateDialogOpen: open } = useHouseholds();
const disabled = ref<boolean>(false);

async function createHousehold() {
  disabled.value = true;

  const { success } = await useHouseholds().createHousehold(name.value);

  if (success) {
    open.value = false;
  }

  disabled.value = false;
}
</script>

<template>
  <Dialog v-model="open" class="flex flex-col gap-3">
    <h1 class="text-lg font-bold">Create a Household</h1>
    <Input
      type="text"
      v-model="name"
      label="Household Name"
      :disabled="disabled"
    />

    <div class="flex flex-row gap-3 w-full">
      <button class="btn btn-outline" @click="open = false">Cancel</button>
      <button
        class="btn btn-primary"
        :disabled="disabled"
        @click="createHousehold"
      >
        Create
      </button>
    </div>
  </Dialog>
</template>
