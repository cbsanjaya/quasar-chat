<template>
  <q-page ref="pageChat" class="flex flex column">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          v-go-back.single
          aria-label="Back" />

        <q-avatar>
          <img :src="otherUser.photoURL">
        </q-avatar>

        <q-toolbar-title>
          {{ otherUser.displayName }}
           <q-badge
            :color="otherUser.online ? 'green' : 'red'"
            align="top">
            {{ otherUser.online ? 'on' : 'off' }}
          </q-badge>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <div
      :class="{ 'invisible' : !showMessages }"
      class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :text="[message.text]"
        :sent="message.from == user.uid ? true : false"
        :stamp="message.at | ago"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          class="full-width"
          @keyup.enter="sendMessage"
          v-model="newMessage"
          @blur="scrollToBottom"
          ref="newMessage"
          bg-color="white"
          outlined
          rounded
          placeholder="Type a Message"
          dense>

          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              @click="sendMessage"
              color="white"
              icon="send" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'PageChat',
  data () {
    return {
      showMessages: false,
      newMessage: '',
      user: this.$auth.currentUser,
      otherUser: {
        photoUrl: '',
        displayName: '',
        online: false
      },
      messages: []
    }
  },
  computed: {
    chatGroup () {
      return [this.user.uid, this.otherUser.id].sort().join('_')
    }
  },
  filters: {
    ago (timestamp) {
      if (!timestamp) return ''
      var val = timestamp.toDate()
      return val.toLocaleTimeString()
    }
  },
  mounted () {
    this.$bind('otherUser', this.$db.collection('users').doc(this.$route.params.user)).then(otherUser => {
      this.$bind('messages',
        this.$db.collection('messages')
          .where('chatGroup', '==', this.chatGroup)
          .orderBy('at', 'asc'))
    })
  },
  methods: {
    sendMessage () {
      if (this.newMessage === '') {
        this.$q.notify('Pesan Tidak Boleh Kosong')
        return
      }
      this.$db.collection('messages').add({
        chatGroup: this.chatGroup,
        from: this.user.uid,
        text: this.newMessage,
        at: this.$firebase.firestore.FieldValue.serverTimestamp()
      })
      this.clearMessage()
    },
    clearMessage () {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToBottom () {
      var pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20)
    }
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
        setTimeout(() => {
          this.showMessages = true
        }, 200)
      }
    }
  }
}
</script>
