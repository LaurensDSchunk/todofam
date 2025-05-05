<script setup lang="ts">
import { createHousehold } from "~/utils/api/households/createHousehold";
import { listHouseholds } from "~/utils/api/households/listHouseholds";

const houses = ref();

async function createHouse() {
  const { data: newhouse } = await createHousehold("goon house");
  console.log(newhouse);

  const { data } = await listHouseholds();
  houses.value = data;
}
</script>

<template>
  <h1>To-Do Fam</h1>
  <p>A household task manager.</p>

  <RouterLink to="/auth/signup">Sign Up</RouterLink>
  <RouterLink to="/auth/signin">Sign In</RouterLink>

  {{ houses }}

  <button @click="createHouse()">CREATE</button>
</template>
