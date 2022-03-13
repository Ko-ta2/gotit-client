<template>
  <full-screen>
    <base-box
      flex-direction="flex-col"
      class="bg-gray-50 w-1/2 h-1/2 items-center justify-center"
    >
      <base-h1>{{ text.pageNotFound }}</base-h1>
      <base-button @click="goToPublicContentListPage" variant="outlined" class="flex items-center">
        <home-icon class="w-4 h-4 inline-block"></home-icon>
        {{ text.homeButton }}
      </base-button>
    </base-box>
  </full-screen>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { HomeIcon } from "@heroicons/vue/solid";
import { FullScreen, BaseBox } from "@/layouts";
import { BaseH1, BaseButton } from "@/components";
import { RouteName } from "@/utils/constant";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  pageNotFound: t("message.pageNotFound"),
  homeButton: "ホームへ",
};

const router = useRouter();
const goToPublicContentListPage = () =>
  router.push({ name: RouteName.PublicContentList });
</script>
