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
p {
  display: inline-block;
  margin: 0;
  margin-right: 1vw;
}
button {
  font-size: 2.4vh;
  border: 0;
  background: rgba(255,255,255,0.4);
  padding: 0.6vh 0.6vw;
  margin-left: 0.6vw;
  height: 4.1vh;
  cursor: pointer;
}
button:focus {
  outline: none;
}
</style>
