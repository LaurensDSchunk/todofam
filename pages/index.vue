<template>
  <section
    class="min-h-[calc(100vh-65px)] flex items-center justify-center bg-gray-50 px-4"
  >
    <div class="max-w-2xl text-center space-y-6">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900">
        Welcome to <span class="text-blue-600">To-Do Fam</span>
      </h1>
      <p class="text-lg text-gray-600">
        Organize your household tasks effortlessly. Share to-do lists, assign
        responsibilities, and keep your family in sync.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          to="/auth/sign-up"
          class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Get Started
        </NuxtLink>
        <NuxtLink
          to="/auth/sign-in"
          class="inline-block px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
        >
          Sign In
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
