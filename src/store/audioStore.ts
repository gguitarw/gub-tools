import { Module } from 'vuex';
import AudioFile from '@/core/AudioFile';
import WaveformCache from '@/core/Waveform';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';

// NOTE: Vue 3 and Vuex 4 should bring better TypeScript support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const audioStore: Module<any, any> = {
  namespaced: true,

  state: {
    audioFile: null as AudioFile | null,
    waveform: null as WaveformCache | null,
    fileMeta: null,
    wavesurfer: null,
  },

  getters: {
    isLoaded: (state) => state.audioFile !== null,
    fileName: (state, getters) => (getters.isLoaded ? state.audioFile.file.name : null),
  },

  mutations: {
    SET_AUDIO_FILE(state, file: AudioFile) { state.audioFile = file; },
    PLAY({ audioFile }, time?: number) { audioFile.play(time); },
    PAUSE({ audioFile }) { audioFile.pause(); },
    PAUSE_RESUME({ audioFile }) { audioFile.pauseResume(); },
    RESUME({ audioFile }) { audioFile.resume(); },
    STOP({ audioFile }) { audioFile.stop(); },
    CREATE_WAVEFORM(state) { state.waveform = new WaveformCache(state.audioFile.buffer); },
    SET_WAVESURFER(state, wavesurfer) { state.wavesurfer = wavesurfer; },
    WAVESURFER_LOAD_AUDIOBUFFER(state, audioFile?: AudioFile) {
      state.wavesurfer.loadDecodedBuffer((audioFile ?? state.audioFile).buffer);
    },
  },

  actions: {
    async loadAudioFromFile({ commit }, file: File) {
      console.log('Loaded file:', file);
      const audioFile = await (new AudioFile(file)).init();
      commit('SET_AUDIO_FILE', audioFile);
      commit('WAVESURFER_LOAD_AUDIOBUFFER', audioFile);
      // console.log('Creating waveform');
      // commit('CREATE_WAVEFORM');
    },

    createWavesurfer({ commit }, waveformId: string) {
      const wavesurfer = WaveSurfer.create({
        container: `#${waveformId}`,
        plugins: [
          CursorPlugin.create(),
        ],
      });
      commit('SET_WAVESURFER', wavesurfer);
    },
  },
};

export default audioStore;
