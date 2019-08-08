<template>
  <div>
    <div v-if="roll">
      <div v-if="coins.length">
        Coins - {{coinTotal}} gp
        <coins-list/>
      </div>
      <div v-if="gems.length">
        Gems - {{gemsTotal}} gp
        <gems-list/>
      </div>
      <div v-if="art.length">
        Art - {{artTotal}} gp
        <art-list/>
      </div>
      <div v-if="magic.length">
        Magic
        <magic-list/>
      </div>
      <div>
        Total gold value - {{totalGoldValue}} gp
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CoinsList from '@/components/CoinsList'
import GemsList from '@/components/GemsList'
import ArtList from '@/components/ArtList'
import MagicList from '@/components/MagicList'

const sumGPValue = arr => arr.reduce((memo, datum) => {
  return memo + datum.amountInGP
}, 0)

export default {
  components: {
    CoinsList,
    GemsList,
    ArtList,
    MagicList
  },
  computed: {
    ...mapGetters('treasure', ['coins', 'gems', 'art', 'roll', 'magic']),
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
    artTotal () {
      if (!this.art.length) {
        return '0.00'
      }
      return sumGPValue(this.art).toFixed(2)
    },
    totalGoldValue () {
      return (sumGPValue(this.coins) + sumGPValue(this.gems) + sumGPValue(this.art)).toFixed(2)
    }
  }
}
</script>

<style scoped>
</style>
