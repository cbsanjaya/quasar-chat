<template>
  <div class="fixed-center text-center">
    <q-btn
      color="primary"
      style="width:200px;"
      @click="googleLogin"
      label="Login"
    />
  </div>
</template>

<script>
export default {
  name: 'Login',
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
              email: user.email
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
