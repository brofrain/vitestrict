<script setup lang="ts">
import { useAsyncState } from "@vueuse/core";
import { fetchLatestVueTag } from "~/api/rest/releases";

const {
  state: tag,
  isReady,
  isLoading,
} = useAsyncState(fetchLatestVueTag(), null);

const { t } = useI18n();
</script>

<template>
  <div _italic _text-sm _text-center _opacity-70 _mb-2>
    <base-fade-transition>
      <p v-if="isReady">
        {{ t("home.vue_tag", { tag }) }}
      </p>
      <p v-else-if="isLoading">
        {{ t("home.vue_tag_loading") }}
      </p>
      <p v-else>
        {{ t("home.vue_tag_error") }}
      </p>
    </base-fade-transition>
  </div>
</template>
