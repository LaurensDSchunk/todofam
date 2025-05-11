<template>
  <div class="space-y-1">
    <label :for="id" class="label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      class="input mb-0"
      :class="{ '!border-destructive': error }"
      :id="id"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      v-model="modelValue"
      :required="required"
      :disabled="disabled"
    />
    <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
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
  error: {
    type: String,
    required: false,
  },
});

const modelValue = defineModel();
</script>
