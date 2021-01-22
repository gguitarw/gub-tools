<template>
  <v-app>
    <!-- <v-system-bar app height="24">
      <v-menu v-for="(menu, iMenu) in systemMenus" :key=iMenu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
            tile
            max-height="24"
          >{{ menu.title }}</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in menu.items"
            :key=i
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-system-bar> -->

    <!-- <v-app-bar app>

    </v-app-bar> -->

    <!-- <v-main> -->
      <router-view />
    <!-- </v-main> -->
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    systemMenus: [
      {
        title: 'File',
        items: ['Open', 'Close', 'Save', 'Save As'],
      },
    ],
  }),
});
</script>
