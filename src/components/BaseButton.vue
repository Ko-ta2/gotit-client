<template>
  <button :class="variant"><slot></slot></button>
</template>

<script lang="ts" setup>
import { toRefs, withDefaults } from "vue";

interface Props {
  variant?: "primary" | "outlined" | "accent";
}
const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const { variant } = toRefs(props);
</script>

<style scoped>
@tailwind base;
@tailwind utilities;
@layer utilities {
  .primary {
    min-width: 104px;
    @apply bg-emerald-300 p-2 rounded align-middle;
    @apply hover:bg-emerald-400;
    @apply focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2;
  }
  .outlined {
    @apply border border-gray-300 p-2 rounded  align-middle;
    @apply hover:bg-gray-50;
    @apply focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2;
  }
  .accent {
    @apply bg-red-300 p-2 rounded  align-middle;
    @apply hover:bg-red-400;
    @apply focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2;
  }
}
</style>
