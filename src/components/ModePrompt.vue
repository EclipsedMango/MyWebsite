<script setup>
import ModalDialog from "@/components/ModalDialog.vue";
import { dismissModePrompt, modePromptOpen, setViewerMode } from "@/viewerdata.js";
</script>

<template>
  <ModalDialog
    :open="modePromptOpen"
    title="Welcome"
    labelled-by="mode-prompt-title"
    @close="dismissModePrompt"
  >
    <h1 id="mode-prompt-title" class="dialog-title">How should this site look?</h1>
    <p class="dialog-question">Are you a programmer, or familiar with IDEs?</p>

    <div class="dialog-actions">
      <button class="dialog-button primary" type="button" data-autofocus @click="setViewerMode('ide')">
        <span class="button-label">Yes, I know my way around</span>
        <span class="button-hint">I'm cool</span>
      </button>
      <button class="dialog-button" type="button" @click="setViewerMode('simple')">
        <span class="button-label">No, keep it simple</span>
        <span class="button-hint">Just get to the point bro</span>
      </button>
    </div>

    <p class="dialog-footnote">
      You can switch later with the <span class="dialog-code">mode</span> command in the terminal or the
      <span class="dialog-code">settings</span> button in the left nav bar.
    </p>
  </ModalDialog>
</template>

<style scoped>
.dialog-title {
  color: var(--ide-text-bright);
  font-size: 20px;
  line-height: 1.3;
}

.dialog-question {
  color: var(--ide-text);
  font-size: 14px;
}

.dialog-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 2px;
}

.dialog-button {
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 12px 14px;

  border: 4px solid var(--ide-border);
  border-radius: 6px;
  background-color: var(--ide-bar);
  color: var(--ide-text);
  font-family: inherit;
  text-align: left;

  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.dialog-button:hover {
  background-color: var(--ide-hover);
  border-color: var(--ide-accent);
  color: var(--ide-text-bright);
}

.dialog-button:focus-visible {
  outline: 4px solid var(--ide-accent);
  outline-offset: 2px;
}

.dialog-button.primary {
  border-color: var(--ide-accent);
}

.button-label {
  font-size: 15px;
}

.button-hint {
  color: var(--ide-text-muted);
  font-size: 12px;
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
  .dialog-title {
    font-size: 18px;
  }
}
</style>
