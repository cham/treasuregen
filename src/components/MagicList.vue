<template>
  <div>
    <p v-if="!magic.length">None</p>
    <div v-for="magicData in magic" :key="magicData.magicType" :ref="itemRef(magicData)">
      {{magicData.amount}} x {{magicData.magicType}}
      <input-button class="magic-item-adddetail-btn" @click="showDetail(itemRef(magicData))">Add detail</input-button>
      <div class="magic-item-detail">
        <h4>Creator:</h4>
        <p>{{magicData.detail.creator}}</p>
        <h4>History:</h4>
        <p>{{magicData.detail.history}}</p>
        <h4>Minor Property:</h4>
        <p>{{magicData.detail.minorProperty}}</p>
        <h4>Quirk:</h4>
        <p>{{magicData.detail.quirk}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InputButton from '@/components/utils/InputButton'

export default {
  components: {
    InputButton
  },
  computed: mapGetters('treasure', ['magic']),
  methods: {
    itemRef (datum) {
      return datum.magicType.replace(/[^0-9A-Z]/ig, '_')
    },
    showDetail (ref) {
      const el = this.$refs[ref][0]
      el.querySelector('.magic-item-detail').style.display = 'block'
      el.querySelector('.magic-item-adddetail-btn').style.display = 'none'
    }
  }
}
</script>

<style scoped>
.magic-item-detail {
  display: none;
}
</style>
