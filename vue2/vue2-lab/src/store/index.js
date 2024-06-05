import Vue from 'vue'
import Vuex from 'vuex'
import lang from './modules/lang'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    lang
  }
})

export default store
