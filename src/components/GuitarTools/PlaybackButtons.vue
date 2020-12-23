<template>
  <div class="guitar-tools-playback-buttons">
    <v-container>
        <!-- @change="$store.dispatch('audio/loadAudioFromFile', $event)" -->
        <!-- hide-input -->
      <v-file-input
        v-model="file"
        accept="audio/*"
        label="Select Audio File"
      ></v-file-input>
      <v-btn @click="onUpload">Upload</v-btn>
    </v-container>


    <v-btn
      v-for="(button, i) in buttons"
      :key=i
      icon
      large
    >
      <v-icon>{{ button.icon }}</v-icon>
    </v-btn>
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
