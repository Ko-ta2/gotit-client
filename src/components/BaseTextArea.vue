<template>
  <div>
    <label :for="id">{{ label }}</label>
    <textarea
      :name="id"
      :id="id"
      :value="modelValue"
      @input="emits('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :rows="3"
      class="w-full"
    />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

interface Props {
  id: string;
  label?: string;
  modelValue?: string;
}

const props = defineProps<Props>();
const { id, label, modelValue } = toRefs(props);

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
