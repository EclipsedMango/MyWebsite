import {computed, ref} from "vue";

export const terminalCollapsed = ref(false);
export const delayedTerminalCollapse = ref(false);

export const TERMINAL_HEIGHT = 365;
export const TERMINAL_BAR_HEIGHT = 20;
export const TERMINAL_CLOSED_OFFSET = 20;

export const terminalMounted = ref(false);
export const terminalOffset = computed(() => {
  if (!terminalMounted.value) {
    return 0;
  }

  return terminalCollapsed.value ? TERMINAL_BAR_HEIGHT + TERMINAL_CLOSED_OFFSET : TERMINAL_HEIGHT;
});
