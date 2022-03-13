<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto rounded grow">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="border-b border-gray-100">
            <th
              v-for="header in headers"
              :key="header.key"
              class="
                bg-gray-50
                p-3
                first:sticky first:left-0 first:z-10
                whitespace-nowrap
              "
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            @click="onClickRow(item.id)"
            :class="[
              'border-b',
              'border-gray-100',
              clickable ? 'hover:cursor-pointer' : '',
            ]"
          >
            <td
              v-for="header in headers"
              :class="[
                'bg-white p-3 truncate max-w-prose first:sticky first:left-0 first:z-10',
                header.class,
              ]"
            >
              <slot :name="header.key" :data="item[header.key]">{{
                item[header.key]
              }}</slot>
            </td>
          </tr>
          <tr v-if="!items.length">
            <base-box
              ><slot name="noItemsMessage">{{
                text.listNotFound
              }}</slot></base-box
            >
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="flex items-center justify-center space-x-2 p-2">
      <button
        class="
          text-center
          w-9
          h-9
          border border-gray-300
          rounded-full
          hover:bg-gray-100
        "
      >
        1
      </button>
      <button
        class="
          text-center
          w-9
          h-9
          border border-gray-300
          rounded-full
          hover:bg-gray-100
        "
      >
        2
      </button>
      <button
        class="
          text-center
          w-9
          h-9
          border border-gray-300
          rounded-full
          hover:bg-gray-100
        "
      >
        3
      </button>
      ...
      <button
        class="
          text-center
          w-9
          h-9
          border border-gray-300
          rounded-full
          hover:bg-gray-100
        "
      >
        10
      </button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { BaseBox } from "@/layouts";
import { TableHeader } from "@/utils/type";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  listNotFound: t("message.listNotFound"),
};

const props = defineProps<{
  headers: TableHeader[];
  items: any[];
  clickable?: boolean;
}>();
const { headers, items, clickable } = toRefs(props);

const emit = defineEmits<{
  (e: "click:row", id?: any): void;
}>();
const onClickRow = (id?: number | string) => emit("click:row", id);
</script>

<style scoped>
tbody tr:hover td {
  @apply bg-gray-50;
}
</style>
