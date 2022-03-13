<template>
  <div class="flex items-center p-2">
    <base-button
      variant="primary"
      class="flex-none"
      @click="goToContentListPage"
    >
      <base-h1>{{ text.serviceName }}</base-h1>
    </base-button>
    <div class="grow"></div>
    <div class="flex-none">
      <base-button variant="outlined" @click="logOut">{{ text.logoutButtonName }}</base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Auth } from "@/utils/auth";
import { RouteName } from "@/utils/constant";
import { BaseH1, BaseButton } from "@/components";
import { useI18n } from "@/i18n";

const { t } = useI18n()
const text = {
  serviceName: t("serviceName"),
  logoutButtonName: t("buttonName.logout")
}

const router = useRouter();

/**ログアウト */
const logOut = async () => {
  await Auth.logOut();
  router.push({ name: RouteName.AdminLogin });
};

const goToContentListPage = () =>
  router.push({ name: RouteName.AdminContentList });
</script>
