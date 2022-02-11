import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'groupomania',
  storage: window.localStorage,
  reducer: (state) => ({ user: state.user }),
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state :{
    userId: '', // à renseigner à l’init via le /me
    user:{
      firstname: 'NC',
      lastname: 'NC',
      email: 'NC',
      description: 'NC',
      admin: false,
    },
    changeOption : ''
  },

  mutations: {
    USER_INFOS(state,[userId, firstname, lastname, email, description, admin]) {
      state.userId = userId
      state.user.firstname = firstname,
      state.user.lastname = lastname,
      state.user.email = email,
      state.user.description = description,
      state.user.admin = admin
    },
    
    modifOption(state,value) {
      state.changeOption = value
    }
  },

  actions: {
  me(valeur){
    console.log('me function')
    const token = localStorage.getItem('userToken')
    axios
      .get('/api/user/me', {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
    .then(response => {
      console.log('me response',response)
      valeur.commit('USER_INFOS',[response.data[0].id, response.data[0].firstname, response.data[0].lastname, 
      response.data[0].email, response.data[0].description, response.data[0].admin])
    })
    .catch(error => {
      console.log(error); 
    });
  },

    changeParam(contexte, value) {
      contexte.commit('modifOption',value)
    }         
  }, //actions

    modules: {
  }
});