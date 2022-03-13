<template>
  <div class="card">
    <base-h3 class="mb-4">
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
        >{{ title }}</a
      >
    </base-h3>
    <div class="flex flex-wrap">
      <tag-chip :name="tag?.name"></tag-chip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { BaseH3, TagChip } from "@/components";
import { Content } from "@/utils/model";

const props = defineProps<{
  title: Content["title"];
  tag: Content["tag"];
  url: Content["url"];
}>();
const { title, tag, url } = toRefs(props);
</script>

<style scoped>
.card {
  @apply bg-gray-50 rounded shadow-md m-2 p-2 bg-opacity-30;
  @apply sm:w-72;
}
</style>
