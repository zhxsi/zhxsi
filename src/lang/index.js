import { createI18n } from "vue-i18n";
import en from "./en";
import zh from "./zh";
const messages = { zh: { ...zh }, en: { ...en } };
const i18n = createI18n({
  locale: "zh",
  legacy: false,
  globalInjection: true,
  messages,
});
export default i18n;
