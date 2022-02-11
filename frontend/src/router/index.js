import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

//eslint-disable-next-line no-unused-vars
function checkIfUserIAuthenticated(_,__, next){
  if(localStorage.getItem('userToken') == null){
    next('/login') 
  } 
  next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter : checkIfUserIAuthenticated
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
    component: () => import('../views/Profil.vue'),
    beforeEnter : checkIfUserIAuthenticated
  },
  {
    path: '/newpost',
    name: 'NewPost',
    component: () => import('../views/NewPublication.vue'),
    beforeEnter : checkIfUserIAuthenticated

  },
  {
    path: '/allusers',
    name: 'AllUsers',
    component: () => import('../views/AllUsers.vue'),
    beforeEnter : checkIfUserIAuthenticated

  },


]

const router = new VueRouter({
  routes
})

export default router
