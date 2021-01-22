<template>
  <div class="guitar-tools-waveform-container">
    <div :id="domId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from '@vue/composition-api';
import { Store } from 'vuex';
import { nanoid } from 'nanoid';

export default defineComponent({
  name: 'Waveform',

  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store: Store<any> = inject('vuex-store') as Store<any>;

    const uuid = nanoid();

    const domId = `waveform-${uuid}`;

    onMounted(() => { store.dispatch('audio/createWavesurfer', domId); });

    return {
      uuid,
      domId,
    };
  },
});
</script>
