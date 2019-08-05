<template>
  <p>
    <label v-if="label" :for="inputid">{{label}}</label>
    <button :id="inputid" @click="onClick"><slot/></button>
  </p>
</template>

<script>
export default {
  props: {
    inputid: String,
    label: String
  },
  methods: {
    onClick (e) {
      e.preventDefault()
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
</style>
