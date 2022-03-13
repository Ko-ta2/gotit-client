<template>
  <div>
    <label :for="id" class="mb-4">{{ label }}</label>
    <div>{{ selectedFileName }}</div>
    <input
      type="file"
      :name="id"
      :id="id"
      image="image/*"
      @change="onChange(($event.target as HTMLInputElement).files)"
      class="w-full file:bg-emerald-300 file:border-none file:rounded"
    />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from "vue";

interface Props {
  id: string;
  label?: string;
  modelValue?: string;
  fileName?: string;
}

const props = defineProps<Props>()
const { id, label, modelValue, fileName } = toRefs(props);

const selectedFileName = ref<string>();
selectedFileName.value = fileName?.value ? fileName?.value : "";

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onChange = (files: FileList | null) => {
  if (files && files[0]) {
    const file = files[0];
    selectedFileName.value = file.name;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => {
      const base64String = fileReader.result
        ? String(fileReader.result).replace(/data:.*\/.*;base64,/, "")
        : "";
      emits("update:modelValue", base64String);
    });
    return;
  }
  selectedFileName.value = "";
  return emits("update:modelValue", "");
};
</script>
