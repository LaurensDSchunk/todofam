<script setup lang="ts">
const open = defineModel();
</script>

<template>
  <div>
    <div
      v-if="open"
      class="fixed left-0 top-0 w-[100vw] h-[100dvh]"
      @click="open = false"
    ></div>
    <div
      v-if="open"
      class="card fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
