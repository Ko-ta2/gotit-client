<template>
  <div class="loading-wrapper" v-if="isLoading">
    <div class="loading"></div>
    <span>読み込み中...</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
</script>

<style scoped>
.loading-wrapper {
  @apply absolute inset-0 flex flex-col space-y-2 items-center justify-center;
  @apply bg-gray-50 bg-opacity-60;
}

.loading {
  @apply w-4 h-4 rounded-full;
  @apply border-t-2 border-gray-800;
  @apply animate-spin;
}
</style>
