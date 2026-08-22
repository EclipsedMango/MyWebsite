<script setup>
import { ref } from "vue";
import CodeLine from "@/components/editor/CodeLine.vue";

const props = defineProps({
  indent: { type: Number, default: 0 },
  run: { type: Boolean, default: false },
  tail: { type: String, default: "}" },
  startOpen: { type: Boolean, default: true },
});

const open = ref(props.startOpen);
</script>

<template>
  <CodeLine :indent="indent" :run="run" fold :folded="!open" @toggle="open = !open">
    <slot name="head"></slot>
    <template v-if="!open">
      <span class="fold-chip" title="Expand" @click.stop="open = true">...</span>
      <span class="t-p">{{ tail }}</span>
    </template>
  </CodeLine>

  <div class="fold-region" :class="{ collapsed: !open }" :inert="!open" :aria-hidden="!open">
    <div class="fold-inner">
      <slot></slot>
      <CodeLine :indent="indent">
        <span class="t-p">{{ tail }}</span>
      </CodeLine>
    </div>
  </div>
</template>

<style scoped>
.fold-region {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;

  transition: grid-template-rows 0.18s ease;
}

.fold-region.collapsed {
  grid-template-rows: 0fr;
}

.fold-inner {
  min-height: 0;
}

.fold-chip {
  margin: 0 4px;
  padding: 0 5px;

  border-radius: 3px;
  background-color: var(--ide-hover-light);

  color: var(--ide-text);
  cursor: pointer;
}

.fold-chip:hover {
  background-color: var(--ide-selected);
  color: var(--ide-text-bright);
}
</style>
