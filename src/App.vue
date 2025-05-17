<script>
import NavBar from "@/components/NavBar.vue";
import {computed} from "vue";
import {navBarCollapsed, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED} from "@/navbardata.js";
export default {
  components: {NavBar},
  setup() {
    const sideBarWidth = computed(() => `${navBarCollapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`);
    return {sideBarWidth}
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: row;">
    <div style="position: fixed; top: 0">
      <NavBar></NavBar>
    </div>
    <div style="transition: 0.25s ease;" :style="{ paddingLeft: sideBarWidth }">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<style>

</style>
