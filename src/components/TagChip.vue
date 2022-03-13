<template>
  <span class="text-sm p-2 border border-gray-300 rounded before:content-['#']">{{ name }}</span>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { Tag } from "@/utils/model";

const props = defineProps<{
  name: Tag["name"]
}>()
const { name } = toRefs(props)
</script>

<style scoped>
</style>