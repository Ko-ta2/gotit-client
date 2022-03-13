<template>
  <teleport to="body">
    <div
      class="
        fixed
        inset-0
        flex flex-col
        items-center
        justify-center
        bg-gray-50 bg-opacity-60
      "
      v-if="isOpen"
      @click.stop="onCancel"
    >
      <div
        class="
          flex flex-col
          w-11/12
          sm:w-1/3
          rounded-xl
          shadow-xl
          bg-white
          p-4
          space-y-3
        "
      >
        <p>
          <slot>メッセージ</slot>
        </p>
        <div class="flex flex-row space-x-2">
          <div class="grow"></div>
          <base-button @click.stop="onCancel" variant="outlined"
            ><slot name="cancelLabel">キャンセル</slot></base-button
          >
          <base-button @click.stop="onOk" variant="primary"><slot name="okLabel">OK</slot></base-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { BaseButton } from "@/components";

const props = defineProps<{
  isOpen: boolean;
}>();
const { isOpen } = toRefs(props);

const emit = defineEmits<{
  (e: "click:cancel"): void;
  (e: "click:ok"): void;
}>();
const onCancel = () => {
  emit("click:cancel");
};
const onOk = () => {
  emit("click:ok");
};
</script>
