<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { activeTabRoute, closeTab, moveTab, openTabs } from "@/tabsdata.js";
import { iconForFile } from "@/fileicons.js";
import XIcon from "@/components/Icons/XIcon.vue";

const route = useRoute();
const router = useRouter();

function selectTab(tab) {
  if (tab.route !== route.path) {
    router.push(tab.route);
  }
}

const dragIndex = ref(null);
const dragging = ref(false);

function onDragStart(event, index) {
  dragIndex.value = index;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", openTabs[index].route);
  requestAnimationFrame(() => {
    dragging.value = true;
  });
}

function onDragOver(event, index) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const from = dragIndex.value;

  if (from === null || from === index) {
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const pastMiddle = event.clientX > rect.left + rect.width / 2;

  if (index > from ? !pastMiddle : pastMiddle) {
    return;
  }

  moveTab(from, index);
  dragIndex.value = index;
}

function onDragEnd() {
  dragIndex.value = null;
  dragging.value = false;
}

function close(tab) {
  const next = closeTab(tab.route);

  if (next && next !== route.path) {
    router.push(next);
  }
}
</script>

<template>
  <div class="editor-tabs" role="tablist" aria-label="Open pages" @dragover.prevent @drop.prevent>
    <div
      v-for="(tab, index) in openTabs"
      :key="tab.route"
      class="editor-tab"
      :class="{ active: tab.route === activeTabRoute, dragging: dragging && index === dragIndex }"
      role="tab"
      tabindex="0"
      draggable="true"
      :aria-selected="tab.route === activeTabRoute"
      :title="tab.path"
      @dragstart="onDragStart($event, index)"
      @dragover="onDragOver($event, index)"
      @dragend="onDragEnd"
      @drop.prevent="onDragEnd"
      @click="selectTab(tab)"
      @keydown.enter.prevent="selectTab(tab)"
      @keydown.delete.prevent="close(tab)"
      @mouseup.middle.prevent="close(tab)"
    >
      <component :is="iconForFile(tab.name)" class="tab-icon"></component>
      <span class="tab-label">{{ tab.name }}</span>
      <button class="tab-close" type="button" :title="`Close ${tab.name}`" @click.stop="close(tab)">
        <XIcon></XIcon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.editor-tabs {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  flex: 0 0 auto;
  min-height: 57px;

  background-color: var(--ide-bar);
  border-top: 4px solid var(--ide-border);
  border-bottom: 4px solid var(--ide-border);

  overflow-x: auto;
  overflow-y: hidden;
}

.editor-tabs::-webkit-scrollbar {
  height: 6px;
}

.editor-tabs::-webkit-scrollbar-thumb {
  background-color: var(--ide-scrollbar);
  border-radius: 3px;
}

.editor-tabs::-webkit-scrollbar-track {
  background: transparent;
}

.editor-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  flex: 0 0 auto;
  padding: 0 8px 0 12px;

  border-bottom: 2px solid transparent;

  font-family: "JetBrains Mono", "Roboto Mono", monospace;
  font-size: 15px;
  white-space: nowrap;

  color: var(--ide-text);
  cursor: pointer;
  transition: background-color 0.1s ease, color 0.1s ease;
}

.editor-tab:hover {
  background-color: var(--ide-hover);
}

.editor-tab.active {
  background-color: var(--ide-bg);
  border-bottom-color: var(--ide-accent);

  color: var(--ide-text-bright);
}

.editor-tab.dragging {
  opacity: 0.4;
}

.editor-tab:focus-visible {
  outline: 1px solid var(--ide-accent);
  outline-offset: -1px;
}

.tab-icon {
  flex: 0 0 16px;

  color: var(--ide-icon);
}

.editor-tab.active .tab-icon {
  color: var(--ide-text-bright);
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border: none;
  border-radius: 16px;
  background: none;

  color: var(--ide-icon);
  cursor: pointer;
  opacity: 0;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.editor-tab:hover .tab-close,
.editor-tab.active .tab-close,
.tab-close:focus-visible {
  opacity: 1;
}

.tab-close:hover {
  background-color: var(--ide-hover);
  color: var(--ide-text-bright);
}
</style>
