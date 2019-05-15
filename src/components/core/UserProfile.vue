<template>
  <div class="profile ml-3">
    <v-btn v-if="!user" to="/login" round color="green--text text--darken-2"><v-icon>account_circle</v-icon>Нэвтрэх</v-btn>
    <v-menu v-else offset-y>
      <template v-slot:activator="{ on }">
        <v-btn fab small color="white" v-on="on">
          <v-icon dark color="green darken-2">account_circle</v-icon>
        </v-btn>
      </template>
       <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="goto(item)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Миний хуудас', action: 'account' },
      { title: 'Худалдан авсан цэгүүд', action: 'account' },
      { title: 'Нууц үг солих', action: 'account' },
      { title: 'Гарах', action: 'logout' }
    ]
  }),
  computed: {
    user: function() {
      let user = localStorage.getItem('user')
      return user == 'login' ? true : false
    }
  },
  methods: {
    goto(item) {
      if (item.action == 'logout') {
        localStorage.removeItem('user')
        this.$router.push('/login')
      }
    }
  }
}
</script>


<style>
.profile{
  display: inline-block;
}
</style>
