<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :name="id"
      :id="id"
      :value="modelValue"
      @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="emits('keyup:enter')"
      class="w-full"
    />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, withDefaults } from "vue";

interface Props {
  type?: string;
  id?: string;
  label?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});
const { type, id, label, modelValue } = toRefs(props);

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "keyup:enter"): void;
}>();
</script>
