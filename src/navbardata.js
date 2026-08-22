import { ref } from "vue";

export const navBarCollapsed = ref(false);
export const activeTool = ref("project");
export const SIDEBAR_WIDTH = 450;
export const TOOL_STRIP_WIDTH = 60;
export const SIDEBAR_WIDTH_COLLAPSED = TOOL_STRIP_WIDTH;
export const MIN_SIDEBAR_WIDTH = 220;
export const MIN_EDITOR_WIDTH = 320;

export const sidebarWidth = ref(SIDEBAR_WIDTH);
export const sidebarResizing = ref(false);

export function maxSidebarWidth() {
  const available = (typeof window === "undefined" ? 0 : window.innerWidth) - MIN_EDITOR_WIDTH;

  return Math.max(MIN_SIDEBAR_WIDTH, available);
}

export function setSidebarWidth(width) {
  sidebarWidth.value = Math.round(
    Math.min(Math.max(width, MIN_SIDEBAR_WIDTH), maxSidebarWidth())
  );
}

export const TOOLS = {
  project: { title: "Project", subtitle: "" },
  "version-control": { title: "Version Control", subtitle: "Log" },
};

export function selectTool(tool) {
  if (activeTool.value === tool && !navBarCollapsed.value) {
    navBarCollapsed.value = true;
    return;
  }

  activeTool.value = tool;
  navBarCollapsed.value = false;
}
