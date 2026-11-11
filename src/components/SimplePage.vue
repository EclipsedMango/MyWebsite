<script setup>
defineProps({
  title: { type: String, default: "" },
  lead: { type: String, default: "" },
});
</script>

<template>
  <div class="simple-page">
    <div class="simple-scroll">
      <div class="simple-content">
        <header v-if="title || lead" class="simple-header">
          <h1 class="simple-heading simple-title">{{ title }}<span class="simple-cursor">_</span></h1>
          <p v-if="lead" class="simple-lead">{{ lead }}</p>
        </header>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.simple-page {
  display: flex;
  flex-direction: column;

  flex: 1;
  min-width: 0;
  min-height: 0;

  background-color: var(--ide-bg);
  color: var(--simple-fg);
  font-family: var(--simple-font);
}

.simple-scroll {
  flex: 1;
  min-height: 0;

  overflow-y: auto;
  overflow-x: hidden;
}

.simple-content {
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 44px 32px 48px;

  container-type: inline-size;
}

.simple-header {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.simple-title {
  font-size: clamp(44px, 7vw, 72px);
  line-height: 1;
}

.simple-lead {
  color: var(--simple-fg-muted);
  font-size: 18px;
  line-height: 1.6;
}

.simple-scroll::-webkit-scrollbar {
  width: 12px;
}

.simple-scroll::-webkit-scrollbar-thumb {
  background-color: var(--ide-scrollbar);
  border: 3px solid var(--ide-bg);
  border-radius: 6px;
}

.simple-scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--ide-scrollbar-hover);
}

.simple-scroll::-webkit-scrollbar-track {
  background: transparent;
}

@media screen and (max-width: 700px) {
  .simple-content {
    padding: 32px 20px 48px;
  }

  .simple-title {
    font-size: 40px;
  }
}
</style>
