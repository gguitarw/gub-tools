
import { Module } from 'vuex';
import AudioFile from '@/core/AudioFile';

// NOTE: Vue 3 and Vuex 4 should bring better TypeScript support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const audioStore: Module<any, any> = {
  namespaced: true,

  state: {
    audioFile: AudioFile,
  },

  getters: {
    
  },

  mutations: {
    SET_AUDIO_FILE(state, file) { state.audioFile = new AudioFile(file) },
    PLAY({ audioFile }, time?: number) { audioFile.play(time) },
    PAUSE({ audioFile }) { audioFile.pause() },
    PAUSE_RESUME({ audioFile }) { audioFile.pauseResume() },
    RESUME({ audioFile }) { audioFile.resume() },
    STOP({ audioFile }) { audioFile.stop() },
  },

  actions: {
    loadAudioFromFile({ commit }, file: File) {
      console.log('Loaded file:', file);
      commit('SET_AUDIO_FILE', file);
    },
  }
}

export default audioStore;
