<template>
  <v-app id="app-id">
    <v-content>
      <v-container grid-list-xl>
        <v-card class="mb-2 elevation-1">
          <v-card-text class="pa-1">
            <v-list class="pa-0">
              <v-list-tile avatar to="/">
                <v-list-tile-avatar>
                  <img :src="`${publicPath}/static/logo.png`" class="logo" alt="LangGIS">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Цэг, тэмдэгтийн мэдээлэл</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="menu-helper" style="min-width: 150px;">
                  <cart></cart>
                  <user-profile></user-profile>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  created() {

  }
}
</script>

<style>
.menu-helper{
  flex-direction: row;
  justify-content: flex-end;
}
</style>