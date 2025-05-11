<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div>
    <Navbar />
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
