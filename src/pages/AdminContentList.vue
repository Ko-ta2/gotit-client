<template>
  <admin-layout>
    <div class="flex justify-between py-2">
      <base-h2>{{ text.pageName }}</base-h2>
      <base-button variant="primary" @click="goToContentNewPage()"
        >{{ text.createButton }}</base-button
      >
    </div>
    <base-table
      :headers="contentHeaders"
      :items="contents"
      @click:row="goToContentPage"
      clickable
    >
      <template #tag="{ data }">
        <tag-chip v-if="data"
          :name="data.name"
        ></tag-chip>
      </template>
      <template #updatedAt="{ data }">
        {{ Format.toDate(data) }}
      </template>
      <template #isPublished="{ data }">
        <base-chip class="bg-emerald-100" v-if="data">{{
          Format.isPublished(data)
        }}</base-chip>
        <span v-else></span>
      </template>
    </base-table>
  </admin-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { AdminLayout } from "@/layouts";
import { BaseH2, BaseTable, TagChip, BaseButton, BaseChip } from "@/components";
import { useContent } from "@/composables";
import { Content } from "@/utils/model";
import { RouteName } from "@/utils/constant";
import { TableHeader } from "@/utils/type";
import { Format } from "@/utils/format";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageName: t("pageName.contentList"),
  createButton: t("buttonName.create")
}

const router = useRouter();
const { fetchContents } = useContent();

const contentHeaders = ref<Array<TableHeader>>([
  {
    key: "title",
    name: "タイトル",
  },
  {
    key: "tag",
    name: "タグ",
  },
  {
    key: "url",
    name: "URL",
  },
  {
    key: "updatedAt",
    name: "更新日",
    class: ["text-center"],
  },
  {
    key: "isPublished",
    name: "ステータス",
    class: ["text-center"],
  },
]);
const contents = ref<Array<Content>>([]);
onMounted(async () => {
  contents.value = await fetchContents();
});

const goToContentNewPage = () => {
  router.push({ name: RouteName.AdminContentNew });
};

const goToContentPage = (contentId: number = 0) => {
  router.push({ name: RouteName.AdminContent, params: { contentId } });
};
</script>
