<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import CubeIconGradient from "@/components/Icons/CubeIconGradient.vue";
import { dismissModePrompt, modePromptOpen, setViewerMode } from "@/viewerdata.js";
import XIcon from "@/components/Icons/XIcon.vue";

const dialogRef = ref(null);
const primaryRef = ref(null);

onMounted(() => {
  focusPrimary();
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => window.removeEventListener("keydown", onKeydown));

watch(modePromptOpen, (open) => open && nextTick(focusPrimary));

function focusPrimary() {
  primaryRef.value?.focus();
}

function onKeydown(event) {
  if (event.key === "Escape" && modePromptOpen.value) {
    dismissModePrompt();
  }
}

function trapTab(event) {
  const focusable = dialogRef.value?.querySelectorAll("button");

  if (!focusable?.length) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
</script>

<template>
  <Transition name="mode-prompt">
    <div
      v-if="modePromptOpen"
      class="mode-prompt-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mode-prompt-title"
      @keydown.tab="trapTab"
    >
      <div ref="dialogRef" class="mode-prompt-dialog">
        <div class="dialog-bar">
          <div class="dialog-bar-first">
            <CubeIconGradient class="dialog-logo"></CubeIconGradient>
            <span class="dialog-bar-title">Welcome</span>
          </div>
          <button
            class="dialog-close"
            type="button"
            title="Close"
            aria-label="Close"
            @click="dismissModePrompt"
          >
            <XIcon></XIcon>
          </button>
        </div>

        <div class="dialog-body">
          <h1 id="mode-prompt-title" class="dialog-title">How should this site look?</h1>
          <p class="dialog-question">Are you a programmer, or familiar with IDEs?</p>

          <div class="dialog-actions">
            <button
              ref="primaryRef"
              class="dialog-button primary"
              type="button"
              @click="setViewerMode('ide')"
            >
              <span class="button-label">Yes, I know my way around</span>
              <span class="button-hint">I'm cool</span>
            </button>
            <button class="dialog-button" type="button" @click="setViewerMode('simple')">
              <span class="button-label">No, keep it simple</span>
              <span class="button-hint">Just get to the point bro</span>
            </button>
          </div>

          <p class="dialog-footnote">
            You can switch later with the <span class="dialog-code">mode</span> command in the terminal or <span class="dialog-code">settings tab</span> in the left nav bar.
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mode-prompt-overlay {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  inset: 0;
  z-index: 100;

  padding: 20px;

  background-color: rgba(12, 13, 14, 0.72);
  backdrop-filter: blur(3px);
}

.mode-prompt-dialog {
  display: flex;
  flex-direction: column;

  width: min(560px, 100%);

  border: 4px solid var(--ide-border);
  border-radius: 8px;
  background-color: var(--ide-bg);
  box-shadow: 0 18px 12px rgb(14 14 14 / 0.55);
  overflow: hidden;
}

.dialog-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;

  border-bottom: 4px solid var(--ide-border);
  background-color: var(--ide-bar);
}

.dialog-bar-first {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.dialog-close {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 26px;
  margin-left: auto;

  border: none;
  border-radius: 4px;
  background: none;

  color: var(--ide-icon);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.dialog-close:hover {
  background-color: var(--ide-hover-light);
  color: var(--ide-text-bright);
}

.dialog-close:focus-visible {
  outline: 4px solid var(--ide-accent);
  outline-offset: 2px;
}

.dialog-logo {
  width: 32px;
  height: 32px;
}

.dialog-bar-title {
  color: var(--ide-text);
  font-size: 23px;
}

.dialog-body {
  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 22px 24px 20px;
}

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

.mode-prompt-enter-active,
.mode-prompt-leave-active {
  transition: opacity 0.2s ease;
}

.mode-prompt-enter-active .mode-prompt-dialog,
.mode-prompt-leave-active .mode-prompt-dialog {
  transition: transform 0.2s ease;
}

.mode-prompt-enter-from,
.mode-prompt-leave-to {
  opacity: 0;
}

.mode-prompt-enter-from .mode-prompt-dialog,
.mode-prompt-leave-to .mode-prompt-dialog {
  transform: translateY(8px) scale(0.98);
}

@media screen and (max-width: 600px) {
  .dialog-body {
    padding: 18px 16px 16px;
  }

  .dialog-title {
    font-size: 18px;
  }
}
</style>
