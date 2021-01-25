<template>
  <div class="guitar-tools-spectrogram-container" height="800px">
    <div id="wavesurfer-spectrogram" height="800px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Spectrogram',
});
</script>
