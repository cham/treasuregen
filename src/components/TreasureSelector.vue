<template>
  <form>
    <input-select inputid="type" label="Type" :options="['Individual', 'Hoard']" @change="onUpdateType"/>
    <input-select inputid="cr" label="CR" :options="['0-4', '5-10', '11-16', '17+']" @change="onUpdateCR"/>
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

export default {
  components: {
    InputSelect,
    InputButton
  },
  data () {
    return {
      type: '',
      cr: ''
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
    onGenerate () {
      this.getTreasure(this)
    }
  }
}
</script>

<style scoped>
form {
  padding: 0;
  margin: 0;
}
.roll-result {
  float: right;
  height: 3vh;
  display: flex;
  align-items: center;
}
.roll-result--roll {
  font-weight: bold;
  margin-left: 0.4vw;
}
</style>
