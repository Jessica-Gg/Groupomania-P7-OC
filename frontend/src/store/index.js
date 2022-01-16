import { commit } from "../../../backend/connect/db";
import { createStore } from vuex

const axios = require('axios')

const instance = axios.create({
  baseURL: '/api/'
})

const store = createStore({
    state: {

    },
    actions:{
    }
})

export default store;