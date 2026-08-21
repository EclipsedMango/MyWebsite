<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import EditorTabs from "@/components/EditorTabs.vue";
import FakeTerminal from "@/components/FakeTerminal.vue";
import { navBarCollapsed, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from "@/navbardata.js";
import { hasOpenTabs, isOpenable, syncRoute } from "@/tabsdata.js";

const route = useRoute();

const showChrome = computed(() => !route.meta.hideChrome);

watch(() => route.path, (path) => syncRoute(path), { immediate: true });

const showEmptyEditor = computed(() => showChrome.value && isOpenable(route.path) && !hasOpenTabs.value);

const sideBarWidth = computed(() => {
  if (!showChrome.value) {
    return "0px";
  }

  return `${navBarCollapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`;
});
</script>

<template>
  <div class="main-app">
    <NavBar v-if="showChrome"></NavBar>
    <div class="editor-area" :style="{ marginLeft: sideBarWidth }">
      <EditorTabs v-if="showChrome"></EditorTabs>
      <div v-if="showEmptyEditor" class="empty-editor">
        <p class="empty-title">No file is open</p>
        <p class="empty-hint">Open one from the Project tool window on the left.</p>
      </div>
      <main v-else class="app-content">
        <RouterView></RouterView>
      </main>
    </div>
    <FakeTerminal v-if="showChrome"></FakeTerminal>
  </div>
</template>

<style>
.main-app {
  display: flex;
  flex-direction: row;

  width: 100vw;
  height: 100vh;

  background: linear-gradient(to bottom right, #1b1d1e, #0c0d0e);
}

.editor-area {
  display: flex;
  flex-direction: column;

  flex: 1;
  min-width: 0;
  height: 100%;

  transition: margin-left 0.25s ease;
}

.app-content {
  display: flex;
  flex-direction: row;
  justify-content: center;

  flex: 1;
  min-width: 0;
  min-height: 0;

  overflow: auto;
}

.empty-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  flex: 1;
  min-height: 0;

  color: var(--ide-text-muted);
}

.empty-title {
  font-size: 22px;
}

.empty-hint {
  font-size: 15px;
}
</style>
