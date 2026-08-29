<script setup>
import ModalDialog from "@/components/ModalDialog.vue";
import { closeSettings, settingsOpen } from "@/settingsdata.js";
import { setViewerMode, viewerMode } from "@/viewerdata.js";
</script>

<template>
  <ModalDialog
    :open="settingsOpen"
    title="Settings"
    labelled-by="settings-title"
    @close="closeSettings"
  >
    <h1 id="settings-title" class="dialog-title">Settings</h1>

    <div class="setting-row">
      <label class="setting-copy" for="setting-view">
        <span class="setting-label">Page style</span>
        <span class="setting-hint">How pages are shown in the editor.</span>
      </label>
      <select
        id="setting-view"
        class="setting-select"
        data-autofocus
        :value="viewerMode ?? 'ide'"
        @change="setViewerMode($event.target.value)"
      >
        <option value="ide">IDE: code editor</option>
        <option value="simple">Simple: plain pages</option>
      </select>
    </div>

    <p class="dialog-footnote">
      You can also switch with the <span class="dialog-code">mode</span> command in the terminal.
    </p>
  </ModalDialog>
</template>

<style scoped>
.dialog-title {
  color: var(--ide-text-bright);
  font-size: 20px;
  line-height: 1.3;
}

.setting-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 12px 14px;

  border: 4px solid var(--ide-border);
  border-radius: 6px;
  background-color: var(--ide-bar);
}

.setting-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;

  min-width: 0;
}

.setting-label {
  color: var(--ide-text-bright);
  font-size: 15px;
}

.setting-hint {
  color: var(--ide-text-muted);
  font-size: 12px;
}

.setting-select {
  flex: 0 0 auto;

  padding: 7px 10px;

  border: 4px solid var(--ide-border);
  border-radius: 4px;
  background-color: var(--ide-bg);
  color: var(--ide-text-bright);
  font-family: inherit;
  font-size: 14px;

  cursor: pointer;
  transition: border-color 0.15s ease;
}

.setting-select:hover {
  border-color: var(--ide-accent);
}

.setting-select:focus-visible {
  outline: 4px solid var(--ide-accent);
  outline-offset: 2px;
}

.dialog-footnote {
  color: var(--ide-text-muted);
  font-size: 12px;
}

.dialog-code {
  padding: 1px 5px;

  border-radius: 4px;
  background-color: var(--ide-bar);
  color: var(--ide-accent);
}

@media screen and (max-width: 600px) {
  .setting-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
