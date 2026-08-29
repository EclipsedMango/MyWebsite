<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import CubeIconGradient from "@/components/Icons/CubeIconGradient.vue";
import XIcon from "@/components/Icons/XIcon.vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: "" },
  labelledBy: { type: String, default: undefined },
});

const emit = defineEmits(["close"]);

const dialogRef = ref(null);

const FOCUSABLE = "button, select, input, a[href], [tabindex]:not([tabindex='-1'])";

onMounted(() => {
  focusFirst();
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => window.removeEventListener("keydown", onKeydown));

watch(() => props.open, (open) => open && nextTick(focusFirst));

function focusFirst() {
  const dialog = dialogRef.value;
  const target = dialog?.querySelector("[data-autofocus]") ?? dialog?.querySelector(FOCUSABLE);

  target?.focus();
}

function onKeydown(event) {
  if (event.key === "Escape" && props.open) {
    emit("close");
  }
}

function trapTab(event) {
  const focusable = dialogRef.value?.querySelectorAll(FOCUSABLE);

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
  <Transition name="modal">
    <div
      v-if="open"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="labelledBy"
      @keydown.tab="trapTab"
    >
      <div ref="dialogRef" class="modal-dialog">
        <div class="dialog-bar">
          <div class="dialog-bar-first">
            <CubeIconGradient class="dialog-logo"></CubeIconGradient>
            <span class="dialog-bar-title">{{ title }}</span>
          </div>
          <button
            class="dialog-close"
            type="button"
            title="Close"
            aria-label="Close"
            @click="emit('close')"
          >
            <XIcon></XIcon>
          </button>
        </div>

        <div class="dialog-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
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

.modal-dialog {
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  transform: translateY(8px) scale(0.98);
}

@media screen and (max-width: 600px) {
  .dialog-body {
    padding: 18px 16px 16px;
  }
}
</style>
