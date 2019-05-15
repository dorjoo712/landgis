<template>
    <v-app id="app-register">
      <v-container fluid grid-list-lg no-padding>
        <v-card flat>
          <v-toolbar color="primary" dark extended flat>
            <v-btn icon to="/register"><v-icon>home</v-icon></v-btn>
          </v-toolbar>
          <v-layout align-center justify-center fill-height pb-2>
            <v-flex xs10 sm6 md4 lg3>
              <v-card class="card--flex-toolbar">
                <v-toolbar card prominent>
                  <v-toolbar-title class="text-xs-center" style="display: block; width:100%">MiniPay</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="valid" class="mb-4">
                    <v-text-field label="Овог" v-model="first_name" required></v-text-field>
                    <v-text-field label="Нэр" v-model="last_name" required></v-text-field>
                    <v-text-field label="Имэйл" v-model="email" :rules="emailRules" required></v-text-field>
                    <v-text-field label="Нууц үг" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
                    <div class="mb-3" v-if="errorMessage">
                      <v-alert value="true" type="error">
                      {{errorMessage}}
                      </v-alert>
                    </div>
                    <div class="mb-3">
                    <v-btn large @click="submit" block color="secondary">{{ $t('Register') }}</v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-app>
  </template>
  <script>
  import firebaseApp from '@/service/firebase';
  export default {
    name: "Register",
    data() {
      return {
        errorMessage: null,
        checkbox: false,
        valid: false,
        remember: false,
        email: "",
        first_name: "",
        last_name: "",
        emailRules: [
          v => !!v || "Username is required"
        ],
        password: "",
        passwordRules: [v => !!v || "Password is required"],
      };
    },
    methods: {
      submit() {
        var vm = this
        firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password).then( function(firbaseUser){
          var user = firebaseApp.auth().currentUser;
          // firebaseApp.firestore().collection('users').doc(user.uid).set(
          //   {
          //     first_name: vm.first_name,
          //     uid: user.uid,
          //     last_name: vm.last_name,
          //     email: vm.email,
          //     role: 'user',
          //     timestamp: new Date()
          //   }
          // );
        }).catch(function(error) {
          if (error.code == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(error.message);
          }
        });
      }
    }
  };
  </script>
  <style>
    .card--flex-toolbar {
      margin-top: -64px;
    }
  </style>
