import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex)

export default new Vuex.Store({
  state :{
    user:{
      id: 'NC',
      firstname: 'NC',
      lastname: 'NC',
      email: 'NC',
      password: 'NC',
      description: 'NC',
      admin: '',
    },
    changeOption : ''
  },
  mutations: {
    USER_INFOS(state,[id ,firstname, lastname, email, password, description, admin]) {
      state.user.id = id,
      state.user.firstname = firstname,
      state.user.lastname = lastname,
      state.user.email = email,
      state.user.password = password,
      state.user.description = description,
      state.user.admin = admin   
    },
    
    modifOption(state,value) {
      state.changeOption = value
    }
  },
  actions: {
  getUserInfos(valeur){
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
      valeur.commit('USER_INFOS',[response.data[0].id, response.data[0].firstname, response.data[0].lastname, response.data[0].email, response.data[0].password, response.data[0].description, response.data[0].admin]	)
    })
    .catch(error => {
      console.log(error); 
    });
  },
    changeParam(contexte, value) {
      contexte.commit('modifOption',value)
    }         
    },
    modules: {
  }
});