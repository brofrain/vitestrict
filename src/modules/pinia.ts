import { createPinia } from "pinia";
import type { PluginModule } from "~/types/modules";

// STARTER_DOCS:
// Setup Pinia
// https://pinia.vuejs.org/
export const install: PluginModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia();

  app.use(pinia);

  // STARTER_DOCS:
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // https://pinia.vuejs.org/ssr/#state-hydration
  if (isClient) {
    pinia.state.value = initialState.pinia || {};
  } else {
    initialState.pinia = pinia.state.value;
  }
};
