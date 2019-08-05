<template>
  <div id="app">
    <treasure-selector/>
    <treasure-results/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
