<script setup lang="ts">
const { household, householdCreateDialogOpen } = useHouseholds();
</script>

<template>
  <div class="">
    <CreateHouseholdDialog />
    {{ household }}
  </div>
</template>
