<template>
  <div>
    <p v-if="!art.length">None</p>
    <p v-for="artData in art" :key="artData.artType">
      {{artData.amount}} x {{artData.artType}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('treasure', ['art'])
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
</style>
