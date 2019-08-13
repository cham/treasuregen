<template>
  <form>
    <input-select inputid="type" label="Type" :options="['Individual', 'Hoard']" @change="onUpdateType"/>
    <input-select inputid="cr" label="CR" :options="['0-4', '5-10', '11-16', '17+']" @change="onUpdateCR"/>
    <input-checkbox inputid="includecrate" label="Include Crate Loot" :checked="false" @change="onUpdateIncludeCrateLoot"/>
    <input-range inputid="numcrateitems" :min="1" :max="50" :value="numCrateItems" @change="onUpdateNumCrateItems"/>
    <input-button @click="onGenerate">Generate</input-button>
    <div v-if="roll" class="roll-result">
      Roll
      <span class="roll-result--roll">{{roll}}</span>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InputSelect from '@/components/utils/InputSelect'
import InputButton from '@/components/utils/InputButton'
import InputCheckbox from '@/components/utils/InputCheckbox'
import InputRange from '@/components/utils/InputRange'

export default {
  components: {
    InputSelect,
    InputButton,
    InputCheckbox,
    InputRange
  },
  data () {
    return {
      type: '',
      cr: '',
      includeCrateLoot: false,
      numCrateItems: 10
    }
  },
  computed: mapGetters('treasure', ['roll']),
  methods: {
    ...mapActions('treasure', ['getTreasure']),
    onUpdateType (type) {
      this.type = type
    },
    onUpdateCR (cr) {
      this.cr = cr
    },
    onUpdateIncludeCrateLoot (includeCrateLoot) {
      this.includeCrateLoot = includeCrateLoot
    },
    onUpdateNumCrateItems (numCrateItems) {
      this.numCrateItems = parseInt(numCrateItems)
    },
    onGenerate () {
      this.getTreasure(this)
    }
  }
}
</script>

<style scoped>
form {
  background: #860;
  padding: 1vw 1vh;
  margin: 0;
}
.roll-result {
  float: right;
  height: 4.1vh;
  display: flex;
  align-items: center;
}
.roll-result--roll {
  font-weight: bold;
  margin-left: 0.4vw;
}
</style>
