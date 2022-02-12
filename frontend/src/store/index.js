import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: '',
      firstname: 'NC',
      lastname: 'NC',
      email: 'NC',
      description: 'NC',
      admin: false,
    },
    changeOption: ''
  },

  mutations: {
    USER_INFOS(state, [userId, firstname, lastname, email, description, admin]) {
      state.user.userId = userId
      state.user.firstname = firstname,
        state.user.lastname = lastname,
        state.user.email = email,
        state.user.description = description,
        state.user.admin = admin
    },

    modifOption(state, value) {
      state.changeOption = value
    }
  },

  actions: {
    me(valeur) {
      axios
        .get('/api/user/me')
        .then(response => {
          valeur.commit('USER_INFOS', [response.data[0].id, response.data[0].firstname, response.data[0].lastname, response.data[0].email, response.data[0].description, response.data[0].admin])
        })
        .catch(error => {
          console.error(error);
        });
    },

    changeParam(contexte, value) {
      contexte.commit('modifOption', value)
    }
  },

  modules: {
  }
});