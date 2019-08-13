import * as api from '@/api'

const actions = {
  getTreasure ({ commit }, { type, cr, includeCrateLoot, numCrateItems }) {
    if (!includeCrateLoot) {
      numCrateItems = 0
    }
    const treasure = api.getTreasure(type, cr, numCrateItems)
    commit('SET_ROLL', treasure.roll)
    commit('SET_COINS', treasure.coins)
    commit('SET_GEMS', treasure.gems)
    commit('SET_ART', treasure.art)
    commit('SET_MAGIC', treasure.magic)
    commit('SET_CRATE_ITEMS', treasure.crateItems)
  }
}

export default actions
