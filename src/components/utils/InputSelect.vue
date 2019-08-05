<template>
  <p>
    <label :for="inputid">{{label}}</label>
    <select :id="inputid" @change="onChange" v-model="selectedValue">
      <option v-for="option in options" :key="option" :value="option">{{option}}</option>
    </select>
  </p>
</template>

<script>
export default {
  props: {
    inputid: String,
    label: String,
    options: Array
  },
  data () {
    return {
      selectedValue: this.options[0]
    }
  },
  methods: {
    onChange () {
      this.$emit('change', this.selectedValue)
    }
  },
  mounted () {
    this.onChange()
  }
}
</script>

<style scoped>
</style>
