
import { Module } from 'vuex';
import AudioFile from '@/core/AudioFile';
import WaveformCache from '@/core/Waveform';

// NOTE: Vue 3 and Vuex 4 should bring better TypeScript support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const audioStore: Module<any, any> = {
  namespaced: true,

  state: {
    audioFile: AudioFile,
    waveform: WaveformCache,
  },

  getters: {
    
  },

  mutations: {
    SET_AUDIO_FILE(state, file: AudioFile) { state.audioFile = file },
    PLAY({ audioFile }, time?: number) { audioFile.play(time) },
    PAUSE({ audioFile }) { audioFile.pause() },
    PAUSE_RESUME({ audioFile }) { audioFile.pauseResume() },
    RESUME({ audioFile }) { audioFile.resume() },
    STOP({ audioFile }) { audioFile.stop() },
    CREATE_WAVEFORM(state) { state.waveform = new WaveformCache(state.audioFile.buffer) },
  },

  actions: {
    async loadAudioFromFile({ commit }, file: File) {
      console.log('Loaded file:', file);
      const audioFile = await (new AudioFile(file)).init();
      commit('SET_AUDIO_FILE', audioFile);
      console.log('Creating waveform');
      // commit('CREATE_WAVEFORM');
    },
  }
}

export default audioStore;
