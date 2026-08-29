<script setup>
import { useRoute } from "vue-router";
import SimplePage from "@/components/SimplePage.vue";

const route = useRoute();
</script>

<template>
  <SimplePage title="Page not found" lead="There is nothing at this address.">
    <section class="simple-card">
      <h2 class="simple-heading">404</h2>
      <p>
        Nothing lives at <span class="missing-path">{{ route.path }}</span>.
        It may have been renamed, or the link that brought you here might be out of date.
      </p>
      <p class="simple-note">
        Try the list of pages on the left, or go <RouterLink to="/" class="simple-link">home</RouterLink>.
      </p>
    </section>
  </SimplePage>
</template>

<style scoped>
.missing-path {
  padding: 2px 6px;

  border-radius: 4px;
  background-color: #24282a;
  color: var(--simple-fg-bright);
  font-family: var(--code-font);
  font-size: 15px;
}
</style>
