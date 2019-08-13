<template>
  <div class="treasure-results">
    <div v-if="roll">
      <div v-if="coins.length" class="treasure-results--listwrapper treasure-results--coins">
        <label for="coins-toggle" class="treasure-results--label">
          Coins - {{coinTotal}} gp
          <span class="treasure-results--expand">Click to expand</span>
        </label>
        <input id="coins-toggle" class="treasure-results--toggle" type="checkbox"/>
        <coins-list class="treasure-results--list"/>
      </div>
      <div v-if="gems.length" class="treasure-results--listwrapper treasure-results--gems">
        <label for="gems-toggle" class="treasure-results--label">
          Gems - {{gemsTotal}} gp
          <span class="treasure-results--expand">Click to expand</span>
        </label>
        <input id="gems-toggle" class="treasure-results--toggle" type="checkbox"/>
        <gems-list class="treasure-results--list"/>
      </div>
      <div v-if="art.length" class="treasure-results--listwrapper treasure-results--art">
        <label for="art-toggle" class="treasure-results--label">
          Art - {{artTotal}} gp
          <span class="treasure-results--expand">Click to expand</span>
        </label>
        <input id="art-toggle" class="treasure-results--toggle" type="checkbox"/>
        <art-list class="treasure-results--list"/>
      </div>
      <div class="totalgold">
        Total gold value - {{totalGoldValue}} gp
      </div>
      <div v-if="magic.length" class="treasure-results--listwrapper treasure-results--magic">
        Magic items
        <magic-list class="treasure-results--list"/>
      </div>
      <div v-if="crateItems.length" class="treasure-results--listwrapper treasure-results--crate">
        Crate items
        <crate-list class="treasure-results--list"/>
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
import CrateList from '@/components/CrateList'

const sumGPValue = arr => arr.reduce((memo, datum) => {
  return memo + datum.amountInGP
}, 0)

export default {
  components: {
    CoinsList,
    GemsList,
    ArtList,
    MagicList,
    CrateList
  },
  computed: {
    ...mapGetters('treasure', ['coins', 'gems', 'art', 'roll', 'magic', 'crateItems']),
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
.treasure-results {
  padding: 1vw 1vh;
  margin: 0;
}
.treasure-results--listwrapper {
  background: rgba(255, 255, 255, 0.2);
  padding: 1vw 1vh;
  margin-bottom: 1vh;
}
.totalgold {
  padding: 1vw 1vh;
  margin-bottom: 1vh;
}
.treasure-results--label {
  cursor: pointer;
  display: block;
}
.treasure-results--expand {
  float: right;
}
.treasure-results--list,
.treasure-results--toggle {
  display: none;
}
.treasure-results--list {
  margin-top: 1vh;
}
.treasure-results--toggle:checked + .treasure-results--list,
.treasure-results--magic .treasure-results--list,
.treasure-results--crate .treasure-results--list {
  display: block;
}
</style>
