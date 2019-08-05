<template>
  <div id="app">
    <treasure-selector/>
    <div>
      Coins
      <input type="checkbox" @click="onShowInGP"> Show in GP
      <div v-if="!showInGP">
        <p v-for="coinData in coins" :key="coinData.coinType">
          {{coinData.amount}} {{coinData.coinType}}
        </p>
      </div>
      <div v-else>
        <p>
          {{coinTotal}} gp
        </p>
      </div>
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
  data () {
    return {
      showInGP: false
    }
  },
  computed: {
    ...mapGetters('treasure', ['coins']),
    coinTotal () {
      if (!this.coins.length) {
        return 0
      }
      return this.coins.reduce((memo, coinData) => {
        return memo + coinData.amountInGP
      }, 0).toFixed(2)
    }
  },
  methods: {
    onShowInGP () {
      this.showInGP = !this.showInGP
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
