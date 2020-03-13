<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/google.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Selamat Datang
    </p>
    <q-btn
      color="primary"
      style="width:200px;"
      @click="googleLogin"
      label="Login With Google"
    />
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  methods: {
    googleLogin () {
      var provider = new this.$firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      this.$auth.signInWithPopup(provider)
        .then(result => {
          var user = result.user
          this.$db.collection('users')
            .doc(user.uid)
            .set({
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              online: true
            })
        })
        .catch(error => {
          this.$q.notify('Invalid Login!')
          console.error(`Not signed in: ${error.message}`)
        })
    }
  }
}
</script>
