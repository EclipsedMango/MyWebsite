<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import EditorTabs from "@/components/EditorTabs.vue";
import FakeTerminal from "@/components/FakeTerminal.vue";
import ModePrompt from "@/components/ModePrompt.vue";
import { navBarCollapsed, sidebarResizing, sidebarWidth, SIDEBAR_WIDTH_COLLAPSED } from "@/navbardata.js";
import { hasOpenTabs, isOpenable, syncRoute } from "@/tabsdata.js";
import { terminalOffset, terminalResizing } from "@/terminaldata.js";
import { simpleMode } from "@/viewerdata.js";

const route = useRoute();

const showChrome = computed(() => !route.meta.hideChrome);

watch(() => route.path, (path) => syncRoute(path), { immediate: true });

const showEmptyEditor = computed(() => showChrome.value && isOpenable(route.path) && !hasOpenTabs.value);

const bottomInset = computed(() => (showChrome.value ? `${terminalOffset.value}px` : "0px"));

const sideBarWidth = computed(() => {
  if (!showChrome.value) {
    return "0px";
  }

  return `${navBarCollapsed.value ? SIDEBAR_WIDTH_COLLAPSED : sidebarWidth.value}px`;
});
</script>

<template>
  <div class="main-app">
    <NavBar v-if="showChrome"></NavBar>
    <div
      class="editor-area"
      :class="{ resizing: terminalResizing || sidebarResizing }"
      :style="{ marginLeft: sideBarWidth, marginBottom: bottomInset }"
    >
      <EditorTabs v-if="showChrome"></EditorTabs>
      <div v-if="showEmptyEditor" class="empty-editor">
        <p class="empty-title">{{ simpleMode ? "Nothing is open" : "No file is open" }}</p>
        <p class="empty-hint">
          {{ simpleMode ? "Pick a page from the list on the left." : "Open one from the Project tool window on the left." }}
        </p>
      </div>
      <main v-else class="app-content">
        <RouterView></RouterView>
      </main>
    </div>
    <FakeTerminal v-if="showChrome"></FakeTerminal>
    <ModePrompt v-if="showChrome"></ModePrompt>
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
  min-height: 0;

  transition: margin-left 0.25s ease, margin-bottom 0.25s ease;
}

/* Follow the dragged edge frame for frame instead of easing behind it. */
.editor-area.resizing {
  transition: none;
}

.app-content {
  display: flex;
  flex-direction: row;
  justify-content: center;

  flex: 1;
  min-width: 0;
  min-height: 0;

  overflow: hidden;
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
