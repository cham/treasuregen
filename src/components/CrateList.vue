<template>
  <div>
    <p v-if="!crateItems.length">None</p>
    <div v-for="crateItem in crateItems" :key="crateItem">
      <p>
        {{crateItem}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('treasure', ['crateItems'])
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
</style>
