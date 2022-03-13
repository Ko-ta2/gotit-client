<template>
  <admin-layout>
    <base-box class="sm:w-1/2" flex-direction="flex-col">
      <base-h2>{{ text.pageName }}</base-h2>
      <text-field
        id="userName"
        label="ユーザ名"
        v-model="user.name"
      ></text-field>
      <text-field
        type="email"
        id="mailAddress"
        label="メールアドレス"
        v-model="user.mailAddress"
      ></text-field>
      <base-select
        id="role"
        label="ロール"
        v-model="user.roleId"
        :options="roleOptions"
      ></base-select>
      <check-box id="isValid" label="有効" v-model="user.isValid"></check-box>
      <div class="flex space-x-2">
        <base-button variant="primary" @click="onCreateUser">{{ text.saveButton }}</base-button>
        <base-button variant="outlined" @click="onCancel"
          >{{ text.cancelButton }}</base-button
        >
        <div class="grow"></div>
        <base-button variant="accent" @click="isOpenDeleteDialog = true">
          {{ text.deleteButton + text.dots }}
        </base-button>
        <base-dialog
          :is-open="isOpenDeleteDialog"
          @click:cancel="isOpenDeleteDialog = false"
          @click:ok="onDeleteUser(userId)"
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
import { AdminLayout, BaseBox } from "@/layouts";
import {
  BaseH2,
  BaseDialog,
  BaseButton,
  TextField,
  BaseSelect,
  CheckBox,
} from "@/components";
import { useUser } from "@/composables";
import { User } from "@/utils/model";
import { RouteName } from "@/utils/constant";
import { SelectOption } from "@/utils/type";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageName: t("pageName.user"),
  saveButton: t("buttonName.save"),
  cancelButton: t("buttonName.cancel"),
  deleteButton: t("buttonName.delete"),
  dots: t("text.dots")
}

const router = useRouter();
const { createUser, deleteUser } = useUser();

interface Props {
  userId?: string;
}
const props = withDefaults(defineProps<Props>(), {
  userId: "",
});
const { userId } = toRefs(props);

const roleOptions = ref<Array<SelectOption>>([
  {
    text: "一般",
    value: "1",
  },
  {
    text: "管理者",
    value: "2",
  },
]);

const user = ref<User>({
  name: "",
  mailAddress: "",
  roleId: "",
  isValid: true,
});

onMounted(async () => {
  if (userId.value) {
  }
});

const onCreateUser = async () => {
  await createUser(user.value);
  router.push({ name: RouteName.AdminUserList });
};

const onCancel = () => {
  router.push({ name: RouteName.AdminUserList });
};

const isOpenDeleteDialog = ref<boolean>(false);
const onDeleteUser = async (id: string) => {
  // await deleteUser(id);
  // router.push({ name: RouteName.AdminUserList });
};
</script>

<style scoped>
input,
textarea,
select {
  @apply mb-4;
}
</style>
