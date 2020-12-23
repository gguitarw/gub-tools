
import { Module } from 'vuex';

// NOTE: Vue 3 and Vuex 4 should bring better TypeScript support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const audioStore: Module<any, any> = {
  namespaced: true,

  state: {
    buffer: null,
  },

  getters: {
    
  },

  mutations: {
    SET_AUDIO_BUFFER(state, buffer) { state.buffer = buffer; },
    CLEAR_AUDIO_BUFFER(state) { state.buffer = null; },
  },

  actions: {
    async loadAudioFromFile({ commit }, file: File) {
      console.log('Loaded file:', file);
      commit('SET_AUDIO_BUFFER', await file.arrayBuffer());
    },
  }
}

export default audioStore;
