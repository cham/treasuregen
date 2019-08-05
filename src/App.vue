<template>
  <div id="app">
    <treasure-selector/>
    <div>
      Coins
      <p v-for="coinRow in coins" :key="coinRow">{{coinRow}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TreasureSelector from '@/components/TreasureSelector'

export default {
  components: {
    TreasureSelector
  },
  computed: mapGetters('treasure', ['coins'])
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
