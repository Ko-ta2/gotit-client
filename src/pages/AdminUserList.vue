<template>
  <admin-layout>
    <div class="flex justify-between py-2">
      <base-h2>{{ text.pageName }}</base-h2>
    </div>
    <label for="userNameOrMailAddress">{{ text.userNameOrMailAddress }}</label>
    <div class="flex mb-4 space-x-2">
      <input
        type="search"
        name="userNameOrMailAddress"
        id="userNameOrMailAddress"
        v-model="userNameOrMailAddress"
      />
      <base-button variant="primary" @click="onSearch()">{{ text.searchButton }}</base-button>
    </div>
    <base-table
      :headers="userHeaders"
      :items="users"
      @click:row="goToUserPage"
      clickable
    >
      <template #roleId="{ data }">
        {{ data }}
      </template>
      <template #isValid="{ data }">
        <base-chip class="bg-emerald-100" v-if="data">{{
          Format.isValid(data)
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
import { BaseH2, BaseTable, BaseButton, BaseChip } from "@/components";
import { useUser } from "@/composables";
import { User } from "@/utils/model";
import { RouteName } from "@/utils/constant";
import { TableHeader } from "@/utils/type";
import { Format } from "@/utils/format";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageName: t("pageName.userList"),
  searchButton: t("buttonName.search"),
  userNameOrMailAddress: "ユーザ名またはメールアドレス"
}

const router = useRouter();
const { fetchUsers } = useUser();

const userNameOrMailAddress = ref<string>();

const userHeaders = ref<Array<TableHeader>>([
  {
    key: "name",
    name: "ユーザ名",
  },
  {
    key: "mailAddress",
    name: "メールアドレス",
  },
  {
    key: "roleId",
    name: "ロール",
    class: ["text-center"],
  },
  {
    key: "isValid",
    name: "ステータス",
    class: ["text-center"],
  },
]);
const users = ref<Array<User>>([]);
onMounted(async () => {
  users.value = await fetchUsers();
});

const goToUserNewPage = () => {
  router.push({ name: RouteName.AdminUserNew });
};

const goToUserPage = (userId: string = "") => {
  router.push({ name: RouteName.AdminUser, params: { userId } });
};

const onSearch = async () => {
  users.value = await fetchUsers();
};
</script>

<style scoped></style>
