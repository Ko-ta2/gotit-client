<template>
  <div :class="['alert', alertTypeClass]" v-if="alertMessage">
    <information-circle-icon
      class="w-6 h-6"
      v-if="isAlertInfo"
    ></information-circle-icon>
    <check-icon class="w-6 h-6" v-if="isAlertSuccess"></check-icon>
    <exclamation-icon class="w-6 h-6" v-if="isAlertError"></exclamation-icon>
    <div class="grow">{{ alertMessage }}</div>
    <button @click="clearAlert" v-if="isAlertError">
      <x-icon class="w-6 h-6"></x-icon>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import {
  CheckIcon,
  InformationCircleIcon,
  ExclamationIcon,
  XIcon,
} from "@heroicons/vue/solid";
import { ActionsName, AlertType } from "@/utils/constant";

const store = useStore();

const alertTypeClass = computed(() => {
  if (store.state.alert.type === AlertType.Info) return "info";
  if (store.state.alert.type === AlertType.Success) return "success";
  if (store.state.alert.type === AlertType.Error) return "error";
  return "";
});
const isAlertInfo = computed(() => store.state.alert.type === AlertType.Info);
const isAlertSuccess = computed(
  () => store.state.alert.type === AlertType.Success
);
const isAlertError = computed(() => store.state.alert.type === AlertType.Error);

const alertMessage = computed(() => store.state.alert.message);

const clearAlert = () => store.dispatch(ActionsName.ClearAlert);
</script>

<style scoped>
.alert {
  @apply fixed bottom-2 left-2 z-10;
  @apply flex items-center space-x-1 rounded shadow p-2 w-72;
}
.info {
  @apply bg-blue-300;
}
.success {
  @apply bg-emerald-300;
}
.error {
  @apply bg-red-300;
}
</style>
