<script setup lang="ts">
const { household, households } = useHouseholds();
const { householdCreateDialogOpen, createTaskDialogOpen } = useDialogs();
</script>

<template>
  <div class="w-full flex flex-col page max-w-lg mx-auto">
    <!-- Display for if user has no households -->
    <div
      v-if="!households || households.length == 0"
      class="flex flex-col items-center justify-center page gap-3"
    >
      <h2>You Don't Have Any Households</h2>
      <button class="btn btn-primary" @click="householdCreateDialogOpen = true">
        Create One
      </button>
    </div>

    <!-- Normal display -->
    <div v-if="household" class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold m-2">{{ household.name }}</h1>

      <TodoItem
        v-for="task of household.tasks"
        :title="task.title"
        :description="task.description || undefined"
        :id="task.id"
        v-model:completed="task.isCompleted"
      />
      <button
        class="btn btn-primary w-full"
        @click="createTaskDialogOpen = true"
      >
        New Task
      </button>
    </div>
  </div>
</template>
