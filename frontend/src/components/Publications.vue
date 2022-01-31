<template>
    <div class="m-3 publications_card" >
        <div class="card cardIndex shadow" v-for="article in allArticles" :key="article.id"  >
            <div class="card-header bg-white">
                <h2 class="card-title text-center">{{ user.lastname }} {{ user.firstname }}</h2>
                <p class="card-title text-center">{{ article.date }}</p>
            </div>
            <div class="card-body">
                <div><img/></div>
                <div>{{ article.content }}</div>
            </div>
            <div class="card-footer bg-white"> 
                <button type="button" class="btn btn-secondary btn-sm mb-3">
                    <router-link class="linkNewPost" to="/post"><span class="font-weight-bold">Voir la publication</span></router-link>
                </button>
                <p>Commentaires (nb comments)</p>
                <input type="text" placeholder="Ajouter un commentaire"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

var moment = require('moment')

export default {
  name: 'Publications',
    data(){ 
        return{
            moment:moment,
            content: "",
            date: "",
            image: "",
            allArticles: [],
            userId : localStorage.getItem('userId'),
        }
    },

    computed:{
        ...mapState(['user']),
    //    userInfos(){
    //        return this.$store.state.user
    //    }
    },

    methods: {
        ...mapActions(['getUserInfos'])
    },

        getAllArticles : function(){
            const token = localStorage.getItem('userToken')
            axios
                .get('/api/posts/', {
                    headers: {Authorization : 'Bearer' + token},
                })
                .then((response) => {
                    this.allArticles = response.data
                })
               .catch(error => {
                console.log('get all post fail')
                console.log(error)
            })
        },

        mounted(){
            this.getAllArticles
        }
}
</script>


<style lang="scss">
.publications_card{
    padding-left: 10em;
    padding-right: 10em ;
	display: flex;
    flex-direction: column;
	justify-content: space-between;
	
    .card-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        h2, h3{
            font-size: 1.5em;
        }
    }

    .linkNewPost{
        color: white,
          
      }
        
}
</style>