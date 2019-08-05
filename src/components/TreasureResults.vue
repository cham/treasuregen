<template>
  <div>
    <div>
      Coins - {{coinTotal}} gp
      <coins-list/>
    </div>
    <div>
      Gems - {{gemsTotal}} gp
      <gems-list/>
    </div>
    <div>
      Total gold value - {{totalGoldValue}} gp
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CoinsList from '@/components/CoinsList'
import GemsList from '@/components/GemsList'

const sumGPValue = arr => arr.reduce((memo, datum) => {
  return memo + datum.amountInGP
}, 0)

export default {
  components: {
    CoinsList,
    GemsList
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

<style scoped>
</style>
