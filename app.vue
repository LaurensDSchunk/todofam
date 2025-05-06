<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <NuxtRouteAnnouncer />
      <main class="h-[calc(100vh-64px)]">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
