<template>
  <div>
    <p v-if="!magic.length">None</p>
    <p v-for="magicData in magic" :key="magicData.magicType">
      {{magicData.amount}} x {{magicData.magicType}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('treasure', ['magic'])
}
</script>

<style scoped>
</style>
