<template>
  <div class="guitar-tools-playback-buttons">
    <!-- Based on https://codepen.io/blachocolat/pen/BgMKRQ -->
    <v-btn @click="$refs.uploader.click()" icon large>
      <v-icon>mdi-content-save</v-icon>
    </v-btn>

    <v-btn
      v-for="(button, i) in buttons"
      :key=i
      icon
      large
      @click="$store.commit('audio/' + button.func)"
    >
      <v-icon>{{ button.icon }}</v-icon>
    </v-btn>

    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="audio/*"
      @change="$store.dispatch('audio/loadAudioFromFile', $event.target.files[0])"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PlaybackButtons',

  data: () => ({
    buttons: [
      { icon: 'mdi-play', func: 'PLAY' },
      { icon: 'mdi-pause', func: 'PAUSE_RESUME' },
      { icon: 'mdi-stop', func: 'STOP' },
    ],
  }),
})
</script>
