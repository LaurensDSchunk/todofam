<script setup lang="ts"></script>

<template>
  <div>
    <Navbar />
    <NuxtRouteAnnouncer />

    <NuxtLayout class="min-h-[calc(100dvh-72px)]">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
