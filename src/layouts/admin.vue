<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
      class="no-print"
      >
      <v-list dense class="mt-3">
        <template v-for="item in links">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children && checkPermission(item)"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.to"
              v-if="checkPermission(child)"
            >
              <v-list-tile-action class="hideicon" v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else-if="checkPermission(item)" :key="item.text" :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" class="no-print" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Admin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="user">Welcome, {{user.displayName}}</span>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile>
            <v-list-tile-content @click="goto('/account/change_password')">
              <v-list-tile-title>Change password</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import firebaseApp from '@/service/firebase'

  export default {
    data: () => ({
      drawer: null,
      role: window.localStorage.getItem('role'),
      links: []
    }),
    computed: {
      user () {
        return this.$store.state.auth.currentUser
      }
    },
    created(){
      this.$store.dispatch('constants/getLanguages')
      this.$store.dispatch('constants/setDefaultLang', 'mn')
      this.links = this.$store.state.menu['links']
    },
    methods: {
      goto(to) {
        this.$router.push(to)
      },
      checkPermission(item) {
        if(item.permission != undefined && item.permission.length > 0 && item.permission.includes(this.role)){
          return true
        }else {
          return false
        }
      },
      logout() {
        firebaseApp.auth().signOut().then(() => {
          this.$store.dispatch('auth/clearData')
          this.$router.push('/login')
        }).catch(err => {
          console.log('err', err)
        })
      }
    }
  }
</script>

<style>
  .v-navigation-drawer .v-list__group__items .v-list__tile__title{
    font-weight: 400;
  }
</style>