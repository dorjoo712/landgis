<template>
  <v-app id="app-id" class="login">
    <v-layout align-center justify-center fill-height>
      <v-flex xs10 sm6 md4 lg3>
        <v-card class="card--flex-toolbar">
          <v-toolbar card class="text-xs-center">
            <v-btn to="/" icon class="hidden-xs-only">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="ml-0" style="display: block; width:100%">Нэвтрэх</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" class="mb-4">
              <v-text-field label="Нэвтрэх нэр" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Нууц үг" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
              <div class="mb-3" v-if="errorMessage">
                <v-alert value="true" type="error">
                  {{errorMessage}}
                </v-alert>
              </div>
              <div class="mt-5 mb-3">
                <v-btn :loading="loading" large @click="signIn" round block dark color="green darken-2">Нэвтрэх</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: null,
      checkbox: false,
      valid: false,
      remember: false,
      email: "",
      loading: false,
      emailRules: [
        v => !!v || "Username is required"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      message: 'Та системд ажилттай нэвтэрлээ...',
      snackbar: false
    };
  },
  methods: {
    signIn() {
      if (this.$refs.form.validate()) {
        this.loading = true

        setTimeout(() => (
          localStorage.setItem('user', 'login'),
          this.loading = false,
          this.snackbar = true,
          this.$router.push('/')
        ), 2000)
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
};
</script>

<style>
  .login .card--flex-toolbar {
    margin-top: 0;
  }
</style>
