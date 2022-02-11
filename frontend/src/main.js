import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";  //
import "bootstrap/dist/css/bootstrap.css";                  //
import "bootstrap-vue/dist/bootstrap-vue.css";              // Intégration de BootstrapVue pour gérer le style et le responsive
Vue.use(BootstrapVue);                                      //
Vue.use(IconsPlugin);                                       //

import 'vue-awesome/icons';                                 //  Intégration du kit vue-awesome pour les icones Font Awesome
import Icon from 'vue-awesome/components/Icon'              //
Vue.component('v-icon', Icon)                               //

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('userToken');
  config.headers.Authorization =  'Bearer ' + token;
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App),
  async created(){
    await this.$store.dispatch("me");
    console.log('me created',this.$store.state)
  }
}).$mount('#app')
