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
      { icon: 'mdi-play' /*, func: () => {}*/ },
      { icon: 'mdi-pause' },
      { icon: 'mdi-stop' },
    ],
    file: null,
  }),

  methods: {
    onUpload() {
      console.log(this.file);
    }
  }
})
</script>
