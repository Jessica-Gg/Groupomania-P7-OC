<template>
    <div class="publication template">
        <div class="publications_card m-3" v-for="article in allArticles" :key="article.id" >
<!-- Section du contenu de la publication -->
            <div class="card cardIndex shadow">
    <!-- Affichage des données de la publication -->
                <div class="card-header bg-white">
                    <h3 class="card-title text-center">{{ article.auteuriceLastname }} {{ article.auteuriceFirstname }}</h3>
                    <p class="card-title text-center">{{ moment(article.date).format('DD-MM-YYYY HH:MM')}}</p>
                </div>
    <!-- Contenu et/ou image de la publication -->
                <div class="card-body">
                    <p class="text-left">{{ article.contenu }}</p>
                    <div class="mb-3" v-if="article.imageUrl == null"><img :src="article.image" alt=""/></div>
                </div>

                <div class="card-footer bg-white">
    <!-- Options suppression de la publication si admin ou si auteurice -->
                    <div class="optionsPost mb-3">
                        <div v-if="user.id == article.user_id || verifIsAdmin == true">
                            <button @click.prevent="deletePost(article.id)" class="btn btn-sm btn-outline-danger ml-3 mt-1">
                                <span>Supprimer <v-icon class="icon" name="regular/trash-alt"/></span>
                            </button>
                        </div>
                    </div>
<!-- Fin section du contenu de la publication -->    

<!-- Section des commentaires -->
                    <div class="sectionCommentaires">
    <!-- Ecrire un commentaire -->
                        <textarea v-on:input="updateValue($event.target.value)" id="newComment" type="text" @keyup.enter="sendComment(article.id)" aria-label="Ecrire un commentaire" placeholder="Ajouter un commentaire"></textarea>
                        <button type="submit" @click.prevent="sendComment(article.id)" class="btn btn-sm btn-outline-info ml-3">
                            <span>Envoyer</span>
                        </button>
                        <div class="comment">
    <!-- Afficher/Masquer les commentaires -->
                            <button type="button" @click.prevent="modeSeeComments(article.id)" class="btn btn-sm btn-outline-info ml-3 mt-1">
                                <span>Voir les commentaires</span>
                            </button>
    <!-- Affichage des commentaires en fonction de l'article -->
                            <div v-if="mode=='seeComments'">
                                <button type="button" @click.prevent="unseeComments(article.id)" class="btn btn-sm btn-outline-info ml-3 mt-1">
                                    <span>Masquer les commentaires</span>
                                </button>                    
                                <Comments :articleId='article.id' /> 
                            </div>
<!-- Fin section des commentaires -->
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
import Comments from '@/components/Comments.vue'

//Pour afficher le temps écoulé depuis la création de la publication ou du commentaire
var moment = require('moment')

export default {
  name: 'Publications',
  components:{
      Comments
  },
    data : function(){ 
        return{
            moment:moment,
            contenu: "",
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

        updateValue: function (value) {
            this.$emit('input', value)
            this.contenu = value
            console.log('value',value)
        },

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
                contenu : this.contenu,
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

    //Supprimer un commentaire
        deleteComment: function(id){
            console.log(id)
            const token = localStorage.getItem('userToken')
            if(confirm("Voulez-vous supprimer ce commentaire ?")){
                axios
                .delete('/api/comment/' + id, {
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

    //Afficher les commentaires
        modeSeeComments(id){
            this.mode = 'seeComments'
            this.$emit('afficheComment' + id, true)
            console.log('toto mode see', id)
        },

    //Ne plus afficher les commentaires
        unseeComments(id) {
            this.mode = 'unseeComments'
            this.$emit('cacheComment' + id, false)
        },

    }, //fin methods

}//fin export
</script>


<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";
//Style de la publication
.publications_card{
    padding-left: 20%;
    padding-right: 20% ;
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

        img{
            width: 80%;
        }
    }

    .card-footer{
        .optionsPost{
            display: flex;
            justify-content: flex-end;
        }

        .sectionCommentaires{
            textarea{
                width: 80%;
                border-color:rgb(127, 187, 255);    
            }
        }

        .btn-outline-info{
            color: $primary;

            &:hover{
                color: $primary;
                background-color: rgb(234, 255, 255);
            }
        }
    }
  
    img{
        max-width: 80%;
    }
}

//Style des commentaires
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

  /* -----------------------RESPONSIVE--------------------- */
 //Responsive tel portable
@media screen and (max-width: 479px){
    .publications_card{
        padding: 0;
    }

}

 //Responsive tablette
@media only screen and (min-width : 480px) and (max-width: 959px){
    .publications_card{
        padding-left: 5%;
        padding-right: 5% ;    
    }
}

 //Responsive tablette paysage et petits écrans
@media only screen and (min-width : 960px) and (max-width : 1280px){
    .publications_card{
        padding-left: 10%;
        padding-right: 10% ;
    }
}
</style>