<template>
    <div class="comment template">
        <div class="comment_card m-3" v-for="commentaire in allComments" :key="commentaire.id"  >
                <div class="card-body">
                    <p>{{ commentaire.lastname }} {{ commentaire.firstname }} {{ moment(commentaire.date).fromNow()}}</p>
                    <p>{{ commentaire.contenu }}</p>
                    <button @click="deleteComment(commentaire.id)" class="btn btn-sm btn-outline-danger ml-3 mt-1">
                        <v-icon class="icon" name="regular/trash-alt"/>
                    </button> 
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

var moment = require('moment')

export default {
  name: 'Comments',
    data(){ 
        return{
            moment:moment,
            allComments: [],
            contenu: "",
            date: "",
            id:"",
            userId : "",
            firstname: "",
            lastname: "",
        }
    },

    computed:{
        ...mapState(['user']),
    },

    methods: {
        ...mapActions(['getUserInfos']),
    },

      mounted(){
      this.$store.dispatch('getUserInfos');
    //Récupèrer tous les commentaires
     const token = localStorage.getItem('userToken')
            axios
                .get('/api/comment/', {
                    headers: {Authorization : 'Bearer' + token},
                })
                .then((response) => {
                    this.allComments = response.data
                })
               .catch(error => {
                console.log('get all comment fail')
                console.log(error)
            })
    },


//fin export
}
