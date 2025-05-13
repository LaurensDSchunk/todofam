<script setup lang="ts"></script>

<template>
  <div>
    <Navbar />
    <NuxtRouteAnnouncer />

    <NuxtLayout class="page">
      <NuxtPage />
    </NuxtLayout>

    <DialogsCreateHouseholdDialog />
    <DialogsSwitchHouseholdDialog />
    <DialogsCreateTaskDialog />
  </div>
</template>
