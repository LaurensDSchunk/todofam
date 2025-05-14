<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
  description: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
});

const isCompleted = defineModel<boolean>("completed");
const isHovered = ref<boolean>(false);

async function check() {
  if (!props.id) return;
  const value = !isCompleted.value;
  isCompleted.value = value;

  useTasks().updateTask(props.id, { isCompleted: value });
}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center border border-secondary rounded-lg p-2"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex flex-row gap-3 items-center">
      <button @click="check" class="cursor-pointer">
        <svg
          v-if="!isCompleted"
          class="text-secondary w-5.5 h-5.5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        <svg
          v-else
          class="text-secondary w-5.5 h-5.5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <!-- Outer circle -->
          <circle cx="12" cy="12" r="10" />
          <!-- Inner filled circle -->
          <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <div class="flex flex-col gap-0">
        <h1 class="font-medium">{{ title }}</h1>
        <p class="text-sm">{{ description }}</p>
      </div>
    </div>
    <div>
      <Icon
        icon="lucide:trash"
        v-if="isHovered"
        class="text-secondary cursor-pointer"
        @click="useTasks().deleteTask(id)"
      />
    </div>
  </div>
</template>
