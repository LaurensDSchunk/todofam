<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div>
    <Navbar />
    <NuxtRouteAnnouncer />

    <NuxtLayout class="min-h-[calc(100dvh-72px)]">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
