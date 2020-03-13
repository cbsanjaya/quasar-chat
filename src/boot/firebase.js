import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '../../firebase.conf'

// "async" is optional
export default async ({ /* app, router, Vue, ... */ router, Vue }) => {
  Vue.use(firestorePlugin)
  firebase.initializeApp(config)
  const db = firebase.firestore()

  Vue.prototype.$firebase = firebase
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$db = db

  router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user && to.path !== '/login') {
        next('/login')
      }
      if (user) {
        if (to.path === '/login') {
          next('/')
        }
      }
      next()
    })
  })
}
