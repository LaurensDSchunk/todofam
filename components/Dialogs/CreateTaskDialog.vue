<script setup lang="ts">
const { createTaskDialogOpen: open } = useDialogs();
const { household } = useHouseholds();

const title = ref<string>("");
const description = ref<string>("");

const disabled = ref<boolean>(false);

watch(open, () => {
  title.value = "";
  description.value = "";
});

async function createTask() {
  if (!household.value) {
    alert("Error loading household. Wait a moment and try again.");
    return;
  }

  disabled.value = true;

  const { success } = await useTasks().createTask(
    household.value.id,
    title.value,
    description.value.length == 0 ? undefined : description.value,
  );

  if (success) {
    open.value = false;
    useHouseholds().getHousehold(household.value.id);
  }

  disabled.value = false;
}
</script>

<template>
  <Dialog v-model="open" class="flex flex-col gap-3">
    <h1 class="text-xl font-bold">Create a Task</h1>
    <Input type="text" v-model="title" label="Title" :disabled="disabled" />
    <div>
      <label for="description" class="label">Description</label>
      <textarea
        name="description"
        :disabled="disabled"
        class="input resize-none h-20"
        v-model="description"
      />
    </div>
    <button class="btn btn-primary" @click="createTask">Create Task</button>
  </Dialog>
</template>
