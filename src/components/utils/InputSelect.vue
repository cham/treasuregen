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
p {
  display: inline-block;
  margin: 0;
  margin-right: 1vw;
}
select {
  font-size: 2.4vh;
  border: 0;
  background: rgba(255,255,255,0.4);
  padding: 0.6vh 0.6vw;
  margin-left: 0.6vw;
  height: 4.1vh;
  cursor: pointer;
}
select:focus {
  outline: none;
}
</style>
