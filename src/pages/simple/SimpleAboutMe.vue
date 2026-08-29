<script setup>
import SimplePage from "@/components/SimplePage.vue";
</script>

<template>
  <SimplePage title="About me" lead="A bit about who I am and what I am into.">
    <section class="simple-card">
      <h2 class="simple-heading">Not written yet</h2>
      <p>
        This site is still a work in progress, so this page has not been made yet. Writing the about me page is on the list.
      </p>
      <p class="simple-note">
        Head back <RouterLink to="/" class="simple-link">home</RouterLink> in the meantime.
      </p>
    </section>
  </SimplePage>
</template>
