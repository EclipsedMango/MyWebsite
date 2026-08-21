<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { isExpanded, toggleFolder } from "@/filetreedata.js";
import { iconForFile } from "@/fileicons.js";
import { openTab } from "@/tabsdata.js";
import ChevronIcon from "@/components/Icons/ChevronIcon.vue";
import FolderIcon from "@/components/Icons/FolderIcon.vue";

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
});

const route = useRoute();

const isFolder = computed(() => props.node.type === "folder");
const expanded = computed(() => isExpanded(props.node.path));
const selected = computed(() => !!props.node.route && route.path === props.node.route);

const icon = computed(() => {
  if (isFolder.value) {
    return FolderIcon;
  }

  return iconForFile(props.node.name);
});

const rowTag = computed(() => {
  if (isFolder.value) return "button";
  return props.node.href ? "a" : RouterLink;
});

const rowAttrs = computed(() => {
  if (isFolder.value) {
    return { type: "button", "aria-expanded": expanded.value };
  }

  if (props.node.href) {
    return { href: props.node.href, target: "_blank", rel: "noopener noreferrer" };
  }

  return { to: props.node.route };
});

const indent = computed(() => `${props.depth * 16 + 6}px`);
const guideOffset = computed(() => `${props.depth * 16 + 14}px`);

function onActivate() {
  if (isFolder.value) {
    toggleFolder(props.node.path);
    return;
  }

  if (props.node.route) {
    openTab(props.node.route);
  }
}
</script>

<template>
  <component
    :is="rowTag"
    v-bind="rowAttrs"
    class="tree-row"
    :class="{ selected, 'is-folder': isFolder }"
    :style="{ paddingLeft: indent }"
    role="treeitem"
    @click="onActivate"
  >
    <span class="tree-chevron" :class="{ open: expanded, hidden: !isFolder }">
      <ChevronIcon></ChevronIcon>
    </span>
    <component :is="icon" class="tree-icon"></component>
    <span class="tree-label">{{ node.name }}</span>
  </component>

  <div v-if="isFolder && expanded" class="tree-children" role="group" :style="{ '--guide-offset': guideOffset }">
    <FileTreeNode
      v-for="child in node.children"
      :key="child.path"
      :node="child"
      :depth="depth + 1"
    ></FileTreeNode>
  </div>
</template>

<style scoped>
.tree-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  width: 100%;
  height: 36px;
  padding-right: 8px;

  border: none;
  border-radius: 4px;
  background: none;

  font-family: "JetBrains Mono", "Roboto Mono", monospace;
  font-size: 16px;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;

  color: var(--ide-text);
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.tree-row:hover {
  background-color: var(--ide-hover);
}

.tree-row.selected {
  background-color: var(--ide-selected);
  color: var(--ide-text-bright);
}

.tree-row:focus-visible {
  outline: 1px solid var(--ide-accent);
  outline-offset: -1px;
}

.tree-chevron {
  display: flex;
  align-items: center;

  flex: 0 0 16px;

  color: var(--ide-text-muted);
  transition: transform 0.15s ease;
}

.tree-chevron.open {
  transform: rotate(90deg);
}

.tree-chevron.hidden {
  visibility: hidden;
}

.tree-icon {
  flex: 0 0 16px;
  color: var(--ide-icon);
}

.tree-row.selected .tree-icon {
  color: var(--ide-text-bright);
}

.tree-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-children {
  position: relative;
}

.tree-children::before {
  content: "";

  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--guide-offset);

  //border-left: 1px solid var(--ide-guide);
}
</style>
