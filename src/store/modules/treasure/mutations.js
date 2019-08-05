const mutations = {
  'SET_COINS' (state, coins) {
    Object.assign(state, { coins })
  },
  'SET_GEMS' (state, gems) {
    Object.assign(state, { gems })
  },
  'SET_ART' (state, art) {
    Object.assign(state, { art })
  },
  'SET_ROLL' (state, roll) {
    Object.assign(state, { roll })
  },
  'SET_MAGIC' (state, magic) {
    Object.assign(state, { magic })
  }
}

export default mutations
