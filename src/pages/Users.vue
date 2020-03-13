<template>
  <q-page class="flex q-pa-xs">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Mini Chat
        </q-toolbar-title>

        <q-btn round>
          <q-avatar>
            <img :src="user.photoURL">
          </q-avatar>

          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list style="min-width: 100px">
              <q-item clickable @click="logout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                  <q-item-label caption>{{ user.displayName || user.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-list
      class="full-width"
      separator>
      <q-item
        v-for="user in otherUsers"
        :key="user.uid"
        :to="{ name:'chat', params: { user: user.id } }"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="user.photoURL">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.displayName }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
            :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageUsers',
  data () {
    return {
      user: this.$auth.currentUser,
      users: []
    }
  },
  firestore () {
    return {
      users: this.$db.collection('users')
    }
  },
  computed: {
    otherUsers: function () {
      return this.users.filter(user => user.id !== this.user.uid)
    }
  },
  methods: {
    logout () {
      var userId = this.user.uid
      this.$auth.signOut().then(() => {
        this.$db.collection('users')
          .doc(userId)
          .update({
            online: false
          })
      }).catch((error) => {
        this.$q.notify('error on Logout')
        console.error(`Error on logout: ${error.message}`)
      })
    }
  }
}
</script>

<style>
</style>
