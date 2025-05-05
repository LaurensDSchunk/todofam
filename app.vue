<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div>
    <div id="navbar">
      <h1>To-Do Fam</h1>
      {{ user?.user_metadata.name }}
      <button @click="useAuth().signOut()" v-if="user != null">Sign Out</button>
    </div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
