<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      :checked="modelValue"
      @change="emits('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="w-4 h-4 accent-emerald-300 mr-1"
    />
    <label :for="id" class="inline-block">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

interface Props {
  id: string;
  label?: string;
  modelValue?: boolean;
}

const props = defineProps<Props>();
const { id, label, modelValue } = toRefs(props);

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<style scoped>
</style>