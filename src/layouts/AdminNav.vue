<template>
  <base-box class="bg-gray-50 hidden w-full sm:block sm:w-60">
    <ul class="flex flex-col">
      <li
        v-for="menu in menus"
        :key="menu.pageName"
        :class="[
          'p-2',
          currentRouteName === menu.routeName ? 'text-emerald-300' : '',
        ]"
      >
        <router-link :to="{ name: menu.routeName }">{{
          menu.pageName
        }}</router-link>
      </li>
    </ul>
  </base-box>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { BaseBox } from "@/layouts";
import { NavMenu } from "@/utils/type";
import { RouteName } from "@/utils/constant";
import { useI18n } from "@/i18n";

const { t } = useI18n()

const route = useRoute();
const currentRouteName = route.name;

const menus = reactive<NavMenu[]>([
  {
    routeName: RouteName.AdminContentList,
    pageName: t("pageName.contentList"),
  },
  {
    routeName: RouteName.AdminTagList,
    pageName: t("pageName.tagList"),
  }
]);
</script>

<style scoped></style>
