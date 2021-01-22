import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        waveformForegroundSelected: '#8BB1FF',
        waveformForegroundUnselected: '#744E00',
        waveformBackgroundSelected: '#002B7F',
        waveformBackgroundUnselected: '#FFD480',
      },
      light: {
        waveformForegroundSelected: '#8BB1FF',
        waveformForegroundUnselected: '#744E00',
        waveformBackgroundSelected: '#002B7F',
        waveformBackgroundUnselected: '#FFD480',
      },
    },
  },
});

/*
Transcribe! waveform colors
Foreground
    Selected
        139, 177, 255
        #8BB1FF
    Unselected
        116, 78, 0
        #744E00
Background
    Selected
        0, 43, 127
        #002B7F
    Unselected
        255, 212, 128
        #FFD480
*/
