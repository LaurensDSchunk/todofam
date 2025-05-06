<script setup lang="ts">
import { createHousehold } from "~/utils/api/households/createHousehold";
import { deleteHousehold } from "~/utils/api/households/deleteHousehold";
import { getHousehold } from "~/utils/api/households/getHousehold";
import { listHouseholds } from "~/utils/api/households/listHouseholds";

const houses = ref();
const house = ref();

async function createHouse() {
  const { data: newhouse } = await createHousehold("goon house");
  console.log(newhouse);

  const { data } = await listHouseholds();
  houses.value = data;
}

async function getHouses() {
  const { data } = await listHouseholds();
  if (!data) return;

  const { data: houseRet } = await getHousehold(data[0].id);

  console.log(houseRet);

  house.value = houseRet;
}

async function deleteHouse() {
  const { success } = await deleteHousehold(house.value.id);
}
</script>

<template>
  <h1>To-Do Fam</h1>
  <p>A household task manager.</p>

  <RouterLink to="/auth/signup">Sign Up</RouterLink>
  <RouterLink to="/auth/signin">Sign In</RouterLink>

  {{ houses }}

  <button @click="createHouse()">CREATE</button>

  {{ house }}
  <button @click="getHouses()">Get House</button>
  <button @click="deleteHouse()">del</button>
</template>
