import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle: ''
  },
  mutations: {
    setTitle(state,value) {
      state.pageTitle = value
    }
  },
  actions: {
    
  },
  modules: {

  }
})
