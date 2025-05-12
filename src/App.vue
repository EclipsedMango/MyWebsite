<script setup>
import NavBar from "@/components/NavBar.vue";
import {RouterView} from "vue-router";
</script>

<template>
  <div style="display: flex; flex-direction: row">
    <NavBar></NavBar>
    <RouterView></RouterView>
  </div>
</template>
<style>

</style>
