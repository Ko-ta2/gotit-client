<template>
  <base-container>
    <base-header></base-header>
    <main class="flex min-h-screen p-2">
      <base-nav></base-nav>
      <div class="grow max-w-full">
        <slot></slot>
      </div>
    </main>
    <base-footer></base-footer>
  </base-container>
</template>

<script lang="ts" setup>
import { BaseContainer, BaseHeader, BaseNav, BaseFooter } from "@/layouts";
</script>
