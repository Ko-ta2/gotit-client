<template>
  <div>
    <label :for="id">{{ label }}</label>
    <select
      :name="id"
      :id="id"
      :value="modelValue"
      @change="emits('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :multiple="multiple"
      :size="multiple ? 4 : 0"
      class="w-full appearance-none"
    >
      <option value="" disabled>選択してください</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { SelectOption } from "@/utils/type";

interface Props {
  id: string;
  label?: string;
  modelValue?: number | number[] | string | string[];
  options: Partial<SelectOption>[];
  multiple?: boolean;
}

const props = defineProps<Props>();
const { id, label, modelValue, options, multiple } = toRefs(props);

const emits = defineEmits<{
  (e: "update:modelValue", value: number | number[] | string | string[]): void;
}>();
</script>
