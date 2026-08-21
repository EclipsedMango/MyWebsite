<script setup>
import { computed } from "vue";
import FileTree from "@/components/FileTree.vue";
import FolderIcon from "@/components/Icons/FolderIcon.vue";
import CollapseIcon from "@/components/Icons/CollapseIcon.vue";
import { navBarCollapsed, SIDEBAR_WIDTH, TOOL_STRIP_WIDTH } from "@/navbardata.js";
import { terminalOffset } from "@/terminaldata.js";

const toolWindowBottom = computed(() => `${terminalOffset.value}px`);

const width = computed(() => `${navBarCollapsed.value ? TOOL_STRIP_WIDTH : SIDEBAR_WIDTH}px`);

function toggleNavBar() {
  navBarCollapsed.value = !navBarCollapsed.value;
}
</script>

<template>
  <aside class="sidenav-base" id="sidenav" :style="{ width }">
    <div class="tool-strip">
      <button
        class="tool-strip-button"
        :class="{ active: !navBarCollapsed }"
        type="button"
        title="Project"
        :aria-pressed="!navBarCollapsed"
        @click="toggleNavBar"
      >
        <FolderIcon class="strip-icon"></FolderIcon>
      </button>
    </div>

    <div v-show="!navBarCollapsed" class="tool-window" :style="{ marginBottom: toolWindowBottom }">
      <div class="tool-window-header">
        <div style="font-size: 18px; padding: 10px 10px">Project</div>
        <span class="tool-window-title"></span>
        <button class="header-button" type="button" title="Hide" @click="toggleNavBar">
          <CollapseIcon></CollapseIcon>
        </button>
      </div>
      <FileTree></FileTree>
    </div>
  </aside>
</template>

<style scoped>
.sidenav-base {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;

  background-color: var(--ide-bg);
  border-right: 4px solid var(--ide-border);
  border-top: 4px solid var(--ide-border);

  transition: width 0.25s ease;
  z-index: 10;
}

.tool-strip {
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 0 0 54px;
  padding: 6px;

  background-color: var(--ide-bar);
  border-right: 4px solid var(--ide-border);
}

.tool-strip-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  width: 34px;
  padding: 6px 22px 6px 22px;

  border: none;
  border-radius: 6px;
  background: none;

  color: var(--ide-icon);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.tool-strip-button:hover {
  background-color: var(--ide-hover);
  color: var(--ide-text-bright);
}

.tool-strip-button.active {
  background-color: var(--ide-selected);
  color: var(--ide-text-bright);
}

.strip-icon {
  width: 32px;
  height: 32px;
}

.tool-window {
  display: flex;
  flex-direction: column;

  transition: margin-bottom 0.5s ease;

  flex: 1;
  min-width: 0;

  background-color: var(--ide-bg);
}

.tool-window-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  flex: 0 0 34px;
  padding: 0 6px 0 12px;

  background-color: var(--ide-bar);
  border-bottom: 4px solid var(--ide-border);
}

.tool-window-title {
  font-family: "JetBrains Mono", "Roboto Mono", monospace;
  font-size: 13px;
  letter-spacing: 0.5px;

  color: var(--ide-text-muted);
}

.header-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  border: none;
  border-radius: 4px;
  background: none;

  color: var(--ide-icon);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.header-button:hover {
  background-color: var(--ide-hover);
  color: var(--ide-text-bright);
}
</style>
