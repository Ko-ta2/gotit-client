<template>
  <base-alert></base-alert>
  <base-loading></base-loading>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { BaseAlert, BaseLoading } from "@/components";
</script>
