<template>
  <admin-layout>
    <base-box class="sm:w-1/2" flex-direction="flex-col">
      <base-h2>{{ text.pageName }}</base-h2>
      <text-field id="name" label="タグ名" v-model="tag.name"></text-field>
      <div class="flex space-x-2">
        <base-button variant="primary" @click="onCreateTag">{{
          text.saveButton
        }}</base-button>
        <base-button variant="outlined" @click="onCancel">{{
          text.cancelButton
        }}</base-button>
        <div class="grow"></div>
        <base-button variant="accent" @click="isOpenDeleteDialog = true">{{
          text.deleteButton + text.dots
        }}</base-button>
        <base-dialog
          :is-open="isOpenDeleteDialog"
          @click:cancel="isOpenDeleteDialog = false"
          @click:ok="onDeleteTag(parseInt(tagId))"
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
import { Tag } from "@/utils/model";
import { RouteName, ActionsName } from "@/utils/constant";
import { AdminLayout, BaseBox } from "@/layouts";
import { BaseH2, BaseDialog, BaseButton, TextField } from "@/components";
import { useTag } from "@/composables";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageName: t("pageName.tag"),
  saveButton: t("buttonName.save"),
  cancelButton: t("buttonName.cancel"),
  deleteButton: t("buttonName.delete"),
  dots: t("text.dots"),
};

const router = useRouter();
const store = useStore();
const { fetchTagById, createTag, updateTag, deleteTag } = useTag();

interface Props {
  tagId?: string;
}
const props = withDefaults(defineProps<Props>(), {
  tagId: "",
});
const { tagId } = toRefs(props);

const tag = ref<Tag>({
  name: "",
});

onMounted(async () => {
  const tagIdNum = parseInt(tagId.value);
  if (tagIdNum) {
    tag.value = await fetchTagById(tagIdNum);
  }
});

const onCreateTag = async () => {
  try {
    if (tagId.value) {
      await updateTag(tag.value);
      alertSuccess(t("message.created"));
    } else {
      await createTag(tag.value);
      alertSuccess(t("message.updated"));
    }
    router.push({ name: RouteName.AdminTagList });
  } catch (error) {
    alertError((error as Error).message);
  }
};

const onCancel = () => {
  router.push({ name: RouteName.AdminTagList });
};

const isOpenDeleteDialog = ref<boolean>(false);
const onDeleteTag = async (id: number) => {
  try {
    await deleteTag(id);
    alertSuccess(t("message.deleted"));
    router.push({ name: RouteName.AdminTagList });
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
input {
  @apply mb-4;
}
</style>
