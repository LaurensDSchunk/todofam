<script setup lang="ts">
const isOpen = ref(false);
const userName = ref();

const auth = useAuth();

const { user } = auth;

watch(user, async (value) => {
  userName.value = await useAuth().getUserName();
});

onMounted(async () => {
  userName.value = await useAuth().getUserName();
});

async function signOut() {
  await useAuth().signOut();
  useRouter().replace("/");
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo Section -->
        <div class="flex items-center">
          <RouterLink to="/" class="text-xl font-bold text-blue-600">
            To-Do Fam
          </RouterLink>
        </div>
        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8 items-center" v-if="!user">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-blue-600 font-semibold"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-blue-600 font-semibold"
          >
            About
          </RouterLink>
          <RouterLink
            to="/contact"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-blue-600 font-semibold"
          >
            Contact
          </RouterLink>
        </div>
        <div v-else class="md:flex space-x-8 items-center">
          <Button @click="signOut" variant="primary">{{ userName }}</Button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden" v-if="!user">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <svg
              v-if="!isOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <svg
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink
          to="/"
          class="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          active-class="text-blue-600 font-semibold"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          active-class="text-blue-600 font-semibold"
        >
          About
        </RouterLink>
        <RouterLink
          to="/contact"
          class="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          active-class="text-blue-600 font-semibold"
        >
          Contact
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
