<template>
  <admin-layout>
    <div class="py-2">
      <base-h2>{{ text.pageName }}</base-h2>
    </div>
    <label for="tagName">{{ text.pageName }}</label>
    <div class="flex mb-4 space-x-2">
      <input type="search" name="tagName" id="tagName" v-model="query.tagName" />
      <base-button variant="primary" @click="onSearch(query)">{{
        text.searchButton
      }}</base-button>
      <div class="grow"></div>
      <base-button variant="primary" @click="goToTagNewPage()">{{
        text.create
      }}</base-button>
    </div>
    <base-table
      :headers="tagHeaders"
      :items="tags"
      @click:row="goToTagPage"
      clickable
    >
    </base-table>
  </admin-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { AdminLayout } from "@/layouts";
import { BaseH2, BaseTable, BaseButton } from "@/components";
import { useTag } from "@/composables";
import { Tag } from "@/utils/model";
import { RouteName } from "@/utils/constant";
import { TableHeader } from "@/utils/type";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageName: t("pageName.tagList"),
  searchButton: t("buttonName.search"),
  create: t("buttonName.create"),
};

const router = useRouter();
const { fetchTags } = useTag();

const query = reactive({
  tagName: ""
});

const tagHeaders = ref<Array<TableHeader>>([
  {
    key: "name",
    name: "タグ名",
  },
]);
const tags = ref<Array<Tag>>([]);
onMounted(async () => {
  await onSearch();
});

const goToTagNewPage = () => {
  router.push({ name: RouteName.AdminTagNew });
};

const goToTagPage = (tagId: number = 0) => {
  router.push({ name: RouteName.AdminTag, params: { tagId } });
};

const onSearch = async (query?: { [key:string]: string }) => {
    tags.value = await fetchTags(query);
};
</script>

<style scoped></style>
