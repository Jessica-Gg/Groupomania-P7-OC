import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    props: route => ({mode: route.query.mode})
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
