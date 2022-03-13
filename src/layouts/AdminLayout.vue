<template>
  <base-container>
    <admin-header></admin-header>
    <main class="flex min-h-screen p-2 space-x-2">
      <admin-nav></admin-nav>
      <div class="grow max-w-full">
        <slot></slot>
      </div>
    </main>
  </base-container>
</template>

<script lang="ts" setup>
import { BaseContainer, AdminHeader, AdminNav } from "@/layouts";
</script>
