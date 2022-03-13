<template>
  <base-layout>
    <div class="section">
      <base-card
        v-for="content in contents"
        :key="content.id"
        :title="content.title"
        :tag="content.tag"
        :url="content.url"
      ></base-card>
    </div>
  </base-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { BaseLayout } from "@/layouts";
import { BaseCard } from "@/components";
import { useContent } from "@/composables";
import { Content } from "@/utils/model";

const router = useRouter();
const { fetchContents } = useContent();

const contents = ref<Array<Content>>([]);
onMounted(async () => {
  contents.value = await fetchContents();
});

onBeforeRouteUpdate(async (to, from) => {
  const { tagName } = to.query;
  const query = { tagName: "" };
  if (tagName) query.tagName = tagName as string;
  contents.value = await fetchContents(query);
});
</script>

<style scoped>
.section {
  @apply flex flex-col;
  @apply sm:flex-row sm:flex-wrap;
}
</style>
