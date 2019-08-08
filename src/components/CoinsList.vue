<template>
  <div>
    <p v-if="!coins.length">None</p>
    <p v-for="coinData in coins" :key="coinData.coinType">
      {{coinData.amount}} {{coinData.coinType}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('treasure', ['coins'])
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
</style>
