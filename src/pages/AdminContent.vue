<template>
  <admin-layout>
    <base-box class="sm:w-1/2" flex-direction="flex-col">
      <base-h2>{{ text.pageName }}</base-h2>
      <text-field
        id="title"
        label="タイトル"
        v-model="content.title"
      ></text-field>
      <base-select
        id="tag"
        label="タグ"
        v-model="content.tagId"
        :options="options"
      ></base-select>
      <text-field
        type="url"
        id="url"
        label="URL"
        v-model="content.url"
      ></text-field>
      <check-box
        id="isPublished"
        label="公開済み"
        v-model="content.isPublished"
      ></check-box>
      <div class="flex space-x-2">
        <base-button variant="primary" @click="onCreateContent">{{
          text.saveButton
        }}</base-button>
        <base-button variant="outlined" @click="onCancel">{{
          text.cancelButton
        }}</base-button>
        <div class="grow"></div>
        <base-button variant="accent" @click="isOpenDeleteDialog = true">
          {{ text.deleteButton + text.dots }}
        </base-button>
        <base-dialog
          :is-open="isOpenDeleteDialog"
          @click:cancel="isOpenDeleteDialog = false"
          @click:ok="onDeleteContent(parseInt(contentId))"
        >
          <template #okLabel>{{ text.deleteButton }}</template>
        </base-dialog>
      </div>
    </base-box>
  </admin-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { AdminLayout, BaseBox } from "@/layouts";
import {
  BaseH2,
  BaseDialog,
  BaseButton,
  TextField,
  BaseSelect,
  CheckBox,
} from "@/components";
import { useContent, useTag } from "@/composables";
import { Content } from "@/utils/model";
import { RouteName, ActionsName } from "@/utils/constant";
import { SelectOption } from "@/utils/type";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageName: t("pageName.content"),
  saveButton: t("buttonName.save"),
  cancelButton: t("buttonName.cancel"),
  deleteButton: t("buttonName.delete"),
  dots: t("text.dots"),
};

const store = useStore();
const router = useRouter();
const { fetchContentById, createContent, updateContent, deleteContent } =
  useContent();
const { fetchTags } = useTag()

interface Props {
  contentId?: string;
}
const props = withDefaults(defineProps<Props>(), {
  contentId: "",
});
const { contentId } = toRefs(props);

const content = ref<Content>({
  title: "",
  tagId: "",
  url: "",
  isPublished: true,
});

const options = ref<Array<Partial<SelectOption>>>([])

onMounted(async () => {
  const contentIdNum = parseInt(contentId.value);
  if (contentIdNum) {
    content.value = await fetchContentById(contentIdNum);
  }
  const tags = await fetchTags()
  tags.forEach(tag => {
    options.value.push({
      text: tag.name,
      value: String(tag.id)
    })
  })
});

const onCreateContent = async () => {
  try {
    if (contentId.value) {
      await updateContent(content.value);
      alertSuccess(t("message.created"));
    } else {
      await createContent(content.value);
      alertSuccess(t("message.updated"));
    }
    router.push({ name: RouteName.AdminContentList });
  } catch (error) {
    alertError((error as Error).message);
  }
};

const onCancel = () => {
  router.push({ name: RouteName.AdminContentList });
};

const isOpenDeleteDialog = ref<boolean>(false);
const onDeleteContent = async (id: number) => {
  try {
    await deleteContent(id);
    alertSuccess(t("message.deleted"));
    router.push({ name: RouteName.AdminContentList });
  } catch (error) {
    alertError((error as Error).message);
  }
};

const alertSuccess = (message: string) =>
  store.dispatch(ActionsName.AlertSuccess, message);
const alertError = (message: string) =>
  store.dispatch(ActionsName.AlertError, message);
</script>

<style scoped>
input,
textarea {
  @apply mb-4;
}
</style>
