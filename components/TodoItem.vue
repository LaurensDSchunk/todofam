<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { household } = useHouseholds();

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

    setTimeout(updateItem, 20);
  }, 20);
}

function leaveDescription() {
  if (!descriptionEditor.value) return;

  let text: string = descriptionEditor.value.innerText.trim();

  internalDescription.value = text;
  setTimeout(updateItem, 20);
}

async function updateItem() {
  if (isEditingDescription.value || isEditingTitle.value) return;

  if (props.id) {
    if (internalTitle.value.trim().length == 0) {
      internalTitle.value = props.title;
      return;
    }

    const update = {
      ...(internalDescription.value != props.description && {
        description: internalDescription.value,
      }),
      ...(internalTitle.value != props.title && {
        title: internalTitle.value,
      }),
    };

    useTasks().updateTask(props.id, update);
  } else {
    if (!household.value) return;
    // New task

    if (internalTitle.value.trim().length == 0) {
      return;
    }

    // Creates a dummy
    household.value.tasks.push({
      title: internalTitle.value,
      description: internalDescription.value,
      sortOrder: Infinity,
      id: "",
      isCompleted: false,
    });

    useTasks().createTask(
      household.value.id,
      internalTitle.value,
      internalDescription.value,
    );

    emit("created");
  }
}

const emit = defineEmits(["created"]);
</script>

<template>
  <div
    class="flex flex-row justify-between items-center border border-secondary rounded-lg p-2 w-full"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex flex-row gap-3 items-center w-full">
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
      <div class="flex flex-col gap-0 w-full">
        <input
          type="text"
          class="font-medium outline-none border border-transparent"
          :class="{
            'border-b-secondary':
              internalTitle.trim().length == 0 ||
              isEditingTitle ||
              isEditingDescription,
          }"
          v-model="internalTitle"
          @focus="isEditingTitle = true"
          @blur="leaveTitle()"
        />
        <div class="">
          <p
            v-if="
              internalDescription.length != 0 ||
              isEditingTitle ||
              isEditingDescription
            "
            class="text-sm wrap-anywhere outline-none border border-transparent"
            :class="{
              'h-5 overflow-y-hidden': !isEditingDescription,
              'whitespace-pre-wrap': isEditingDescription,
              'border-b-secondary':
                internalDescription.trim().length == 0 || isEditingDescription,
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
        class="text-secondary cursor-pointer ml-2"
        :class="{ 'text-transparent': !isHovered }"
        @click="if (id) useTasks().deleteTask(id);"
      />
    </div>
  </div>
</template>
