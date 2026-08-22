<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import FileTree from "@/components/FileTree.vue";
import VersionControl from "@/components/VersionControl.vue";
import FolderIcon from "@/components/Icons/FolderIcon.vue";
import GitBranchIcon from "@/components/Icons/GitBranchIcon.vue";
import CollapseIcon from "@/components/Icons/CollapseIcon.vue";
import TerminalIcon from "@/components/Icons/TerminalIcon.vue";
import {
  activeTool,
  navBarCollapsed,
  selectTool,
  setSidebarWidth,
  sidebarResizing,
  sidebarWidth,
  TOOLS,
  TOOL_STRIP_WIDTH,
} from "@/navbardata.js";
import { terminalOffset, terminalOpen, terminalResizing, toggleTerminal } from "@/terminaldata.js";

const TOOL_BUTTONS = [
  { id: "project", icon: FolderIcon },
  { id: "version-control", icon: GitBranchIcon },
];

const toolWindowBottom = computed(() => `${terminalOffset.value}px`);

const width = computed(() => `${navBarCollapsed.value ? TOOL_STRIP_WIDTH : sidebarWidth.value}px`);

/* Dragging the right edge resizes the tool window. */
let resizeStartX = 0;
let resizeStartWidth = 0;

function startResize(event) {
  if (event.button !== 0) {
    return;
  }

  resizeStartX = event.clientX;
  resizeStartWidth = sidebarWidth.value;
  sidebarResizing.value = true;

  event.currentTarget.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function onResize(event) {
  if (!sidebarResizing.value) {
    return;
  }

  setSidebarWidth(resizeStartWidth + (event.clientX - resizeStartX));
}

function stopResize(event) {
  if (!sidebarResizing.value) {
    return;
  }

  sidebarResizing.value = false;

  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
}

function nudgeResize(step) {
  setSidebarWidth(sidebarWidth.value + step);
}

function clampToViewport() {
  setSidebarWidth(sidebarWidth.value);
}

onMounted(() => window.addEventListener("resize", clampToViewport));
onUnmounted(() => window.removeEventListener("resize", clampToViewport));

const currentTool = computed(() => TOOLS[activeTool.value]);

function isOpen(tool) {
  return !navBarCollapsed.value && activeTool.value === tool;
}

function toggleNavBar() {
  navBarCollapsed.value = !navBarCollapsed.value;
}
</script>

<template>
  <aside
    class="sidenav-base"
    :class="{ resizing: sidebarResizing }"
    id="sidenav"
    :style="{ width }"
  >
    <div class="tool-strip">
      <button
        v-for="tool in TOOL_BUTTONS"
        :key="tool.id"
        class="tool-strip-button"
        :class="{ active: isOpen(tool.id) }"
        type="button"
        :title="TOOLS[tool.id].title"
        :aria-pressed="isOpen(tool.id)"
        @click="selectTool(tool.id)"
      >
        <component :is="tool.icon" class="strip-icon"></component>
      </button>

      <button
        class="tool-strip-button strip-bottom"
        :class="{ active: terminalOpen }"
        type="button"
        title="Terminal"
        :aria-pressed="terminalOpen"
        @click="toggleTerminal"
      >
        <TerminalIcon class="strip-icon"></TerminalIcon>
      </button>
    </div>

    <div
      v-show="!navBarCollapsed"
      class="tool-window"
      :class="{ resizing: terminalResizing }"
      :style="{ marginBottom: toolWindowBottom }"
    >
      <div class="tool-window-header">
        <div class="tool-window-name">{{ currentTool.title }}</div>
        <span class="tool-window-title">{{ currentTool.subtitle }}</span>
        <button class="header-button" type="button" title="Hide" @click="toggleNavBar">
          <CollapseIcon></CollapseIcon>
        </button>
      </div>
      <FileTree v-if="activeTool === 'project'"></FileTree>
      <VersionControl v-else-if="activeTool === 'version-control'"></VersionControl>
    </div>

    <div
      v-show="!navBarCollapsed"
      class="sidenav-resize-handle"
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize tool window"
      tabindex="0"
      title="Drag to resize"
      :style="{ bottom: toolWindowBottom }"
      @pointerdown="startResize"
      @pointermove="onResize"
      @pointerup="stopResize"
      @pointercancel="stopResize"
      @keydown.left.prevent="nudgeResize(-20)"
      @keydown.right.prevent="nudgeResize(20)"
    ></div>
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

.sidenav-base.resizing {
  transition: none;
}

.sidenav-resize-handle {
  position: absolute;
  top: 0;
  right: -6px;

  width: 8px;

  cursor: ew-resize;
  touch-action: none;
}

.sidenav-resize-handle::after {
  content: "";

  position: absolute;
  top: 0;
  bottom: 0;
  left: 3px;

  width: 3px;

  background-color: var(--ide-accent);
  opacity: 0;
  transition: opacity 0.12s ease;
}

.sidenav-resize-handle:hover::after,
.sidenav-resize-handle:focus-visible::after,
.sidenav-base.resizing .sidenav-resize-handle::after {
  opacity: 1;
}

.sidenav-resize-handle:focus-visible {
  outline: none;
}

.tool-strip {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 4px;

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

.strip-bottom {
  margin-top: auto;
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
  min-height: 0;

  background-color: var(--ide-bg);
  overflow: hidden;
}

.tool-window.resizing {
  transition: none;
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

.tool-window-name {
  font-size: 18px;
  padding: 10px 10px;

  white-space: nowrap;

  color: var(--ide-text-bright);
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
