<script setup lang="ts"></script>

<template>
  <div
    class="bg-card text-card-foreground shadow-md m-2 rounded-lg border border-secondary p-2 flex flex-row justify-between items-center px-3"
  >
    <NuxtLink class="text-xl font-bold text-primary" to="/">To-Do Fam</NuxtLink>
    <ul class="flex flex-row gap-3">
      <li>
        <NuxtLink to="/auth/sign-in" class="btn btn-outline">Sign In</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/auth/sign-up" class="btn btn-primary">Sign Up</NuxtLink>
      </li>
    </ul>
  </div>
</template>
