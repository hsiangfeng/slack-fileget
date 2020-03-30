import Vue from 'vue';
import Vuex from 'vuex';

import channels from './channels';
import components from './components';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    channels,
    components,
  },
});
