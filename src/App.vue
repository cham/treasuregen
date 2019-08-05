<template>
  <div id="app">
    <treasure-selector/>
  </div>
</template>

<script>
import TreasureSelector from '@/components/TreasureSelector'

export default {
  components: {
    TreasureSelector
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
