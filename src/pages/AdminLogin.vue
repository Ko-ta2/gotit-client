<template>
  <full-screen>
    <base-box
      class="bg-gray-50"
      padding="p-12"
      border-radius="rounded-xl"
      flex-direction="flex-col"
    >
      <base-h1 class="text-center">{{ text.serviceName }}</base-h1>
      <text-field
        type="text"
        id="email"
        label="メールアドレス"
        v-model="email"
        @keyup:enter="logIn"
      ></text-field>
      <text-field
        type="password"
        id="password"
        label="パスワード"
        v-model="password"
        @keyup:enter="logIn"
      ></text-field>
      <base-button variant="primary" @click="logIn">{{ text.loginButton }}</base-button>
    </base-box>
  </full-screen>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { User } from "firebase/auth";
import { FullScreen, BaseBox } from "@/layouts";
import { BaseH1, BaseButton, TextField } from "@/components";
import { RouteName, ActionsName } from "@/utils/constant";
import { Auth } from "@/utils/auth";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const text = {
  serviceName: t("serviceName"),
  loginButton: t("buttonName.login")
}

const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");

const logIn = async () => {
  try {
    await Auth.logIn(email.value, password.value);
    const logInUser = (await Auth.fetchLoginUser()) as User;
  } catch (error) {
    alertError((error as Error).message);
    return;
  }
  router.push({ name: RouteName.AdminContentList });
};

const alertError = (message: string) =>
  store.dispatch(ActionsName.AlertError, message);
</script>
