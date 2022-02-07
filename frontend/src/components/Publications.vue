<template>
    <div class="publication template">
        <div class="publications_card m-3" v-for="article in allArticles" :key="article.id" >
<!-- Zone de la publication -->
            <div class="card cardIndex shadow">
    <!-- Affichage des données de la publication -->
                <div class="card-header bg-white">
                    <h4 class="card-title text-center">{{ article.auteuriceLastname }} {{ article.auteuriceFirstname }}</h4>
                    <p class="card-title text-center">{{ moment(article.date).fromNow()}}</p>
                </div>
    <!-- Contenu et/ou image de la publication -->
                <div class="card-body">
                    <p class="text-left">{{ article.contenu }}</p>
                    <div class="mb-3"><img :src="article.image"/></div>
                </div>

                <div class="card-footer bg-white">
    <!-- Options suppression de la publication si admin ou si auteurice -->
                    <div class="optionsPost mb-3">
                        <div v-if="user.id == article.user_id || verifIsAdmin > 0">
                            <button @click.prevent="deletePost(article.id)" class="btn btn-sm btn-outline-danger ml-3 mt-1">
                                <v-icon class="icon" name="regular/trash-alt"/>
                            </button>
                        </div>
                    </div>
<!-- Fin zone de la publication -->    

<!-- Zone des commentaires -->
                    <div class="commentaires">
    <!-- Ecrire un commentaire -->
                        <input type="text" @keyup.enter="sendComment(article.id)" v-model="commentaire" placeholder="Ajouter un commentaire"/>
                        <button type="submit" @click.prevent="sendComment(article.id)" class="btn btn-sm btn-outline-light ml-3">
                            <v-icon class="icon" name="share-square"/>
                        </button>
                        <div class="comment">
    <!-- Afficher/Masquer les commentaires -->
                            <button type="button"  @click="seeComments(article.id)" class="btn btn-sm btn-outline-info ml-3 mt-1">
                                <span>Voir les commentaires</span>
                            </button>
                            <div>
                                <button type="button" v-if="mode=='seeComments'" @click="unseeComments()" class="btn btn-sm btn-outline-info ml-3 mt-1">
                                    <span>Masquer les commentaires</span>
                                </button>
                            </div>

    <!-- Affichage des commentaires en fonction de l'article  article.id == commentaire.article_id"-->
                            <div v-if="mode=='seeComments' ">
                                <div v-if="allComments == ''">
                                    <p>Aucun commentaire à afficher</p>
                                </div>
                                <div else class="comment_card m-1" v-for="commentaire in allComments" :key="commentaire.id">
                                    <div class="card shadow">
                                        <div class="cardComment">
    <!-- Affichage des données du commentaire -->
                                            <div class="dataComment">
                                                <p class="font-weight-bold"><v-icon class="icon" name="regular/user-circle"/> {{ commentaire.auteuriceLastname }} {{ commentaire.auteuriceFirstname }}, {{ moment(commentaire.date).fromNow()}} :</p>
                                                <p>{{ commentaire.contenu }}</p>
                                            </div>
    <!-- Option de suppression du commentaire si amdin ou auteurice -->                                       
                                            <div class="buttonsActions" v-if="user.id == commentaire.user_id || verifIsAdmin > 0">
                                                <button type="button" @click="deleteComment(commentaire.id)" class="btn btn-sm btn-outline-danger ml-3"><v-icon class="icon" name="regular/trash-alt"/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<!-- Fin zone des commentaires -->

                        </div>
                    </div>
                </div>
            </div>
        </div>            
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

//Pour afficher le temps écoulé depuis la création de la publication ou du commentaire
var moment = require('moment')

export default {
  name: 'Publications',
    data(){ 
        return{
            moment:moment,
            contenu: '',
            date: '',
            image: '',
            id:'',
            allArticles: [],
            allComments: [],
            userId : localStorage.getItem('userId'),
            commentaire:'',
            verifIsAdmin : this.$store.state.user.admin,
            mode: 'unseeComment', 
        }
    },

    computed:{
        ...mapState(['user']),
    },

    mounted(){
      this.$store.dispatch('getUserInfos');
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

    //Supprimer une publication
        deletePost(id) {
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
            const userId = localStorage.getItem('userId');
            const auteuriceLastname = this.$store.state.user.lastname
            const auteuriceFirstname = this.$store.state.user.firstname
        //Mise dans un objet de toutes les données relative au commentaire à envoyer
            let commentData = {
                contenu : this.commentaire,
                article_id : id,
                user_id : userId,
                auteuriceLastname: auteuriceLastname,
                auteuriceFirstname: auteuriceFirstname
            }
            console.log(commentData)
            if (this.commentaire !== null){
                axios
                .post('/api/comment/', commentData, {
                    headers:{ 'Authorization': 'Bearer' + token }
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

    //Afficher les commentaires
        seeComments(id) {
           const token = localStorage.getItem('userToken')
           console.log('postId',id)
                axios
                .get('/api/comment/'+ id, {
                    headers: { 'Authorization' : 'Bearer' + token},
                })
                .then((response) => {
                    this.allComments = response.data
                    this.mode = 'seeComments'
                    console.log('get all comment ok')
                })
                .catch(error => {
                    console.log('get all comment fail')
                    console.log(error)
                })
        },

    //Ne plus afficher les commentaires
        unseeComments() {
            this.mode = 'unseeComments'
        },

    }, //fin methods

}//fin export
</script>


<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";
//style de la publication
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

    .card-body{
        padding: 2em;
    }

    .card-footer{
        .optionsPost{
            display: flex;
            justify-content: flex-end;
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

//style des commentaires
.cardComment{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    padding: 0.5em;

    .dataComment{
        width: 80%;

        p{
            font-size: 0.9em;
        }
    }
}

.modifyMode{
    padding: 0.5em;

    textarea{
        width: 80%;
    }
}
</style>