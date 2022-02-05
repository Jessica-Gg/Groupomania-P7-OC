<template>
    <div class="comment template">
        <div class="comment_card m-3" v-for="user in allUsers" :key="user.id"  >
            <div class="card-body">
                <p>{{ user.lastname }} {{ user.firstname }}</p>
                <p>{{ user.description }}</p>
                <div v-if="user.admin == true">                    
                    <button @click="deleteUser(user.id)" class="btn btn-sm btn-outline-danger ml-3 mt-1">
                        <v-icon class="icon" name="regular/trash-alt"/>
                    </button> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
//import {mapState, mapActions} from 'vuex'

export default {
  name: 'AllUsers',
    data(){ 
        return{ 
            id:"",
            firstname: "",
            lastname: "",
            allUsers: [],
        }
    },

    computed:{
    //    ...mapState(['user']),
    },

    mounted(){
     //   this.$store.dispatch('getUserInfos');
        console.log('toto mounted list of users')
    //Récupérer tous les utilisateur'ices
        const token = localStorage.getItem('userToken')
            axios
                .get('/api/user/', {
                    headers: {Authorization : 'Bearer' + token},
                })
                .then((response) => {
                    this.allUsers = response.data
                })
               .catch(error => {
                    console.log('get all comment fail')
                    console.log(error)
                })
    }, //fin mounted

    methods: {
     //   ...mapActions(['getUserInfos']),

    //Supprimer le compte
    deleteUser: function(){
      const id = localStorage.getItem('userId')
      const token = localStorage.getItem('userToken')
      if(confirm("Voulez-vous supprimer ce compte ?")){
        axios
        .delete('/api/user/' + id, {
          headers: {
            'Authorization': 'Bearer' + token
          }
        })
        .then (()=>{
          localStorage.clear();
          alert('Le comtpe a bien été supprimé')
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    
    }, //fin methods


} //fin export
