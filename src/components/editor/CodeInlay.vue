<script setup>
import CodeLine from "@/components/editor/CodeLine.vue";

const props = defineProps({
  indent: { type: Number, default: 0 },
  label: { type: String, default: "" },
});
</script>

<template>
  <CodeLine :indent="indent" block>
    <div class="code-inlay">
      <div v-if="label" class="inlay-label">{{ label }}</div>
      <div class="inlay-body">
        <slot></slot>
      </div>
    </div>
  </CodeLine>
</template>

<style scoped>
.code-inlay {
  display: inline-block;
  max-width: 1000px;

  border: 3px solid var(--ide-border);
  border-radius: 8px;
  background-color: var(--code-inlay-bg);
}

.inlay-label {
  padding: 5px 12px;

  border-bottom: 3px solid var(--ide-border);
  background-color: var(--code-inlay-label-bg);

  color: var(--code-inlay-label-text);
  font-size: 13px;
  line-height: 1.4;
}

.inlay-body {
  padding: 12px;

  color: var(--code-inlay-base-text);
  font-size: 15px;
  line-height: 1.6;
}

.inlay-body :deep(img) {
  display: block;
  max-width: 100%;
  border-radius: 4px;
}

.inlay-body :deep(p) {
  margin: 0;
}

.inlay-body :deep(p + p) {
  margin-top: 8px;
}
</style>
