<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { fileTree, revealRoute } from "@/filetreedata.js";
import FileTreeNode from "@/components/FileTreeNode.vue";

const route = useRoute();

watch(() => route.path, (path) => revealRoute(path), { immediate: true });
</script>

<template>
  <div class="file-tree" role="tree" aria-label="Project files">
    <FileTreeNode :node="fileTree"></FileTreeNode>
  </div>
</template>

<style scoped>
.file-tree {
  flex: 1;

  padding: 12px;

  overflow-y: auto;
  overflow-x: auto;
}

.file-tree::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.file-tree::-webkit-scrollbar-thumb {
  background-color: var(--ide-scrollbar);
  border: 2px solid transparent;
  background-clip: content-box;
  border-radius: 5px;
}

.file-tree::-webkit-scrollbar-thumb:hover {
  background-color: var(--ide-scrollbar-hover);
}

.file-tree::-webkit-scrollbar-track {
  background: transparent;
}
</style>
