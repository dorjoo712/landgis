<template>
    <v-app id="app-register">
      <v-container fluid grid-list-lg no-padding>
        <v-card flat>
          <v-toolbar color="primary" class="no-print" dark extended flat>
            <v-toolbar-side-icon @click.stop="goback()"><v-icon>arrow_back</v-icon></v-toolbar-side-icon>
            <v-toolbar-title class="hidden-sm-and-down">MiniPei</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="print"><v-icon>print</v-icon></v-btn>
          </v-toolbar>
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-card>
      </v-container>
    </v-app>
  </template>
  <script>
  import { mapGetters } from 'vuex'
  import firebaseApp from '@/service/firebase';
  export default {
    name: "InvoiceView",
    data() {
      return {
        drawer: false,
        title: this.$route.name,
      };
    },
    computed: {
      ...mapGetters({
        links: 'menu/links'
      })
    },
    methods: {
      print(){
        window.print()
      },
      goback(){
        this.$router.go(-1)
      }
    }
  };
  </script>
  <style>
    #app-register 
      .card--flex-toolbar {
        margin-top: -56px;
      }
    
    
  </style>
