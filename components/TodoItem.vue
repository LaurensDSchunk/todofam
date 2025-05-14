<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
});

const isCompleted = defineModel<boolean>("completed");
const isHovered = ref<boolean>(false);

const internalTitle = ref<string>(props.title);
const internalDescription = ref<string>(props.description || "");

const isEditingTitle = ref<boolean>(false);
const isEditingDescription = ref<boolean>(false);
const descriptionEditor = ref<HTMLElement | null>(null);

watch(
  () => props.title,
  (value) => {
    internalTitle.value = value;
  },
);

watch(
  () => props.description,
  (value) => {
    if (!value) return;
    internalDescription.value = value;
  },
);

async function changeCompletion() {
  if (!props.id) return;
  const value = !isCompleted.value;
  isCompleted.value = value;

  useTasks().updateTask(props.id, { isCompleted: value });
}

function leaveTitle() {
  // Timeout is so the user can click on the description box
  setTimeout(async () => {
    isEditingTitle.value = false;

    setTimeout(updateItem, 50);
  }, 20);
}

function leaveDescription() {
  if (!descriptionEditor.value) return;

  let text: string = descriptionEditor.value.innerText.trim();

  internalDescription.value = text;
  setTimeout(updateItem, 50);
}

async function updateItem() {
  if (isEditingDescription.value || isEditingTitle.value) return;

  if (props.id) {
    const update = {
      ...(internalDescription.value != props.description && {
        description: internalDescription.value,
      }),
      ...(internalTitle.value != props.title && {
        title: internalTitle.value,
      }),
    };

    useTasks().updateTask(props.id, update);
  }
}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center border border-secondary rounded-lg p-2"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex flex-row gap-3 items-center">
      <button @click="changeCompletion()" class="cursor-pointer">
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
        <input
          type="text"
          class="font-medium"
          v-model="internalTitle"
          @focus="isEditingTitle = true"
          @blur="leaveTitle()"
        />
        <div class="relative">
          <p
            v-if="
              internalDescription.length != 0 ||
              isEditingTitle ||
              isEditingDescription
            "
            class="text-sm break-words"
            :class="{
              'h-5 overflow-y-hidden': !isEditingDescription,
              'whitespace-pre-wrap': isEditingDescription,
            }"
            ref="descriptionEditor"
            contenteditable
            @focus="isEditingDescription = true"
            @blur="
              leaveDescription();
              isEditingDescription = false;
            "
          >
            {{ internalDescription }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <Icon
        icon="lucide:trash"
        v-if="isHovered"
        class="text-secondary cursor-pointer"
        @click="if (id) useTasks().deleteTask(id);"
      />
    </div>
  </div>
</template>
