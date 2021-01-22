<template>
  <div class="guitar-tools-main">
    {{ fileName }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from '@vue/composition-api';
import { Store } from 'vuex';

export default defineComponent({
  name: 'MainScreen',

  setup() {
    const store: Store<any> = inject('vuex-store') as Store<any>;

    return {
      fileName: computed(() => store.getters['audio/fileName']),
    };
  },
});
</script>
