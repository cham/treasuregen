<template>
  <form>
    <input-select inputid="type" label="Type" :options="['Individual', 'Hoard']" @change="onUpdateType"/>
    <input-select inputid="cr" label="CR" :options="['0-4', '5-10', '11-16', '17+']" @change="onUpdateCR"/>
    <input-button @click="onGenerate">Generate</input-button>
  </form>
</template>

<script>
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
  methods: {
    onUpdateType (type) {
      this.type = type
    },
    onUpdateCR (cr) {
      this.cr = cr
    },
    onGenerate () {
      console.log(`${this.type} ${this.cr}`)
    }
  }
}
</script>

<style scoped>
</style>
