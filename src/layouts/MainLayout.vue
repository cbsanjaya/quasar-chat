<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Group Chat
        </q-item-label>
        <q-item
          v-for="room in rooms"
          :key="room.id"
          clickable
          tag="a"
          :to="{ name: 'chat-room', params: { room: room.id } }"
        >
          <q-item-section
            v-if="room.icon"
            avatar
          >
            <q-icon :name="room.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ room.name }}</q-item-label>
            <q-item-label caption>
              {{ room.description }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      user: this.$auth.currentUser,
      rooms: []
    }
  },
  firestore () {
    return {
      rooms: this.$db.collection('rooms')
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
