import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  supportCircular: true,
  key: 'MyChanges',
  storage: window.localStorage,
  reducer: (state: any) => ({})
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModule
  }
})
