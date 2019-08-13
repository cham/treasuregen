<template>
  <p>
    <label :for="inputid">{{label}}</label>
    <input type="range" :id="inputid" @change="onChange" v-model="selectedValue" :min="min" :max="max"/>
  </p>
</template>

<script>
export default {
  props: {
    inputid: String,
    label: String,
    checked: Boolean,
    min: Number,
    max: Number,
    value: Number
  },
  data () {
    return {
      selectedValue: this.value
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
p {
  display: inline-block;
  margin: 0;
  margin-right: 1vw;
}
input {
  font-size: 2.4vh;
  border: 0;
  background: rgba(255,255,255,0.4);
  padding: 0.6vh 0.6vw;
  margin-left: 0.6vw;
  height: 4.1vh;
  cursor: pointer;
}
input:focus {
  outline: none;
}
</style>
