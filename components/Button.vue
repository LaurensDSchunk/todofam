<template>
  <button
    v-bind="$attrs"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "tertiary", "outline", "gradient"].includes(
        value,
      ),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
    case "secondary":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300";
    case "tertiary":
      return "text-blue-600 hover:underline focus:ring-blue-500";
    case "outline":
      return "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300";
    case "gradient":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 focus:ring-pink-500";
    default:
      return "";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-5 py-3 text-lg";
    default:
      return "";
  }
});
</script>
