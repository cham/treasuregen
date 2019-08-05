<template>
  <div id="app">
    <treasure-selector/>
    <div>
      Coins - {{coinTotal}} gp
      <p v-if="!coins.length">None</p>
      <p v-for="coinData in coins" :key="coinData.coinType">
        {{coinData.amount}} {{coinData.coinType}}
      </p>
    </div>
    <div>
      Gems - {{gemsTotal}} gp
      <p v-if="!gems.length">None</p>
      <p v-for="gemData in gems" :key="gemData.gemType">
        {{gemData.amount}} x {{gemData.gemType}}
      </p>
    </div>
    <div>
      Total gold value - {{totalGoldValue}} gp
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TreasureSelector from '@/components/TreasureSelector'

const sumGPValue = arr => arr.reduce((memo, datum) => {
  return memo + datum.amountInGP
}, 0)

export default {
  components: {
    TreasureSelector
  },
  computed: {
    ...mapGetters('treasure', ['coins', 'gems']),
    coinTotal () {
      if (!this.coins.length) {
        return '0.00'
      }
      return sumGPValue(this.coins).toFixed(2)
    },
    gemsTotal () {
      if (!this.gems.length) {
        return '0.00'
      }
      return sumGPValue(this.gems).toFixed(2)
    },
    totalGoldValue () {
      return (sumGPValue(this.coins) + sumGPValue(this.gems)).toFixed(2)
    }
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
