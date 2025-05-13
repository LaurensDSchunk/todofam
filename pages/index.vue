<template>
  <div class="flex flex-col justify-center items-center gap-5 page">
    <div>
      <h1 class="text-5xl font-black text-primary text-center">To-Do Fam</h1>
      <p class="text-center text-lg">A Household Task Manager</p>
    </div>
    <div class="flex flex-row gap-3">
      <NuxtLink class="btn btn-outline btn-link" to="/auth/sign-in"
        >Sign In</NuxtLink
      >
      <NuxtLink class="btn btn-primary btn-link" to="/auth/sign-up"
        >Sign Up</NuxtLink
      >
    </div>
  </div>
</template>
