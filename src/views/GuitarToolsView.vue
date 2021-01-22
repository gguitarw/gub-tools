<template>
  <div class="guitar-tools">
    <v-main>
      <main-screen />
    </v-main>

    <v-footer app>
      <v-spacer />
      <playback-buttons />
      <v-spacer />
    </v-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MainScreen from '@/components/GuitarTools/MainScreen.vue';
import PlaybackButtons from '@/components/GuitarTools/PlaybackButtons.vue';

export default defineComponent({
  name: 'GuitarToolsView',

  components: {
    MainScreen,
    PlaybackButtons,
  },
});
</script>
