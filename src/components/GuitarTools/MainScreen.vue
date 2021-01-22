<template>
  <div class="guitar-tools-main">
    <!-- {{ fileName }} -->
    <Spectrogram />
    <Waveform />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from '@vue/composition-api';
import { Store } from 'vuex';
import Waveform from '@/components/GuitarTools/Waveform.vue';
import Spectrogram from '@/components/GuitarTools/Spectrogram.vue';

export default defineComponent({
  name: 'MainScreen',

  components: {
    Waveform,
    Spectrogram,
  },

  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store: Store<any> = inject('vuex-store') as Store<any>;

    return {
      fileName: computed(() => store.getters['audio/fileName']),
    };
  },
});
</script>

<style scoped>
.guitar-tools-main {
  width: 100%;
}
</style>
