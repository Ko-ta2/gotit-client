<template>
  <base-box
    flexDirection="flex-col"
    class="bg-gray-50 bg-opacity-30 hidden sm:block sm:w-60"
  >
    <div>
      <base-h2>{{ text.aboutTitle }}</base-h2>
      <p>{{ text.aboutDescription }}</p>
    </div>
    <div>
      <base-h2>{{ text.conceptTitle }}</base-h2>
      <p>{{ text.conceptDescription }}</p>
    </div>
    <div>
      <base-h2>{{ text.tagTitle }}</base-h2>
      <div class="flex flex-wrap space-x-1 space-y-1">
        <tag-chip
          class="hover:underline hover:cursor-pointer first:mt-1 first:ml-1"
          v-for="tag in tags"
          :key="tag.id"
          :tagId="tag.id"
          :name="tag.name"
          @click="onClickTag(tag.name)"
        ></tag-chip>
      </div>
    </div>
  </base-box>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { BaseBox } from "@/layouts";
import { TagChip, BaseH2 } from "@/components";
import { RouteName } from "@/utils/constant";
import { useTag } from "@/composables";
import { Tag } from "@/utils/model";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  aboutTitle: t("text.aboutTitle"),
  aboutDescription: t("text.aboutDescription"),
  conceptTitle: t("text.conceptTitle"),
  conceptDescription: t("text.conceptDescription"),
  tagTitle: t("text.tagTitle"),
};

const router = useRouter();
const { fetchTags } = useTag();

const tags = ref<Array<Tag>>([]);
onMounted(async () => {
  tags.value = await fetchTags();
});

const onClickTag = async (tagName?: string) => {
  router.push({
    name: RouteName.PublicContentList,
    query: { tagName: tagName },
  });
};
</script>
