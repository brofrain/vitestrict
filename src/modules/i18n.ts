import { createI18n } from "vue-i18n";
import type { PluginModule } from "~/types/modules";

// STARTER_DOCS:
// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager("../../locales/*.yaml")).map(
    ([path, module]) => [path.slice(14, -5), module.default]
  )
);

export const install: PluginModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages,
  });

  app.use(i18n);
};
