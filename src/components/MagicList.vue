<template>
  <div>
    <p v-if="!magic.length">None</p>
    <div v-for="magicData in magic" :key="magicData.magicType">
      <label :for="`item-detail-toggle--${itemRef(magicData)}`" class="item-detail--toggle-label">
        <span class="item-detail-toggle--showdetail">Show Detail</span>
        {{magicData.amount}} x {{magicData.magicType}}
      </label>
      <input :id="`item-detail-toggle--${itemRef(magicData)}`" type="checkbox" class="item-detail--toggle">
      <div class="magic-item-detail">
        <table>
          <tr v-for="creator in magicData.detail.creators" :key="creator" >
            <td class="magic-item-detail--name">Creator</td>
            <td class="magic-item-detail--description" v-html="formatDetailText(creator)"/>
          </tr>
          <tr v-for="history in magicData.detail.histories" :key="history">
            <td class="magic-item-detail--name">History</td>
            <td class="magic-item-detail--description" v-html="formatDetailText(history)"/>
          </tr>
          <tr v-for="minorProperty in magicData.detail.minorProperties" :key="minorProperty">
            <td class="magic-item-detail--name">Minor Property</td>
            <td class="magic-item-detail--description" v-html="formatDetailText(minorProperty)"/>
          </tr>
          <tr v-for="quirk in magicData.detail.quirks" :key="quirk">
            <td class="magic-item-detail--name">Quirk</td>
            <td class="magic-item-detail--description" v-html="formatDetailText(quirk)"/>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('treasure', ['magic']),
  methods: {
    itemRef (datum) {
      return datum.magicType.replace(/[^0-9A-Z]/ig, '_')
    },
    formatDetailText (txt) {
      return txt.replace(/^(.*?)\./, "<span class=\"feature-name\">$1</span>.")
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.item-detail--toggle-label {
  display: block;
  cursor: pointer;
}
.item-detail-toggle--showdetail {
  float: right;
}
.item-detail--toggle,
.magic-item-detail {
  display: none;
}
.magic-item-detail p {
  margin-bottom: 1vh;
}
.item-detail--toggle:checked + .magic-item-detail {
  display: block;
  padding: 1vh 5vw;
}
td {
  padding: 1vh 0;
}
.magic-item-detail--name {
  vertical-align: top;
  font-weight: bold;
  padding-right: 2vw;
  white-space: nowrap;
}
.magic-item-detail--description {
  border-bottom: 1px solid #ccc;
}
tr:last-child .magic-item-detail--description {
  border: 0;
}
</style>
<style>
.feature-name {
  font-weight: bold;
}
</style>
