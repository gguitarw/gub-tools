<template>
  <div class="guitar-tools">
    <v-main>
      <main-screen />
    </v-main>

    <v-footer app class="d-flex justify-start">
        <!-- :disabled="!isLoaded" -->
      <v-slider
        v-model="volume"
        min="0"
        max="1"
        step=".01"
        width="10%"
      ></v-slider>

      <playback-buttons />
      <!-- <v-spacer /> -->
    </v-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from '@vue/composition-api';
import { Store } from 'vuex';
import MainScreen from '@/components/GuitarTools/MainScreen.vue';
import PlaybackButtons from '@/components/GuitarTools/PlaybackButtons.vue';

export default defineComponent({
  name: 'GuitarToolsView',

  components: {
    MainScreen,
    PlaybackButtons,
  },

  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store: Store<any> = inject('vuex-store') as Store<any>;

    const volume = computed({
      get: () => (store.getters['audio/isLoaded'] ? store.getters['audio/volume'] : 0.5),
      set: (val) => { store.commit('audio/SET_VOLUME', val); },
    });

    // method: {
    //       get() {
    //         return this.$store.state.method;
    //       },
    //       set(value: BitmapIndexCompressionMethod) {
    //         this.$store.commit('SET_METHOD', value);
    //       },
    //     },

    return {
      volume,
      isLoaded: store.getters['audio/isLoaded'],
    };
  },
});
</script>
