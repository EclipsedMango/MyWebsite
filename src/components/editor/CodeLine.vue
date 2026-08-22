<script setup>
import { computed, getCurrentInstance, inject } from "vue";
import ChevronIcon from "@/components/Icons/ChevronIcon.vue";
import RunIcon from "@/components/Icons/RunIcon.vue";
import { EDITOR_KEY } from "@/components/editor/editorkeys.js";
import { terminalOpen } from "@/terminaldata.js";

const props = defineProps({
  indent: { type: Number, default: 0 },
  run: { type: Boolean, default: false },
  fold: { type: Boolean, default: false },
  folded: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
});

const emit = defineEmits(["toggle"]);

const editor = inject(EDITOR_KEY, null);
const uid = getCurrentInstance().uid;

const isCaretLine = computed(() => editor?.caretLine.value === uid);

function focus() {
  editor?.focusLine(uid);
}

function runIt() {
  terminalOpen.value = true;
}
</script>

<template>
  <div class="code-row" :class="{ caret: isCaretLine, block }" @click="focus">
    <div class="code-gutter">
      <button
        v-if="run"
        class="gutter-run"
        type="button"
        title="Run 'main()'"
        @click.stop="runIt"
      >
        <RunIcon></RunIcon>
      </button>
      <span class="code-number"></span>
      <button
        v-if="fold"
        class="gutter-fold"
        :class="{ folded }"
        type="button"
        :title="folded ? 'Expand' : 'Collapse'"
        @click.stop="emit('toggle')"
      >
        <ChevronIcon></ChevronIcon>
      </button>
    </div>

    <div class="code-content" :style="{ '--level': indent }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.code-row {
  counter-increment: line;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  min-height: var(--code-line);
}

.code-row.caret {
  background-color: var(--code-caret-row);
}

.code-gutter {
  position: relative;

  display: grid;
  grid-template-columns: 20px 1fr 14px;
  align-items: start;

  flex: 0 0 var(--code-gutter);
  width: var(--code-gutter);
  padding-right: 2px;

  user-select: none;
}

.code-number {
  grid-column: 2;
  padding-right: 6px;

  color: var(--ide-text-muted);
  font-size: 14px;
  line-height: var(--code-line);
  text-align: right;
}

.code-number::before {
  content: counter(line);
}

.code-row.caret .code-number {
  color: var(--ide-text-bright);
}

.gutter-run,
.gutter-fold {
  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--code-line);
  padding: 0;

  border: none;
  background: none;

  cursor: pointer;
}

.gutter-run {
  grid-column: 1;

  color: #59a869;
}

.gutter-run:hover {
  color: #6fc47f;
}

.gutter-fold {
  grid-column: 3;

  color: var(--ide-text-muted);
  transform: rotate(90deg);
  transition: transform 0.15s ease, color 0.15s ease;
}

.gutter-fold.folded {
  transform: rotate(0deg);
}

.gutter-fold:hover {
  color: var(--ide-text-bright);
}

.code-content {
  flex: 1;
  min-width: 0;
  padding-left: calc(var(--level) * var(--code-indent));
  padding-right: 32px;

  background-image: repeating-linear-gradient(
    to right,
    var(--ide-guide) 0 1px,
    transparent 1px var(--code-indent)
  );
  background-repeat: no-repeat;
  background-size: calc(var(--level) * var(--code-indent)) 100%;

  overflow-wrap: anywhere;
}

.code-row.block > .code-content {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
