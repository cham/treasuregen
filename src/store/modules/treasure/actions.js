import * as api from '@/api'

const actions = {
  getTreasure ({ commit }, { type, cr }) {
    const treasure = api.getTreasure(type, cr)
    commit('SET_COINS', treasure.coins)
    commit('SET_GEMS', treasure.gems)
  }
}

export default actions
