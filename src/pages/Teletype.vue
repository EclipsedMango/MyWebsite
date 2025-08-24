<script setup lang="ts">

</script>

<template>
  <div class="terminal-container">
    <span class="caret"></span>
  </div>
</template>

<style scoped>
.terminal-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: #000000;
  padding: 2rem 2rem;
  font-family: 'Courier New', Courier, monospace;
  box-sizing: border-box;
}

.caret {
  width: 1.0em;
  height: 0.4em;
  background-color: #ffffff;

  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to {
    background-color: transparent;
  }
  50% {
    background-color: #ffffff;
  }
}
</style>