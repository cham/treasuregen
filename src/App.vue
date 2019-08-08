<template>
  <div id="app">
    <div class="background-image"/>
    <div class="foreground-panel">
      <treasure-selector class="top-bar"/>
      <treasure-results/>
    </div>
  </div>
</template>

<script>
import TreasureSelector from '@/components/TreasureSelector'
import TreasureResults from '@/components/TreasureResults'

export default {
  components: {
    TreasureSelector,
    TreasureResults
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background: #000;
  height: 100%;
  font-size: 2.4vh;
}
.background-image,
.foreground-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.background-image {
  background: url(./assets/background.jpg);
  background-size: cover;
  opacity: 0.4;
}
.foreground-panel {
  overflow-y: auto;
  padding-top: 7vh;
}
.top-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
</style>
