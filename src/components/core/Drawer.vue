<template>
  <v-navigation-drawer v-model="drawer" clipped app width="200">
    <v-toolbar flat prominent class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar color="grey" :size="36"/>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Map</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard", link: "/" },
        { title: "About", icon: "home", link: "/about" },
        { title: "Map", icon: "location_on", link: "/map" }
      ],
      right: null
    };
  }
};
</script>
