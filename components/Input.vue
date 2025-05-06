<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      v-model="modelValue"
      :required="required"
      :disabled="disabled"
      class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  label: String,
  autocomplete: String,
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel();
</script>
