
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'users' } },
      { path: '/users', component: () => import('pages/Users.vue'), name: 'users' },
      { path: '/chat/:user', component: () => import('pages/Chat.vue'), name: 'chat' }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
