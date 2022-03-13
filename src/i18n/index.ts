import { createI18n, useI18n as BaseUseI18n } from "vue-i18n";
import jaMessages from "@/i18n/locales/ja.json";
import { Locale } from "@/utils/constant";

export type MessageSchema = typeof jaMessages;

export const i18n = createI18n<[MessageSchema], Locale.JaJP>({
  legacy: false,
  locale: Locale.JaJP,
  fallbackLocale: Locale.JaJP,
  messages: {
    [Locale.JaJP]: jaMessages,
  },
});

export const useI18n = () =>
  BaseUseI18n<{ message: MessageSchema }, Locale.JaJP>();
