<script setup>
import { computed, provide, ref } from "vue";
import { iconForFile } from "@/fileicons.js";
import ChevronIcon from "@/components/Icons/ChevronIcon.vue";
import FolderIcon from "@/components/Icons/FolderIcon.vue";
import { EDITOR_KEY } from "@/components/editor/editorkeys.js";

const props = defineProps({
  path: { type: Array, default: () => [] },
  status: { type: String, default: "No problems" },
});

const crumbs = computed(() => props.path.map((name, index) => ({
  name,
  icon: index === props.path.length - 1 ? iconForFile(name) : FolderIcon,
})));

const caretLine = ref(null);

provide(EDITOR_KEY, {
  caretLine,
  focusLine: (id) => (caretLine.value = id),
});
</script>

<template>
  <div class="code-editor">
    <div v-if="crumbs.length" class="editor-breadcrumbs">
      <template v-for="(crumb, index) in crumbs" :key="crumb.name">
        <ChevronIcon v-if="index > 0" class="crumb-separator"></ChevronIcon>
        <span class="crumb">
          <component :is="crumb.icon" class="crumb-icon"></component>
          {{ crumb.name }}
        </span>
      </template>
    </div>

    <div class="editor-body">
      <div class="editor-scroll">
        <div class="editor-lines">
          <slot></slot>
        </div>
      </div>

      <div class="editor-status" :title="status">
        <span class="status-dot"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-editor {
  display: flex;
  flex-direction: column;

  flex: 1;
  min-width: 0;
  min-height: 0;

  background-color: var(--ide-bg);
  font-family: var(--code-font);
}

.editor-breadcrumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;

  flex: 0 0 auto;
  padding: 4px 12px;

  color: var(--ide-text);
  font-size: 13px;
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}

.crumb {
  display: inline-flex;
  align-items: center;
  gap: 5px;

  padding: 1px 4px;
  border-radius: 3px;
}

.crumb:last-child {
  color: var(--ide-text-bright);
}

.crumb-icon {
  flex: 0 0 14px;
  width: 14px;
  height: 14px;

  color: var(--ide-icon);
}

.crumb-separator {
  flex: 0 0 12px;
  width: 12px;
  height: 12px;

  color: var(--ide-text-muted);
}

.editor-body {
  position: relative;

  display: flex;
  flex-direction: row;

  flex: 1;
  min-height: 0;
}

.editor-scroll {
  flex: 1;
  min-width: 0;

  overflow-y: auto;
  overflow-x: hidden;
}

.editor-lines {
  counter-reset: line;

  min-height: 100%;
  padding-bottom: 24px;

  background-image: linear-gradient(
    to right,
    var(--code-gutter-bg) 0 var(--code-gutter),
    var(--ide-bg) var(--code-gutter)
  );

  font-size: var(--code-size);
  line-height: var(--code-line);
  color: var(--code-fg);
}

.editor-status {
  position: absolute;
  top: 6px;
  right: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 14px;
  height: 14px;
}

.status-dot {
  width: 8px;
  height: 8px;

  border-radius: 50%;
  background-color: #4a9c5b;
}

.editor-scroll::-webkit-scrollbar {
  width: 12px;
}

.editor-scroll::-webkit-scrollbar-thumb {
  background-color: var(--ide-scrollbar);
  border: 3px solid var(--ide-bg);
  border-radius: 6px;
}

.editor-scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--ide-scrollbar-hover);
}

.editor-scroll::-webkit-scrollbar-track {
  background: transparent;
}
</style>
