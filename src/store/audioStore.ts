import { Module } from 'vuex';
import AudioFile from '@/core/AudioFile';
import WaveformCache from '@/core/Waveform';
import WaveSurfer, { PluginDefinition } from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram';

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
    volume: (state) => state.wavesurfer.getVolume(),
  },

  mutations: {
    SET_AUDIO_FILE(state, file: AudioFile) { state.audioFile = file; },
    PLAY({ wavesurfer: player }, time?: number) { player.play(time); },
    PAUSE({ wavesurfer: player }) { player.pause(); },
    PAUSE_RESUME({ wavesurfer: player }) { player.pauseResume(); },
    RESUME({ wavesurfer: player }) { player.resume(); },
    STOP({ wavesurfer: player }) { player.stop(); },
    CREATE_WAVEFORM(state) { state.waveform = new WaveformCache(state.audioFile.buffer); },
    SET_WAVESURFER(state, wavesurfer) { state.wavesurfer = wavesurfer; },
    WAVESURFER_LOAD_AUDIOBUFFER(state, audioFile?: AudioFile) {
      state.wavesurfer.loadDecodedBuffer((audioFile ?? state.audioFile).buffer);
    },
    WAVESURFER_REGISTER_PLUGINS(state, plugins: PluginDefinition[]) {
      state.wavesurfer.registerPlugins(plugins);
    },
    SET_VOLUME(state, volume: number) { state.wavesurfer.setVolume(volume); },
  },

  actions: {
    async loadAudioFromFile({ state, commit }, file: File) {
      console.log('Loaded file:', file);
      const audioFile = await (new AudioFile(file)).init();
      commit('SET_AUDIO_FILE', audioFile);
      commit('WAVESURFER_LOAD_AUDIOBUFFER', audioFile);

      commit('WAVESURFER_REGISTER_PLUGINS', [
        SpectrogramPlugin.create({
          wavesurfer: state.wavesurfer,
          container: '#wavesurfer-spectrogram',
          // fftSamples: 64,
        }),
      ]);
      // console.log('Creating waveform');
      // commit('CREATE_WAVEFORM');
    },

    createWavesurfer({ commit }, waveformId: string) {
      const wavesurfer = WaveSurfer.create({
        container: `#${waveformId}`,
        fillParent: false,
        scrollParent: true,
        hideScrollbar: false,
        plugins: [
          CursorPlugin.create(),
        ],
      });
      commit('SET_WAVESURFER', wavesurfer);
    },
  },
};

export default audioStore;
