<template>
    <div class="publication template">
        <div class="publications_card m-3" v-for="article in allArticles" :key="article.id"  >
            <div class="card cardIndex shadow"  >
                <div class="card-header bg-white">
                    <h4 class="card-title text-center">{{ article.lastname }} {{ article.firstname }}</h4>
                    <p class="card-title text-center">{{ moment(article.date).fromNow()}}</p>
                </div>
                <div class="card-body">
                    <div class="mb-3"><img :src="article.image"/></div>
                    <p class="text-left">{{ article.contenu }}</p>
                </div>
                <div class="card-footer bg-white">
                    <div class="optionsPost">
                        <div>
                            <button type="button" @click="seeOnePost(article.id)" class="btn btn-secondary btn-sm mb-3 btnLink">
                                <span>Voir la publication</span>
                            </button>
                        </div>
                        <div v-if="user.id == article.user_id || user.admin == true">
                            <button @click="deletePost(article.id)" class="btn btn-sm btn-outline-danger ml-3 mt-1">
                                <v-icon class="icon" name="regular/trash-alt"/>
                            </button>
                            <button @click="modifyPost(article.id)" class="btn btn-sm btn-outline-info ml-3 mt-1">
                                <v-icon class="icon" name="pencil-alt"/>
                            </button>
                        </div>
                    </div>
                    <div class="commentaires">
                        <p>Commentaires (nb comments)</p>
                        <input type="text" v-model="commentaire" placeholder="Ajouter un commentaire"/>
                        <button @click="sendComment(article.id)" class="btn btn-sm btn-outline-light ml-3 mt-1">
                            <v-icon class="icon" name="share-square"/>
                        </button>
                        <Comments/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Comments from '@/components/Comments.vue'
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

var moment = require('moment')

export default {
  name: 'Publications',
  components: {
      Comments,
  },
    data(){ 
        return{
            moment:moment,
            contenu: "",
            date: "",
            image: "",
            id:"",
            allArticles: [],
            userId : localStorage.getItem('userId'),
            commentaire:"",
            firstname:"",
            lastname:"",
        }
    },

    computed:{
        ...mapState(['user']),
    },

    mounted(){
      this.$store.dispatch('getUserInfos');
      console.log('toto mounted')
    //Récupèrer toutes les publications
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

    methods: {
        ...mapActions(['getUserInfos']),
    
    
    seeOnePost(){
        this.$router.push("/post")
    },

    //Supprimer une publication
    deletePost: function(id){
        const token = localStorage.getItem('userToken')
        if(confirm("Voulez-vous supprimer cette publication ?")){
            axios
            .delete('/api/posts/' + id, {
                headers: { 'Authorization': 'Bearer' + token }
            })
            .then (()=>{
               location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        }
    },

    
    //Créer un commentaire
    sendComment(id) {
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId')
        let commentData = {
            contenu : this.commentaire,
            article_id : id,
            user_id : userId
        }
        console.log(commentData)
        if (this.commentaire !== null){
        axios
        .post('/api/comment/', commentData, {
            headers:{
                 'Authorization': 'Bearer' + token,
            }
        })
        .then((response) => {
            console.log('post comment')
            console.log(response)
            location.reload();
        })
        .catch(error => {
            console.log('post comment fail')
            console.log(error)
        })
        }
    },


//fin methods
    },

//fin export
}
</script>


<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

.publications_card{
    padding-left: 10em;
    padding-right: 10em ;
	display: flex;
    flex-direction: column;
	justify-content: space-between;
	
    .card-header{
        display: flex;
        flex-direction: column;
        align-items: start;

        h2, h3{
            font-size: 1.5em;
        }
    }

    .card-footer{
        .optionsPost{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

        .commentaires{
            input{
                width: 80%;
                border-color:rgb(127, 187, 255);    
            }
        }
    }

    .btnLink{
        color : white;

        .linkNewPost{
            color: white,
      }
    }
    
    img{
        max-width: 80%;
    }
}
</style>