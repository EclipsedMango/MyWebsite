import { computed, ref } from "vue";

export const terminalOpen = ref(true);

export const TERMINAL_HEIGHT = 365;

export const terminalMounted = ref(false);
export const terminalOffset = computed(() => {
  if (!terminalMounted.value || !terminalOpen.value) {
    return 0;
  }

  return TERMINAL_HEIGHT;
});

export function toggleTerminal() {
  terminalOpen.value = !terminalOpen.value;
}

export function closeTerminal() {
  terminalOpen.value = false;
}
