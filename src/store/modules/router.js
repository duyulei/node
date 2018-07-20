export default {
  state: {
    isLoading: true
  },
  mutations: {
    setLoading (state, isLoading) {
      state.isLoading = isLoading
      console.log(state.isLoading)
    }
  },
  actions: {
  }
}
