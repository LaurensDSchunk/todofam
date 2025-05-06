<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div>
    <Navbar />
    <NuxtRouteAnnouncer />
    <main class="h-[calc(100vh-65px)]">
      <NuxtPage />
    </main>
  </div>
</template>
