<script setup lang="ts">
const open = defineModel();
</script>

<template>
  <div>
    <div class="fixed w-full h-full" @click="open = false"></div>
    <div
      v-if="open"
      class="card fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
