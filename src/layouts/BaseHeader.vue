<template>
  <base-box class="items-center">
    <base-button
      variant="primary"
      class="flex-none"
      @click="goToContentListPage"
    >
      <base-h1>{{ text.serviceName }}</base-h1>
    </base-button>
    <div class="grow"></div>
    <div class="flex-none" @click="" v-if="false">
      <search-icon class="w-8 h-8"></search-icon>
    </div>
  </base-box>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { SearchIcon } from "@heroicons/vue/solid";
import { BaseBox } from "@/layouts";
import { BaseH1, BaseButton } from "@/components";
import { RouteName } from "@/utils/constant";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  serviceName: t("serviceName"),
};

const router = useRouter();
const goToContentListPage = () =>
  router.push({ name: RouteName.PublicContentList });
</script>
