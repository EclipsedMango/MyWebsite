import { ref } from "vue";

export const settingsOpen = ref(false);

export function openSettings() {
  settingsOpen.value = true;
}

export function closeSettings() {
  settingsOpen.value = false;
}

export function toggleSettings() {
  settingsOpen.value = !settingsOpen.value;
}
