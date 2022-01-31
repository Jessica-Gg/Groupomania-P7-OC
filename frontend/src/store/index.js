import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex)

export default new Vuex.Store({
  state :{
    user:{
      id:'',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      description: '',
      admin: false
    }

  },
  mutations: {
      USER_INFOS(state,[id ,firstname,lastname, email, password, description, admin]) {
        state.user.id = id,
        state.user.firstname = firstname,
        state.user.lastname = lastname,
        state.user.email = email,
        state.user.password = password,
        state.user.description = description,
        state.user.admin = admin 
      },
  },
  actions: {
  getUserInfos(valeur){
    console.log('state get infos')
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')
    axios
    .get('/api/user/'+ id, {
      headers:{
          'Authorization': 'Bearer' + token
     }
    })
    .then(response => {
      console.log(response)
      valeur.commit('userInfos',[response.data[0].id, response.data[0].firstname, response.data[0].lastname, response.data[0].email, response.data[0].admin]	)   
     // this.userInfos = response.data
    })
    .catch(error => {
      console.log(error); 
    });         
    },
 },
    modules: {
  }
});