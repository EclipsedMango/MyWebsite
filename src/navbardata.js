import { ref } from "vue";

export const navBarCollapsed = ref(false);
export const activeTool = ref("project");
export const SIDEBAR_WIDTH = 450;
export const TOOL_STRIP_WIDTH = 60;
export const SIDEBAR_WIDTH_COLLAPSED = TOOL_STRIP_WIDTH;

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
