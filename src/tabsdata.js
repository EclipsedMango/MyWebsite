import { computed, reactive, ref } from "vue";
import { fileTree } from "@/filetreedata.js";

const filesByRoute = {};

(function collectFiles(node) {
  if (node.type === "file" && node.route) {
    filesByRoute[node.route] = node;
  }

  node.children?.forEach(collectFiles);
})(fileTree);

export const openTabs = reactive([]);
export const activeTabRoute = ref(null);

export const hasOpenTabs = computed(() => openTabs.length > 0);

export function isOpenable(route) {
  return !!filesByRoute[route];
}

export function openTab(route) {
  const file = filesByRoute[route];

  if (!file) {
    return;
  }

  if (!openTabs.some((tab) => tab.route === route)) {
    openTabs.push({ route, name: file.name, path: file.path });
  }

  activeTabRoute.value = route;
}

export function closeTab(route) {
  const index = openTabs.findIndex((tab) => tab.route === route);

  if (index === -1) {
    return activeTabRoute.value;
  }

  openTabs.splice(index, 1);

  if (activeTabRoute.value !== route) {
    return activeTabRoute.value;
  }

  const neighbour = openTabs[index] ?? openTabs[index - 1] ?? null;
  activeTabRoute.value = neighbour?.route ?? null;

  return activeTabRoute.value;
}

export function syncRoute(route) {
  if (isOpenable(route)) {
    openTab(route);
    return;
  }

  activeTabRoute.value = null;
}
