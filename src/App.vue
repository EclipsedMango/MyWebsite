<script setup>
import { computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import { navBarCollapsed, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from "@/navbardata.js";

const sideBarWidth = computed(() => `${navBarCollapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`);
</script>

<template>
  <div class="main-app">
    <NavBar></NavBar>
    <main class="app-content" :style="{ marginLeft: sideBarWidth }">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style>
.main-app {
  display: flex;
  flex-direction: row;

  width: 100vw;
  height: 100vh;

  background: linear-gradient(to bottom right, #1b1d1e, #0c0d0e);
}

.app-content {
  display: flex;
  flex-direction: row;
  justify-content: center;

  flex: 1;
  min-width: 0;
  height: 100%;

  overflow: auto;
  transition: margin-left 0.25s ease;
}
</style>
