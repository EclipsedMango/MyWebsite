import { computed, ref } from "vue";

export const terminalOpen = ref(true);

export const TERMINAL_HEIGHT = 365;
export const MIN_TERMINAL_HEIGHT = 110;
export const MIN_EDITOR_HEIGHT = 160;

export const terminalHeight = ref(TERMINAL_HEIGHT);
export const terminalResizing = ref(false);

export const terminalMounted = ref(false);
export const terminalOffset = computed(() => {
  if (!terminalMounted.value || !terminalOpen.value) {
    return 0;
  }

  return terminalHeight.value;
});

export function maxTerminalHeight() {
  const available = (typeof window === "undefined" ? 0 : window.innerHeight) - MIN_EDITOR_HEIGHT;

  return Math.max(MIN_TERMINAL_HEIGHT, available);
}

export function setTerminalHeight(height) {
  terminalHeight.value = Math.round(
    Math.min(Math.max(height, MIN_TERMINAL_HEIGHT), maxTerminalHeight())
  );
}

export function toggleTerminal() {
  terminalOpen.value = !terminalOpen.value;
}

export function closeTerminal() {
  terminalOpen.value = false;
}
