<template>
  <div>
    <p v-if="!gems.length">None</p>
    <p v-for="gemData in gems" :key="gemData.gemType">
      {{gemData.amount}} x {{gemData.gemType}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('treasure', ['gems'])
}
</script>

<style scoped>
</style>
