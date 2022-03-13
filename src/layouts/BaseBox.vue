<template>
  <div :class="[padding, _borderRadius, 'flex', flexDirection, space]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, toRefs } from "vue";
interface Props {
  padding?: string;
  borderRadius?: string;
  flexDirection?: "flex-row" | "flex-col";
}
const props = withDefaults(defineProps<Props>(), {
  padding: "p-2",
  borderRadius: "",
  flexDirection: "flex-row",
});
const { padding, borderRadius, flexDirection } = toRefs(props);
const _borderRadius = borderRadius.value ? borderRadius.value : "rounded";
const space = flexDirection.value === "flex-row" ? "space-x-4" : "space-y-4";
</script>
