import { computed, ref } from "vue";

const STORAGE_KEY = "viewer-mode";

export const VIEWER_MODES = ["ide", "simple"];

function readStoredMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return VIEWER_MODES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
  }
}

export const viewerMode = ref(readStoredMode());
export const modePromptOpen = ref(viewerMode.value === null);

export const simpleMode = computed(() => viewerMode.value === "simple");

export function setViewerMode(mode) {
  if (!VIEWER_MODES.includes(mode)) {
    return;
  }

  viewerMode.value = mode;
  writeStoredMode(mode);
  modePromptOpen.value = false;
}

export function dismissModePrompt() {
  if (viewerMode.value === null) {
    setViewerMode("ide");
    return;
  }

  modePromptOpen.value = false;
}

export function askViewerMode() {
  modePromptOpen.value = true;
}
