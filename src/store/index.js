import Vue from 'vue'
import Vuex from 'vuex'
import treasure from './modules/treasure'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    treasure
  }
})
