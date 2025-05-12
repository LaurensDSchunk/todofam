<script setup lang="ts">
const route = useRoute();
const { household } = useHouseholds();

onMounted(() => {
  // Validate householdId
  const householdId = useRoute().params.householdId;
  if (householdId) {
    useHouseholds().getHousehold(householdId as string);
  }
});
</script>

<template></template>
