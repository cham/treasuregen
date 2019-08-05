const mutations = {
  'SET_COINS' (state, coins) {
    Object.assign(state, { coins })
  },
  'SET_GEMS' (state, gems) {
    Object.assign(state, { gems })
  }
}

export default mutations
