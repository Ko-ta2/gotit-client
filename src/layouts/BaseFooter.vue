<template>
  <base-box>
    <p class="text-sm">{{ text.copyright }}</p>
  </base-box>
</template>

<script lang="ts" setup>
import { BaseBox } from "@/layouts";
import { useI18n } from "@/i18n";

/** 現在日時 */
let currentDateTime = new Date();
/** 現在年 */
const year = currentDateTime.getFullYear();

const { t } = useI18n();
const text = {
  copyright: t("copyright", { year: year }),
};
</script>
