<template>
  <div class="guitar-tools-main">
    <!-- {{ fileName }} -->

    <Waveform />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from '@vue/composition-api';
import { Store } from 'vuex';
import Waveform from '@/components/GuitarTools/Waveform.vue';

export default defineComponent({
  name: 'MainScreen',

  components: {
    Waveform,
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
