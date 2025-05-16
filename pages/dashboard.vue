<script setup lang="ts">
const { household, households } = useHouseholds();
const { householdCreateDialogOpen } = useDialogs();

const creatingTask = ref<boolean>(false);

async function reorderTask(id: string, up: boolean) {
  if (!household.value) return;

  const currentIndex = household.value.tasks.findIndex((t) => t.id == id);

  if (currentIndex == -1) return;
  if (up && currentIndex == 0) return;
  if (!up && currentIndex == household.value.tasks.length - 1) return;

  const targetIndex = currentIndex + (up ? -1 : 1);
  console.log(targetIndex);
  const task = household.value.tasks[currentIndex];

  const { success } = await useTasks().orderTask(id, targetIndex);
  await useHouseholds().getHousehold(household.value.id);

  if (!success) {
    // Revert change
  }
}
</script>

<template>
  <div class="flex flex-col page max-w-lg w-full mx-auto">
    <!-- Skeleton display for loading -->
    <div v-if="households === undefined"></div>

    <!-- Display for if user has no households -->
    <div
      v-else
      v-if="households.length == 0"
      class="flex flex-col items-center justify-center page gap-3"
    >
      <h2>You Don't Have Any Households</h2>
      <button class="btn btn-primary" @click="householdCreateDialogOpen = true">
        Create One
      </button>
    </div>

    <!-- Normal display -->
    <div v-if="household" class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold my-2">{{ household.name }}</h1>

      <TodoItem
        v-for="task of household.tasks"
        :title="task.title"
        :description="task.description || undefined"
        :id="task.id"
        v-model:completed="task.isCompleted"
        @moveup="reorderTask(task.id, true)"
        @movedown="reorderTask(task.id, false)"
      />

      <!-- New task element -->
      <TodoItem
        v-if="creatingTask"
        title=""
        description=""
        ref="newItem"
        @deleteme="creatingTask = false"
      />

      <button class="btn btn-primary w-full" @click="creatingTask = true">
        New Task
      </button>
    </div>
  </div>
</template>
