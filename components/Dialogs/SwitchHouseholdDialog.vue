<script setup lang="ts">
const { householdSwitchDialogOpen: open, householdCreateDialogOpen } =
  useDialogs();
const { households, household } = useHouseholds();

async function switchHousehold(id: string) {
  if (household.value && id != household.value.id)
    await useHouseholds().getHousehold(id);
  open.value = false;
}
</script>

<template>
  <Dialog v-model="open" class="flex flex-col gap-3">
    <h1 class="text-lg font-bold">Switch Household</h1>
    <button
      v-for="household of households"
      @click="switchHousehold(household.id)"
      class="btn btn-muted"
    >
      <p class="">
        {{ household.name }}
      </p>
    </button>
    <button
      class="btn btn-primary"
      @click="
        householdCreateDialogOpen = true;
        open = false;
      "
    >
      Create Household
    </button>
  </Dialog>
</template>
