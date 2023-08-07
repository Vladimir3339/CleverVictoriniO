import { createStore } from 'vuex'

const store = createStore({
  state: {
    user:{}
  },
  mutations: {
    updateUser(state, user){
      state.user = user
    }
  },
  actions: {
  },
  getters: {
    getUser(state){
      return state.user
    }
  }
})

export default store
